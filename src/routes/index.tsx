import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, Shield, Command, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — KosherLending AI Content OS" },
      { name: "description", content: "Secure internal access to the KosherLending AI Content Operating System." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("jeffrey@kosherlending.com");
  const [password, setPassword] = useState("••••••••••");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("kl_auth", "1");
      navigate({ to: "/dashboard" });
    }, 600);
  };

  const modules = [
    "Knowledge", "Rules", "Content Generation",
    "DM Keyword Routing", "Review", "Calendar", "Export",
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left — cinematic architectural panel */}
      <div className="hidden lg:flex lg:w-[58%] xl:w-[55%] bg-gradient-cinematic text-white relative overflow-hidden texture-grain">
        {/* Architectural grids — layered for depth */}
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.10) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.10) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.20] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.07) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.07) 1px, transparent 1px)",
            backgroundSize: "192px 192px",
          }}
        />

        {/* Vignette for cinematic darkening at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, oklch(0.08 0.010 250 / 0.65) 100%)",
          }}
        />

        {/* Ambient lighting — repositioned for navy feel */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-35"
          style={{
            background: "radial-gradient(circle, oklch(0.62 0.085 65 / 0.5), transparent 60%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, oklch(0.30 0.06 250 / 0.7), transparent 60%)",
            filter: "blur(70px)",
          }}
        />

        {/* Vertical brushed accent */}
        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        {/* Horizontal hairlines for architectural framing */}
        <div className="absolute top-12 left-12 right-12 h-px bg-white/[0.06]" />
        <div className="absolute bottom-12 left-12 right-12 h-px bg-white/[0.06]" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-md surface-charcoal border border-white/10">
              <div className="absolute inset-0 rounded-md bg-gradient-accent opacity-25" />
              <Command className="h-5 w-5 text-accent relative" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-[17px] font-medium tracking-tight">KosherLending</div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/45 mt-0.5 font-mono">AI Content OS</div>
            </div>
          </div>

          {/* Headline — refined hierarchy */}
          <div className="space-y-9 max-w-xl">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <span className="h-px w-10 bg-accent/70" />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent/90 font-medium">
                  Private AI Infrastructure
                </span>
              </div>
              <h2 className="font-display text-[44px] xl:text-[60px] font-light leading-[1.02] tracking-[-0.028em]">
                Private AI infrastructure
                <br />
                for{" "}
                <em
                  className="text-accent not-italic font-normal"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
                >
                  mortgage content
                </em>
                <br />
                operations.
              </h2>
            </div>
            <p className="text-white/55 text-[15px] leading-[1.75] font-light max-w-md">
              A unified command system for knowledge, rules, content generation,
              DM keyword routing, review, calendar, and export.
            </p>

            {/* Module list */}
            <div className="pt-6 border-t border-white/10">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4">
                System Modules
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 max-w-md">
                {modules.map((m, i) => (
                  <div key={m} className="flex items-center gap-2.5 text-[12px] text-white/65 font-medium tracking-wide">
                    <span className="font-mono text-[9px] text-accent/70 w-4">0{i + 1}</span>
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between text-[11px] text-white/40 font-mono tracking-wider">
            <div>Jeffrey Ben-Davis · NMLS #320841 · Equal Housing Lender</div>
            <div className="flex items-center gap-2 text-accent/70">
              <span className="h-1 w-1 rounded-full bg-accent/70 animate-pulse" />
              SECURE / TLS 1.3
            </div>
          </div>
        </div>
      </div>

      {/* Right — sign-in form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative texture-grain">
        <div className="absolute inset-0 bg-grid-architectural opacity-[0.55] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, oklch(0.62 0.085 65 / 0.10), transparent 60%)",
          }}
        />
        {/* Vignette on the right too */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, oklch(0.86 0.008 70 / 0.4) 100%)",
          }}
        />
        <div className="relative w-full max-w-[420px]">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-md surface-charcoal border border-border">
              <Command className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display font-medium tracking-tight">KosherLending AI Content OS</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-px w-7 bg-accent/70" />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent font-medium">
              Restricted Access
            </span>
          </div>
          <h1 className="font-display text-[40px] font-light tracking-[-0.025em] leading-[1.04]">
            Sign in to the system
          </h1>
          <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed max-w-[380px]">
            Authorized personnel only. All sessions are monitored and audit-logged
            against compliance policy.
          </p>

          <form onSubmit={submit} className="mt-9 space-y-4">
            <div>
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Email address
              </label>
              <div className="kl-input-wrap">
                <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[14px]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Password
              </label>
              <div className="kl-input-wrap">
                <Lock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[14px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[13px] pt-1">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
                <input type="checkbox" className="rounded border-input accent-[oklch(0.62_0.085_65)]" />
                Remember device
              </label>
              <a href="#" className="text-accent font-medium hover:underline underline-offset-4 decoration-accent/40">
                Recover access
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-cinematic group w-full mt-3 py-3.5 text-[14px] tracking-wide"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Authenticating…
                </span>
              ) : (
                <>
                  Enter System
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 text-[10.5px] text-muted-foreground pt-4 font-mono tracking-[0.14em] uppercase">
              <Shield className="h-3 w-3" strokeWidth={1.75} />
              <span>Encrypted</span>
              <span className="h-px w-3 bg-border" />
              <span>Internal Access Only</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
