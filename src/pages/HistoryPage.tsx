import { useState } from "react";
import { Search, AlertCircle, ChevronDown } from "lucide-react";
import { GENERATED_CONTENT } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";

const DUPES = [
  { topic: "Loss aversion in competitive offers", count: 4 },
  { topic: "2-1 buydown seller contribution", count: 3 },
  { topic: "Florida insurance shock", count: 3 },
  { topic: "Chris Voss mirroring technique", count: 5 },
  { topic: "Pre-approval vs pre-qualification", count: 6 },
];

const FRESH = [
  "Negotiating after appraisal gap",
  "Credit utilization timing for closing",
  "Texas property tax shock for new buyers",
  "Anchoring with rate-and-term refinance numbers",
];

export function HistoryPage() {
  const [q, setQ] = useState("");
  const filtered = GENERATED_CONTENT.filter((c) =>
    !q || c.topic.toLowerCase().includes(q.toLowerCase()) || c.dmKeyword.includes(q.toUpperCase()),
  );

  return (
    <div className="space-y-6">
      {/* Search + filters */}
      <div className="kl-card p-4">
        <div className="kl-input-wrap">
          <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by topic, hook, framework, keyword, or book"
          />
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="kl-eyebrow shrink-0 pr-1">Refine</span>
          {["Pillar", "Platform", "DM Keyword", "Source Book", "Status", "Date Range"].map((f) => (
            <button key={f} className="kl-chip inline-flex items-center gap-1">
              {f} <ChevronDown className="h-3 w-3" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Table */}
        <div className="kl-table-wrap">
          <div className="overflow-x-auto">
            <table className="kl-table">
              <thead>
                <tr>
                  <th className="sortable">Date</th>
                  <th className="sortable">Topic</th>
                  <th className="sortable">Pillar</th>
                  <th className="sortable">Platform</th>
                  <th>Source / Framework</th>
                  <th>DM</th>
                  <th>Status</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="row-interactive">
                    <td className="muted whitespace-nowrap">{c.createdAt}</td>
                    <td className="max-w-xs">
                      <div className="font-medium text-[13px] line-clamp-1">{c.topic}</div>
                    </td>
                    <td className="text-[12px]">{c.pillar.split(" ")[0]}</td>
                    <td className="text-[12px]">{c.platform}</td>
                    <td className="text-[12px]">
                      <div className="font-medium">{c.sourceBook}</div>
                      <div className="text-muted-foreground text-[11px] mt-0.5">{c.framework}</div>
                    </td>
                    <td>
                      <span className="font-mono text-[11.5px] text-accent font-semibold tracking-wider">{c.dmKeyword}</span>
                    </td>
                    <td><StatusBadge label={c.status} variant={statusToVariant(c.status)} /></td>
                    <td>
                      <StatusBadge
                        label={c.duplicateRisk}
                        variant={c.duplicateRisk === "Low" ? "low-risk" : c.duplicateRisk === "Medium" ? "medium-risk" : "high-risk"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Duplicate prevention */}
        <div className="space-y-4">
          <div className="kl-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-3.5 w-3.5 kl-status-warn" strokeWidth={1.75} />
              <div className="kl-eyebrow text-foreground">Duplicate Prevention</div>
            </div>
            <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed">
              Recently used topics — avoid before fresh angle
            </p>
            <ul className="space-y-1.5">
              {DUPES.map((d) => (
                <li key={d.topic} className="flex items-center justify-between rounded-md border border-border bg-background/50 px-3 py-2 text-[12px]">
                  <span className="line-clamp-1 text-foreground/80">{d.topic}</span>
                  <span className="font-mono font-semibold kl-status-warn shrink-0 ml-2">×{d.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="kl-card p-5 border-l-2 border-l-accent/60">
            <div className="kl-eyebrow text-accent mb-1.5">Recommended</div>
            <h3 className="font-display text-[15.5px] font-medium tracking-tight mb-3">
              Fresh angles
            </h3>
            <ul className="space-y-2 text-[12.5px]">
              {FRESH.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-foreground/85">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                  <span className="leading-snug">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
