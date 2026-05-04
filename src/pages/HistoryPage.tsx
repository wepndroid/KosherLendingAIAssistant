import { useEffect, useMemo, useState } from "react";
import { Search, AlertCircle, ChevronDown } from "lucide-react";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";
import api from "@/lib/api";

interface Item {
  id: string;
  topic: string;
  pillar: string;
  platform: string;
  source_book: string;
  source_framework: string;
  dm_keyword: string;
  status: string;
  duplicate_risk: "Low" | "Medium" | "High";
  created_at: string;
}

const FRESH = [
  "Negotiating after appraisal gap",
  "Credit utilization timing for closing",
  "Texas property tax shock for new buyers",
  "Anchoring with rate-and-term refinance numbers",
];

export function HistoryPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.content.list({ status: "Approved,Exported,Posted,Scheduled,Draft,Needs Review", limit: 200 })
      .then((r) => setItems(r.items as Item[]))
      .catch(() => setItems([]));
  }, []);

  const filtered = items.filter((c) => {
    if (!q) return true;
    const term = q.toLowerCase();
    return (
      (c.topic || "").toLowerCase().includes(term) ||
      (c.dm_keyword || "").toLowerCase().includes(term) ||
      (c.source_book || "").toLowerCase().includes(term) ||
      (c.source_framework || "").toLowerCase().includes(term)
    );
  });

  const dupes = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((c) => {
      const key = (c.source_book || "").trim();
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [items]);

  return (
    <div className="space-y-6">
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
                    <td className="muted whitespace-nowrap">{(c.created_at || "").slice(0, 10)}</td>
                    <td className="max-w-xs">
                      <div className="font-medium text-[13px] line-clamp-1">{c.topic}</div>
                    </td>
                    <td className="text-[12px]">{(c.pillar || "").split(" ")[0]}</td>
                    <td className="text-[12px]">{c.platform}</td>
                    <td className="text-[12px]">
                      <div className="font-medium">{c.source_book}</div>
                      <div className="text-muted-foreground text-[11px] mt-0.5">{c.source_framework}</div>
                    </td>
                    <td>
                      <span className="font-mono text-[11.5px] text-accent font-semibold tracking-wider">{c.dm_keyword}</span>
                    </td>
                    <td><StatusBadge label={c.status} variant={statusToVariant(c.status as any)} /></td>
                    <td>
                      <StatusBadge
                        label={c.duplicate_risk}
                        variant={c.duplicate_risk === "Low" ? "low-risk" : c.duplicate_risk === "Medium" ? "medium-risk" : "high-risk"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="kl-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-3.5 w-3.5 kl-status-warn" strokeWidth={1.75} />
              <div className="kl-eyebrow text-foreground">Duplicate Prevention</div>
            </div>
            <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed">
              Most-used source books — diversify before generating again
            </p>
            <ul className="space-y-1.5">
              {dupes.length === 0 ? (
                <li className="text-[12px] text-muted-foreground">No data yet</li>
              ) : dupes.map(([book, count]) => (
                <li key={book} className="flex items-center justify-between rounded-md border border-border bg-transparent px-3 py-2 text-[12px]">
                  <span className="line-clamp-1 text-foreground/80">{book}</span>
                  <span className="font-mono font-semibold kl-status-warn shrink-0 ml-2">×{count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="kl-card p-5 border-l-2 border-l-accent/60">
            <div className="kl-eyebrow text-accent mb-1.5">Recommended</div>
            <h3 className="font-display text-[15.5px] font-medium tracking-tight mb-3">Fresh angles</h3>
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
