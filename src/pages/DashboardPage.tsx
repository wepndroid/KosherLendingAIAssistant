import { Link } from "@tanstack/react-router";
import {
  FileText, Database, Sparkles, KeyRound, ClipboardCheck, Download,
  Calendar, ArrowUpRight, CheckCircle2, Clock, Upload, TrendingUp,
} from "lucide-react";
import { RECENT_ACTIVITY } from "@/lib/mock-data";

const STATS = [
  { label: "Source Documents", value: "47", delta: "+6 this week", icon: FileText, trend: "up" },
  { label: "Knowledge Chunks", value: "12,408", delta: "+1,240 indexed", icon: Database, trend: "up" },
  { label: "Generated Posts", value: "318", delta: "+24 today", icon: Sparkles, trend: "up" },
  { label: "Active DM Keywords", value: "16", delta: "12 ready · 4 pending", icon: KeyRound, trend: "neutral" },
  { label: "Pending Review", value: "9", delta: "Approval required", icon: ClipboardCheck, trend: "warn" },
  { label: "Exported Packages", value: "42", delta: "+3 this week", icon: Download, trend: "up" },
];

const READINESS = [
  { label: "Knowledge Library", pct: 85 },
  { label: "DM Keyword Mapping", pct: 70 },
  { label: "Content Rules", pct: 95 },
  { label: "Generation Engine", pct: 100 },
  { label: "Export Workflow", pct: 90 },
  { label: "Calendar Workflow", pct: 80 },
];

const ACTIONS = [
  { label: "Upload more source books", to: "/knowledge", icon: Upload },
  { label: "Review DM keyword conflicts", to: "/keywords", icon: KeyRound },
  { label: "Generate first test post", to: "/generator", icon: Sparkles },
  { label: "Approve pending content", to: "/review", icon: ClipboardCheck },
  { label: "Export sample package", to: "/export", icon: Download },
];

const PIPELINE = [
  { label: "Ideas Generated", value: 18 },
  { label: "Drafts in Review", value: 9 },
  { label: "Approved", value: 12 },
  { label: "Scheduled", value: 24 },
];

const CORE_METRICS = [
  { value: "12", label: "Posts / day target", unit: "DAILY" },
  { value: "77", label: "DM deliverables", unit: "TOTAL" },
  { value: "7", label: "Content pillars", unit: "ACTIVE" },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero — cinematic command panel */}
      <div className="relative overflow-hidden rounded-lg surface-charcoal text-white shadow-elevated texture-grain">
        <div className="absolute inset-0 bg-grid-fine opacity-40" />
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle, oklch(0.62 0.085 65 / 0.5), transparent 60%)",
            filter: "blur(50px)",
          }}
        />

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 p-8 lg:p-10">
          <div>
            <div className="text-eyebrow text-accent/90 mb-3">Welcome back, Jeffrey</div>
            <h2 className="font-display text-[32px] lg:text-[40px] font-light leading-[1.1] tracking-[-0.02em] max-w-2xl">
              Your content engine is <em className="text-accent not-italic font-normal">operational</em>.
            </h2>
            <p className="text-white/55 mt-4 max-w-xl text-[14px] leading-relaxed font-light">
              9 packages awaiting approval. 24 scheduled across the week.
              BUYDOWN keyword performance is up 18% over the last 7 days.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/generator"
                className="group inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-5 py-2.5 text-[13px] font-medium hover:opacity-90 transition-all border border-accent shadow-glow"
              >
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} /> Generate content
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </Link>
              <Link
                to="/review"
                className="inline-flex items-center gap-2 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2.5 text-[13px] font-medium transition-all backdrop-blur"
              >
                <ClipboardCheck className="h-3.5 w-3.5" strokeWidth={1.75} /> Review queue
              </Link>
            </div>
          </div>

          {/* Core metrics column */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8 grid grid-cols-3 lg:grid-cols-1 gap-5 lg:min-w-[200px]">
            {CORE_METRICS.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-[10px] text-accent/80 tracking-[0.15em]">{m.unit}</div>
                <div className="font-display text-[36px] font-light leading-none mt-1 tracking-tight">{m.value}</div>
                <div className="text-[11px] text-white/50 mt-1.5 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid — refined panels */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-display text-[20px] font-medium tracking-tight">System Telemetry</h3>
          <div className="text-eyebrow text-muted-foreground">Live · Last sync 2 min ago</div>
        </div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="surface-stone rounded-lg p-5 lift-on-hover relative overflow-hidden group"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background">
                  <s.icon className="h-3.5 w-3.5 text-foreground/70" strokeWidth={1.5} />
                </div>
                {s.trend === "up" && <TrendingUp className="h-3 w-3 text-success" strokeWidth={2} />}
                {s.trend === "warn" && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
              </div>
              <div className="mt-4 font-display text-[26px] font-medium leading-none tracking-tight">{s.value}</div>
              <div className="text-[11px] text-muted-foreground mt-2 leading-tight">{s.label}</div>
              <div className="text-[10px] font-mono text-accent mt-2.5 uppercase tracking-wider">{s.delta}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Readiness */}
        <div className="lg:col-span-2 surface-stone rounded-lg p-7">
          <div className="flex items-start justify-between mb-7 pb-5 border-b border-border">
            <div>
              <div className="text-eyebrow text-muted-foreground mb-1.5">Infrastructure</div>
              <h3 className="font-display text-[20px] font-medium tracking-tight">System Readiness</h3>
              <p className="text-[13px] text-muted-foreground mt-1">All modules required to operate the content OS</p>
            </div>
            <div className="text-right">
              <div className="font-display text-[36px] font-light text-foreground leading-none tracking-tight">87<span className="text-accent text-[20px] font-mono">%</span></div>
              <div className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">Overall ready</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {READINESS.map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between text-[13px] mb-2">
                  <span className="font-medium text-foreground">{r.label}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{r.pct}%</span>
                </div>
                <div className="h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-accent rounded-full transition-all duration-700"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="surface-stone rounded-lg p-7">
          <div className="mb-6 pb-4 border-b border-border">
            <div className="text-eyebrow text-muted-foreground mb-1.5">Audit Trail</div>
            <h3 className="font-display text-[20px] font-medium tracking-tight">Recent Activity</h3>
          </div>
          <ul className="space-y-4">
            {RECENT_ACTIVITY.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px]">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0 border border-accent/20">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-foreground leading-snug">{a.text}</div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-mono">
                    <Clock className="h-2.5 w-2.5" strokeWidth={1.75} /> {a.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's pipeline */}
        <div className="surface-stone rounded-lg p-7">
          <div className="flex items-start justify-between mb-6 pb-5 border-b border-border">
            <div>
              <div className="text-eyebrow text-muted-foreground mb-1.5">Today</div>
              <h3 className="font-display text-[20px] font-medium tracking-tight">Content Pipeline</h3>
              <p className="text-[13px] text-muted-foreground mt-1">Real-time flow from idea to scheduled post</p>
            </div>
            <Link to="/calendar" className="text-[12px] text-accent font-medium inline-flex items-center gap-1 hover:gap-1.5 transition-all">
              Open calendar <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PIPELINE.map((p, idx) => (
              <div key={p.label} className="rounded-md border border-border bg-background/40 p-4 relative overflow-hidden">
                <div className="font-mono text-[10px] text-accent tracking-wider">0{idx + 1}</div>
                <div className="font-display text-[28px] font-light mt-1 leading-none tracking-tight">{p.value}</div>
                <div className="text-[11px] text-muted-foreground mt-2 uppercase tracking-wider leading-tight">{p.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-md border border-border bg-background/60 p-3.5 text-[12px] text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
            <span>Daily target: <span className="text-foreground font-medium">12 unique videos</span> across 6 platforms</span>
          </div>
        </div>

        {/* Recommended actions */}
        <div className="surface-stone rounded-lg p-7">
          <div className="mb-6 pb-5 border-b border-border">
            <div className="text-eyebrow text-muted-foreground mb-1.5">Recommendations</div>
            <h3 className="font-display text-[20px] font-medium tracking-tight">Next Actions</h3>
          </div>
          <ul className="space-y-1.5">
            {ACTIONS.map((a, idx) => (
              <li key={a.label}>
                <Link
                  to={a.to}
                  className="group flex items-center gap-3 rounded-md border border-transparent p-3 hover:border-border hover:bg-background/60 transition-all"
                >
                  <span className="font-mono text-[10px] text-muted-foreground w-5">0{idx + 1}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background">
                    <a.icon className="h-3.5 w-3.5 text-foreground/70 group-hover:text-accent transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 text-[13px] font-medium text-foreground">{a.label}</div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-all" strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
