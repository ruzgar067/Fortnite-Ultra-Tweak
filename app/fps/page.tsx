import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LockedCmd from "@/components/LockedCmd";
import { Monitor, Cpu, Zap, Settings, TrendingUp, ChevronRight, AlertTriangle } from "lucide-react";

const PAGE_SLUG = "fps";

export default function FPSPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)] font-[family-name:var(--font-rajdhani)]">
      <Navbar />
      <HeroSection />
      <WindowsSection />
      <GPUSection />
      <FortniteSection />
      <ComparisonSection />
      <Footer />
    </div>
  );
}

const cardClass = "bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#00c8ff15]";

/* ── Windows ── */
function WindowsSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle icon={<Monitor className="w-6 h-6 text-[#00c8ff]" />} title="Windows Optimization" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Card 1 */}
          <div className={cardClass}>
            <h3 className="text-[#00c8ff] font-bold text-lg mb-1 font-[family-name:var(--font-orbitron)]">1. Power Plan — High Performance</h3>
            <p className="text-gray-400 text-xs mb-2 font-[family-name:var(--font-rajdhani)]">Open CMD as Administrator → copy paste → Enter</p>
            <LockedCmd label="Activate High Performance" cmd="powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c" pageSlug={PAGE_SLUG} />
            <LockedCmd label="Activate Ultimate Performance (run this first)" cmd="powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61" pageSlug={PAGE_SLUG} />
          </div>
          {/* Card 2 */}
          <div className={cardClass}>
            <h3 className="text-[#00c8ff] font-bold text-lg mb-1 font-[family-name:var(--font-orbitron)]">2. Disable Visual Effects</h3>
            <p className="text-gray-400 text-xs mb-2 font-[family-name:var(--font-rajdhani)]">Open CMD as Administrator → copy paste → Enter</p>
            <LockedCmd label="Disable all animations" cmd={`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v VisualFXSetting /t REG_DWORD /d 2 /f`} pageSlug={PAGE_SLUG} />
          </div>
          {/* Card 3 */}
          <div className={cardClass}>
            <h3 className="text-[#00c8ff] font-bold text-lg mb-1 font-[family-name:var(--font-orbitron)]">3. Disable Xbox Game Bar</h3>
            <p className="text-gray-400 text-xs mb-2 font-[family-name:var(--font-rajdhani)]">Open PowerShell as Administrator → copy paste → Enter</p>
            <LockedCmd label="Remove Game Bar" cmd="Get-AppxPackage Microsoft.XboxGamingOverlay | Remove-AppxPackage" pageSlug={PAGE_SLUG} />
            <LockedCmd label="Disable Game DVR (registry)" cmd={`reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f`} pageSlug={PAGE_SLUG} />
          </div>
          {/* Card 4 */}
          <div className={cardClass}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-[#00c8ff] font-bold text-lg font-[family-name:var(--font-orbitron)]">4. Clean Startup</h3>
            </div>
            <p className="text-gray-400 text-xs mb-2 font-[family-name:var(--font-rajdhani)]">Open CMD as Administrator → copy paste → Enter</p>
            <LockedCmd label="List startup applications" cmd="wmic startup get caption,command" pageSlug={PAGE_SLUG} />
            <LockedCmd label="Open Task Manager Startup tab" cmd="taskmgr /0 /startup" pageSlug={PAGE_SLUG} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span>Guides</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#00c8ff]">FPS Optimization</span>
        </nav>
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-[#00c8ff]" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-white font-[family-name:var(--font-orbitron)]">
            FPS OPTIMIZATION <span className="text-[#00c8ff]">GUIDE</span>
          </h1>
        </div>
        <p className="text-gray-300 text-lg max-w-2xl">
          Apply all optimization steps from Windows settings to GPU configuration to maximize your gaming performance.
        </p>
      </div>
    </section>
  );
}

/* ── GPU ── */
function GPUSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle icon={<Cpu className="w-6 h-6 text-[#a855f7]" />} title="GPU & System CMD Commands" />
        <p className="text-gray-400 text-xs mt-1 mb-6 font-[family-name:var(--font-rajdhani)]">Open CMD or PowerShell as Administrator → copy paste → Enter</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className={cardClass}>
            <h3 className="text-[#a855f7] font-bold text-base mb-1 font-[family-name:var(--font-orbitron)]">Clear GPU Driver Cache</h3>
            <LockedCmd cmd={`del /f /s /q "%SystemDrive%\\Users\\%username%\\AppData\\Local\\Temp\\*"`} pageSlug={PAGE_SLUG} accentColor="#a855f7" />
          </div>
          <div className={cardClass}>
            <h3 className="text-[#a855f7] font-bold text-base mb-1 font-[family-name:var(--font-orbitron)]">DirectX Diagnostic Tool</h3>
            <LockedCmd label="Open for DirectX diagnostics" cmd="dxdiag" pageSlug={PAGE_SLUG} accentColor="#a855f7" />
          </div>
          <div className={cardClass}>
            <h3 className="text-[#a855f7] font-bold text-base mb-1 font-[family-name:var(--font-orbitron)]">Hardware Accelerated GPU Scheduling</h3>
            <LockedCmd label="Enable HAGS (Windows 10 2004+)" cmd={`reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f`} pageSlug={PAGE_SLUG} accentColor="#a855f7" />
          </div>
          <div className={cardClass}>
            <h3 className="text-[#a855f7] font-bold text-base mb-1 font-[family-name:var(--font-orbitron)]">Enable Game Mode</h3>
            <LockedCmd label="Enable Game Mode" cmd={`reg add "HKCU\\Software\\Microsoft\\GameBar" /v AllowAutoGameMode /t REG_DWORD /d 1 /f`} pageSlug={PAGE_SLUG} accentColor="#a855f7" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Fortnite ── */
function FortniteSection() {
  const rows = [
    { setting: "Window Mode", value: "Fullscreen" },
    { setting: "Resolution", value: "1920×1080 (or 1440×1080 stretched)" },
    { setting: "Frame Rate Limit", value: "240 / Unlimited" },
    { setting: "3D Resolution", value: "100%" },
    { setting: "View Distance", value: "Low" },
    { setting: "Shadows", value: "Off" },
    { setting: "Anti-Aliasing", value: "Off" },
    { setting: "Textures", value: "Medium" },
  ];
  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle icon={<Settings className="w-6 h-6 text-[#00c8ff]" />} title="Fortnite Graphics Recommendations" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rows.map((r) => (
            <div key={r.setting} className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-lg px-5 py-3 border border-[#00c8ff15] flex justify-between items-center">
              <span className="text-gray-400 text-sm">{r.setting}</span>
              <span className="text-[#00c8ff] font-semibold text-sm">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Comparison ── */
function ComparisonSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle icon={<TrendingUp className="w-6 h-6 text-[#00c8ff]" />} title="Optimization Results" />
        <p className="text-gray-400 text-sm mt-1 mb-8">Real measured difference on the same hardware after all steps applied.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-8 border border-red-500/20 text-center">
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-[family-name:var(--font-orbitron)]">Before</p>
            <p className="text-6xl font-bold text-red-400 font-[family-name:var(--font-orbitron)]">67</p>
            <p className="text-gray-400 mt-1 text-sm">Average FPS</p>
          </div>
          <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-8 border border-[#00c8ff40] text-center">
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-[family-name:var(--font-orbitron)]">After</p>
            <p className="text-6xl font-bold text-[#00c8ff] font-[family-name:var(--font-orbitron)]">244</p>
            <p className="text-gray-400 mt-1 text-sm">Average FPS</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Shared ── */
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide font-[family-name:var(--font-orbitron)]">
        {title}
      </h2>
    </div>
  );
}
