import { NextRequest, NextResponse } from 'next/server'
import { resolveAuth, getUnlockedPages } from '@/lib/auth'
import { db } from '@/db'
import { users } from '@/db/schemas/users'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_access_token')?.value
    ?? req.headers.get('authorization')?.replace('Bearer ', '')
  const user = await resolveAuth(token ? `Bearer ${token}` : null)
  if (!user) return NextResponse.json({ user: null })

  const [full] = await db.select().from(users).where(eq(users.id, user.id)).limit(1)
  const unlocked = await getUnlockedPages(user.id)

  return NextResponse.json({
    user: { id: full.id, email: full.email, name: full.name, avatar: full.avatar, credits: full.credits },
    unlockedPages: unlocked,
  })
}
