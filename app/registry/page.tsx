import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, AlertTriangle, Info, CheckCircle, FileText } from "lucide-react";
import LockedCmd from "@/components/LockedCmd";

const PAGE_SLUG = "registry";


export default function RegistryPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.08 0.01 265)" }}
    >
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 space-y-8">
        {/* Hero */}
        <HeroSection />
        {/* Big Warning */}
        <BigWarning />
        {/* Backup Instructions */}
        <BackupSection />
        {/* Tweaks */}
        <TweaksSection />
        {/* Footer Note */}
        <FooterNote />
      </main>
      <Footer />
    </div>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <div className="text-center space-y-4 pt-4">
      <div className="flex items-center justify-center gap-3">
        <Shield className="text-[#f59e0b]" size={36} />
        <h1
          className="text-4xl md:text-5xl font-bold tracking-widest text-white"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          REGISTRY TWEAKS
        </h1>
      </div>
      <span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b15]"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        <AlertTriangle size={14} />
        SAFE &amp; REVERSIBLE TWEAKS ONLY
      </span>
    </div>
  );
}

/* ── Big Warning ── */
function BigWarning() {
  return (
    <div className="rounded-xl border-2 border-[#f59e0b] bg-[#f59e0b18] p-5 flex gap-4">
      <AlertTriangle className="text-[#f59e0b] shrink-0 mt-0.5" size={28} />
      <p
        className="text-[#fcd34d] text-base leading-relaxed"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        <span className="font-bold text-[#f59e0b]">IMPORTANT WARNING: </span>
        Always back up before applying registry changes. Incorrect changes can
        damage your system. Do not apply if unsure.
      </p>
    </div>
  );
}

/* ── Backup Section ── */
function BackupSection() {
  const steps = [
    { cmd: "Win+R", desc: 'Type "regedit" in the Run box and press Enter' },
    { cmd: "File > Export", desc: "Select File > Export from the top menu" },
    { cmd: '"All" seç', desc: "Select All as export range and save the file" },
    { cmd: "File > Import", desc: "Use File > Import to restore" },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="text-[#f59e0b]" size={22} />
        <h2
          className="text-xl font-bold text-white tracking-wider"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          BACKUP INSTRUCTIONS
        </h2>
      </div>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#f59e0b] text-black text-sm font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div style={{ fontFamily: "var(--font-rajdhani)" }}>
              <span className="font-bold text-[#f59e0b]">{s.cmd}</span>
              <span className="text-gray-300 ml-2">— {s.desc}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Tweaks Section ── */
function TweaksSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Info className="text-[#f59e0b]" size={22} />
        <h2
          className="text-xl font-bold text-white tracking-wider"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          SAFE REGISTRY TWEAKS
        </h2>
      </div>
      <TweakCard
        title="Disable Mouse Precision"
        path="HKEY_CURRENT_USER\Control Panel\Mouse"
        values={[
          { key: "MouseSpeed", val: "0" },
          { key: "MouseThreshold1", val: "0" },
          { key: "MouseThreshold2", val: "0" },
        ]}
        desc="Disables Enhanced Pointer Precision. Provides consistent mouse movement in FPS games."
        cmd={`reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d "0" /f
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d "0" /f
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d "0" /f`}
      />
      <TweakCard
        title="Menu Display Speed"
        path="HKEY_CURRENT_USER\Control Panel\Desktop"
        values={[{ key: "MenuShowDelay", val: "0" }]}
        desc="Resets menu opening delay. Reduces perceived latency in system menus."
        cmd={`reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d "0" /f`}
      />
      <TweakCard
        title="Disable Prefetch — SSD Only"
        path="HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management\PrefetchParameters"
        values={[{ key: "EnablePrefetcher", val: "0" }]}
        desc="On SSD systems, prefetcher wastes disk/RAM unnecessarily. Apply only if using an SSD."
        cmd={`reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters" /v EnablePrefetcher /t REG_DWORD /d 0 /f`}
      />
      <TweakCard
        title="Disable Network Throttling"
        path="HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile"
        values={[{ key: "NetworkThrottlingIndex", val: "FFFFFFFF (hex)" }]}
        desc="Removes Windows network throttling. Lower ping values may be achieved in online games."
        cmd={`reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f`}
      />
    </div>
  );
}

/* ── Tweak Card ── */
function TweakCard({
  title,
  path,
  values,
  desc,
  cmd,
}: {
  title: string;
  path: string;
  values: { key: string; val: string }[];
  desc: string;
  cmd: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
          {title}
        </h3>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b15]" style={{ fontFamily: "var(--font-rajdhani)" }}>
          <AlertTriangle size={11} />
          APPLY AFTER BACKUP
        </span>
      </div>

      {/* Registry yolu */}
      <div>
        <p className="text-[#00c8ff] text-xs font-semibold mb-1 uppercase tracking-widest" style={{ fontFamily: "var(--font-orbitron)" }}>Registry Path</p>
        <div className="bg-black/60 rounded p-3 font-mono text-xs text-[#00c8ff] border border-[#00c8ff20] break-all">
          {path}
        </div>
      </div>

      {/* Değerler */}
      <div className="space-y-1">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2 font-[family-name:var(--font-rajdhani)] text-sm">
            <span className="text-white font-semibold">{v.key}</span>
            <span className="text-gray-500">=</span>
            <span className="text-[#f59e0b] font-bold">{v.val}</span>
          </div>
        ))}
      </div>

      <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "var(--font-rajdhani)" }}>{desc}</p>

      <LockedCmd label="⚡ CMD — Copy Paste (Administrator)" cmd={cmd} pageSlug={PAGE_SLUG} accentColor="#f59e0b" />
    </div>
  );
}

/* ── Footer Note ── */
function FooterNote() {
  return (
    <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-5 flex gap-4">
      <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={24} />
      <p
        className="text-green-300 text-base leading-relaxed"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        <span className="font-bold text-green-400">NOTE: </span>
        These tweaks are safe but every system is different. If issues occur,
        restore your registry backup.
      </p>
    </div>
  );
}
