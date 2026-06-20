import { db } from '@/db'
import { users, creditTransactions, unlockedPages } from '@/db/schemas/users'
import { eq, and } from 'drizzle-orm'

const JWT_SECRET = process.env.JWT_SECRET ?? 'ultratweak_fallback_secret_2026'
const SIGNUP_BONUS = 5 // free credits on first login

// --- Minimal JWT (Web Crypto, no native deps) ---
async function signJwt(payload: object): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }))
  const data = `${header}.${body}`
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(JWT_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  return `${data}.${sigB64}`
}

async function verifyJwt(token: string): Promise<Record<string, unknown> | null> {
  try {
    const [header, body, sig] = token.split('.')
    const data = `${header}.${sig ? body : ''}`
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(JWT_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    )
    const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(`${header}.${body}`))
    if (!valid) return null
    return JSON.parse(atob(body))
  } catch { return null }
}

export async function createJwt(userId: string, email: string) {
  return signJwt({ sub: userId, email, exp: Math.floor(Date.now() / 1000) + 86400 })
}

export async function resolveAuth(authHeader?: string | null): Promise<{ id: string; email: string; credits: number } | null> {
  const token = authHeader?.replace('Bearer ', '') ?? ''
  if (!token) return null
  const payload = await verifyJwt(token)
  if (!payload || typeof payload.sub !== 'string') return null
  const exp = payload.exp as number
  if (exp && exp < Math.floor(Date.now() / 1000)) return null
  const [user] = await db.select({ id: users.id, email: users.email, credits: users.credits }).from(users).where(eq(users.id, payload.sub as string)).limit(1)
  return user ?? null
}

export async function findOrCreateGoogleUser(googleId: string, email: string, name: string, avatar?: string) {
  // Check existing by googleId
  let [user] = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1)
  if (user) return user

  // Check existing by email
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing) {
    await db.update(users).set({ googleId, avatar, updatedAt: new Date() }).where(eq(users.id, existing.id))
    return existing
  }

  // Create new user
  const id = crypto.randomUUID()
  const [created] = await db.insert(users).values({ id, email, name, avatar, googleId, credits: SIGNUP_BONUS }).returning()

  // Record signup bonus
  await db.insert(creditTransactions).values({
    id: crypto.randomUUID(), userId: id, amount: SIGNUP_BONUS, reason: 'signup_bonus'
  })

  return created
}

export async function getUserCredits(userId: string): Promise<number> {
  const [user] = await db.select({ credits: users.credits }).from(users).where(eq(users.id, userId)).limit(1)
  return user?.credits ?? 0
}

export async function spendCredits(userId: string, amount: number, reason: string): Promise<boolean> {
  const [user] = await db.select({ credits: users.credits }).from(users).where(eq(users.id, userId)).limit(1)
  if (!user || user.credits < amount) return false
  await db.update(users).set({ credits: user.credits - amount, updatedAt: new Date() }).where(eq(users.id, userId))
  await db.insert(creditTransactions).values({ id: crypto.randomUUID(), userId, amount: -amount, reason })
  return true
}

export async function addCredits(userId: string, amount: number, reason: string) {
  const [user] = await db.select({ credits: users.credits }).from(users).where(eq(users.id, userId)).limit(1)
  if (!user) return
  await db.update(users).set({ credits: user.credits + amount, updatedAt: new Date() }).where(eq(users.id, userId))
  await db.insert(creditTransactions).values({ id: crypto.randomUUID(), userId, amount, reason })
}

export async function unlockPage(userId: string, pageSlug: string): Promise<boolean> {
  const existing = await db.select().from(unlockedPages).where(
    and(eq(unlockedPages.userId, userId), eq(unlockedPages.pageSlug, pageSlug))
  ).limit(1)
  if (existing.length > 0) return true // already unlocked
  await db.insert(unlockedPages).values({ id: crypto.randomUUID(), userId, pageSlug })
  return true
}

export async function getUnlockedPages(userId: string): Promise<string[]> {
  const rows = await db.select({ pageSlug: unlockedPages.pageSlug }).from(unlockedPages).where(eq(unlockedPages.userId, userId))
  return rows.map(r => r.pageSlug)
}

export const PAGE_CREDIT_COST = 5
export const PAGE_SLUGS = ['fps', 'input-delay', 'network', 'registry', 'fortnite']
