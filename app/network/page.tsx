import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wifi, Globe, Activity, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import LockedCmd from "@/components/LockedCmd";

const PAGE_SLUG = "network";

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)] font-[family-name:var(--font-rajdhani)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-16 space-y-14">
        {/* HERO */}
        <HeroSection />
        {/* DNS */}
        <DnsSection />
        {/* Ethernet vs Wi-Fi */}
        <ConnectionSection />
        {/* Ping */}
        <PingSection />
        {/* Packet Loss */}
        <PacketLossSection />
        {/* Troubleshooting */}
        <TroubleshootingSection />
      </main>
      <Footer />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="text-center py-10">
      <div className="inline-flex items-center gap-2 bg-[#06ffd415] border border-[#06ffd430] rounded-full px-4 py-1.5 mb-6">
        <Activity size={14} className="text-[#06ffd4]" />
        <span className="text-[#06ffd4] text-sm tracking-widest uppercase">Guide</span>
      </div>
      <h1 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-5xl font-black text-[#06ffd4] leading-tight mb-4">
        NETWORK OPTIMIZATION<br />GUIDE
      </h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto">
        Low ping, zero packet loss.
      </p>
    </section>
  );
}

/* ── DNS ──────────────────────────────────────────────────── */
function DnsSection() {
  const servers = [
    { name: "Cloudflare", primary: "1.1.1.1", secondary: "1.0.0.1", note: "Fastest" },
    { name: "Google", primary: "8.8.8.8", secondary: "8.8.4.4", note: "Reliable" },
    { name: "OpenDNS", primary: "208.67.222.222", secondary: "208.67.220.220", note: "Filtered" },
  ];
  return (
    <section>
      <SectionHeading icon={<Globe size={20} />} title="DNS Servers" />
      <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#06ffd415] space-y-5">
        <p className="text-gray-300 text-base leading-relaxed">
          DNS (Domain Name System) translates domain names to IP addresses. Default ISP DNS servers can be slow;
          choosing a faster DNS server lowers your overall latency.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#06ffd420]">
                <th className="text-left py-2 text-[#06ffd4] font-semibold">Provider</th>
                <th className="text-left py-2 text-[#06ffd4] font-semibold">Primary</th>
                <th className="text-left py-2 text-[#06ffd4] font-semibold">Secondary</th>
                <th className="text-left py-2 text-[#06ffd4] font-semibold">Feature</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((s) => (
                <tr key={s.name} className="border-b border-[#ffffff08] hover:bg-[#06ffd408] transition-colors">
                  <td className="py-3 text-white font-semibold">{s.name}</td>
                  <td className="py-3 text-gray-300 font-mono">{s.primary}</td>
                  <td className="py-3 text-gray-300 font-mono">{s.secondary}</td>
                  <td className="py-3"><span className="text-[#00c8ff] text-xs bg-[#00c8ff15] px-2 py-0.5 rounded-full">{s.note}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-3 bg-[#06ffd408] border border-[#06ffd420] rounded-lg p-4">
          <ArrowRight size={16} className="text-[#06ffd4] mt-0.5 shrink-0" />
          <p className="text-gray-300 text-sm">
            <span className="text-[#06ffd4] font-semibold">How to change?</span>{" "}
            Network Adapter Settings → IPv4 Properties → Use the following DNS server address → Enter manual DNS.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Ethernet vs Wi-Fi ────────────────────────────────────── */
function ConnectionSection() {
  return (
    <section>
      <SectionHeading icon={<Wifi size={20} />} title="Ethernet vs Wi-Fi" />
      <div className="grid md:grid-cols-2 gap-5">
        {/* Wi-Fi */}
        <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#ffffff10]">
          <div className="flex items-center gap-3 mb-4">
            <Wifi size={22} className="text-yellow-400" />
            <h3 className="font-[family-name:var(--font-orbitron)] text-white font-bold text-base">WI-FI</h3>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2"><AlertCircle size={14} className="text-red-400 shrink-0" /> High latency risk</li>
            <li className="flex items-center gap-2"><AlertCircle size={14} className="text-red-400 shrink-0" /> High packet loss risk</li>
            <li className="flex items-center gap-2"><AlertCircle size={14} className="text-yellow-400 shrink-0" /> Average ping: 20–80 ms</li>
            <li className="flex items-center gap-2"><AlertCircle size={14} className="text-yellow-400 shrink-0" /> Affected by other devices</li>
          </ul>
        </div>
        {/* Ethernet */}
        <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#06ffd430] relative">
          <span className="absolute top-3 right-3 bg-[#06ffd4] text-black text-xs font-black px-2.5 py-0.5 rounded-full font-[family-name:var(--font-orbitron)]">RECOMMENDED</span>
          <div className="flex items-center gap-3 mb-4">
            <Activity size={22} className="text-[#06ffd4]" />
            <h3 className="font-[family-name:var(--font-orbitron)] text-[#06ffd4] font-bold text-base">ETHERNET</h3>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#06ffd4] shrink-0" /> Low and stable latency</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#06ffd4] shrink-0" /> No packet loss</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#06ffd4] shrink-0" /> Average ping: 5–20 ms</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#06ffd4] shrink-0" /> Uninterrupted connection</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Ping Optimizasyonu ───────────────────────────────────── */
function PingSection() {
  const tips = [
    "Select the closest game server — set region manually.",
    "Close background applications: Steam downloads, Discord video, browser tabs.",
    "Use QoS (Quality of Service) on your router to prioritize game traffic.",
    "MTU value: 1500 recommended — lower values may cause fragmentation.",
  ];
  return (
    <section>
      <SectionHeading icon={<Activity size={20} />} title="Ping Optimization" />
      <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#06ffd415] space-y-3">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="font-[family-name:var(--font-orbitron)] text-[#06ffd4] font-black text-lg leading-none w-6 shrink-0">{i + 1}</span>
            <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Paket Kaybı ──────────────────────────────────────────── */
function PacketLossSection() {
  return (
    <section>
      <SectionHeading icon={<AlertCircle size={20} />} title="Packet Loss Detection" />
      <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#06ffd415] space-y-5">
        <p className="text-gray-300 text-sm leading-relaxed">
          Packet loss shows up as stuttering, teleportation, and disconnects during gameplay.
          Above 1% causes serious performance issues. Test with the commands below:
        </p>
        <div>
          <p className="text-[#00c8ff] text-xs font-semibold mb-1 uppercase tracking-widest">Continuous ping test</p>
          <LockedCmd cmd="ping google.com -t" pageSlug={PAGE_SLUG} accentColor="#06ffd4" />
        </div>
        <div>
          <p className="text-[#00c8ff] text-xs font-semibold mb-1 uppercase tracking-widest">Route analysis (packet loss per hop)</p>
          <LockedCmd cmd="pathping google.com" pageSlug={PAGE_SLUG} accentColor="#06ffd4" />
        </div>
        <p className="text-gray-400 text-xs">
          You should see <span className="text-yellow-400">Lost = 0/100</span> in results. If loss exists, check cable/router first, then your ISP.
        </p>
      </div>
    </section>
  );
}

/* ── Troubleshooting ──────────────────────────────────────── */
function TroubleshootingSection() {
  const steps = [
    { label: "Reset network stack", cmd: "netsh int ip reset resetlog.txt" },
    { label: "Reset Winsock", cmd: "netsh winsock reset catalog" },
    { label: "Flush DNS cache", cmd: "ipconfig /flushdns" },
    { label: "Release IP address", cmd: "ipconfig /release" },
    { label: "Renew IP address", cmd: "ipconfig /renew" },
    { label: "Reset TCP/IP", cmd: "netsh int tcp reset" },
    { label: "Set DNS to Cloudflare (Ethernet)", cmd: `netsh interface ip set dns "Ethernet" static 1.1.1.1 primary && netsh interface ip add dns "Ethernet" 1.0.0.1 index=2` },
    { label: "Run all commands at once", cmd: "netsh int ip reset && netsh winsock reset && ipconfig /flushdns && ipconfig /release && ipconfig /renew" },
  ];
  return (
    <section className="pb-4">
      <SectionHeading icon={<CheckCircle size={20} />} title="Network Troubleshooting" />
      <div className="bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#06ffd415] space-y-4">
        <p className="text-gray-300 text-sm">
          Run Command Prompt as <span className="text-[#06ffd4] font-semibold">Administrator</span>, then apply in order:
        </p>
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-orbitron)] text-[#00c8ff] font-black text-sm w-5 shrink-0">{i + 1}</span>
            <div className="flex-1">
              <p className="text-gray-400 text-xs mb-1">{s.label}</p>
              <LockedCmd cmd={s.cmd} pageSlug={PAGE_SLUG} accentColor="#00c8ff" />
            </div>
          </div>
        ))}
        <p className="text-gray-500 text-xs pt-1">
          Restart your computer after applying all steps.
        </p>
      </div>
    </section>
  );
}

/* ── Shared heading ───────────────────────────────────────── */
function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[#06ffd4]">{icon}</span>
      <h2 className="font-[family-name:var(--font-orbitron)] text-white font-bold text-lg md:text-xl tracking-wide">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[#06ffd430] to-transparent" />
    </div>
  );
}
