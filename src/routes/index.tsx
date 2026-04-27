import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Command, Lock, Mail, Shield } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in - KosherLending AI Content OS" },
      { name: "description", content: "Secure internal access to the KosherLending AI Content Operating System." },
    ],
  }),
});

function LoginPage() {
  const [authNotice, setAuthNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthNotice("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthNotice("Login is temporarily disabled while backend authentication is being integrated.");
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-[58%] xl:w-[55%] bg-gradient-cinematic text-white relative overflow-hidden texture-grain">
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none bg-grid-fine" />
        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
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
          <div className="space-y-4 max-w-xl">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent/90 font-medium">
              Private AI Infrastructure
            </div>
            <h2 className="font-display text-[44px] xl:text-[60px] font-light leading-[1.02] tracking-[-0.028em]">
              Private AI infrastructure
              <br />
              for mortgage content
              <br />
              operations.
            </h2>
            <p className="text-white/55 text-[15px] leading-[1.75] font-light max-w-md">
              A unified command system for knowledge, rules, content generation, DM keyword routing, review, calendar, and export.
            </p>
          </div>
          <div className="flex items-end justify-between text-[11px] text-white/40 font-mono tracking-wider">
            <div>Jeffrey Ben-Davis - NMLS #320841 - Equal Housing Lender</div>
            <div className="flex items-center gap-2 text-accent/70">
              <span className="h-1 w-1 rounded-full bg-accent/70 animate-pulse" />
              SECURE / TLS 1.3
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 relative texture-grain">
        <div className="absolute inset-0 bg-grid-architectural opacity-[0.55] pointer-events-none" />
        <div className="relative w-full max-w-[420px]">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-md surface-charcoal border border-border">
              <Command className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div className="font-display font-medium tracking-tight">KosherLending AI Content OS</div>
          </div>

          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-px w-7 bg-accent/70" />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent font-medium">Restricted Access</span>
          </div>
          <h1 className="font-display text-[40px] font-light tracking-[-0.025em] leading-[1.04]">Sign in to the system</h1>
          <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed max-w-[380px]">
            Authorized personnel only. All sessions are monitored and audit-logged against compliance policy.
          </p>

          <form onSubmit={submit} className="mt-9 space-y-4">
            <div>
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2">Email address</label>
              <div className="kl-input-wrap">
                <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-[14px]" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2">Password</label>
              <div className="kl-input-wrap">
                <Lock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-[14px]" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[13px] pt-1">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
                <input type="checkbox" className="rounded border-input accent-[oklch(0.62_0.085_65)]" />
                Remember device
              </label>
              <Link to="/register" className="text-accent font-medium hover:underline underline-offset-4 decoration-accent/40">
                Create account
              </Link>
            </div>

            <button type="submit" disabled={loading} className="btn-cinematic group w-full mt-3 py-3.5 text-[14px] tracking-wide">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <>
                  Enter System
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </>
              )}
            </button>

            {authNotice && (
              <p className="rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-[12px] text-warning">{authNotice}</p>
            )}

            <div className="flex items-center justify-center gap-3 text-[10.5px] text-muted-foreground pt-4 font-mono tracking-[0.14em] uppercase">
              <Shield className="h-3 w-3" strokeWidth={1.75} />
              <span>Encrypted</span>
              <span className="h-px w-3 bg-border" />
              <span>Internal Access Only</span>
            </div>
            <p className="text-center text-[12px] text-muted-foreground">
              Need an account?{" "}
              <Link to="/register" className="text-accent hover:underline underline-offset-2">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

