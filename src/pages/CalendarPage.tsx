import { useState } from "react";
import { Calendar as CalendarIcon, AlertTriangle } from "lucide-react";
import { POSTING_TIMES, GENERATED_CONTENT } from "@/lib/mock-data";
import { StatusBadge, statusToVariant } from "@/components/StatusBadge";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [21, 22, 23, 24, 25, 26, 27];

// Refined monochrome platform tags — no candy colors
const PLATFORM_STYLE: Record<string, string> = {
  "TikTok":          "bg-foreground text-background",
  "Instagram Reels": "bg-foreground/85 text-background",
  "YouTube Shorts":  "bg-foreground/70 text-background",
  "Facebook Reels":  "bg-foreground/55 text-background",
  "LinkedIn":        "bg-accent/85 text-accent-foreground",
  "X/Twitter":       "bg-foreground/40 text-background",
};

export function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("week");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent">
            <CalendarIcon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
          </div>
          <div>
            <div className="kl-eyebrow">Posting Window</div>
            <div className="font-display text-[17px] font-medium tracking-tight mt-0.5">
              April 21 — April 27, 2025
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border bg-transparent p-1">
          {(["month", "week", "day"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded px-3 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.12em] font-mono transition-all ${
                view === v
                  ? "bg-foreground text-background shadow-[inset_0_1px_0_oklch(1_0_0_/_0.10)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Warning banner */}
      <div className="kl-banner-warn">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 kl-status-warn" strokeWidth={1.75} />
        <div className="leading-relaxed">
          <strong className="font-medium">Direct social media posting is not enabled in this MVP.</strong>
          <span className="text-foreground/70"> The calendar is for planning, review, and export workflow only. Connect distribution in Settings → Integrations.</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Calendar grid */}
        <div className="kl-card overflow-hidden p-0">
          <div className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] border-b border-border bg-gradient-to-b from-secondary/60 to-secondary/30">
            <div />
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={`px-3 py-3 text-center border-l border-border ${i === 4 ? "bg-accent/[0.06]" : ""}`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-medium">{d}</div>
                <div className={`font-display text-[19px] font-medium mt-0.5 leading-none tracking-tight ${i === 4 ? "text-accent" : "text-foreground"}`}>
                  {DATES[i]}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            {POSTING_TIMES.map((time) => (
              <div key={time} className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] border-b border-border last:border-0 min-h-[92px]">
                <div className="px-3 py-3 font-mono text-[10.5px] font-medium text-muted-foreground border-r border-border bg-secondary/20 tracking-wider">
                  {time}
                </div>
                {DAYS.map((_, di) => {
                  const post = GENERATED_CONTENT.find((c) =>
                    c.scheduledTime === time && DATES[di] === Number(c.scheduledFor?.split("-")[2]),
                  );
                  return (
                    <div
                      key={di}
                      className={`border-l border-border p-1.5 transition-colors ${di === 4 ? "bg-accent/[0.04]" : ""} hover:bg-secondary/40`}
                    >
                      {post && (
                        <div className="rounded-md border border-border bg-transparent p-2 cursor-grab hover:border-accent/40  transition-all">
                          <div className={`inline-block rounded-sm font-mono text-[8.5px] font-medium px-1.5 py-0.5 mb-1 tracking-wider ${PLATFORM_STYLE[post.platform] || "bg-secondary"}`}>
                            {post.platform.split(" ")[0].toUpperCase()}
                          </div>
                          <div className="text-[11px] font-medium leading-tight line-clamp-2 text-foreground">{post.topic}</div>
                          <div className="mt-1.5 flex items-center justify-between text-[10px]">
                            <span className="font-mono text-accent tracking-wider">#{post.dmKeyword}</span>
                            <StatusBadge label={post.status} variant={statusToVariant(post.status)} className="!text-[8.5px] !px-1 !py-0" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — daily target */}
        <div className="space-y-4">
          <div className="kl-card p-5">
            <div className="kl-eyebrow text-accent mb-1.5">Daily Target</div>
            <h3 className="font-display text-[17px] font-medium tracking-tight">Production Quota</h3>
            <p className="text-[12px] text-muted-foreground mb-4 mt-0.5">Across all platforms</p>

            <div className="surface-charcoal rounded-md text-white p-4 text-center mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-fine opacity-30" />
              <div className="relative">
                <div className="font-display text-[36px] font-light leading-none tracking-tight">12</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 mt-2">unique videos / day</div>
              </div>
            </div>

            <div className="space-y-1.5 text-[12.5px]">
              {[
                ["TikTok", "5–6"], ["Instagram Reels", "4–5"], ["YouTube Shorts", "3–4"],
                ["Facebook Reels", "2–3"], ["LinkedIn", "1"], ["X/Twitter", "2–3"],
              ].map(([p, n]) => (
                <div key={p} className="flex items-center justify-between rounded-md border border-border bg-transparent px-3 py-2">
                  <span className="font-medium text-foreground">{p}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{n}/day</span>
                </div>
              ))}
            </div>
          </div>

          <div className="kl-card p-5">
            <div className="kl-eyebrow mb-3">Status Legend</div>
            <div className="flex flex-col gap-2">
              {["Draft", "Approved", "Ready to Export", "Exported", "Needs Review"].map((s) => (
                <StatusBadge key={s} label={s} variant={statusToVariant(s)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

