import { BRAND, TEAM, INTEGRATIONS } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";
import {
  Building2, Users, Brain, FileText, Smartphone, Shield, Download as DownloadIcon, Plug,
} from "lucide-react";

const SECTIONS = [
  { id: "brand", label: "Brand Profile", icon: Building2 },
  { id: "team", label: "Team & Roles", icon: Users },
  { id: "ai", label: "AI Model Preferences", icon: Brain },
  { id: "script", label: "Script Length Rules", icon: FileText },
  { id: "platform", label: "Platform Rules", icon: Smartphone },
  { id: "compliance", label: "Compliance Rules", icon: Shield },
  { id: "export", label: "Export Preferences", icon: DownloadIcon },
  { id: "integrations", label: "Integrations", icon: Plug },
];

export function SettingsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      {/* Side nav */}
      <nav className="hidden lg:block space-y-0.5 sticky top-24 h-fit">
        <div className="kl-eyebrow px-3 pb-2.5">Configuration</div>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[12.5px] font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground border border-transparent hover:border-border transition-all"
          >
            <s.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {s.label}
          </a>
        ))}
      </nav>

      <div className="space-y-6">
        {/* Brand */}
        <Card id="brand" title="Brand Profile" icon={Building2} eyebrow="Identity">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Brand name" value={BRAND.name} />
            <Field label="Creator" value={BRAND.creator} />
            <Field label="Website" value={BRAND.website} />
            <Field label="NMLS" value={BRAND.nmls} />
            <Field label="Brand voice" value={BRAND.voice} full />
            <Field label="Compliance footer" value={BRAND.compliance} full />
          </div>
        </Card>

        {/* Team */}
        <Card id="team" title="Team & Roles" icon={Users} eyebrow="Access">
          <div className="kl-table-wrap !shadow-none">
            <table className="kl-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {TEAM.map((t) => (
                  <tr key={t.email}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded surface-charcoal text-white text-[10.5px] font-display font-medium border border-sidebar-border">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-[13px]">{t.name}</span>
                      </div>
                    </td>
                    <td className="muted">{t.email}</td>
                    <td><StatusBadge label={t.role} variant={t.role === "Admin" ? "approved" : "draft"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* AI */}
        <Card id="ai" title="AI Model Preferences" icon={Brain} eyebrow="Engine">
          <div className="grid sm:grid-cols-2 gap-2.5">
            {[
              ["Primary model", "Claude"],
              ["Secondary model", "Gemini"],
              ["Research layer", "Perplexity"],
              ["Embedding model", "Placeholder"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-md border border-border bg-background/50 p-4 flex items-center justify-between">
                <div>
                  <div className="kl-eyebrow text-[9.5px]">{l}</div>
                  <div className="font-display text-[15px] font-medium tracking-tight mt-1">{v}</div>
                </div>
                <StatusBadge label="Not Connected" variant="not-connected" />
              </div>
            ))}
          </div>
        </Card>

        {/* Script length */}
        <Card id="script" title="Script Length Rules" icon={FileText} eyebrow="Constraints">
          <div className="grid sm:grid-cols-3 gap-2.5">
            {[
              ["30 seconds", "70–85"],
              ["45 seconds", "95–115"],
              ["60 seconds", "120–140"],
            ].map(([d, w]) => (
              <div key={d} className="rounded-md border border-border bg-background/50 p-4">
                <div className="kl-eyebrow text-[9.5px]">{d}</div>
                <div className="font-display text-[20px] font-medium mt-1 leading-none tracking-tight">{w}</div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-1.5">words</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Platform */}
        <Card id="platform" title="Platform Rules" icon={Smartphone} eyebrow="Distribution">
          <div className="space-y-1.5 text-[13px]">
            {[
              ["TikTok", "Short caption, discovery-focused"],
              ["Instagram Reels", "Saves and DM leads"],
              ["YouTube Shorts", "Searchable titles and descriptions"],
              ["Facebook Reels", "Community / share oriented"],
              ["LinkedIn", "Professional authority, one post per day"],
              ["X/Twitter", "Short thought-leadership posts"],
            ].map(([p, r]) => (
              <div key={p} className="flex items-center justify-between rounded-md border border-border bg-background/50 px-4 py-2.5">
                <span className="font-medium">{p}</span>
                <span className="text-muted-foreground text-[12px]">{r}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance */}
        <Card id="compliance" title="Compliance Rules" icon={Shield} eyebrow="Mandate">
          <ul className="space-y-1.5 text-[13px]">
            {[
              "Always include NMLS #320841",
              "Always include Equal Housing Lender",
              "No guaranteed rates",
              "No guaranteed loan approvals",
              "Rate comparisons must include APR and date",
            ].map((r) => (
              <li key={r} className="flex items-center gap-2.5 rounded-md border border-border bg-background/50 px-4 py-2.5">
                <Shield className="h-3 w-3 text-accent shrink-0" strokeWidth={1.75} /> {r}
              </li>
            ))}
          </ul>
        </Card>

        {/* Export */}
        <Card id="export" title="Export Preferences" icon={DownloadIcon} eyebrow="Output">
          <div className="grid sm:grid-cols-2 gap-2.5 text-[13px]">
            {[
              ["Default format", "Word"],
              ["Compliance footer", "Yes"],
              ["Source references", "Yes"],
              ["Production brief", "Yes"],
              ["Captions", "Yes"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-md border border-border bg-background/50 px-4 py-2.5">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Integrations */}
        <Card id="integrations" title="Backend Integration Readiness" icon={Plug} eyebrow="Connections">
          <div className="grid sm:grid-cols-2 gap-2.5">
            {INTEGRATIONS.map((i) => (
              <div key={i.name} className="rounded-md border border-border bg-background/50 p-4 flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium text-[13.5px]">{i.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{i.category}</div>
                </div>
                <StatusBadge label={i.status} variant={statusToVariant(i.status)} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ id, title, icon: Icon, eyebrow, children }: { id: string; title: string; icon: React.ElementType; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="kl-card p-7 scroll-mt-24">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background">
          <Icon className="h-3.5 w-3.5 text-foreground/70" strokeWidth={1.5} />
        </div>
        <div>
          {eyebrow && <div className="kl-eyebrow text-accent">{eyebrow}</div>}
          <h3 className="font-display text-[18px] font-medium tracking-tight mt-0.5">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
        {label}
      </label>
      <input defaultValue={value} className="kl-input" />
    </div>
  );
}
