import { Link, useLocation, useNavigate, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard, Bell, Search, LogOut, ChevronDown,
  Command, Menu, X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/mock-data";

const NAV_PRIMARY = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

const NAV_OPS: ReadonlyArray<{ to: string; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }> = [];
const NAV_SYSTEM: ReadonlyArray<{ to: string; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }> = [];

const TITLES: Record<string, { title: string; eyebrow: string }> = {
  "/dashboard": { title: "Command Overview", eyebrow: "Operations" },
};

export function AppLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const meta = TITLES[location.pathname] || { title: "Dashboard", eyebrow: "Operations" };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar — deep architectural panel (desktop) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-gradient-sidebar text-sidebar-foreground sticky top-0 h-screen relative">
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-sidebar-border to-transparent" />

        {/* Brand */}
        <div className="relative px-6 py-7 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-md surface-charcoal border border-sidebar-border">
              <div className="absolute inset-0 rounded-md bg-gradient-accent opacity-20" />
              <Command className="h-4 w-4 text-accent relative" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-[15px] font-medium leading-tight text-white tracking-tight">{BRAND.name}</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-sidebar-foreground/50 mt-0.5">{BRAND.product}</div>
            </div>
          </Link>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-4 py-6">
          <NavSection label="Workspace" items={NAV_PRIMARY} pathname={location.pathname} />
          <NavSection label="Operations" items={NAV_OPS} pathname={location.pathname} />
          <NavSection label="System" items={NAV_SYSTEM} pathname={location.pathname} />
        </nav>

        {/* Status panel */}
        <div className="relative border-t border-sidebar-border p-4">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-sidebar-foreground/50">
                System Mode
              </div>
              <span className="font-mono text-[10px] text-accent">v0.1</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[13px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-white/90 font-medium">Operational</span>
            </div>
            <div className="mt-1 text-[11px] text-sidebar-foreground/50">
              MVP — Mock Data Layer
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile slide-in drawer */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={location.pathname} />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar — matte glass command rail */}
        <header className="sticky top-0 z-20 surface-glass border-b border-border">
          <div className="flex h-[68px] items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden -ml-1 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/70 text-foreground hover:bg-secondary/60 hover:border-accent/40 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" strokeWidth={1.75} />
            </button>

            <div className="flex-1 min-w-0 flex items-center gap-4">
              {/* Page meta */}
              <div className="min-w-0 hidden sm:block">
                <div className="kl-eyebrow text-muted-foreground/80">{meta.eyebrow}</div>
                <h1 className="font-display text-[19px] sm:text-[21px] font-medium text-foreground truncate leading-tight tracking-tight mt-0.5">
                  {meta.title}
                </h1>
              </div>
              <div className="sm:hidden min-w-0">
                <h1 className="font-display text-[16px] font-medium text-foreground truncate leading-tight tracking-tight">
                  {meta.title}
                </h1>
              </div>

              {/* Vertical brushed divider */}
              <div className="hidden md:block h-9 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

              {/* Status pill */}
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-card/40">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">All systems</span>
                <span className="font-mono text-[10px] text-foreground/80">nominal</span>
              </div>
            </div>

            {/* Global search — refined */}
            <div className="hidden md:flex items-center gap-2.5 rounded-md border border-border bg-card/60 px-3 py-2 w-72 lg:w-80 transition-all focus-within:border-accent/60 focus-within:bg-card focus-within:shadow-[0_0_0_3px_oklch(0.62_0.085_65/0.14)] hover:border-border/80">
              <Search className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
              <input
                placeholder="Search content, keywords, sources…"
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70"
              />
              <kbd className="hidden lg:inline-flex font-mono text-[9.5px] text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-secondary/50 tracking-wider">⌘K</kbd>
            </div>

            <button className="relative rounded-md p-2 hover:bg-secondary/70 transition-colors border border-transparent hover:border-border" aria-label="Notifications">
              <Bell className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-background" />
            </button>

            <UserMenu />
          </div>
          <div className="divider-brushed" />
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8 lg:py-10 max-w-[1600px] w-full">
          {/* Re-mount on route change to play the page-enter animation */}
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      />
      {/* Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[78%] max-w-[320px] md:hidden",
          "bg-gradient-sidebar text-sidebar-foreground border-r border-sidebar-border",
          "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]",
          "transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
        <div className="relative flex items-center justify-between px-5 py-5 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <div className="relative flex h-9 w-9 items-center justify-center rounded-md surface-charcoal border border-sidebar-border">
              <Command className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-[14px] font-medium text-white tracking-tight">{BRAND.name}</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-sidebar-foreground/50 mt-0.5">{BRAND.product}</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-3 py-5 h-[calc(100vh-72px-92px)]">
          <NavSection label="Workspace" items={NAV_PRIMARY} pathname={pathname} />
          <NavSection label="Operations" items={NAV_OPS} pathname={pathname} />
          <NavSection label="System" items={NAV_SYSTEM} pathname={pathname} />
        </nav>

        <div className="relative border-t border-sidebar-border p-4">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-2 text-[13px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-white/90 font-medium">Operational</span>
              <span className="ml-auto font-mono text-[10px] text-accent">v0.1</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavSection({
  label,
  items,
  pathname,
}: {
  label: string;
  items: ReadonlyArray<{ to: string; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }>;
  pathname: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="mb-6 last:mb-0">
      <div className="px-3 pb-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-sidebar-foreground/40">
        {label}
      </div>
      <ul className="space-y-0.5">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to === "/dashboard" && pathname === "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-all duration-200",
                  active
                    ? "bg-sidebar-accent text-white shadow-inset"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-r bg-accent" />
                )}
                <Icon className={cn("h-4 w-4 shrink-0 transition-colors", active ? "text-accent" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80")} strokeWidth={1.5} />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function UserMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-md border border-input bg-card/60 pl-1.5 pr-2 py-1.5 hover:bg-secondary/60 transition-colors shadow-inset"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded surface-charcoal text-white text-[11px] font-display font-medium border border-sidebar-border">
          JB
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-[12px] font-medium leading-tight text-foreground">Jeffrey Ben-Davis</div>
          <div className="text-[9px] uppercase tracking-[0.15em] text-accent font-medium mt-0.5">Principal · NMLS 320841</div>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-md border border-border bg-popover shadow-elevated z-20 overflow-hidden">
            <div className="p-3.5 border-b border-border">
              <div className="text-[13px] font-medium text-foreground">Jeffrey Ben-Davis</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">jeffrey@kosherlending.com</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.15em] text-accent">NMLS #320841</div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("kl_auth");
                navigate({ to: "/" });
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] hover:bg-secondary text-left transition-colors"
            >
              <LogOut className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} /> Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
