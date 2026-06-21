import Link from "next/link";
import { Github, Twitter, Youtube } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#00c8ff15] bg-[oklch(0.07_0.01_265)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Logo size={28} />
              <span className="font-[family-name:var(--font-orbitron)] font-bold text-base">
                <span className="text-[#ec4899]">FORTNITE</span>
                <span className="text-[#00c8ff]"> ULTRA</span>
                <span className="text-white"> TWEAK</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm font-[family-name:var(--font-rajdhani)]">
              Advanced PC optimization guides for competitive gamers.
            </p>
            <div className="flex gap-3 mt-4">
              {[Github, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded border border-[#00c8ff20] flex items-center justify-center text-gray-500 hover:text-[#00c8ff] hover:border-[#00c8ff50] transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Rehberler */}
          <div>
            <h4 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-[#00c8ff] mb-3 tracking-wider">GUIDES</h4>
            <ul className="space-y-2">
              {[
                { href: "/fps", label: "FPS Optimization" },
                { href: "/input-delay", label: "Input Delay Reduction" },
                { href: "/network", label: "Network Optimization" },
                { href: "/registry", label: "Registry Tweaks" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-[#00c8ff] text-sm font-[family-name:var(--font-rajdhani)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Oyun */}
          <div>
            <h4 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-[#a855f7] mb-3 tracking-wider">GAMING</h4>
            <ul className="space-y-2">
              {[
                { href: "/fortnite", label: "Fortnite Settings" },
                { href: "/tools", label: "FPS Calculator" },
                { href: "/tools", label: "Sensitivity Converter" },
                { href: "/tools", label: "PC Checklist" },
              ].map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-gray-500 hover:text-[#a855f7] text-sm font-[family-name:var(--font-rajdhani)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hakkında */}
          <div>
            <h4 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-[#06ffd4] mb-3 tracking-wider">ABOUT</h4>
            <ul className="space-y-2">
              {["About Us", "Contact", "Privacy", "Terms of Use"].map((l) => (
                <li key={l}>
                  <button className="text-gray-500 hover:text-[#06ffd4] text-sm font-[family-name:var(--font-rajdhani)] transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#00c8ff10] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs font-[family-name:var(--font-rajdhani)]">
            © 2026 Fortnite Ultra Tweak. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs font-[family-name:var(--font-rajdhani)]">
            Maximize FPS. Minimize Input Delay.
          </p>
        </div>
      </div>
    </footer>
  );
}
