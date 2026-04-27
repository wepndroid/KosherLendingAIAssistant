import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Handshake,
  House,
  MessagesSquare,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const KPI_CARDS = [
  { label: "Applications In Pipeline", value: "42", delta: "+6 this week", icon: FileText, tone: "good" },
  { label: "Pre-Approvals Issued", value: "19", delta: "+4 today", icon: BadgeCheck, tone: "good" },
  { label: "Loans Funded (MTD)", value: "11", delta: "$6.8M funded", icon: House, tone: "good" },
  { label: "Rate Locks Expiring < 7d", value: "5", delta: "Needs action", icon: CalendarClock, tone: "warn" },
  { label: "Conditions Pending", value: "27", delta: "13 due today", icon: FileCheck2, tone: "warn" },
  { label: "Active Borrower Threads", value: "63", delta: "Median reply 8m", icon: MessagesSquare, tone: "good" },
] as const;

const PIPELINE = [
  { stage: "New Inquiry", count: 18, sla: "Under 15 min", owner: "Intake Team" },
  { stage: "Doc Collection", count: 14, sla: "24-48 hours", owner: "Processing" },
  { stage: "Underwriting", count: 9, sla: "2-4 business days", owner: "UW Desk" },
  { stage: "Clear To Close", count: 6, sla: "1-2 business days", owner: "Closing Team" },
  { stage: "Funded This Week", count: 4, sla: "Completed", owner: "Funding Desk" },
] as const;

const PRIORITY_TASKS = [
  "Follow up on 5 rate locks expiring this week.",
  "Review 3 files flagged for missing income docs.",
  "Confirm appraisal status for the Benson and Perez loans.",
  "Send Monday performance update to referral partners.",
  "Finalize compliance wording for first-time buyer campaign.",
] as const;

const COMPLIANCE_STATUS = [
  { label: "Disclosure Coverage", value: "100%", note: "All active files have required disclosures." },
  { label: "NMLS Signature Audit", value: "Passed", note: "No missing license identifiers in templates." },
  { label: "Fair Lending Spot Check", value: "In Review", note: "Monthly random sample closes April 30." },
] as const;

const RECENT_ACTIVITY = [
  { text: "Benson file moved to underwriting after full doc package received.", time: "8 minutes ago" },
  { text: "Two new refinance leads assigned to Intake Team queue.", time: "21 minutes ago" },
  { text: "Partner update sent to 14 real estate agents.", time: "43 minutes ago" },
  { text: "Rate watch alert triggered for 30-year conforming products.", time: "1 hour ago" },
] as const;

export function DashboardPage() {
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
                Mortgage Operations Command Center
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-white/70">
                Real-time visibility across pipeline health, borrower communications, funding momentum, and compliance status.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <button type="button" className="btn-cinematic px-4 py-2.5 text-[12px]">
                <FileText className="h-3.5 w-3.5" />
                New Intake
              </button>
              <button type="button" className="btn-cinematic-secondary px-4 py-2.5 text-[12px]">
                <CalendarClock className="h-3.5 w-3.5" />
                Rate Watch
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {KPI_CARDS.map((item) => (
          <article key={item.label} className="kl-card kl-card-interactive p-4">
            <div className="flex items-start justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-card">
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
              <p className="kl-eyebrow">Pipeline</p>
              <h3 className="mt-1 font-display text-[22px] font-medium">Loan Stage Distribution</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
              Live now <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            </span>
          </div>
          <div className="space-y-2">
            {PIPELINE.map((row) => (
              <div key={row.stage} className="grid grid-cols-[1.1fr_auto_auto] items-center gap-3 rounded border border-border px-3 py-3">
                <div>
                  <div className="text-[13px] font-medium text-foreground">{row.stage}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{row.owner}</div>
                </div>
                <div className="font-display text-[28px] leading-none tracking-tight text-foreground">{row.count}</div>
                <div className="text-right text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">{row.sla}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="kl-card kl-card-elevated p-6">
          <div className="mb-5 border-b border-border pb-4">
            <p className="kl-eyebrow">Today</p>
            <h3 className="mt-1 font-display text-[22px] font-medium">Priority Queue</h3>
          </div>
          <ul className="space-y-2.5">
            {PRIORITY_TASKS.map((task) => (
              <li key={task} className="flex items-start gap-2.5 rounded border border-border px-3 py-2.5 text-[13px] leading-relaxed">
                <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="kl-card kl-card-elevated p-6">
          <div className="mb-5 border-b border-border pb-4">
            <p className="kl-eyebrow">Governance</p>
            <h3 className="mt-1 font-display text-[22px] font-medium">Compliance Snapshot</h3>
          </div>
          <div className="space-y-3">
            {COMPLIANCE_STATUS.map((row) => (
              <div key={row.label} className="rounded border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-medium">{row.label}</span>
                  <span className="rounded border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-accent">
                    {row.value}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] text-muted-foreground">{row.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="kl-card kl-card-elevated p-6">
          <div className="mb-5 border-b border-border pb-4">
            <p className="kl-eyebrow">Team Feed</p>
            <h3 className="mt-1 font-display text-[22px] font-medium">Recent Activity</h3>
          </div>
          <ul className="space-y-3">
            {RECENT_ACTIVITY.map((item) => (
              <li key={item.text} className="flex items-start gap-3 rounded border border-border px-3 py-2.5">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[13px] leading-snug text-foreground">{item.text}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="kl-card flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-accent" /> 14 active referral partners
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Handshake className="h-3.5 w-3.5 text-accent" /> 3 broker-channel campaigns running
          </span>
        </div>
        <div className="rounded border border-border bg-background/55 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
          Updated: April 27, 2026 09:14 AM PT
        </div>
      </section>
    </div>
  );
}
