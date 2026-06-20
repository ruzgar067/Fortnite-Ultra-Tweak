import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gamepad2, Target, Monitor, Zap, Trophy, Star } from "lucide-react";

export default function FortnitePage() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)] font-[family-name:var(--font-rajdhani)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-14">
        {/* HERO */}
        <HeroSection />
        {/* PRO SETTINGS */}
        <ProPlayersSection />
        {/* SENS CALC */}
        <SensCalcSection />
        {/* RESOLUTION */}
        <ResolutionSection />
        {/* PERFORMANCE MODE */}
        <PerformanceModeSection />
        {/* GRAPHIC SETTINGS */}
        <GraphicSettingsSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="text-center py-10">
      <div className="inline-flex items-center gap-2 bg-[#ec4899]/10 border border-[#ec4899]/40 rounded-full px-4 py-1.5 mb-6">
        <Gamepad2 className="w-4 h-4 text-[#ec4899]" />
        <span className="text-[#ec4899] text-sm font-semibold tracking-widest uppercase">Fortnite</span>
      </div>
      <h1 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
        FORTNITE{" "}
        <span className="text-[#ec4899]">COMPETITIVE</span>{" "}
        SETTINGS
      </h1>
      <p className="text-gray-400 text-lg max-w-xl mx-auto">
        Pro player settings and optimization guide
      </p>
    </section>
  );
}

function ProPlayersSection() {
  const players = [
    { tag: "ProPlayer_1", alias: "NightSword", sens: "8.0% X/Y", dpi: "400", res: "1920x1080", render: "Performans Modu" },
    { tag: "ProPlayer_2", alias: "VelocityFN", sens: "10.0% X/Y", dpi: "800", res: "1440x1080 stretched", render: "Performans Modu" },
    { tag: "ProPlayer_3", alias: "AbsoluteZ", sens: "7.5% X/Y", dpi: "400", res: "1920x1080", render: "Performans Modu" },
  ];
  return (
    <section>
      <SectionHeading icon={<Trophy className="w-5 h-5 text-[#ec4899]" />} title="Pro Player Settings" />
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {players.map((p) => (
          <div key={p.tag} className="rounded-xl border border-[#ec4899]/30 bg-gradient-to-b from-[oklch(0.13_0.02_300)] to-[oklch(0.10_0.01_265)] p-5">
            <p className="text-[#ec4899] text-xs font-bold tracking-widest uppercase mb-1">{p.tag}</p>
            <h3 className="font-[family-name:var(--font-orbitron)] text-white text-lg font-bold mb-4">"{p.alias}"</h3>
            <ul className="space-y-2 text-sm">
              <StatRow label="Sens" value={p.sens} />
              <StatRow label="DPI" value={p.dpi} />
              <StatRow label="Resolution" value={p.res} />
              <StatRow label="Rendering" value={p.render} />
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function SensCalcSection() {
  const rows = [
    { expr: "400 DPI × 8%", result: "32 eDPI", level: "Low", color: "text-blue-400" },
    { expr: "800 DPI × 5%", result: "40 eDPI", level: "Medium", color: "text-green-400" },
    { expr: "400 DPI × 10%", result: "40 eDPI", level: "Medium", color: "text-green-400" },
  ];
  return (
    <section>
      <SectionHeading icon={<Target className="w-5 h-5 text-[#00c8ff]" />} title="Sensitivity Calculator" />
      <div className="mt-6 rounded-xl border border-[#00c8ff]/30 bg-gradient-to-b from-[oklch(0.13_0.02_220)] to-[oklch(0.10_0.01_265)] p-6">
        <p className="text-[#00c8ff] font-bold text-sm mb-4 font-[family-name:var(--font-orbitron)] tracking-wide">
          Efektif Sens = DPI × Sens%
        </p>
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.expr} className="flex items-center justify-between bg-black/30 rounded-lg px-4 py-2.5">
              <span className="text-gray-300 text-sm">{r.expr}</span>
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">{r.result}</span>
                <span className={`text-xs font-semibold ${r.color}`}>({r.level})</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-yellow-400 flex items-center gap-2">
          <Star className="w-4 h-4 flex-shrink-0" />
          <span><strong>Recommendation:</strong> 32–50 eDPI competitive range</span>
        </p>
      </div>
    </section>
  );
}

function ResolutionSection() {
  const resolutions = [
    { label: "1920x1080", tag: "Native", desc: "Standard, best visuals", pro: false },
    { label: "1440x1080", tag: "Stretched", desc: "Wider character model, easier targeting", pro: true },
    { label: "1280x1024", tag: "", desc: "Maximum FPS gain", pro: false },
  ];
  return (
    <section>
      <SectionHeading icon={<Monitor className="w-5 h-5 text-[#ec4899]" />} title="Resolution Recommendations" />
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {resolutions.map((r) => (
          <div key={r.label} className={`rounded-xl border p-5 bg-gradient-to-b from-[oklch(0.13_0.02_300)] to-[oklch(0.10_0.01_265)] ${r.pro ? "border-[#ec4899]/60" : "border-white/10"}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-[family-name:var(--font-orbitron)] text-white font-bold text-base">{r.label}</span>
              {r.tag && <span className="text-xs text-gray-400">({r.tag})</span>}
            </div>
            {r.pro && (
              <span className="inline-block bg-[#ec4899] text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 tracking-widest uppercase">PRO CHOICE</span>
            )}
            <p className="text-gray-400 text-sm">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PerformanceModeSection() {
  return (
    <section>
      <SectionHeading icon={<Zap className="w-5 h-5 text-yellow-400" />} title="Performance Mode Explained" />
      <div className="mt-6 rounded-xl border border-yellow-400/30 bg-gradient-to-b from-[oklch(0.13_0.02_80)] to-[oklch(0.10_0.01_265)] p-6 space-y-3">
        <p className="text-yellow-300 font-bold text-sm font-[family-name:var(--font-orbitron)]">
          Fortnite → Ayarlar → Video → Rendering Mode: Performance
        </p>
        <ul className="space-y-2 text-sm text-gray-300 list-none">
          <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">▸</span>Less GPU load, significantly higher FPS</li>
          <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">▸</span>Visual quality drops but provides competitive advantage</li>
        </ul>
      </div>
    </section>
  );
}

function GraphicSettingsSection() {
  const settings = [
    { label: "Frame Rate Limit", value: "Unlimited" },
    { label: "3D Resolution", value: "%100" },
    { label: "View Distance", value: "Low" },
    { label: "Shadows", value: "Off" },
    { label: "Anti-Aliasing", value: "Off" },
    { label: "Textures", value: "Medium" },
    { label: "Effects", value: "Low" },
    { label: "Post Processing", value: "Low" },
  ];
  return (
    <section>
      <SectionHeading icon={<Monitor className="w-5 h-5 text-[#00c8ff]" />} title="Competitive Graphics Settings" />
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mt-6">
        {settings.map((s) => (
          <div key={s.label} className="flex items-center justify-between rounded-lg border border-white/10 bg-[oklch(0.12_0.01_265)] px-4 py-3">
            <span className="text-gray-400 text-sm">{s.label}</span>
            <span className="text-[#00c8ff] font-bold text-sm font-[family-name:var(--font-orbitron)]">{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
      {icon}
      <h2 className="font-[family-name:var(--font-orbitron)] text-white text-xl font-bold tracking-wide">{title}</h2>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </li>
  );
}
