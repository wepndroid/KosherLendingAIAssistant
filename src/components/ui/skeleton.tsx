import { cn } from "@/lib/utils";

/**
 * Refined skeleton — uses a soft brushed shimmer instead of an abrupt pulse.
 * Drop-in replacement for the previous Skeleton API.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton-shimmer", className)}
      {...props}
    />
  );
}

/**
 * Indeterminate progress bar — gentle accent sweep.
 * Usage: <LoadingBar /> above content while data resolves.
 */
function LoadingBar({ className }: { className?: string }) {
  return <div className={cn("progress-indeterminate", className)} />;
}

export { Skeleton, LoadingBar };
