"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calculator, RefreshCw, Activity, CheckSquare, Square } from "lucide-react";

const cardClass = "bg-gradient-to-br from-[oklch(0.14_0.02_265)] to-[oklch(0.10_0.015_280)] rounded-xl p-6 border border-[#8b5cf615]";
const inputClass = "bg-[oklch(0.12_0.015_265)] border border-[#8b5cf630] rounded px-3 py-2 text-white font-[family-name:var(--font-rajdhani)] focus:outline-none focus:border-[#8b5cf6] w-full";
const btnClass = "px-4 py-2 rounded bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] text-white font-[family-name:var(--font-orbitron)] text-sm font-bold hover:opacity-90 transition-all";

// --- Tool 1: FPS Hesaplayıcı ---
function FPSCalculator() {
  const [current, setCurrent] = useState(60);
  const [target, setTarget] = useState(240);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const pct = ((target - current) / current) * 100;
    setResult(pct);
  };

  const getMessage = (pct: number) => {
    if (pct > 100) return "Excellent target! A powerful PC may be needed.";
    if (pct >= 50) return "Achievable target. Optimization will suffice.";
    return "Easily achievable! Basic optimizations are enough.";
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="text-[#8b5cf6]" size={20} />
        <h2 className="text-lg font-bold text-white font-[family-name:var(--font-orbitron)]">FPS Calculator</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[#8b5cf6] text-sm font-[family-name:var(--font-rajdhani)] mb-1 block">Current FPS</label>
          <input type="number" className={inputClass} value={current} onChange={e => setCurrent(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-[#8b5cf6] text-sm font-[family-name:var(--font-rajdhani)] mb-1 block">Target FPS</label>
          <input type="number" className={inputClass} value={target} onChange={e => setTarget(Number(e.target.value))} />
        </div>
      </div>
      <button className={btnClass} onClick={calculate}>Calculate</button>
      {result !== null && (
        <div className="mt-4 p-3 rounded-lg bg-[oklch(0.12_0.015_265)] border border-[#8b5cf630]">
          <p className="text-[#a855f7] text-xl font-bold font-[family-name:var(--font-orbitron)]">+{result.toFixed(1)}% Improvement</p>
          <p className="text-gray-300 text-sm font-[family-name:var(--font-rajdhani)] mt-1">{getMessage(result)}</p>
        </div>
      )}
    </div>
  );
}

// --- Tool 2: Sensitivite Converter ---
function SensConverter() {
  const [dpi, setDpi] = useState(400);
  const [sens, setSens] = useState(8.0);
  const edpi = dpi * sens / 100;

  const getLabel = () => {
    if (edpi < 30) return { text: "Too Low", color: "text-red-400" };
    if (edpi <= 50) return { text: "Competitive Range", color: "text-green-400" };
    if (edpi <= 80) return { text: "Medium-High", color: "text-yellow-400" };
    return { text: "Too High", color: "text-orange-400" };
  };
  const label = getLabel();

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="text-[#8b5cf6]" size={20} />
        <h2 className="text-lg font-bold text-white font-[family-name:var(--font-orbitron)]">Sensitivity Converter (eDPI)</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[#8b5cf6] text-sm font-[family-name:var(--font-rajdhani)] mb-1 block">DPI</label>
          <input type="number" className={inputClass} value={dpi} onChange={e => setDpi(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-[#8b5cf6] text-sm font-[family-name:var(--font-rajdhani)] mb-1 block">Sens%</label>
          <input type="number" step="0.1" className={inputClass} value={sens} onChange={e => setSens(Number(e.target.value))} />
        </div>
      </div>
      <div className="p-3 rounded-lg bg-[oklch(0.12_0.015_265)] border border-[#8b5cf630]">
        <p className="text-gray-400 text-sm font-[family-name:var(--font-rajdhani)]">Calculated eDPI</p>
        <p className="text-white text-2xl font-bold font-[family-name:var(--font-orbitron)]">{edpi.toFixed(1)}</p>
        <span className={`text-sm font-bold font-[family-name:var(--font-rajdhani)] ${label.color}`}>{label.text}</span>
      </div>
    </div>
  );
}

// --- Tool 3: PC Performans Checklist ---
const CHECKLIST = [
  "Power plan set to \"High Performance\"",
  "Xbox Game Bar disabled",
  "Visual effects set to \"Best performance\"",
  "Unnecessary startup apps disabled",
  "GPU drivers updated",
  "DirectX and Visual C++ updated",
  "Windows updated",
  "Fortnite Performance Mode active",
  "Shadows and Anti-Aliasing disabled",
  "Mouse Raw Input active",
  "DNS set to Cloudflare (1.1.1.1)",
  "Ethernet cable in use",
];

function PCChecklist() {
  const [checked, setChecked] = useState<boolean[]>(Array(12).fill(false));
  const count = checked.filter(Boolean).length;
  const statusColor = count === 12 ? "text-green-400" : count > 0 ? "text-yellow-400" : "text-red-400";

  const toggle = (i: number) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="text-[#8b5cf6]" size={20} />
        <h2 className="text-lg font-bold text-white font-[family-name:var(--font-orbitron)]">PC Performance Checklist</h2>
      </div>
      <ul className="space-y-2 mb-4">
        {CHECKLIST.map((item, i) => (
          <li key={i} className="flex items-center gap-2 cursor-pointer group" onClick={() => toggle(i)}>
            {checked[i]
              ? <CheckSquare size={16} className="text-[#8b5cf6] shrink-0" />
              : <Square size={16} className="text-gray-500 shrink-0" />}
            <span className={`text-sm font-[family-name:var(--font-rajdhani)] transition-colors ${checked[i] ? "text-white line-through text-gray-400" : "text-gray-300 group-hover:text-white"}`}>{item}</span>
          </li>
        ))}
      </ul>
      <p className={`text-sm font-bold font-[family-name:var(--font-rajdhani)] ${statusColor}`}>{count} / 12 completed</p>
    </div>
  );
}

// --- Tool 4: Ping Test UI ---
const PING_RESULTS = [
  { host: "google.com", ms: 14, color: "bg-green-500" },
  { host: "epicgames.com", ms: 22, color: "bg-green-500" },
  { host: "fortnite servers", ms: 18, color: "bg-green-500" },
];

function PingTest() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const runTest = () => {
    setState("loading");
    setTimeout(() => setState("done"), 2000);
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-[#8b5cf6]" size={20} />
        <h2 className="text-lg font-bold text-white font-[family-name:var(--font-orbitron)]">Ping Test UI</h2>
      </div>
      <p className="text-gray-400 text-sm font-[family-name:var(--font-rajdhani)] mb-4">This is a UI mockup. It does not perform real network tests; results are illustrative.</p>
      <button className={btnClass} onClick={runTest} disabled={state === "loading"}>
        {state === "loading" ? (
          <span className="flex items-center gap-2"><RefreshCw size={14} className="animate-spin" /> Running Test...</span>
        ) : "Run Test"}
      </button>
      {state === "done" && (
        <ul className="mt-4 space-y-2">
          {PING_RESULTS.map(r => (
            <li key={r.host} className="flex items-center justify-between p-2 rounded-lg bg-[oklch(0.12_0.015_265)] border border-[#8b5cf620]">
              <span className="text-gray-300 text-sm font-[family-name:var(--font-rajdhani)]">{r.host}</span>
              <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${r.color}`}>{r.ms}ms</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- Main Page ---
export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_265)] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-orbitron)] mb-2">Tools</h1>
          <p className="text-gray-400 font-[family-name:var(--font-rajdhani)]">Interactive tools to optimize your gaming performance</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FPSCalculator />
          <SensConverter />
          <PCChecklist />
          <PingTest />
        </div>
      </main>
      <Footer />
    </div>
  );
}
