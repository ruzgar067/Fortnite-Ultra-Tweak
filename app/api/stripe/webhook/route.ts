import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { stripeOrders } from '@/db/schemas/users'
import { eq } from 'drizzle-orm'
import { addCredits, unlockPage, PAGE_SLUGS } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const body = await req.text()

  // In production: verify Stripe signature
  // For now, parse the event directly
  let event: { type: string; data: { object: Record<string, unknown> } }
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = (session.metadata as Record<string, string>)?.orderId
    const userId = (session.metadata as Record<string, string>)?.userId
    const productType = (session.metadata as Record<string, string>)?.productType
    const pageSlug = (session.metadata as Record<string, string>)?.pageSlug

    if (!orderId || !userId) return NextResponse.json({ ok: true })

    // Update order status
    await db.update(stripeOrders).set({ status: 'paid' }).where(eq(stripeOrders.id, orderId))

    // Grant credits + unlock
    if (productType === 'bundle_all') {
      await addCredits(userId, 30, 'purchase_bundle')
      await unlockPage(userId, 'all')
      for (const slug of PAGE_SLUGS) await unlockPage(userId, slug)
    } else if (productType === 'page_single') {
      await addCredits(userId, 5, 'purchase_single')
      if (pageSlug) await unlockPage(userId, pageSlug)
    }
  }

  return NextResponse.json({ ok: true })
}
