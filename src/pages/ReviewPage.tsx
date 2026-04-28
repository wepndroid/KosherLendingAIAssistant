import { useState } from "react";
import { CheckCircle2, RefreshCw, Edit3, CalendarPlus, Download, Archive, X, Quote } from "lucide-react";
import { GENERATED_CONTENT, type GeneratedContent } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";

export function ReviewPage() {
  const [selected, setSelected] = useState<GeneratedContent | null>(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Draft", "Needs Review", "Approved", "Exported"];
  const filtered = GENERATED_CONTENT.filter((c) => filter === "All" || c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
        <div className="flex items-center gap-3">
          <div>
            <div className="kl-eyebrow">Queue</div>
            <p className="text-[13px] text-foreground mt-0.5">
              <span className="font-display text-[18px] font-medium tracking-tight">{filtered.length}</span>{" "}
              <span className="text-muted-foreground">packages awaiting review</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`kl-chip ${filter === f ? "kl-chip-active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="kl-empty">
          <div className="kl-eyebrow text-accent mb-2">Empty Queue</div>
          <div className="font-display text-[17px] font-medium tracking-tight text-foreground">
            No packages match this filter
          </div>
          <p className="text-[13px] mt-1.5">Try a different status or generate new content.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className="kl-card kl-card-interactive p-5 group"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <StatusBadge label={c.status} variant={statusToVariant(c.status)} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {c.duration}
                </span>
              </div>

              <h3 className="font-display text-[15.5px] font-medium leading-snug line-clamp-2 tracking-tight">
                {c.topic}
              </h3>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="kl-tag">{c.pillar.split(" ")[0]}</span>
                <span className="kl-tag">{c.platform}</span>
                <span className="kl-tag kl-tag-mono kl-tag-accent">#{c.dmKeyword}</span>
              </div>

              <div className="mt-4 rounded-md bg-secondary/40 border-l-2 border-accent/50 p-3 text-[12px] text-foreground/70 line-clamp-2 italic font-display leading-relaxed">
                "{c.hook}"
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="font-mono text-muted-foreground tracking-wider">
                  {c.wordCount} WORDS · {c.sourceBook.split(":")[0].toUpperCase()}
                </span>
                <span className="text-accent font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Review <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <ReviewModal content={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ReviewModal({ content: c, onClose }: { content: GeneratedContent; onClose: () => void }) {
  return (
    <div className="kl-modal-backdrop" onClick={onClose}>
      <div className="kl-modal-shell w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge label={c.status} variant={statusToVariant(c.status)} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {c.platform} · {c.duration}
              </span>
            </div>
            <div className="kl-eyebrow text-accent">Generated Package</div>
            <h3 className="font-display text-[22px] font-medium tracking-tight mt-1 leading-tight">
              {c.topic}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors shrink-0 ml-4"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Section label="Hook">
            <p className="text-[18px] font-display font-normal leading-snug italic text-foreground/90">
              "{c.hook}"
            </p>
          </Section>

          <div className="kl-card p-4 border-l-2 border-l-accent/60">
            <div className="flex items-center gap-2 mb-2">
              <Quote className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
              <div className="kl-eyebrow text-accent">Source Citation</div>
            </div>
            <div className="text-[13.5px]">
              <span className="font-medium">{c.sourceBook}</span>
              <span className="text-muted-foreground"> · Framework: </span>
              <span className="font-medium">{c.framework}</span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{c.sourceReason}</p>
          </div>

          <Section label={`Script · ${c.wordCount} words`}>
            <p className="whitespace-pre-line leading-relaxed text-[13.5px] text-foreground/85">{c.script}</p>
          </Section>

          <div className="grid sm:grid-cols-2 gap-3">
            <Block label="On-screen text">{c.onScreen}</Block>
            <Block label="Production brief">{c.productionBrief}</Block>
            <Block label="Caption">{c.caption}</Block>
            <Block label={`DM keyword → ${c.deliverable}`}>
              <span className="font-mono font-semibold text-accent text-[15px] tracking-wider">{c.dmKeyword}</span>
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
                label={`Duplicate risk: ${c.duplicateRisk}`}
                variant={c.duplicateRisk === "Low" ? "low-risk" : c.duplicateRisk === "Medium" ? "medium-risk" : "high-risk"}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-secondary/30 p-4 flex flex-wrap gap-2">
          <Btn icon={CheckCircle2} primary>Approve</Btn>
          <Btn icon={RefreshCw}>Request rewrite</Btn>
          <Btn icon={Edit3}>Edit manually</Btn>
          <Btn icon={CalendarPlus}>Send to calendar</Btn>
          <Btn icon={Download}>Export</Btn>
          <Btn icon={Archive}>Archive</Btn>
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

function Btn({ children, icon: Icon, primary }: { children: React.ReactNode; icon: React.ElementType; primary?: boolean }) {
  return (
    <button
      type="button"
      className={primary ? "btn-cinematic" : "btn-cinematic-secondary"}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {children}
    </button>
  );
}

