import { cn } from "@/lib/utils";

type Variant =
  | "indexed" | "processing" | "draft" | "approved" | "exported"
  | "needs-review" | "high-intent" | "medium-intent" | "low-intent"
  | "ready" | "warning" | "failed" | "not-connected" | "scheduled"
  | "low-risk" | "medium-risk" | "high-risk";

const styles: Record<Variant, string> = {
  indexed: "bg-success/10 text-success border-success/20",
  processing: "bg-info/10 text-info border-info/20",
  draft: "bg-muted text-muted-foreground border-border",
  approved: "bg-success/10 text-success border-success/20",
  exported: "bg-primary/10 text-primary border-primary/20",
  "needs-review": "bg-warning/15 text-warning-foreground border-warning/30",
  scheduled: "bg-info/10 text-info border-info/20",
  "high-intent": "bg-success/10 text-success border-success/20",
  "medium-intent": "bg-warning/15 text-warning-foreground border-warning/30",
  "low-intent": "bg-muted text-muted-foreground border-border",
  ready: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  "not-connected": "bg-muted text-muted-foreground border-border",
  "low-risk": "bg-success/10 text-success border-success/20",
  "medium-risk": "bg-warning/15 text-warning-foreground border-warning/30",
  "high-risk": "bg-destructive/10 text-destructive border-destructive/20",
};

export function StatusBadge({
  label,
  variant = "draft",
  className,
}: {
  label: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-[3px] text-[10.5px] font-medium uppercase tracking-[0.08em] font-mono",
        styles[variant],
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

export function statusToVariant(s: string): Variant {
  const m: Record<string, Variant> = {
    Indexed: "indexed",
    Processing: "processing",
    Draft: "draft",
    Approved: "approved",
    Exported: "exported",
    Scheduled: "scheduled",
    "Needs Review": "needs-review",
    "High Intent": "high-intent",
    "Medium Intent": "medium-intent",
    "Low Intent": "low-intent",
    Ready: "ready",
    Pending: "warning",
    Warning: "warning",
    Failed: "failed",
    "Not Connected": "not-connected",
    "Future Phase": "not-connected",
    Active: "approved",
    Uploaded: "processing",
    Downloaded: "exported",
    Preparing: "processing",
    Low: "low-risk",
    Medium: "medium-risk",
    High: "high-risk",
  };
  return m[s] || "draft";
}
