import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim()

  if (!clientId || clientId === 'your_google_client_id') {
    return NextResponse.json({ error: 'Google OAuth not configured' }, { status: 503 })
  }

  const host = req.headers.get('host') ?? 'fortnite-ultra-tweaker.vercel.app'
  const proto = host.includes('localhost') ? 'http' : 'https'
  const redirectUri = `${proto}://${host}/api/auth/google/callback`

  const state = crypto.randomUUID()
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'select_account',
  })

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  const res = NextResponse.json({ url })
  res.cookies.set('google_oauth_state', state, { httpOnly: true, maxAge: 600, sameSite: 'lax', path: '/' })
  return res
}
