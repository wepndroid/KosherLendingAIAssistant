import { useState } from "react";
import { UploadCloud, FileText, Eye, RefreshCw, Trash2, Filter, X, Database, Tag } from "lucide-react";
import { KNOWLEDGE_DOCS, type KnowledgeDoc } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";

const FILTERS = ["All", "Books", "Strategy Docs", "Content Calendars", "DM Deliverables", "Transcripts", "Indexed", "Failed"];

export function KnowledgePage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<KnowledgeDoc | null>(null);

  const filtered = KNOWLEDGE_DOCS.filter((d) => {
    if (filter === "All") return true;
    if (filter === "Books") return d.category === "Book";
    if (filter === "Strategy Docs") return d.category === "Strategy Doc";
    if (filter === "Content Calendars") return d.category === "Content Calendar";
    if (filter === "DM Deliverables") return d.category === "DM Deliverable";
    if (filter === "Transcripts") return d.category === "Transcript";
    if (filter === "Indexed") return d.status === "Indexed";
    if (filter === "Failed") return d.status === "Failed";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload area — architectural drop frame */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-lg border border-dashed border-border bg-transparent p-10 text-center hover:border-accent/50 transition-colors">
          <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />
          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-border bg-background">
              <UploadCloud className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
            </div>
            <div className="text-eyebrow text-accent mt-5">Ingestion</div>
            <h3 className="mt-1.5 font-display text-[19px] font-medium tracking-tight">
              Drop files to add to knowledge base
            </h3>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Drag and drop, or <span className="text-accent font-medium cursor-pointer underline-offset-2 hover:underline">browse files</span>
            </p>
            <p className="mt-4 text-[10.5px] text-muted-foreground font-mono uppercase tracking-[0.12em]">
              PDF · DOCX · TXT · CSV  /  Max 200 MB
            </p>
          </div>
        </div>

        {/* Pipeline explainer */}
        <div className="kl-card rounded-lg p-6">
          <div className="text-eyebrow text-muted-foreground mb-1.5">Pipeline</div>
          <h3 className="font-display text-[17px] font-medium mb-4 tracking-tight">After upload</h3>
          <ol className="space-y-3 text-[13px] text-foreground/80">
            {[
              "File is parsed",
              "Text is chunked",
              "Embeddings are created",
              "Chunks stored in vector DB",
              "Metadata saved in relational DB",
              "Generator can retrieve knowledge",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="font-mono text-[10px] text-accent w-5 pt-0.5 tracking-wider">0{i + 1}</span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-border mr-1">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
          <span className="kl-eyebrow">Filter</span>
        </div>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`kl-chip ${filter === f ? "kl-chip-active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Files table */}
      <div className="kl-table-wrap">
        <div className="overflow-x-auto">
          <table className="kl-table">
            <thead>
              <tr>
                <th className="sortable">File</th>
                <th className="sortable">Category</th>
                <th>Status</th>
                <th className="text-right sortable">Chunks</th>
                <th className="sortable">Uploaded</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background shrink-0">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate text-[13px]">{d.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{d.type}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="kl-tag">
                      <Tag className="h-2.5 w-2.5" strokeWidth={2} /> {d.category}
                    </span>
                  </td>
                  <td>
                    <StatusBadge label={d.status} variant={statusToVariant(d.status)} />
                  </td>
                  <td className="num">
                    {d.chunks > 0 ? d.chunks.toLocaleString() : "—"}
                  </td>
                  <td className="muted">{d.uploaded}</td>
                  <td>
                    <div className="flex items-center justify-end gap-0.5">
                      <button onClick={() => setSelected(d)} className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors" title="View">
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <button className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors" title="Reprocess">
                        <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <button className="rounded p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="kl-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="kl-modal-shell w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background shrink-0">
                  <Database className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="kl-eyebrow text-accent">Source Document</div>
                  <h3 className="font-display text-[19px] font-medium tracking-tight mt-0.5">{selected.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <StatusBadge label={selected.status} variant={statusToVariant(selected.status)} />
                    <span className="kl-tag">{selected.category}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors">
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                <Stat label="Chunks" value={selected.chunks.toLocaleString()} />
                <Stat label="Type" value={selected.type} />
                <Stat label="Last indexed" value={selected.uploaded} />
              </div>
              <div>
                <div className="kl-eyebrow mb-2">Summary</div>
                <p className="text-[13.5px] leading-relaxed">{selected.summary}</p>
              </div>
              <div>
                <div className="kl-eyebrow mb-2">Example passage</div>
                <div className="rounded-md bg-secondary/40 p-4 text-[13px] font-display italic text-foreground/75 border-l-2 border-accent/60 leading-relaxed">
                  "When buyers experience the threat of loss, they are willing to pay a premium that bears no rational relationship to their stated maximum. The pain of losing dominates the pleasure of winning by a factor of approximately two."
                </div>
              </div>
              <div>
                <div className="kl-eyebrow mb-2">Related pillars</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.pillars.map((p) => (
                    <span key={p} className="kl-tag">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border bg-transparent p-3">
      <div className="kl-eyebrow text-[9.5px]">{label}</div>
      <div className="font-display text-[18px] font-medium mt-1 leading-none tracking-tight">{value}</div>
    </div>
  );
}

