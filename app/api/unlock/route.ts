import { NextRequest, NextResponse } from 'next/server'
import { resolveAuth, spendCredits, unlockPage, getUnlockedPages, PAGE_CREDIT_COST, PAGE_SLUGS } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_access_token')?.value
    ?? req.headers.get('authorization')?.replace('Bearer ', '')
  const user = await resolveAuth(token ? `Bearer ${token}` : null)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { pageSlug } = await req.json() as { pageSlug: string }

  if (!PAGE_SLUGS.includes(pageSlug) && pageSlug !== 'all') {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  // Check already unlocked
  const existing = await getUnlockedPages(user.id)
  if (existing.includes(pageSlug) || existing.includes('all')) {
    return NextResponse.json({ success: true, alreadyUnlocked: true })
  }

  const cost = PAGE_CREDIT_COST
  const spent = await spendCredits(user.id, cost, `unlock_${pageSlug}`)
  if (!spent) {
    return NextResponse.json({ error: 'Insufficient credits', creditsNeeded: cost }, { status: 402 })
  }

  await unlockPage(user.id, pageSlug)
  const unlocked = await getUnlockedPages(user.id)

  return NextResponse.json({ success: true, unlockedPages: unlocked, creditsRemaining: user.credits - cost })
}
