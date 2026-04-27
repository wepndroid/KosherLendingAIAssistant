import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { Lock, Mail, Shield, Command, ArrowRight, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Register â€” KosherLending AI Content OS" },
      { name: "description", content: "Create an internal account for the KosherLending AI Content Operating System." },
    ],
  }),
});

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("");

    if (password !== confirmPassword) {
      setNotice("Password confirmation does not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotice("Registration is temporarily disabled while backend authentication is being integrated.");
    }, 600);
  };

  const modules = [
    "Knowledge",
    "Rules",
    "Content Generation",
    "DM Keyword Routing",
    "Review",
    "Calendar",
    "Export",
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-[58%] xl:w-[55%] bg-gradient-cinematic text-white relative overflow-hidden texture-grain">
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, oklch(0.08 0.010 250 / 0.65) 100%)",
          }}
        />
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
        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        <div className="absolute top-12 left-12 right-12 h-px bg-white/[0.06]" />
        <div className="absolute bottom-12 left-12 right-12 h-px bg-white/[0.06]" />

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

          <div className="space-y-9 max-w-xl">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <span className="h-px w-10 bg-accent/70" />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent/90 font-medium">
                  Private AI Infrastructure
                </span>
              </div>
              <h2 className="font-display text-[44px] xl:text-[60px] font-light leading-[1.02] tracking-[-0.028em]">
                Create your secure
                <br />
                operator access
                <br />
                for mortgage content.
              </h2>
            </div>
            <p className="text-white/55 text-[15px] leading-[1.75] font-light max-w-md">
              Account onboarding for internal team members managing knowledge, generation,
              review, and distribution workflows.
            </p>

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

          <div className="flex items-end justify-between text-[11px] text-white/40 font-mono tracking-wider">
            <div>Jeffrey Ben-Davis Â· NMLS #320841 Â· Equal Housing Lender</div>
            <div className="flex items-center gap-2 text-accent/70">
              <span className="h-1 w-1 rounded-full bg-accent/70 animate-pulse" />
              SECURE / TLS 1.3
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 relative texture-grain">
        <div className="absolute inset-0 bg-grid-architectural opacity-[0.55] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, oklch(0.62 0.085 65 / 0.10), transparent 60%)",
          }}
        />
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
            Register an account
          </h1>
          <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed max-w-[380px]">
            Create an internal account for team access. Registration is currently staged for backend integration.
          </p>

          <form onSubmit={submit} className="mt-9 space-y-4">
            <div>
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Full name
              </label>
              <div className="kl-input-wrap">
                <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-[14px]"
                />
              </div>
            </div>

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

            <div>
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Confirm password
              </label>
              <div className="kl-input-wrap">
                <Lock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-[14px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-cinematic group w-full mt-3 py-3.5 text-[14px] tracking-wide"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating accountâ€¦
                </span>
              ) : (
                <>
                  Register
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </>
              )}
            </button>

            {notice && (
              <p className="rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-[12px] text-warning">
                {notice}
              </p>
            )}

            <div className="flex items-center justify-center gap-3 text-[10.5px] text-muted-foreground pt-4 font-mono tracking-[0.14em] uppercase">
              <Shield className="h-3 w-3" strokeWidth={1.75} />
              <span>Encrypted</span>
              <span className="h-px w-3 bg-border" />
              <span>Internal Access Only</span>
            </div>
            <p className="text-center text-[12px] text-muted-foreground">
              Already have an account?{" "}
              <Link to="/" className="text-accent hover:underline underline-offset-2">
                Back to sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
