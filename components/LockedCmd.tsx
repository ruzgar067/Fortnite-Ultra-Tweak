"use client"
import { useState } from "react"
import { Lock, Terminal, Unlock, Loader2, LogIn, CreditCard } from "lucide-react"
import { useAuth } from "@/lib/useAuth"
import Link from "next/link"

interface LockedCmdProps {
  label?: string
  cmd: string
  pageSlug: string
  accentColor?: string
}

export default function LockedCmd({ label, cmd, pageSlug, accentColor = "#00c8ff" }: LockedCmdProps) {
  const { user, isUnlocked, refresh } = useAuth()
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const unlocked = isUnlocked(pageSlug)

  async function handleReveal() {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pageSlug }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 402) {
          setError(`Not enough credits. You need 5 credits to unlock this page.`)
        } else {
          setError(data.error ?? "Something went wrong")
        }
        return
      }
      await refresh()
      setRevealed(true)
    } finally {
      setLoading(false)
    }
  }

  // Already unlocked (from DB or just unlocked)
  if (unlocked || revealed) {
    return (
      <div className="mt-3">
        {label && (
          <p className="text-xs font-semibold mb-1 uppercase tracking-widest font-[family-name:var(--font-orbitron)]" style={{ color: accentColor }}>
            {label}
          </p>
        )}
        <div className="flex items-start gap-2 bg-black/70 border rounded-lg px-4 py-3" style={{ borderColor: `${accentColor}40` }}>
          <Terminal className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
          <code className="text-xs font-mono leading-relaxed break-all select-all whitespace-pre-wrap" style={{ color: accentColor }}>{cmd}</code>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="mt-3">
        {label && (
          <p className="text-xs font-semibold mb-1 uppercase tracking-widest font-[family-name:var(--font-orbitron)]" style={{ color: accentColor }}>
            {label}
          </p>
        )}
        <div className="flex items-center justify-between bg-black/50 border border-[#ffffff10] rounded-lg px-4 py-3 gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Lock className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-gray-600 text-xs font-mono truncate select-none">{"█".repeat(Math.min(cmd.length, 40))}</span>
          </div>
          <Link href="/auth" className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap font-[family-name:var(--font-orbitron)]" style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}>
            <LogIn className="w-3 h-3" /> Sign In
          </Link>
        </div>
      </div>
    )
  }

  // Logged in, not unlocked
  return (
    <div className="mt-3">
      {label && (
        <p className="text-xs font-semibold mb-1 uppercase tracking-widest font-[family-name:var(--font-orbitron)]" style={{ color: accentColor }}>
          {label}
        </p>
      )}
      <div className="flex flex-col gap-2 bg-black/50 border border-[#ffffff10] rounded-lg px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Lock className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-gray-600 text-xs font-mono truncate select-none">{"█".repeat(Math.min(cmd.length, 40))}</span>
          </div>
          <button
            onClick={handleReveal}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap font-[family-name:var(--font-orbitron)] disabled:opacity-60"
            style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Unlock className="w-3 h-3" />}
            Unlock (5 cr)
          </button>
        </div>
        {error && (
          <div className="text-xs text-red-400 flex items-center gap-2">
            <span>{error}</span>
            <Link href="/pricing" className="text-[#00c8ff] underline font-semibold">Buy Credits</Link>
          </div>
        )}
      </div>
    </div>
  )
}
