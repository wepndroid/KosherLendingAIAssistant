import { useEffect, useState } from "react";
import { BRAND, TEAM } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";
import {
  Building2, Users, Brain, FileText, Smartphone, Shield, Download as DownloadIcon, Plug, Save, Loader2,
} from "lucide-react";
import api from "@/lib/api";

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

interface BrandData {
  brand_name: string;
  creator_name: string;
  website: string;
  nmls: string;
  voice_description: string;
  compliance_footer: string;
}

export function SettingsPage() {
  const [brand, setBrand] = useState<BrandData>({
    brand_name: BRAND.name,
    creator_name: BRAND.creator,
    website: BRAND.website,
    nmls: BRAND.nmls.replace("#", ""),
    voice_description: BRAND.voice,
    compliance_footer: BRAND.compliance,
  });
  const [saving, setSaving] = useState(false);
  const [integrations, setIntegrations] = useState<any[]>([]);

  useEffect(() => {
    api.brand.get().then((b) => setBrand((cur) => ({ ...cur, ...b }))).catch(() => {});
    api.integrations.list().then((r) => setIntegrations(r.items)).catch(() => setIntegrations([]));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.brand.patch(brand);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
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
        <Card id="brand" title="Brand Profile" icon={Building2} eyebrow="Identity">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Brand name" value={brand.brand_name} onChange={(v) => setBrand({ ...brand, brand_name: v })} />
            <Field label="Creator" value={brand.creator_name} onChange={(v) => setBrand({ ...brand, creator_name: v })} />
            <Field label="Website" value={brand.website} onChange={(v) => setBrand({ ...brand, website: v })} />
            <Field label="NMLS" value={brand.nmls} onChange={(v) => setBrand({ ...brand, nmls: v })} />
            <Field label="Brand voice" value={brand.voice_description} onChange={(v) => setBrand({ ...brand, voice_description: v })} full />
            <Field label="Compliance footer" value={brand.compliance_footer} onChange={(v) => setBrand({ ...brand, compliance_footer: v })} full />
          </div>
          <button onClick={save} disabled={saving} className="btn-cinematic mt-4">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" strokeWidth={1.75} />}
            {saving ? "Saving…" : "Save brand profile"}
          </button>
        </Card>

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

        <Card id="ai" title="AI Model Preferences" icon={Brain} eyebrow="Engine">
          <div className="grid sm:grid-cols-2 gap-2.5">
            {[
              ["Primary model", "Claude Sonnet 4.6"],
              ["Embedding model", "text-embedding-3-small"],
              ["Research layer", "Perplexity Sonar Pro"],
              ["Cross-analysis", "Claude (cached system prompt)"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-md border border-border bg-transparent p-4 flex items-center justify-between">
                <div>
                  <div className="kl-eyebrow text-[9.5px]">{l}</div>
                  <div className="font-display text-[15px] font-medium tracking-tight mt-1">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card id="script" title="Script Length Rules" icon={FileText} eyebrow="Constraints">
          <div className="grid sm:grid-cols-3 gap-2.5">
            {[
              ["30 seconds", "65–85"],
              ["45 seconds", "95–115"],
              ["60 seconds", "120–150"],
            ].map(([d, w]) => (
              <div key={d} className="rounded-md border border-border bg-transparent p-4">
                <div className="kl-eyebrow text-[9.5px]">{d}</div>
                <div className="font-display text-[20px] font-medium mt-1 leading-none tracking-tight">{w}</div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-1.5">words</div>
              </div>
            ))}
          </div>
        </Card>

        <Card id="platform" title="Platform Rules" icon={Smartphone} eyebrow="Distribution">
          <div className="space-y-1.5 text-[13px]">
            {[
              ["TikTok", "5–6 posts/day, discovery hook"],
              ["Instagram Reels", "4–5 posts/day, saves & DM leads"],
              ["YouTube Shorts", "3–4 posts/day, searchable titles"],
              ["Facebook Reels", "2–3 posts/day, community share"],
              ["LinkedIn", "1 post/day, professional authority"],
              ["X/Twitter", "2–3 posts/day, short take"],
            ].map(([p, r]) => (
              <div key={p} className="flex items-center justify-between rounded-md border border-border bg-transparent px-4 py-2.5">
                <span className="font-medium">{p}</span>
                <span className="text-muted-foreground text-[12px]">{r}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card id="compliance" title="Compliance Rules" icon={Shield} eyebrow="Mandate">
          <ul className="space-y-1.5 text-[13px]">
            {[
              "Always include NMLS #320841",
              "Always include Equal Housing Lender",
              "No guaranteed rates",
              "No guaranteed loan approvals",
              "No reference to New York (excluded state)",
              "Cite source author + book on every post",
            ].map((r) => (
              <li key={r} className="flex items-center gap-2.5 rounded-md border border-border bg-transparent px-4 py-2.5">
                <Shield className="h-3 w-3 text-accent shrink-0" strokeWidth={1.75} /> {r}
              </li>
            ))}
          </ul>
        </Card>

        <Card id="export" title="Export Preferences" icon={DownloadIcon} eyebrow="Output">
          <div className="grid sm:grid-cols-2 gap-2.5 text-[13px]">
            {[
              ["Default format", "Word (.docx)"],
              ["Compliance footer", "Yes — appended to Instagram caption"],
              ["Source references", "Yes — book + framework"],
              ["Production brief", "Yes — included per post"],
              ["5 platform captions", "Yes"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-md border border-border bg-transparent px-4 py-2.5">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card id="integrations" title="Backend Integration Readiness" icon={Plug} eyebrow="Connections">
          <div className="grid sm:grid-cols-2 gap-2.5">
            {integrations.map((i) => (
              <div key={i.name} className="rounded-md border border-border bg-transparent p-4 flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium text-[13.5px]">{i.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{i.category}</div>
                </div>
                <StatusBadge label={i.status} variant={statusToVariant(i.status)} />
              </div>
            ))}
            {integrations.length === 0 && (
              <div className="text-[13px] text-muted-foreground sm:col-span-2 p-4">Backend not reachable. Start the FastAPI server to populate this.</div>
            )}
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

function Field({ label, value, onChange, full }: { label: string; value: string; onChange?: (v: string) => void; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
        {label}
      </label>
      <input value={value} onChange={(e) => onChange?.(e.target.value)} className="kl-input" />
    </div>
  );
}
