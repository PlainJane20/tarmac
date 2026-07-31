"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ArrowUpRight, CheckCircle2, ChevronRight, CircleDollarSign, Clock3, ShieldCheck, Users } from "lucide-react";
import { calculateSri, lifecycleStages } from "@/lib/lifecycle";

const programs = [
  { name: "Digital Claims Modernization", sponsor: "L. Ortiz", stage: 7, health: "At risk", cpi: 0.92, spi: 0.88, approvals: 2, launch: "Oct 18" },
  { name: "Enterprise API Gateway", sponsor: "S. Patel", stage: 5, health: "On track", cpi: 1.04, spi: 1.01, approvals: 0, launch: "Nov 06" },
  { name: "Identity Cloud Migration", sponsor: "J. Wong", stage: 8, health: "Watch", cpi: 0.98, spi: 0.94, approvals: 1, launch: "Sep 29" }
];

const labels: Record<string, string> = {
  INTAKE: "Intake", DISCOVERY: "Discovery", BRD_REVIEW: "BRD", PRD_REVIEW: "PRD", ARCHITECTURE_REVIEW: "Architecture", PLANNING: "Plan", EXECUTION: "Execute", UAT: "UAT", LAUNCH_READY: "Launch ready", LAUNCH: "Launch", HYPERCARE: "Hypercare", CLOSED: "Close"
};

function HealthBadge({ health }: { health: string }) {
  const classes = health === "On track" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : health === "At risk" ? "bg-rose-50 text-rose-700 ring-rose-200" : "bg-amber-50 text-amber-700 ring-amber-200";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${classes}`}>{health}</span>;
}

export function CommandCenter() {
  const [selected, setSelected] = useState(0);
  const [impact, setImpact] = useState(4);
  const [effort, setEffort] = useState(3);
  const sri = useMemo(() => calculateSri({ businessImpact: impact, blastRadius: 4, strategicRoi: 5, engineeringEffort: effort, confidence: 85 }), [impact, effort]);
  const program = programs[selected];

  return <main className="min-h-screen bg-[#f6f8fb]">
    <header className="border-b border-slate-200 bg-white px-6 py-4 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-slate-900 text-sm font-black text-white">P</div><div><h1 className="text-lg font-bold tracking-tight text-slate-900">IT-PMO Engine</h1><p className="text-xs text-slate-500">Enterprise delivery lifecycle command center</p></div></div>
        <div className="flex items-center gap-3"><span className="hidden text-sm text-slate-500 sm:inline">Portfolio period · Q3 FY26</span><button className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white shadow-sm">New intake</button></div>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-indigo-600">Portfolio overview</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Make delivery decisions with confidence.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">Govern investment, unblock dependencies, and enforce every release control from a single operating view.</p></div>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={<CircleDollarSign />} title="Forecast at completion" value="$8.42m" hint="2.1% under baseline" tone="indigo" />
        <Metric icon={<ShieldCheck />} title="Release controls" value="91%" hint="31 of 34 gates passed" tone="emerald" />
        <Metric icon={<AlertTriangle />} title="Delivery risks" value="7" hint="2 require escalation" tone="rose" />
        <Metric icon={<Users />} title="Capacity utilized" value="78%" hint="12 teams in plan" tone="amber" />
      </section>
      <section className="mt-7 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h3 className="font-bold text-slate-900">Active programs</h3><p className="mt-0.5 text-sm text-slate-500">Ranked by delivery attention</p></div><button className="text-sm font-semibold text-indigo-600">View portfolio <ChevronRight className="inline size-4" /></button></div>
          <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Program</th><th className="px-4 py-3 font-semibold">Health</th><th className="px-4 py-3 font-semibold">EVM</th><th className="px-5 py-3 font-semibold">Launch</th></tr></thead><tbody>{programs.map((item, index) => <tr key={item.name} onClick={() => setSelected(index)} className={`cursor-pointer border-t border-slate-100 transition hover:bg-slate-50 ${selected === index ? "bg-indigo-50/50" : ""}`}><td className="px-5 py-4"><p className="font-semibold text-slate-800">{item.name}</p><p className="mt-0.5 text-xs text-slate-500">Sponsor · {item.sponsor} · {item.approvals ? `${item.approvals} approvals pending` : "No pending approvals"}</p></td><td className="px-4 py-4"><HealthBadge health={item.health} /></td><td className="px-4 py-4"><span className={item.cpi < 1 ? "text-rose-600" : "text-emerald-600"}>CPI {item.cpi}</span><br /><span className="text-slate-500">SPI {item.spi}</span></td><td className="px-5 py-4 font-medium text-slate-700">{item.launch}</td></tr>)}</tbody></table></div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h3 className="font-bold">Approval queue</h3><p className="mt-0.5 text-sm text-slate-500">Needs your attention</p></div><span className="grid size-8 place-items-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">3</span></div><div className="mt-5 space-y-3"><Approval title="TDD architecture gate" owner="Enterprise Architecture" due="Due today" critical /><Approval title="CAB release authorization" owner="Change Advisory Board" due="Due Aug 02" /><Approval title="BRD business sign-off" owner="Commercial Operations" due="Due Aug 05" /></div><button className="mt-5 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700">Open approval workbench</button></div>
      </section>
      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-semibold text-indigo-600">Selected program</p><h3 className="mt-1 text-xl font-bold">{program.name}</h3></div><HealthBadge health={program.health} /></div><div className="mt-6 overflow-x-auto"><div className="flex min-w-[760px] items-start">{lifecycleStages.map((stage, index) => <div key={stage} className="flex flex-1 items-start"><div className="flex min-w-[48px] flex-col items-center"><div className={`grid size-8 place-items-center rounded-full text-xs font-bold ${index < program.stage ? "bg-emerald-600 text-white" : index === program.stage ? "bg-indigo-600 text-white ring-4 ring-indigo-100" : "bg-slate-100 text-slate-500"}`}>{index < program.stage ? <CheckCircle2 className="size-4" /> : index + 1}</div><span className={`mt-2 whitespace-nowrap text-[10px] font-semibold ${index === program.stage ? "text-indigo-700" : "text-slate-500"}`}>{labels[stage]}</span></div>{index < lifecycleStages.length - 1 && <div className={`mt-3 h-0.5 flex-1 ${index < program.stage ? "bg-emerald-500" : "bg-slate-200"}`} />}</div>)}</div></div><div className="mt-7 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3"><Status title="Current control" value="Integration quality gate" icon={<Clock3 className="size-4" />} /><Status title="Launch blocker" value="1 SEV2 RCA awaiting approval" icon={<AlertTriangle className="size-4" />} warning /><Status title="Critical dependency" value="API Gateway contract v3" icon={<ArrowUpRight className="size-4" />} /></div></section>
      <section className="mt-7 grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-bold">Stack Rank simulator</h3><p className="mt-1 text-sm text-slate-500">Normalized for effort and 85% confidence.</p><div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-4"><label className="text-sm font-medium">Business impact <input aria-label="Business impact" type="range" min="1" max="5" value={impact} onChange={e => setImpact(+e.target.value)} className="mt-2 block w-full accent-indigo-600" /></label><b className="text-lg">{impact}/5</b><label className="text-sm font-medium">Engineering effort <input aria-label="Engineering effort" type="range" min="1" max="5" value={effort} onChange={e => setEffort(+e.target.value)} className="mt-2 block w-full accent-indigo-600" /></label><b className="text-lg">{effort}/5</b></div><div className="mt-5 rounded-xl bg-indigo-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-indigo-600">Stack Rank Index</p><p className="mt-1 text-3xl font-bold text-indigo-950">{sri}</p></div></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-bold">Dependency watchlist</h3><p className="mt-1 text-sm text-slate-500">Critical-path constraints across tracks.</p><div className="mt-5 space-y-3"><Dependency source="API Gateway" target="Claims Platform" status="At risk" /><Dependency source="Identity Cloud" target="Partner Portal" status="Due Aug 08" /><Dependency source="Data Lakehouse" target="Benefits Analytics" status="On track" /></div></div></section>
    </div>
  </main>;
}

function Metric({ icon, title, value, hint, tone }: { icon: React.ReactNode; title: string; value: string; hint: string; tone: string }) { const tones: Record<string, string> = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", rose: "bg-rose-50 text-rose-600", amber: "bg-amber-50 text-amber-600" }; return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`grid size-9 place-items-center rounded-lg ${tones[tone]}`}>{icon}</div><p className="mt-4 text-sm font-medium text-slate-500">{title}</p><p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{hint}</p></div>; }
function Approval({ title, owner, due, critical }: { title: string; owner: string; due: string; critical?: boolean }) { return <div className="rounded-xl border border-slate-100 p-3.5"><div className="flex justify-between gap-2"><p className="text-sm font-semibold text-slate-800">{title}</p>{critical && <AlertTriangle className="size-4 shrink-0 text-rose-500" />}</div><p className="mt-1 text-xs text-slate-500">{owner} · <span className={critical ? "font-semibold text-rose-600" : ""}>{due}</span></p></div>; }
function Status({ title, value, icon, warning }: { title: string; value: string; icon: React.ReactNode; warning?: boolean }) { return <div className="flex gap-3"><span className={warning ? "mt-0.5 text-rose-600" : "mt-0.5 text-slate-500"}>{icon}</span><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p><p className={`mt-1 text-sm font-semibold ${warning ? "text-rose-700" : "text-slate-800"}`}>{value}</p></div></div>; }
function Dependency({ source, target, status }: { source: string; target: string; status: string }) { return <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5"><div><p className="text-sm font-semibold text-slate-800">{source} <ArrowUpRight className="inline size-3 text-slate-400" /> {target}</p><p className="mt-0.5 text-xs text-slate-500">Cross-track delivery dependency</p></div><span className={`text-xs font-semibold ${status === "At risk" ? "text-rose-600" : status === "On track" ? "text-emerald-600" : "text-amber-600"}`}>{status}</span></div>; }
