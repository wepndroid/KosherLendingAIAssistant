import { useEffect, useState } from "react";
import {
  AlertTriangle, ArrowUpRight, BadgeCheck, CheckCircle2,
  FileText, House, MessagesSquare, ShieldCheck, TrendingUp, Database, Sparkles, Send, KeyRound, Calendar,
} from "lucide-react";
import api from "@/lib/api";

type Stats = {
  knowledge: { total: number; indexed: number; processing: number; failed: number };
  content: { total: number; by_status: Record<string, number>; by_pillar: Record<string, number>; by_platform: Record<string, number> };
  keywords: { total: number; active: number; top: any[] };
  queue: Record<string, number>;
  activity: { id: string; text: string; created_at: string; icon: string }[];
};

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => {
    api.dashboard.get().then(setStats).catch(() => setStats(null));
  }, []);

  const k = stats?.knowledge ?? { total: 0, indexed: 0, processing: 0, failed: 0 };
  const c = stats?.content ?? { total: 0, by_status: {}, by_pillar: {}, by_platform: {} };
  const kw = stats?.keywords ?? { total: 0, active: 0, top: [] };
  const q = stats?.queue ?? {};

  const KPI_CARDS = [
    { label: "Books / docs indexed", value: String(k.indexed), delta: `${k.processing} processing · ${k.failed} failed`, icon: Database, tone: "good" },
    { label: "Content packages generated", value: String(c.total), delta: `${c.by_status["Approved"] || 0} approved`, icon: FileText, tone: "good" },
    { label: "DM keywords active", value: String(kw.active), delta: `${kw.total} total mapped`, icon: KeyRound, tone: "good" },
    { label: "Scheduled posts", value: String(c.by_status["Scheduled"] || 0), delta: `${q["Queued"] || 0} queued for GHL`, icon: Calendar, tone: "warn" },
    { label: "Drafts in review", value: String((c.by_status["Draft"] || 0) + (c.by_status["Needs Review"] || 0)), delta: "Awaiting approval", icon: Sparkles, tone: "warn" },
    { label: "Posts sent to GHL", value: String(q["Sent_to_GHL"] || q["Posted"] || 0), delta: "Live posting", icon: Send, tone: "good" },
  ];

  return (
    <div className="space-y-7">
      <section className="surface-charcoal relative overflow-hidden rounded-lg p-7 text-white shadow-elevated">
        <div className="absolute inset-0 bg-grid-fine opacity-30" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
            <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1 font-mono tracking-[0.1em]">NMLS #320841</span>
            <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1 font-mono tracking-[0.1em]">Equal Housing Lender</span>
            <span className="inline-flex items-center gap-1.5 rounded border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 font-mono tracking-[0.1em] text-emerald-200">
              <ShieldCheck className="h-3 w-3" /> Compliance Monitor Active
            </span>
          </div>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-[31px] font-medium leading-tight tracking-tight">
                AI Content OS — Operations Overview
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-white/70">
                Knowledge-base growth, content pipeline, DM keyword automation and posting queue — at a glance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <a href="/generator" className="btn-cinematic px-4 py-2.5 text-[12px]">
                <Sparkles className="h-3.5 w-3.5" /> Generate
              </a>
              <a href="/knowledge" className="btn-cinematic-secondary px-4 py-2.5 text-[12px]">
                <Database className="h-3.5 w-3.5" /> Knowledge
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {KPI_CARDS.map((item) => (
          <article key={item.label} className="kl-card kl-card-interactive p-4">
            <div className="flex items-start justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded">
                <item.icon className="h-4 w-4 text-foreground/70" strokeWidth={1.75} />
              </div>
              {item.tone === "good" ? (
                <TrendingUp className="h-3.5 w-3.5 text-success" strokeWidth={2} />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-warning" strokeWidth={2} />
              )}
            </div>
            <div className="mt-3 font-display text-[28px] leading-none tracking-tight">{item.value}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{item.label}</div>
            <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.1em] text-accent">{item.delta}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="kl-card kl-card-elevated p-6">
          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="kl-eyebrow">Distribution</p>
              <h3 className="mt-1 font-display text-[22px] font-medium">Content by Pillar</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
              Live <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            </span>
          </div>
          <div className="space-y-2">
            {Object.entries(c.by_pillar).length === 0 ? (
              <div className="text-[13px] text-muted-foreground">No content generated yet.</div>
            ) : (
              Object.entries(c.by_pillar).sort((a, b) => b[1] - a[1]).map(([pillar, count]) => (
                <div key={pillar} className="grid grid-cols-[1.1fr_auto_auto] items-center gap-3 rounded border border-border px-3 py-3">
                  <div>
                    <div className="text-[13px] font-medium">{pillar}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">Pillar</div>
                  </div>
                  <div className="font-display text-[28px] leading-none tracking-tight">{count}</div>
                  <div className="text-right text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">posts</div>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="kl-card kl-card-elevated p-6">
          <div className="mb-5 border-b border-border pb-4">
            <p className="kl-eyebrow">Top keywords</p>
            <h3 className="mt-1 font-display text-[22px] font-medium">DM triggers</h3>
          </div>
          <ul className="space-y-2.5">
            {kw.top.length === 0 ? (
              <li className="text-[13px] text-muted-foreground">No keywords seeded.</li>
            ) : kw.top.map((k: any) => (
              <li key={k.keyword} className="flex items-start gap-2.5 rounded px-3 py-2.5 text-[13px] leading-relaxed">
                <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-mono font-semibold tracking-wider">{k.keyword}</span>
                  <span className="text-muted-foreground text-[12px]">×{k.usage_count}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="kl-card kl-card-elevated p-6">
          <div className="mb-5 border-b border-border pb-4">
            <p className="kl-eyebrow">Status</p>
            <h3 className="mt-1 font-display text-[22px] font-medium">Content states</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(c.by_status).length === 0 ? (
              <div className="text-[13px] text-muted-foreground">No content yet.</div>
            ) : Object.entries(c.by_status).map(([label, count]) => (
              <div key={label} className="rounded border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-medium">{label}</span>
                  <span className="rounded border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-accent">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="kl-card kl-card-elevated p-6">
          <div className="mb-5 border-b border-border pb-4">
            <p className="kl-eyebrow">Activity</p>
            <h3 className="mt-1 font-display text-[22px] font-medium">Recent events</h3>
          </div>
          <ul className="space-y-3">
            {(stats?.activity || []).length === 0 ? (
              <li className="text-[13px] text-muted-foreground">No activity yet — generate content or upload a document.</li>
            ) : (stats?.activity || []).map((item) => (
              <li key={item.id} className="flex items-start gap-3 rounded border border-border px-3 py-2.5">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[13px] leading-snug text-foreground">{item.text}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{(item.created_at || "").slice(0, 19).replace("T", " ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="kl-card flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-accent" /> KosherLending — NMLS #320841
          </span>
          <span className="inline-flex items-center gap-1.5">
            <House className="h-3.5 w-3.5 text-accent" /> Equal Housing Lender
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessagesSquare className="h-3.5 w-3.5 text-accent" /> Posting via GoHighLevel
          </span>
        </div>
      </section>
    </div>
  );
}
