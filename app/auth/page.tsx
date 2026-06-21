"use client"
import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/useAuth"
import { Zap, Chrome, AlertCircle, Coins } from "lucide-react"
import Link from "next/link"

function AuthForm() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const [signingIn, setSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(params.get("error"))

  useEffect(() => {
    if (!loading && user) router.replace("/")
  }, [user, loading, router])

  async function handleGoogleSignIn() {
    setSigningIn(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/google/url")
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error ?? "Google OAuth is not configured yet.")
        return
      }
      window.location.href = data.url
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSigningIn(false)
    }
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded bg-gradient-to-br from-[#00c8ff] to-[#a855f7] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="font-[family-name:var(--font-orbitron)] font-bold text-xl">
            <span className="text-[#ec4899]">FORTNITE</span>
            <span className="text-[#00c8ff]"> ULTRA</span>
            <span className="text-white"> TWEAK</span>
          </span>
        </Link>
        <h1 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-white mt-2">Sign In</h1>
        <p className="text-gray-500 font-[family-name:var(--font-rajdhani)] mt-1">Access CMD commands &amp; optimization guides</p>
      </div>

      <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-2xl border border-[#00c8ff15] p-8">
        <div className="flex items-center gap-3 bg-[#f59e0b10] border border-[#f59e0b30] rounded-xl px-4 py-3 mb-6">
          <Coins className="w-5 h-5 text-[#f59e0b] shrink-0" />
          <div>
            <p className="text-[#f59e0b] text-sm font-bold font-[family-name:var(--font-orbitron)]">FREE 5 CREDITS ON SIGN UP</p>
            <p className="text-gray-400 text-xs font-[family-name:var(--font-rajdhani)]">Sign in with Google to claim your free credits instantly</p>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm font-[family-name:var(--font-rajdhani)]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={signingIn}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white text-gray-900 font-bold font-[family-name:var(--font-orbitron)] text-sm hover:bg-gray-100 transition-all disabled:opacity-60"
        >
          <Chrome className="w-5 h-5 text-blue-500" />
          {signingIn ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="text-gray-600 text-xs text-center mt-4 font-[family-name:var(--font-rajdhani)]">
          By signing in you agree to our Terms of Use and Privacy Policy.
        </p>
      </div>

      <p className="text-center text-gray-600 text-sm mt-6 font-[family-name:var(--font-rajdhani)]">
        <Link href="/" className="text-[#00c8ff] hover:underline">← Back to Home</Link>
      </p>
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)] flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00c8ff] rounded-full blur-[120px] opacity-10" />
      <Suspense fallback={<div className="text-gray-400 font-[family-name:var(--font-rajdhani)]">Loading...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  )
}
