import { useEffect, useState } from "react";
import { CheckCircle2, RefreshCw, Edit3, CalendarPlus, Download, Archive, X, Quote } from "lucide-react";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";
import api from "@/lib/api";

interface ReviewItem {
  id: string;
  topic: string;
  pillar: string;
  platform: string;
  duration: string;
  word_count: number;
  status: string;
  hook: string;
  script: string;
  on_screen: string;
  production_brief: string;
  caption: string;
  caption_instagram?: string;
  caption_tiktok?: string;
  cta: string;
  dm_keyword: string;
  deliverable: string;
  source_book: string;
  source_framework: string;
  source_reason: string;
  duplicate_risk: "Low" | "Medium" | "High";
}

const FILTERS = ["All", "Draft", "Needs Review", "Approved", "Exported"];

export function ReviewPage() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [selected, setSelected] = useState<ReviewItem | null>(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.content.list({ status: filter === "All" ? undefined : filter, limit: 100 });
      setItems(res.items as ReviewItem[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const update = async (id: string, status: string) => {
    await api.content.patch(id, { status });
    if (selected?.id === id) setSelected({ ...selected, status });
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
        <div className="flex items-center gap-3">
          <div>
            <div className="kl-eyebrow">Queue</div>
            <p className="text-[13px] text-foreground mt-0.5">
              <span className="font-display text-[18px] font-medium tracking-tight">{items.length}</span>{" "}
              <span className="text-muted-foreground">packages awaiting review</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`kl-chip ${filter === f ? "kl-chip-active" : ""}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="kl-empty">
          <div className="kl-eyebrow text-accent mb-2">Loading</div>
          <div className="font-display text-[17px] font-medium tracking-tight">Fetching content…</div>
        </div>
      ) : items.length === 0 ? (
        <div className="kl-empty">
          <div className="kl-eyebrow text-accent mb-2">Empty Queue</div>
          <div className="font-display text-[17px] font-medium tracking-tight text-foreground">
            No packages match this filter
          </div>
          <p className="text-[13px] mt-1.5">Generate new content from the Generator page.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((c) => (
            <div key={c.id} onClick={() => setSelected(c)} className="kl-card kl-card-interactive p-5 group">
              <div className="flex items-start justify-between gap-2 mb-3">
                <StatusBadge label={c.status} variant={statusToVariant(c.status as any)} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{c.duration}</span>
              </div>
              <h3 className="font-display text-[15.5px] font-medium leading-snug line-clamp-2 tracking-tight">{c.topic}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="kl-tag">{(c.pillar || "").split(" ")[0]}</span>
                <span className="kl-tag">{c.platform}</span>
                {c.dm_keyword && <span className="kl-tag kl-tag-mono kl-tag-accent">#{c.dm_keyword}</span>}
              </div>
              <div className="mt-4 rounded-md bg-secondary/40 border-l-2 border-accent/50 p-3 text-[12px] text-foreground/70 line-clamp-2 italic font-display leading-relaxed">
                "{c.hook}"
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="font-mono text-muted-foreground tracking-wider">
                  {c.word_count} WORDS · {(c.source_book || "").split(":")[0].toUpperCase()}
                </span>
                <span className="text-accent font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Review <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <ReviewModal content={selected} onClose={() => setSelected(null)} onAction={update} />}
    </div>
  );
}

function ReviewModal({
  content: c,
  onClose,
  onAction,
}: {
  content: ReviewItem;
  onClose: () => void;
  onAction: (id: string, status: string) => Promise<void>;
}) {
  return (
    <div className="kl-modal-backdrop" onClick={onClose}>
      <div className="kl-modal-shell w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge label={c.status} variant={statusToVariant(c.status as any)} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {c.platform} · {c.duration}
              </span>
            </div>
            <div className="kl-eyebrow text-accent">Generated Package</div>
            <h3 className="font-display text-[22px] font-medium tracking-tight mt-1 leading-tight">{c.topic}</h3>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors shrink-0 ml-4">
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Section label="Hook">
            <p className="text-[18px] font-display font-normal leading-snug italic text-foreground/90">"{c.hook}"</p>
          </Section>

          <div className="kl-card p-4 border-l-2 border-l-accent/60">
            <div className="flex items-center gap-2 mb-2">
              <Quote className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
              <div className="kl-eyebrow text-accent">Source Citation</div>
            </div>
            <div className="text-[13.5px]">
              <span className="font-medium">{c.source_book}</span>
              <span className="text-muted-foreground"> · Framework: </span>
              <span className="font-medium">{c.source_framework}</span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{c.source_reason}</p>
          </div>

          <Section label={`Script · ${c.word_count} words`}>
            <p className="whitespace-pre-line leading-relaxed text-[13.5px] text-foreground/85">{c.script}</p>
          </Section>

          <div className="grid sm:grid-cols-2 gap-3">
            <Block label="On-screen text">{c.on_screen}</Block>
            <Block label="Production brief">{c.production_brief}</Block>
            <Block label="Caption">{c.caption_instagram || c.caption}</Block>
            <Block label={`DM keyword → ${c.deliverable}`}>
              <span className="font-mono font-semibold text-accent text-[15px] tracking-wider">{c.dm_keyword}</span>
            </Block>
          </div>

          <div>
            <div className="kl-eyebrow mb-2.5">Validation</div>
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge label="Script length valid" variant="approved" />
              <StatusBadge label="DM keyword mapped" variant="approved" />
              <StatusBadge label="Source citation included" variant="approved" />
              <StatusBadge label="Compliance footer included" variant="approved" />
              <StatusBadge
                label={`Duplicate risk: ${c.duplicate_risk}`}
                variant={c.duplicate_risk === "Low" ? "low-risk" : c.duplicate_risk === "Medium" ? "medium-risk" : "high-risk"}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-secondary/30 p-4 flex flex-wrap gap-2">
          <Btn icon={CheckCircle2} primary onClick={() => onAction(c.id, "Approved")}>Approve</Btn>
          <Btn icon={RefreshCw} onClick={() => onAction(c.id, "Needs Review")}>Request rewrite</Btn>
          <Btn icon={Edit3}>Edit manually</Btn>
          <Btn icon={CalendarPlus}>Send to calendar</Btn>
          <Btn icon={Download} onClick={async () => {
            const r = await api.export.create({ name: c.topic, format: "word", content_ids: [c.id] });
            if (r?.export?.download_url) {
              const a = document.createElement("a");
              a.href = r.export.download_url;
              a.download = `${(c.topic || "package").replace(/[^a-z0-9]/gi, "_")}.docx`;
              a.click();
            }
          }}>Export</Btn>
          <Btn icon={Archive} onClick={() => onAction(c.id, "Exported")}>Archive</Btn>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="kl-eyebrow mb-2">{label}</div>
      <div className="text-[13.5px]">{children}</div>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-transparent p-3.5">
      <div className="kl-eyebrow text-[9.5px] mb-1.5">{label}</div>
      <div className="text-[13px] text-foreground/85 leading-relaxed">{children}</div>
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
