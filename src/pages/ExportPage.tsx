import { useState } from "react";
import { FileText, FileSpreadsheet, CalendarDays, ClipboardList, KeyRound, Download, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { EXPORTS, GENERATED_CONTENT, BRAND } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";

const FORMATS = [
  { id: "word", label: "Word document", icon: FileText, desc: "Editor-friendly .docx" },
  { id: "gdocs", label: "Google Docs format", icon: FileText, desc: "Ready to paste into Drive" },
  { id: "csv", label: "CSV spreadsheet", icon: FileSpreadsheet, desc: "Bulk row export" },
  { id: "calendar", label: "Content calendar", icon: CalendarDays, desc: "Planning view" },
  { id: "brief", label: "Editor production brief", icon: ClipboardList, desc: "Per-post brief" },
  { id: "ghl", label: "GHL keyword map", icon: KeyRound, desc: "Keyword → deliverable" },
];

const SCOPES = [
  "Selected posts", "Approved posts only", "By date range", "By platform", "By content pillar", "By DM keyword",
];

export function ExportPage() {
  const [format, setFormat] = useState("word");
  const [scope, setScope] = useState("Approved posts only");
  const previewPost = GENERATED_CONTENT[0];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="kl-card p-7">
          <div className="kl-eyebrow text-accent mb-1">Distribution</div>
          <h3 className="font-display text-[19px] font-medium tracking-tight mb-5">
            Choose export format
          </h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {FORMATS.map((f) => {
              const active = format === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`text-left rounded-md border p-4 transition-all ${
                    active
                      ? "border-accent/50 bg-accent/[0.06] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.5),0_4px_14px_-6px_oklch(0.62_0.085_65_/_0.25)]"
                      : "border-border bg-background/50 hover:border-accent/30 hover:bg-background"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-md border shrink-0 transition-colors ${
                      active ? "border-accent/40 bg-accent/15 text-accent" : "border-border bg-card text-foreground/60"
                    }`}>
                      <f.icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-medium text-[13.5px]">{f.label}</div>
                      <div className="text-[11.5px] text-muted-foreground mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <div className="kl-eyebrow mb-3">Selection scope</div>
            <div className="flex flex-wrap gap-1.5">
              {SCOPES.map((s) => (
                <button
                  key={s}
                  onClick={() => setScope(s)}
                  className={`kl-chip ${scope === s ? "kl-chip-active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-cinematic mt-6 w-full py-3 text-[13.5px]">
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Generate export
          </button>
        </div>

        {/* Recent exports */}
        <div className="kl-table-wrap">
          <div className="px-5 py-4 border-b border-border bg-secondary/30">
            <div className="kl-eyebrow text-accent">Archive</div>
            <h3 className="font-display text-[16px] font-medium tracking-tight mt-0.5">Recent exports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="kl-table">
              <thead>
                <tr>
                  <th className="sortable">Name</th>
                  <th>Type</th>
                  <th className="sortable">Date</th>
                  <th className="text-right sortable">Posts</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {EXPORTS.map((e) => (
                  <tr key={e.id}>
                    <td className="font-medium text-[13px]">{e.name}</td>
                    <td><span className="kl-tag">{e.type}</span></td>
                    <td className="muted">{e.date}</td>
                    <td className="num">{e.posts}</td>
                    <td>
                      <span className="inline-flex items-center gap-1.5">
                        {e.status === "Preparing" && <Loader2 className="h-3 w-3 animate-spin text-info" strokeWidth={2} />}
                        {e.status === "Ready" && <CheckCircle2 className="h-3 w-3 text-success" strokeWidth={2} />}
                        {e.status === "Downloaded" && <Clock className="h-3 w-3 text-muted-foreground" strokeWidth={2} />}
                        <StatusBadge label={e.status} variant={statusToVariant(e.status)} />
                      </span>
                    </td>
                    <td className="text-right">
                      <button className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors">
                        <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Preview card */}
      <div className="kl-card p-6 h-fit lg:sticky lg:top-24">
        <div className="kl-eyebrow text-accent mb-1">Preview</div>
        <h3 className="font-display text-[16px] font-medium tracking-tight">Export sample</h3>
        <p className="text-[12px] text-muted-foreground mb-4 mt-0.5">One post in selected format</p>

        <div className="rounded-md border border-border bg-background/70 p-4 space-y-3 text-[12px] shadow-inset">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground pb-2 border-b border-border">
            <span>Day · {previewPost.scheduledFor || "Today"}</span>
            <span>{previewPost.scheduledTime}</span>
          </div>
          <div>
            <div className="font-mono text-[9.5px] text-muted-foreground uppercase tracking-[0.14em]">Platform</div>
            <div className="font-medium text-[13px] mt-0.5">{previewPost.platform}</div>
          </div>
          <div>
            <div className="font-mono text-[9.5px] text-muted-foreground uppercase tracking-[0.14em]">Hook</div>
            <div className="font-display text-[13px] italic font-normal leading-snug mt-0.5">"{previewPost.hook}"</div>
          </div>
          <div>
            <div className="font-mono text-[9.5px] text-muted-foreground uppercase tracking-[0.14em]">Script</div>
            <p className="leading-relaxed text-foreground/75 line-clamp-4 mt-0.5">{previewPost.script}</p>
          </div>
          <div>
            <div className="font-mono text-[9.5px] text-muted-foreground uppercase tracking-[0.14em]">Caption</div>
            <p className="text-foreground/85 mt-0.5">{previewPost.caption}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9.5px] text-muted-foreground uppercase tracking-[0.14em]">DM Keyword</span>
            <span className="font-mono font-semibold text-accent tracking-wider">{previewPost.dmKeyword}</span>
          </div>
          <div>
            <div className="font-mono text-[9.5px] text-muted-foreground uppercase tracking-[0.14em]">Production brief</div>
            <p className="text-muted-foreground mt-0.5">{previewPost.productionBrief}</p>
          </div>
          <div className="border-t border-border pt-2.5 text-[10px] text-muted-foreground italic font-mono leading-relaxed">
            {BRAND.compliance}
          </div>
        </div>
      </div>
    </div>
  );
}
