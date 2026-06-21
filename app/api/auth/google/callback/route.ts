import { NextRequest, NextResponse } from 'next/server'
import { findOrCreateGoogleUser, createJwt } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const storedState = req.cookies.get('google_oauth_state')?.value

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL('/auth?error=invalid_state', req.url))
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!.trim()
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!.trim()
  const host = req.headers.get('host') ?? 'fortnite-ultra-tweaker.vercel.app'
  const proto = host.includes('localhost') ? 'http' : 'https'
  const redirectUri = `${proto}://${host}/api/auth/google/callback`

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
  })

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL('/auth?error=token_failed', req.url))
  }

  const tokens = await tokenRes.json()
  const idToken = tokens.id_token as string

  // Decode id_token payload (no verification needed — came directly from Google)
  const [, payloadB64] = idToken.split('.')
  const profile = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))

  const user = await findOrCreateGoogleUser(
    profile.sub as string,
    profile.email as string,
    profile.name as string,
    profile.picture as string | undefined,
  )

  const jwt = await createJwt(user.id, user.email)

  const res = NextResponse.redirect(new URL('/?login=success', req.url))
  res.cookies.set('auth_access_token', jwt, { httpOnly: false, path: '/', maxAge: 86400, sameSite: 'none', secure: true })
  res.cookies.delete('google_oauth_state')
  return res
}
