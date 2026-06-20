import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Zap, Monitor, Cpu, Wifi, Shield, Gamepad2,
  Wrench, TrendingUp, Users, Star, ChevronRight,
  ArrowRight, Target, Activity
} from "lucide-react";

const stats = [
  { label: "Average FPS Increase", value: "+87%", icon: TrendingUp, color: "#00c8ff" },
  { label: "Input Delay Reduction", value: "-12ms", icon: Target, color: "#a855f7" },
  { label: "Active Users", value: "54K+", icon: Users, color: "#06ffd4" },
  { label: "Optimization Guides", value: "120+", icon: Activity, color: "#f59e0b" },
];

const guides = [
  {
    icon: Monitor,
    title: "FPS Optimization",
    desc: "Max out your FPS with Windows settings, GPU config, and Fortnite graphics recommendations.",
    href: "/fps",
    color: "#00c8ff",
    tag: "POPÜLER",
  },
  {
    icon: Target,
    title: "Input Delay Reduction",
    desc: "React faster than opponents with mouse, keyboard and USB optimization.",
    href: "/input-delay",
    color: "#a855f7",
    tag: "YENİ",
  },
  {
    icon: Wifi,
    title: "Network Optimization",
    desc: "Fix DNS, ping, and packet loss issues for a stable connection.",
    href: "/network",
    color: "#06ffd4",
    tag: null,
  },
  {
    icon: Shield,
    title: "Registry Tweaks",
    desc: "Fine-tune your system with safe, reversible registry adjustments.",
    href: "/registry",
    color: "#f59e0b",
    tag: "DİKKAT",
  },
  {
    icon: Gamepad2,
    title: "Fortnite Competitive Settings",
    desc: "Pro player settings, sensitivity database, and performance mode guide.",
    href: "/fortnite",
    color: "#ec4899",
    tag: "PRO",
  },
  {
    icon: Wrench,
    title: "Araçlar",
    desc: "FPS calculator, sensitivity converter, and PC performance checklist.",
    href: "/tools",
    color: "#8b5cf6",
    tag: null,
  },
];

const testimonials = [
  { name: "xKaanFN", role: "Arena Player", text: "After applying the FPS guide I went from 144fps to a stable 240fps. I feel much better in build fights.", rating: 5 },
  { name: "zeroPing_tr", role: "Pro Player", text: "Thanks to the network guide my ping dropped from 60ms to 18ms. A completely different gaming experience.", rating: 5 },
  { name: "TacticalAim", role: "Content Creator", text: "The input delay guide really works. My mouse clicks are so much more responsive now.", rating: 5 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* BG Grid */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00c8ff] rounded-full blur-[120px] opacity-10 animate-pulse-neon" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#a855f7] rounded-full blur-[120px] opacity-10 animate-pulse-neon" style={{animationDelay: "1s"}} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ec4899]/40 bg-[#ec4899]/08 mb-6">
            <Zap className="w-3.5 h-3.5 text-[#ec4899]" />
            <span className="text-[#ec4899] text-xs font-[family-name:var(--font-orbitron)] tracking-widest">FORTNITE ULTRA TWEAK</span>
          </div>

          <h1 className="font-[family-name:var(--font-orbitron)] font-black text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6">
            <span className="text-white">MAXIMIZE </span>
            <span className="text-[#00c8ff]" style={{textShadow: "0 0 40px #00c8ff60"}}>FPS.</span>
            <br />
            <span className="text-white">MINIMIZE </span>
            <span className="text-[#a855f7]" style={{textShadow: "0 0 40px #a855f760"}}>INPUT DELAY.</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl font-[family-name:var(--font-rajdhani)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Windows, Fortnite, FPS optimization, latency reduction and
            network tuning guides for competitive gamers. Leave your rivals behind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/fps" className="flex items-center gap-2 px-8 py-3.5 rounded bg-gradient-to-r from-[#00c8ff] to-[#0080ff] text-white font-[family-name:var(--font-orbitron)] font-bold text-sm tracking-wider hover:opacity-90 transition-all glow-blue">
              <Zap className="w-4 h-4" />
              FPS OPTIMIZATION
            </Link>
            <Link href="/tools" className="flex items-center gap-2 px-8 py-3.5 rounded border border-[#a855f760] text-[#a855f7] font-[family-name:var(--font-orbitron)] font-bold text-sm tracking-wider hover:bg-[#a855f710] transition-all">
              EXPLORE TOOLS
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-[#00c8ff] to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[#00c8ff10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="card-esports rounded-xl p-6 text-center border border-[#00c8ff15] hover:border-[#00c8ff40] transition-all group">
                <s.icon className="w-6 h-6 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: s.color }} />
                <div className="font-[family-name:var(--font-orbitron)] font-black text-3xl mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-gray-500 text-sm font-[family-name:var(--font-rajdhani)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-3xl sm:text-4xl mb-3">
            <span className="text-white">OPTIMIZATION </span>
            <span className="text-[#00c8ff]">GUIDES</span>
          </h2>
          <p className="text-gray-500 font-[family-name:var(--font-rajdhani)] text-lg">
            Comprehensive guides to push your system to the peak
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((g, i) => (
            <Link key={i} href={g.href} className="group card-esports rounded-xl p-6 border border-[#00c8ff10] hover:border-opacity-60 transition-all hover:-translate-y-1 duration-200" style={{ borderColor: `${g.color}15` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${g.color}15`, border: `1px solid ${g.color}30` }}>
                  <g.icon className="w-5 h-5" style={{ color: g.color }} />
                </div>
                {g.tag && (
                  <span className="text-xs font-[family-name:var(--font-orbitron)] px-2 py-0.5 rounded-full" style={{ color: g.color, background: `${g.color}15`, border: `1px solid ${g.color}30` }}>
                    {g.tag}
                  </span>
                )}
              </div>
              <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-base mb-2 text-white group-hover:text-[#00c8ff] transition-colors" style={{ "--hover-color": g.color } as React.CSSProperties}>
                {g.title}
              </h3>
              <p className="text-gray-500 text-sm font-[family-name:var(--font-rajdhani)] leading-relaxed mb-4">{g.desc}</p>
              <div className="flex items-center gap-1 text-sm font-[family-name:var(--font-rajdhani)] font-semibold transition-colors" style={{ color: g.color }}>
                View Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Before/After FPS Banner */}
      <section className="py-16 bg-gradient-to-r from-[#00c8ff08] via-[#a855f708] to-[#00c8ff08] border-y border-[#00c8ff10]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-2xl sm:text-3xl mb-8 text-white">
            BEFORE / AFTER COMPARISON
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="card-esports rounded-xl p-8 border border-red-500/20">
              <div className="text-red-400 font-[family-name:var(--font-orbitron)] text-sm mb-2">BEFORE</div>
              <div className="font-[family-name:var(--font-orbitron)] font-black text-5xl text-red-400">67</div>
              <div className="text-gray-500 text-sm font-[family-name:var(--font-rajdhani)] mt-1">Average FPS</div>
              <div className="text-red-400/60 text-xs mt-2 font-[family-name:var(--font-rajdhani)]">48ms Input Lag</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="w-10 h-10 text-[#00c8ff]" />
              <span className="text-[#00c8ff] font-[family-name:var(--font-orbitron)] text-xs tracking-widest">OPTIMIZATION</span>
            </div>
            <div className="card-esports rounded-xl p-8 border border-[#00c8ff30] glow-blue">
              <div className="text-[#00c8ff] font-[family-name:var(--font-orbitron)] text-sm mb-2">AFTER</div>
              <div className="font-[family-name:var(--font-orbitron)] font-black text-5xl text-[#00c8ff]">244</div>
              <div className="text-gray-500 text-sm font-[family-name:var(--font-rajdhani)] mt-1">Average FPS</div>
              <div className="text-[#00c8ff]/60 text-xs mt-2 font-[family-name:var(--font-rajdhani)]">4ms Input Lag</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-3xl sm:text-4xl mb-3">
            <span className="text-white">USER </span>
            <span className="text-[#a855f7]">REVIEWS</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card-esports rounded-xl p-6 border border-[#a855f720]">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#f59e0b]" fill="#f59e0b" />
                ))}
              </div>
              <p className="text-gray-400 text-sm font-[family-name:var(--font-rajdhani)] leading-relaxed mb-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-[#a855f7]">{t.name}</div>
                <div className="text-gray-600 text-xs font-[family-name:var(--font-rajdhani)]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00c8ff08] to-[#a855f708]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00c8ff] rounded-full blur-[100px] opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-orbitron)] font-black text-3xl sm:text-5xl mb-4">
            <span className="text-[#00c8ff]">ARE YOU READY?</span>
          </h2>
          <p className="text-gray-400 font-[family-name:var(--font-rajdhani)] text-lg mb-8">
            Start optimizing right now to leave your rivals behind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fps" className="flex items-center justify-center gap-2 px-8 py-4 rounded bg-gradient-to-r from-[#00c8ff] to-[#0080ff] text-white font-[family-name:var(--font-orbitron)] font-bold tracking-wider hover:opacity-90 transition-all glow-blue">
              <Zap className="w-5 h-5" /> START OPTIMIZING
            </Link>
            <Link href="/fortnite" className="flex items-center justify-center gap-2 px-8 py-4 rounded border border-[#a855f760] text-[#a855f7] font-[family-name:var(--font-orbitron)] font-bold tracking-wider hover:bg-[#a855f710] transition-all">
              <Gamepad2 className="w-5 h-5" /> FORTNITE SETTINGS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
