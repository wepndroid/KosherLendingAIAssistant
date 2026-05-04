import { useEffect, useState } from "react";
import { KeyRound, Plus, Edit3, ExternalLink, CheckCircle2, Download, ArrowRight, X, AlertTriangle } from "lucide-react";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";
import api from "@/lib/api";

const FLOW = ["Video CTA", "User DMs keyword", "GHL sends deliverable", "Follow-up sequence", "Qualified lead"];

interface ApiKeyword {
  keyword: string;
  category: string;
  pillars: string[];
  intent: string;
  cta_template: string;
  deliverable_id: string | null;
  ghl_status: string;
  usage_count: number;
  last_used: string | null;
  status: string;
  summary: string;
}

export function KeywordsPage() {
  const [items, setItems] = useState<ApiKeyword[]>([]);
  const [selected, setSelected] = useState<ApiKeyword | null>(null);

  const load = () =>
    api.keywords.list().then((r) => setItems(r.items as ApiKeyword[])).catch(() => setItems([]));

  useEffect(() => { load(); }, []);

  const exportMap = async () => {
    const r = await api.export.create({ name: "GHL Keyword Map", format: "ghl_map" });
    if (r?.export?.download_url) {
      const a = document.createElement("a");
      a.href = r.export.download_url;
      a.download = "ghl_keyword_map.json";
      a.click();
    }
  };

  const markReady = async (kw: string) => {
    await api.keywords.patch(kw, { keyword: kw, ghl_status: "Ready" });
    await load();
    if (selected?.keyword === kw) setSelected({ ...selected, ghl_status: "Ready" });
  };

  return (
    <div className="space-y-6">
      <div className="kl-card p-5">
        <div className="kl-eyebrow text-accent mb-1">Automation</div>
        <h3 className="font-display text-[16px] font-medium tracking-tight mb-4">Keyword automation flow</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {FLOW.map((f, i) => (
            <div key={f} className="flex items-center gap-2 shrink-0">
              <div className={`flex items-center gap-2 rounded-md border px-3 py-2 text-[12px] font-medium ${
                i === 0 ? "bg-accent/10 text-accent border-accent/30" : "bg-secondary/40 text-foreground/80 border-border"
              }`}>
                <div className="flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-medium">{i + 1}</div>
                {f}
              </div>
              {i < FLOW.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.75} />}
            </div>
          ))}
        </div>
      </div>

      <div className="kl-banner-warn">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 kl-status-warn" strokeWidth={1.75} />
        <div className="leading-relaxed">
          <strong className="font-medium">Keyword system reconciliation:</strong>
          <span className="text-foreground/70"> 13 active GHL keywords from the calendar; 77 total deliverables in the source DOCX (48 are state-specific). Run <code>seed_keywords</code> to populate the active set.</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] text-muted-foreground">
          <span className="font-display text-[26px] font-medium text-foreground tracking-tight">{items.length}</span>
          <span className="ml-2">keywords mapped to deliverables</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn icon={Plus} primary>Add keyword</Btn>
          <Btn icon={Download} onClick={exportMap}>Export keyword map</Btn>
        </div>
      </div>

      <div className="kl-table-wrap">
        <div className="overflow-x-auto">
          <table className="kl-table">
            <thead>
              <tr>
                <th className="sortable">Keyword</th>
                <th>Category</th>
                <th>Deliverable</th>
                <th>Pillars</th>
                <th>Intent</th>
                <th>GHL</th>
                <th className="text-right sortable">Usage</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((k) => (
                <tr key={k.keyword} onClick={() => setSelected(k)} className="row-interactive">
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background shrink-0">
                        <KeyRound className="h-3 w-3 text-accent" strokeWidth={1.75} />
                      </div>
                      <span className="font-mono font-semibold text-[12.5px] tracking-wider">{k.keyword}</span>
                    </div>
                  </td>
                  <td className="text-[12px]">{k.category}</td>
                  <td>
                    <div className="font-medium text-[13px]">{k.summary?.split(" — ")[0] || "—"}</div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {(k.pillars || []).map((p) => (
                        <span key={p} className="kl-tag !text-[9.5px]">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td><StatusBadge label={k.intent} variant={statusToVariant(k.intent as any)} /></td>
                  <td><StatusBadge label={k.ghl_status} variant={statusToVariant(k.ghl_status as any)} /></td>
                  <td className="num">{k.usage_count}</td>
                  <td className="text-right">
                    <ExternalLink className="h-3.5 w-3.5 inline text-muted-foreground" strokeWidth={1.75} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[6px] animate-in fade-in" />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "panel-slide-in 320ms cubic-bezier(0.2,0.8,0.2,1) both" }}
          >
            <div className="sticky top-0 z-10 surface-glass border-b border-border p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md surface-charcoal border border-sidebar-border">
                  <KeyRound className="h-4 w-4 text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="kl-eyebrow text-accent">Keyword</div>
                  <div className="font-mono text-[19px] font-semibold tracking-wider mt-0.5">{selected.keyword}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{selected.category}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors">
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <div className="kl-eyebrow mb-1.5">Deliverable</div>
                <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">{selected.summary}</p>
              </div>

              <div>
                <div className="kl-eyebrow mb-2">Recommended CTA</div>
                <div className="rounded-md border border-border bg-transparent border-l-2 border-l-accent/60 p-3 text-[13px] italic font-display text-foreground/80">
                  "{selected.cta_template}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-md border border-border bg-transparent p-3">
                  <div className="kl-eyebrow text-[9.5px] mb-1.5">Intent</div>
                  <StatusBadge label={selected.intent} variant={statusToVariant(selected.intent as any)} />
                </div>
                <div className="rounded-md border border-border bg-transparent p-3">
                  <div className="kl-eyebrow text-[9.5px] mb-1.5">GHL Status</div>
                  <StatusBadge label={selected.ghl_status} variant={statusToVariant(selected.ghl_status as any)} />
                </div>
                <div className="rounded-md border border-border bg-transparent p-3">
                  <div className="kl-eyebrow text-[9.5px]">Times used</div>
                  <div className="font-display text-[20px] font-medium mt-1 leading-none tracking-tight">{selected.usage_count}</div>
                </div>
                <div className="rounded-md border border-border bg-transparent p-3">
                  <div className="kl-eyebrow text-[9.5px]">Last used</div>
                  <div className="font-medium text-[12.5px] mt-1.5">{(selected.last_used || "—").slice(0, 10)}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                <Btn icon={Edit3}>Edit mapping</Btn>
                <Btn icon={ExternalLink}>View deliverable</Btn>
                <Btn icon={CheckCircle2} primary onClick={() => markReady(selected.keyword)}>Mark GHL ready</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Btn({
  children,
  icon: Icon,
  primary,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  primary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={primary ? "btn-cinematic" : "btn-cinematic-secondary"}>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {children}
    </button>
  );
}
