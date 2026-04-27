import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, Command, LayoutDashboard, LogOut, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const NAV_PRIMARY = [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] as const;

const TITLES: Record<string, { title: string; eyebrow: string }> = {
  "/dashboard": { title: "Mortgage Operations", eyebrow: "Command Center" },
};

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

export function AppLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const meta = TITLES[location.pathname] || { title: "Mortgage Operations", eyebrow: "Command Center" };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="relative hidden h-screen w-64 flex-col bg-gradient-sidebar text-sidebar-foreground md:sticky md:top-0 md:flex lg:w-72">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-sidebar-border to-transparent" />

        <div className="relative border-b border-sidebar-border px-6 py-7">
          <Link to="/dashboard" className="group flex items-center gap-3">
            <div className="surface-charcoal relative flex h-10 w-10 items-center justify-center rounded-md border border-sidebar-border">
              <div className="absolute inset-0 rounded-md bg-gradient-accent opacity-20" />
              <Command className="relative h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-[15px] font-medium leading-tight tracking-tight text-white">{BRAND.name}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-sidebar-foreground/50">{BRAND.product}</div>
            </div>
          </Link>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-4 py-6">
          <NavSection label="Workspace" items={NAV_PRIMARY} pathname={location.pathname} />
        </nav>

        <div className="relative border-t border-sidebar-border p-4">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-sidebar-foreground/50">System Mode</div>
              <span className="font-mono text-[10px] text-accent">v0.1</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[13px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-medium text-white/90">Operational</span>
            </div>
            <div className="mt-1 text-[11px] text-sidebar-foreground/50">MVP - Dashboard Preview</div>
          </div>
        </div>
      </aside>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={location.pathname} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-white/40 bg-white/35 backdrop-blur-xl supports-[backdrop-filter]:bg-white/25">
          <div className="flex h-[68px] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="ml-[-4px] flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/70 text-foreground transition-colors hover:border-accent/40 hover:bg-secondary/60 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" strokeWidth={1.75} />
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="hidden min-w-0 sm:block">
                <div className="kl-eyebrow text-muted-foreground/80">{meta.eyebrow}</div>
                <h1 className="mt-0.5 truncate font-display text-[19px] font-medium leading-tight tracking-tight text-foreground sm:text-[21px]">
                  {meta.title}
                </h1>
              </div>
              <div className="min-w-0 sm:hidden">
                <h1 className="truncate font-display text-[16px] font-medium leading-tight tracking-tight text-foreground">{meta.title}</h1>
              </div>

              <div className="hidden h-9 w-px bg-gradient-to-b from-transparent via-border to-transparent md:block" />

              <div className="btn-cinematic-secondary hidden h-7 items-center gap-2 rounded-md px-3 text-[10px] uppercase tracking-[0.16em] lg:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                <span className="font-mono text-muted-foreground">Compliance</span>
                <span className="font-mono text-[10px] text-foreground/80">monitoring</span>
              </div>
            </div>

            <div className="hidden w-72 items-center gap-2.5 rounded-md bg-[oklch(0.92_0.003_85)] px-3 py-2 shadow-[-2px_0.7065919983928324px_0.7065919983928324px_-0.5416666666666666px_rgba(0,0,0,0.1),0px_1.8065619053231785px_1.8065619053231785px_-1.0833333333333333px_rgba(0,0,0,0.09),0px_3.6217592146567767px_3.6217592146567767px_-1.625px_rgba(0,0,0,0.09),0px_6.8655999097303715px_6.8655999097303715px_-2.1666666666666665px_rgba(0,0,0,0.09),0px_13.646761411524492px_13.646761411524492px_-2.7083333333333335px_rgba(0,0,0,0.08),0px_30px_30px_-3.25px_rgba(0,0,0,0.05),inset_0px_3px_1px_0px_rgb(255,255,255)] transition-all focus-within:shadow-[0_0_0_3px_oklch(0.515_0.135_145_/_0.25),-2px_0.7065919983928324px_0.7065919983928324px_-0.5416666666666666px_rgba(0,0,0,0.1),0px_1.8065619053231785px_1.8065619053231785px_-1.0833333333333333px_rgba(0,0,0,0.09),0px_3.6217592146567767px_3.6217592146567767px_-1.625px_rgba(0,0,0,0.09),0px_6.8655999097303715px_6.8655999097303715px_-2.1666666666666665px_rgba(0,0,0,0.09),0px_13.646761411524492px_13.646761411524492px_-2.7083333333333335px_rgba(0,0,0,0.08),0px_30px_30px_-3.25px_rgba(0,0,0,0.05),inset_0px_3px_1px_0px_rgb(255,255,255)] md:flex lg:w-80">
              <Search className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
              <input placeholder="Search borrower, loan ID, partner..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70" />
              <kbd className="hidden rounded bg-white/50 px-1.5 py-0.5 font-mono text-[9.5px] tracking-wider text-muted-foreground lg:inline-flex">
                Ctrl+K
              </kbd>
            </div>

            <button
              className="relative rounded-md border border-transparent p-2 transition-colors hover:border-border hover:bg-secondary/70"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-background" />
            </button>

            <UserMenu />
          </div>
          <div className="divider-brushed" />
        </header>

        <main className="w-full max-w-[1600px] flex-1 bg-[#ffffff85] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileNav({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[78%] max-w-[320px] border-r border-sidebar-border bg-gradient-sidebar text-sidebar-foreground shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40" />
        <div className="relative flex items-center justify-between border-b border-sidebar-border px-5 py-5">
          <Link to="/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <div className="surface-charcoal relative flex h-9 w-9 items-center justify-center rounded-md border border-sidebar-border">
              <Command className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-[14px] font-medium tracking-tight text-white">{BRAND.name}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-sidebar-foreground/50">{BRAND.product}</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-sidebar-border text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60"
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <nav className="relative h-[calc(100vh-72px-92px)] flex-1 overflow-y-auto px-3 py-5">
          <NavSection label="Workspace" items={NAV_PRIMARY} pathname={pathname} />
        </nav>

        <div className="relative border-t border-sidebar-border p-4">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-2 text-[13px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-medium text-white/90">Operational</span>
              <span className="ml-auto font-mono text-[10px] text-accent">v0.1</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavSection({ label, items, pathname }: { label: string; items: ReadonlyArray<NavItem>; pathname: string }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-6 last:mb-0">
      <div className="px-3 pb-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-sidebar-foreground/40">{label}</div>
      <ul className="space-y-0.5">
        {items.map(({ to, label: itemLabel, icon: Icon }) => {
          const active = pathname === to || (to === "/dashboard" && pathname === "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-all duration-200",
                  active
                    ? "bg-sidebar-accent/85 text-white shadow-[-2px_0.7065919983928324px_0.7065919983928324px_-0.5416666666666666px_rgba(0,0,0,0.25),0px_1.8065619053231785px_1.8065619053231785px_-1.0833333333333333px_rgba(0,0,0,0.2),0px_3.6217592146567767px_3.6217592146567767px_-1.625px_rgba(0,0,0,0.18),0px_6.8655999097303715px_6.8655999097303715px_-2.1666666666666665px_rgba(0,0,0,0.16),0px_13.646761411524492px_13.646761411524492px_-2.7083333333333335px_rgba(0,0,0,0.14),0px_30px_30px_-3.25px_rgba(0,0,0,0.12),inset_0px_1px_0px_0px_rgba(255,255,255,0.08)]"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    active ? "text-accent" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80",
                  )}
                  strokeWidth={1.5}
                />
                <span className="truncate">{itemLabel}</span>
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
        className="shadow-inset flex items-center gap-2.5 rounded-md border border-input bg-card/60 py-1.5 pl-1.5 pr-2 transition-colors hover:bg-secondary/60"
      >
        <div className="surface-charcoal flex h-7 w-7 items-center justify-center rounded border border-sidebar-border font-display text-[11px] font-medium text-white">
          JB
        </div>
        <div className="hidden text-left sm:block">
          <div className="text-[12px] font-medium leading-tight text-foreground">Jeffrey Ben-Davis</div>
          <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-accent">Principal | NMLS 320841</div>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-md border border-border bg-popover shadow-elevated">
            <div className="border-b border-border p-3.5">
              <div className="text-[13px] font-medium text-foreground">Jeffrey Ben-Davis</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">jeffrey@kosherlending.com</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.15em] text-accent">NMLS #320841</div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("kl_auth");
                navigate({ to: "/" });
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] transition-colors hover:bg-secondary"
            >
              <LogOut className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} /> Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
