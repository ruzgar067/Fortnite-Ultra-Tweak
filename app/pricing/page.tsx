"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useAuth } from "@/lib/useAuth"
import { Zap, Check, Lock, Coins, CreditCard, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const PAGES = [
  { slug: "fps", name: "FPS Optimization", color: "#00c8ff", desc: "Windows, GPU & Fortnite CMD tweaks" },
  { slug: "input-delay", name: "Input Delay", color: "#a855f7", desc: "Mouse, keyboard & USB commands" },
  { slug: "network", name: "Network Optimization", color: "#06ffd4", desc: "DNS, ping & troubleshooting commands" },
  { slug: "registry", name: "Registry Tweaks", color: "#f59e0b", desc: "Safe registry CMD commands" },
  { slug: "fortnite", name: "Fortnite Settings", color: "#ec4899", desc: "Pro settings & performance commands" },
]

export default function PricingPage() {
  const { user, isUnlocked, refresh } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  async function handleCheckout(productType: "page_single" | "bundle_all", pageSlug?: string) {
    if (!user) { window.location.href = "/auth"; return }
    setLoading(productType + (pageSlug ?? ""))
    setMsg(null)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productType, pageSlug }),
      })
      const data = await res.json()
      if (data.demo || !res.ok) {
        setMsg("⚠️ Stripe is not configured yet. Add STRIPE_SECRET_KEY to .env to enable real payments.")
        return
      }
      if (data.url) window.location.href = data.url
    } finally {
      setLoading(null)
    }
  }

  async function handleCreditUnlock(pageSlug: string) {
    if (!user) { window.location.href = "/auth"; return }
    setLoading("credits_" + pageSlug)
    setMsg(null)
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pageSlug }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMsg(data.error ?? "Failed to unlock")
        return
      }
      await refresh()
      setMsg("✅ Page unlocked successfully!")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-20 pt-28">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a855f740] bg-[#a855f710] mb-4">
            <Zap className="w-3.5 h-3.5 text-[#a855f7]" />
            <span className="text-[#a855f7] text-xs font-[family-name:var(--font-orbitron)] tracking-widest">UNLOCK CMD COMMANDS</span>
          </div>
          <h1 className="font-[family-name:var(--font-orbitron)] font-black text-4xl md:text-5xl text-white mb-3">
            CHOOSE YOUR <span className="text-[#00c8ff]">PLAN</span>
          </h1>
          <p className="text-gray-400 font-[family-name:var(--font-rajdhani)] text-lg max-w-xl mx-auto">
            Unlock copy-paste CMD commands for each optimization guide. Sign in with Google to earn free credits.
          </p>

          {user && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[#f59e0b10] border border-[#f59e0b30]">
              <Coins className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-[#f59e0b] font-bold font-[family-name:var(--font-orbitron)] text-sm">{user.credits} Credits Available</span>
            </div>
          )}
        </div>

        {msg && (
          <div className="max-w-xl mx-auto mb-8 px-4 py-3 rounded-xl border border-[#00c8ff30] bg-[#00c8ff08] text-[#00c8ff] text-sm font-[family-name:var(--font-rajdhani)] text-center">
            {msg}
          </div>
        )}

        {/* Bundle Deal — TOP */}
        <div className="relative mb-10 rounded-2xl border-2 border-[#00c8ff60] bg-gradient-to-br from-[oklch(0.16_0.03_265)] to-[oklch(0.10_0.015_280)] p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#00c8ff] rounded-full blur-[80px] opacity-10" />
          <div className="absolute top-4 right-4 bg-[#00c8ff] text-black text-xs font-black px-3 py-1 rounded-full font-[family-name:var(--font-orbitron)]">BEST VALUE</div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-[family-name:var(--font-orbitron)] font-black text-2xl text-white mb-1">Full Bundle</h2>
              <p className="text-gray-400 font-[family-name:var(--font-rajdhani)] mb-3">All 5 optimization guides unlocked forever</p>
              <div className="flex flex-wrap gap-2">
                {PAGES.map(p => (
                  <span key={p.slug} className="text-xs px-2 py-0.5 rounded-full border font-[family-name:var(--font-rajdhani)]" style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}10` }}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 line-through text-lg font-[family-name:var(--font-orbitron)]">$5</span>
                <span className="text-[#00c8ff] font-black text-4xl font-[family-name:var(--font-orbitron)]">$3</span>
              </div>
              <p className="text-[#00c8ff] text-xs font-[family-name:var(--font-rajdhani)] font-semibold">5 pages for price of 3</p>
              {user ? (
                <button
                  onClick={() => handleCheckout("bundle_all")}
                  disabled={!!loading || isUnlocked("all")}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c8ff] to-[#0080ff] text-white font-bold font-[family-name:var(--font-orbitron)] text-sm hover:opacity-90 transition-all disabled:opacity-60"
                >
                  {isUnlocked("all") ? (
                    <><Check className="w-4 h-4" /> Unlocked</>
                  ) : (
                    <><CreditCard className="w-4 h-4" /> {loading === "bundle_all" ? "Loading..." : "Get Full Bundle — $3"}</>
                  )}
                </button>
              ) : (
                <Link href="/auth" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c8ff] to-[#0080ff] text-white font-bold font-[family-name:var(--font-orbitron)] text-sm hover:opacity-90 transition-all">
                  Sign In to Purchase <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Individual pages */}
        <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-white mb-5">
          Or unlock <span className="text-[#a855f7]">individual pages</span> — $1 each
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAGES.map(p => {
            const unlocked = isUnlocked(p.slug)
            const isLoadingThis = loading === `page_single${p.slug}` || loading === `credits_${p.slug}`
            return (
              <div key={p.slug} className="rounded-xl border bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] p-5" style={{ borderColor: `${p.color}20` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                    <Zap className="w-4 h-4" style={{ color: p.color }} />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-white">{p.name}</h3>
                    {unlocked && <span className="text-xs font-[family-name:var(--font-rajdhani)]" style={{ color: p.color }}>✓ Unlocked</span>}
                  </div>
                </div>
                <p className="text-gray-500 text-xs font-[family-name:var(--font-rajdhani)] mb-4">{p.desc}</p>

                {unlocked ? (
                  <Link href={`/${p.slug}`} className="flex items-center justify-center gap-1 w-full py-2 rounded-lg text-xs font-bold font-[family-name:var(--font-orbitron)] border" style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}10` }}>
                    <Check className="w-3.5 h-3.5" /> View Guide
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    {user && user.credits >= 5 && (
                      <button
                        onClick={() => handleCreditUnlock(p.slug)}
                        disabled={!!loading}
                        className="flex items-center justify-center gap-1 w-full py-2 rounded-lg text-xs font-bold font-[family-name:var(--font-orbitron)] border disabled:opacity-60"
                        style={{ color: "#f59e0b", borderColor: "#f59e0b40", background: "#f59e0b10" }}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        {isLoadingThis ? "..." : "Use 5 Credits"}
                      </button>
                    )}
                    <button
                      onClick={() => handleCheckout("page_single", p.slug)}
                      disabled={!!loading}
                      className="flex items-center justify-center gap-1 w-full py-2 rounded-lg text-xs font-bold font-[family-name:var(--font-orbitron)] border disabled:opacity-60"
                      style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}10` }}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      {isLoadingThis ? "..." : "Buy — $1"}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Free credits info */}
        <div className="mt-12 rounded-2xl border border-[#f59e0b30] bg-[#f59e0b08] p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-[#f59e0b20] flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-[#f59e0b]" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-orbitron)] text-white font-bold mb-1">Get 5 FREE Credits on Sign Up</h3>
            <p className="text-gray-400 text-sm font-[family-name:var(--font-rajdhani)]">Sign in with Google and instantly receive 5 credits. 5 credits = 1 page unlock. Buy more credits to access all guides.</p>
          </div>
          {!user && (
            <Link href="/auth" className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold font-[family-name:var(--font-orbitron)] text-sm hover:opacity-90 transition-all">
              Sign In Free
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
