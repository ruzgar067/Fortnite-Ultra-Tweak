"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Coins, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import Image from "next/image";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fps", label: "FPS Optimization" },
  { href: "/input-delay", label: "Input Delay" },
  { href: "/network", label: "Network" },
  { href: "/registry", label: "Registry" },
  { href: "/fortnite", label: "Fortnite" },
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "💎 Pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.08_0.01_265)/90] backdrop-blur-md border-b border-[#00c8ff20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size={36} />
            <span className="font-[family-name:var(--font-orbitron)] font-bold text-lg tracking-wider">
              <span className="text-[#ec4899]">FORTNITE</span>
              <span className="text-[#00c8ff]"> ULTRA</span>
              <span className="text-white"> TWEAK</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-sm font-[family-name:var(--font-rajdhani)] font-semibold tracking-wide transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#00c8ff] bg-[#00c8ff10] border border-[#00c8ff40]"
                    : "text-gray-400 hover:text-[#00c8ff] hover:bg-[#00c8ff08]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {!loading && (
              user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/pricing" className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#f59e0b15] border border-[#f59e0b30] text-[#f59e0b] text-xs font-bold font-[family-name:var(--font-orbitron)]">
                    <Coins className="w-3.5 h-3.5" />{user.credits} cr
                  </Link>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#00c8ff20] text-gray-300 text-xs">
                    {user.avatar ? <Image src={user.avatar} alt="" width={20} height={20} className="rounded-full" /> : <User className="w-4 h-4" />}
                    <span className="font-[family-name:var(--font-rajdhani)] max-w-24 truncate">{user.name ?? user.email.split("@")[0]}</span>
                  </div>
                  <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /></button>
                </div>
              ) : (
                <Link href="/auth" className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded bg-gradient-to-r from-[#00c8ff] to-[#0080ff] text-white text-xs font-bold font-[family-name:var(--font-orbitron)] hover:opacity-90 transition-all">
                  Sign In
                </Link>
              )
            )}
            <button
              className="lg:hidden text-gray-400 hover:text-[#00c8ff] transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-[#00c8ff20] bg-[oklch(0.09_0.01_265)]">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded text-sm font-[family-name:var(--font-rajdhani)] font-semibold tracking-wide transition-all ${
                  pathname === link.href
                    ? "text-[#00c8ff] bg-[#00c8ff10] border border-[#00c8ff30]"
                    : "text-gray-400 hover:text-[#00c8ff] hover:bg-[#00c8ff08]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
