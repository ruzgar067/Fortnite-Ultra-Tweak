import { NextRequest, NextResponse } from 'next/server'
import { resolveAuth } from '@/lib/auth'
import { db } from '@/db'
import { stripeOrders } from '@/db/schemas/users'

const PRODUCTS = {
  page_single: { price: 100, label: 'Single Page Unlock', credits: 5 },
  bundle_all:  { price: 300, label: 'Full Bundle (5 pages)', credits: 30 },
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_access_token')?.value
    ?? req.headers.get('authorization')?.replace('Bearer ', '')
  const user = await resolveAuth(token ? `Bearer ${token}` : null)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { productType, pageSlug } = await req.json() as { productType: keyof typeof PRODUCTS; pageSlug?: string }
  const product = PRODUCTS[productType]
  if (!product) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey || stripeKey === 'your_stripe_secret_key') {
    return NextResponse.json({ error: 'Stripe not configured', demo: true }, { status: 503 })
  }

  const origin = req.headers.get('origin') ?? 'http://localhost:13000'
  const orderId = crypto.randomUUID()

  const sessionRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'payment_method_types[]': 'card',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': String(product.price),
      'line_items[0][price_data][product_data][name]': product.label,
      'line_items[0][quantity]': '1',
      mode: 'payment',
      success_url: `${origin}/pricing?success=1&order=${orderId}`,
      cancel_url: `${origin}/pricing?cancelled=1`,
      'metadata[orderId]': orderId,
      'metadata[userId]': user.id,
      'metadata[productType]': productType,
      'metadata[pageSlug]': pageSlug ?? '',
    }),
  })

  if (!sessionRes.ok) {
    const err = await sessionRes.json()
    return NextResponse.json({ error: 'Stripe error', detail: err }, { status: 500 })
  }

  const session = await sessionRes.json()

  await db.insert(stripeOrders).values({
    id: orderId,
    userId: user.id,
    stripeSessionId: session.id,
    productType,
    amountCents: product.price,
    status: 'pending',
  })

  return NextResponse.json({ url: session.url, sessionId: session.id })
}
