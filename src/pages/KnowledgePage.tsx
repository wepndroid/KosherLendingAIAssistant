import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileText, Eye, RefreshCw, Trash2, Filter, X, Database, Tag, Loader2, Sparkles } from "lucide-react";
import { KNOWLEDGE_DOCS } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";
import api, { type UnexploredPair } from "@/lib/api";

const FILTERS = ["All", "Books", "Strategy Docs", "Content Calendars", "DM Deliverables", "Transcripts", "Indexed", "Failed"];

interface ApiDoc {
  id: string;
  name: string;
  category: string;
  file_type: string;
  status: string;
  total_chunks: number;
  uploaded_at: string;
  summary?: string;
  pillars?: string[];
  cross_analysis?: any;
}

export function KnowledgePage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<ApiDoc | null>(null);
  const [docs, setDocs] = useState<ApiDoc[] | null>(null);
  const [unexplored, setUnexplored] = useState<UnexploredPair[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const res = await api.knowledge.list();
      setDocs(res.items as ApiDoc[]);
    } catch (e: any) {
      setError(e?.message || "Failed to load");
      setDocs([]);
    }
    try {
      const u = await api.knowledge.unexplored(8);
      setUnexplored(u.items);
    } catch {
      setUnexplored([]);
    }
  };

  useEffect(() => {
    load();
    const i = setInterval(load, 4000);
    return () => clearInterval(i);
  }, []);

  const docsToRender: ApiDoc[] =
    docs ??
    (KNOWLEDGE_DOCS.map((d) => ({
      id: d.id,
      name: d.name,
      category: d.category,
      file_type: d.type,
      status: d.status,
      total_chunks: d.chunks,
      uploaded_at: d.uploaded,
      summary: d.summary,
      pillars: d.pillars,
    })) as ApiDoc[]);

  const filtered = docsToRender.filter((d) => {
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

  const onUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop()?.toUpperCase() || "";
      const category = file.name.toLowerCase().includes("strategy") ? "Strategy Doc" :
                       file.name.toLowerCase().includes("dm") ? "DM Deliverable" :
                       file.name.toLowerCase().includes("calendar") || file.name.toLowerCase().includes("year") ? "Content Calendar" :
                       ext === "VTT" ? "Transcript" : "Book";
      await api.knowledge.upload(file, category, []);
      await load();
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Remove this document and all its chunks?")) return;
    await api.knowledge.remove(id);
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div
          className="lg:col-span-2 relative overflow-hidden rounded-lg border border-dashed border-border bg-transparent p-10 text-center hover:border-accent/50 transition-colors cursor-pointer"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={async (e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) await onUpload(f);
          }}
        >
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept=".pdf,.docx,.txt,.md"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) await onUpload(f);
              if (fileRef.current) fileRef.current.value = "";
            }}
          />
          <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />
          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-border bg-background">
              {uploading ? <Loader2 className="h-5 w-5 text-accent animate-spin" strokeWidth={1.5} /> : <UploadCloud className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />}
            </div>
            <div className="text-eyebrow text-accent mt-5">Ingestion</div>
            <h3 className="mt-1.5 font-display text-[19px] font-medium tracking-tight">
              {uploading ? "Uploading…" : "Drop files to add to knowledge base"}
            </h3>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Drag and drop, or <span className="text-accent font-medium">browse files</span>
            </p>
            <p className="mt-4 text-[10.5px] text-muted-foreground font-mono uppercase tracking-[0.12em]">
              PDF · DOCX · TXT · MD
            </p>
            {error && <p className="mt-3 text-[12px] text-destructive">{error}</p>}
          </div>
        </div>

        <div className="kl-card rounded-lg p-6">
          <div className="text-eyebrow text-muted-foreground mb-1.5">Pipeline</div>
          <h3 className="font-display text-[17px] font-medium mb-4 tracking-tight">After upload</h3>
          <ol className="space-y-3 text-[13px] text-foreground/80">
            {[
              "File is parsed (DOCX/PDF/TXT/MD)",
              "Text is chunked (800 / 100 overlap)",
              "Embeddings created (text-embedding-3-small)",
              "Chunks stored in pgvector",
              "Cross-analyzed against existing library",
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

      {unexplored.length > 0 && (
        <div className="kl-card p-5 border-l-2 border-l-accent/60">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
            <div className="kl-eyebrow text-accent">Compounding Intelligence</div>
          </div>
          <h3 className="font-display text-[16px] font-medium tracking-tight">Unexplored synthesis combinations</h3>
          <p className="text-[12px] text-muted-foreground mb-4 mt-0.5 leading-relaxed">
            Book pairs the engine has not yet drawn from together. The generator will prefer these for fresh angles.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {unexplored.map((p, i) => (
              <li key={i} className="rounded-md border border-border bg-transparent px-3 py-2.5 text-[12.5px]">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-accent shrink-0 pt-0.5">×</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{p.a.name}</div>
                    <div className="text-muted-foreground italic text-[11.5px] mt-0.5">paired with</div>
                    <div className="font-medium truncate">{p.b.name}</div>
                    {p.shared_pillars.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {p.shared_pillars.map((sp) => (
                          <span key={sp} className="kl-tag text-[9.5px]">{sp}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-border mr-1">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
          <span className="kl-eyebrow">Filter</span>
        </div>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`kl-chip ${filter === f ? "kl-chip-active" : ""}`}>
            {f}
          </button>
        ))}
      </div>

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
                        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{d.file_type}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="kl-tag">
                      <Tag className="h-2.5 w-2.5" strokeWidth={2} /> {d.category}
                    </span>
                  </td>
                  <td>
                    <StatusBadge label={d.status} variant={statusToVariant(d.status as any)} />
                  </td>
                  <td className="num">{(d.total_chunks ?? 0) > 0 ? (d.total_chunks ?? 0).toLocaleString() : "—"}</td>
                  <td className="muted">{(d.uploaded_at || "").slice(0, 10)}</td>
                  <td>
                    <div className="flex items-center justify-end gap-0.5">
                      <button onClick={() => setSelected(d)} className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors" title="View">
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <button onClick={load} className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors" title="Refresh">
                        <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <button onClick={() => onDelete(d.id)} className="rounded p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Delete">
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
                    <StatusBadge label={selected.status} variant={statusToVariant(selected.status as any)} />
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
                <Stat label="Chunks" value={(selected.total_chunks ?? 0).toLocaleString()} />
                <Stat label="Type" value={selected.file_type} />
                <Stat label="Uploaded" value={(selected.uploaded_at || "").slice(0, 10)} />
              </div>
              {selected.summary && (
                <div>
                  <div className="kl-eyebrow mb-2">Summary</div>
                  <p className="text-[13.5px] leading-relaxed">{selected.summary}</p>
                </div>
              )}
              {selected.cross_analysis && (
                <div>
                  <div className="kl-eyebrow mb-2">Cross-analysis</div>
                  <pre className="rounded-md bg-secondary/40 p-3 text-[11.5px] leading-relaxed overflow-auto max-h-72">
                    {JSON.stringify(selected.cross_analysis, null, 2)}
                  </pre>
                </div>
              )}
              {(selected.pillars || []).length > 0 && (
                <div>
                  <div className="kl-eyebrow mb-2">Related pillars</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(selected.pillars || []).map((p) => (
                      <span key={p} className="kl-tag">{p}</span>
                    ))}
                  </div>
                </div>
              )}
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
