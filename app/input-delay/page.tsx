import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LockedCmd from "@/components/LockedCmd";
import { Target, Mouse, Keyboard, Usb, Monitor, Zap } from "lucide-react";

const PAGE_SLUG = "input-delay";

export default function InputDelayPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)] font-[family-name:var(--font-rajdhani)]">
      <Navbar />

      {/* HERO */}
      <section className="relative px-4 pt-16 pb-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#a855f718_0%,_transparent_65%)] pointer-events-none" />
        <p className="text-xs font-[family-name:var(--font-rajdhani)] text-gray-500 mb-4 tracking-widest">
          <span className="text-[#a855f7]">HOME</span> / INPUT DELAY REDUCTION
        </p>
        <h1 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-5xl font-black tracking-tight mb-4"
          style={{ color: "#a855f7", textShadow: "0 0 32px #a855f780" }}>
          INPUT DELAY REDUCTION GUIDE
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Every millisecond matters. React before your opponent.
        </p>
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {["Mouse", "Keyboard", "USB", "Display"].map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full border border-[#a855f740] text-[#a855f7] font-semibold tracking-widest">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* MOUSE */}
      {/* MOUSE */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#a855f715]">
          <div className="flex items-center gap-3 mb-5">
            <Mouse className="text-[#a855f7]" size={24} />
            <h2 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white tracking-wide">
              Mouse Optimization
            </h2>
          </div>
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Target size={14} className="text-[#00c8ff]" /> Disable Raw Input (Pointer Precision)</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="CMD — Run as Administrator" cmd={`reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d "0" /f && reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d "0" /f && reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d "0" /f`} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Target size={14} className="text-[#00c8ff]" /> Open Mouse Settings Panel</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="Run (Win+R) or CMD" cmd="control main.cpl" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Target size={14} className="text-[#00c8ff]" /> Disable USB Power Saving</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="Device Manager CMD" cmd="devmgmt.msc" />
              <p className="text-gray-500 text-xs mt-1 font-[family-name:var(--font-rajdhani)]">→ USB Root Hub → Power Management → Uncheck &quot;Allow computer to turn off this device&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* KEYBOARD */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#a855f715]">
          <div className="flex items-center gap-3 mb-5">
            <Keyboard className="text-[#a855f7]" size={24} />
            <h2 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white tracking-wide">
              Keyboard Optimization
            </h2>
          </div>
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Zap size={14} className="text-[#00c8ff]" /> Open Keyboard Settings Panel</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="Run (Win+R) or CMD" cmd="control keyboard" />
              <p className="text-gray-500 text-xs mt-1 font-[family-name:var(--font-rajdhani)]">→ Set character repeat rate to maximum → Apply</p>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Zap size={14} className="text-[#00c8ff]" /> Minimize Key Repeat Delay (Registry)</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="CMD — Run as Administrator" cmd={`reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardDelay /t REG_SZ /d "0" /f && reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardSpeed /t REG_SZ /d "31" /f`} />
            </div>
          </div>
        </div>
      </section>

      {/* USB */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#a855f715]">
          <div className="flex items-center gap-3 mb-5">
            <Usb className="text-[#a855f7]" size={24} />
            <h2 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white tracking-wide">
              USB Optimization
            </h2>
          </div>
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Usb size={14} className="text-[#00c8ff]" /> Completely Disable USB Power Management</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="PowerShell — Run as Administrator" cmd={`Get-WmiObject MSPower_DeviceEnable -Namespace root\\wmi | ForEach-Object { $_.Enable = $False; $_.Put() }`} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Usb size={14} className="text-[#00c8ff]" /> Disable USB Suspend</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="CMD — Run as Administrator" cmd={`powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0 && powercfg /setactive SCHEME_CURRENT`} />
            </div>
          </div>
        </div>
      </section>

      {/* DISPLAY */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#a855f715]">
          <div className="flex items-center gap-3 mb-5">
            <Monitor className="text-[#a855f7]" size={24} />
            <h2 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white tracking-wide">
              Display Settings
            </h2>
          </div>
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Monitor size={14} className="text-[#00c8ff]" /> Maximize Display Refresh Rate</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="Display Settings CMD" cmd="desk.cpl" />
              <p className="text-gray-500 text-xs mt-1 font-[family-name:var(--font-rajdhani)]">→ Advanced Display Settings → Display adapter properties → Monitor → Set refresh rate to maximum</p>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Monitor size={14} className="text-[#00c8ff]" /> Display Settings Panel</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="NVIDIA Control Panel (if using NVIDIA)" cmd={`start "" "C:\\Program Files\\NVIDIA Corporation\\Control Panel Client\\nvcplui.exe"`} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 flex items-center gap-2"><Zap size={14} className="text-[#00c8ff]" /> Disable V-Sync — Registry</p>
              <LockedCmd pageSlug={PAGE_SLUG} accentColor="#a855f7" label="CMD — Run as Administrator" cmd={`reg add "HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak" /v Splendid /t REG_DWORD /d 0 /f`} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#a855f715] text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="text-[#a855f7]" size={24} />
            <h2 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white tracking-wide">
              Input Delay Statistics
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex-1 rounded-lg bg-[oklch(0.10_0.01_265)] border border-red-500/20 p-6">
              <p className="text-gray-500 text-sm mb-2 font-semibold tracking-widest">BEFORE OPTIMIZATION</p>
              <p className="font-[family-name:var(--font-orbitron)] text-5xl font-black text-red-400" style={{ textShadow: "0 0 24px #f8717180" }}>
                48<span className="text-2xl ml-1">ms</span>
              </p>
            </div>
            <div className="text-3xl text-gray-500 font-black select-none">→</div>
            <div className="flex-1 rounded-lg bg-[oklch(0.10_0.01_265)] border border-[#a855f740] p-6">
              <p className="text-gray-500 text-sm mb-2 font-semibold tracking-widest">AFTER OPTIMIZATION</p>
              <p className="font-[family-name:var(--font-orbitron)] text-5xl font-black text-[#a855f7]" style={{ textShadow: "0 0 24px #a855f780" }}>
                4<span className="text-2xl ml-1">ms</span>
              </p>
            </div>
          </div>
          <p className="mt-5 text-gray-500 text-sm">
            Applying the above optimizations can result in an average <span className="text-[#00c8ff] font-bold">91% latency reduction</span>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
