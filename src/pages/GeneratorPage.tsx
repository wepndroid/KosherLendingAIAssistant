import { useState } from "react";
import {
  Sparkles, ChevronDown, Wand2, BookOpen, FileText, MessageSquare,
  CheckCircle2, Loader2, Edit3, RefreshCw, Save, CalendarPlus, Download, Quote,
} from "lucide-react";
import {
  PILLARS, PLATFORMS, DURATIONS, SOURCE_BOOKS, DM_KEYWORDS_LIST,
  CONTENT_GOALS, GENERATED_CONTENT, BRAND,
} from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";

const STEPS = [
  "Retrieving relevant source passages",
  "Selecting best source frameworks",
  "Generating hook and script",
  "Mapping DM keyword",
  "Checking duplicate risk",
  "Validating script length",
  "Preparing captions and export format",
  "Saving draft to review queue",
];

export function GeneratorPage() {
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<typeof GENERATED_CONTENT[number] | null>(null);
  const [duration, setDuration] = useState("45 seconds");
  const [topic, setTopic] = useState("Why buyers overpay when they fear losing a house");

  const generate = () => {
    setGenerating(true);
    setStep(0);
    setResult(null);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStep(i);
      if (i >= STEPS.length) {
        clearInterval(interval);
        setGenerating(false);
        setResult(GENERATED_CONTENT[0]);
      }
    }, 350);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">
        <div className="kl-card p-7">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-md surface-charcoal border border-sidebar-border">
              <Wand2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <div className="kl-eyebrow text-accent">Generation Engine</div>
              <h2 className="font-display text-[19px] font-medium tracking-tight mt-0.5">
                Configure content package
              </h2>
              <p className="text-[12.5px] text-muted-foreground mt-0.5">
                All fields feed the generation engine and source retriever
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Content Pillar"><Select options={PILLARS} /></Field>
            <Field label="Target Platform"><Select options={PLATFORMS} /></Field>
            <Field label="Video Duration">
              <Select options={DURATIONS} value={duration} onChange={setDuration} />
            </Field>
            <Field label="Content Goal"><Select options={CONTENT_GOALS} /></Field>

            <Field label="Topic" full>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="kl-input"
                placeholder="Why buyers overpay when they fear losing a house"
              />
            </Field>

            <Field label="Source Strategy">
              <Select options={["Auto-select best sources", "Choose specific books", "Use content calendar reference", "Use DM deliverable reference"]} />
            </Field>
            <Field label="DM Keyword">
              <Select options={["Auto-select", ...DM_KEYWORDS_LIST]} />
            </Field>

            <Field label="Source Books (multi-select)" full>
              <div className="flex flex-wrap gap-1.5">
                {SOURCE_BOOKS.map((b, i) => (
                  <button
                    type="button"
                    key={b}
                    className={`kl-chip ${i < 2 ? "kl-chip-active" : ""}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Variations">
              <div className="flex gap-1.5">
                {["1", "3", "5"].map((n, i) => (
                  <button
                    type="button"
                    key={n}
                    className={`flex-1 rounded-md border px-3 py-2 text-[13px] font-mono font-medium transition-all ${
                      i === 0
                        ? "border-accent/50 bg-accent/[0.08] text-accent shadow-[inset_0_1px_0_oklch(1_0_0_/_0.4)]"
                        : "border-border bg-transparent text-muted-foreground hover:border-accent/30 hover:text-foreground"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <button
            onClick={generate}
            disabled={generating}
            className="btn-cinematic mt-7 w-full py-3.5 text-[13.5px]"
          >
            {generating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Generating package…
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
                Generate Content Package
              </>
            )}
          </button>
        </div>

        {/* Generation progress */}
        {(generating || step > 0) && (
          <div className="kl-card p-6">
            <div className="kl-eyebrow text-accent mb-1">Pipeline</div>
            <h3 className="font-display text-[16px] font-medium tracking-tight mb-4">
              Generation process
            </h3>
            {generating && <div className="progress-indeterminate mb-5" />}
            <ol className="space-y-2.5">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step && generating;
                return (
                  <li key={s} className="flex items-center gap-3 text-[13px]">
                    <div className={`flex h-6 w-6 items-center justify-center rounded shrink-0 border transition-all ${
                      done
                        ? "bg-success/15 text-success border-success/30"
                        : active
                          ? "bg-accent/10 text-accent border-accent/30"
                          : "bg-secondary/50 text-muted-foreground border-border"
                    }`}>
                      {done
                        ? <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                        : active
                          ? <Loader2 className="h-3 w-3 animate-spin" strokeWidth={2} />
                          : <span className="font-mono text-[9px]">0{i + 1}</span>}
                    </div>
                    <span className={done ? "text-foreground/70" : active ? "text-foreground font-medium" : "text-muted-foreground"}>
                      {s}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="kl-card kl-card-elevated overflow-hidden p-0 border-accent/30">
            <div className="surface-charcoal text-white px-6 py-4 flex items-center justify-between border-b border-sidebar-border relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-fine opacity-30" />
              <div className="relative flex items-center gap-2.5 text-[13px] font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded border border-accent/30 bg-accent/15">
                  <CheckCircle2 className="h-3 w-3 text-accent" strokeWidth={2} />
                </div>
                <div>
                  <div className="kl-eyebrow text-accent">Generated</div>
                  <div className="text-[13px]">Package ready for review</div>
                </div>
              </div>
              <div className="relative flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                <span className="rounded-sm border border-white/15 bg-white/[0.06] px-2 py-0.5">{result.platform}</span>
                <span className="rounded-sm border border-white/15 bg-white/[0.06] px-2 py-0.5">{result.duration}</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <Label icon={MessageSquare}>Hook</Label>
                <p className="mt-2 text-[19px] font-display font-normal italic leading-snug text-foreground/90">
                  "{result.hook}"
                </p>
              </div>

              <div className="rounded-md border border-border bg-transparent border-l-2 border-l-accent/70 p-4">
                <div className="flex items-center gap-2">
                  <Quote className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                  <div className="kl-eyebrow text-accent">Source Citation</div>
                </div>
                <div className="mt-2 text-[13.5px]">
                  <span className="font-medium">{result.sourceBook}</span>
                  <span className="text-muted-foreground"> · Framework: </span>
                  <span className="font-medium">{result.framework}</span>
                </div>
                <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{result.sourceReason}</p>
              </div>

              <div>
                <Label icon={FileText}>
                  Full script
                  <span className="text-muted-foreground font-normal normal-case ml-1.5">· {result.wordCount} words</span>
                </Label>
                <p className="mt-2 text-[13.5px] leading-relaxed whitespace-pre-line text-foreground/85">{result.script}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Block label="On-screen text">{result.onScreen}</Block>
                <Block label="Production brief">{result.productionBrief}</Block>
                <Block label="Caption">{result.caption}</Block>
                <Block label="CTA / DM Keyword">
                  <span className="font-mono font-semibold text-accent tracking-wider">{result.dmKeyword}</span>
                  <span className="text-muted-foreground"> → {result.deliverable}</span>
                </Block>
              </div>

              <div>
                <Label icon={BookOpen}>Hashtags</Label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {result.hashtags.map((h) => (
                    <span key={h} className="kl-tag kl-tag-mono">{h}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="kl-eyebrow mb-2.5">Validation</div>
                <div className="flex flex-wrap gap-1.5">
                  <StatusBadge label="Script length valid" variant="approved" />
                  <StatusBadge label="DM keyword mapped" variant="approved" />
                  <StatusBadge label="Source citation included" variant="approved" />
                  <StatusBadge label="Compliance footer included" variant="approved" />
                  <StatusBadge label={`Duplicate risk: ${result.duplicateRisk}`} variant="low-risk" />
                </div>
              </div>

              <div className="rounded-md bg-secondary/40 p-3 text-[11.5px] text-muted-foreground border border-border leading-relaxed font-mono">
                {BRAND.compliance}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <Btn icon={CheckCircle2} primary>Approve</Btn>
                <Btn icon={Edit3}>Edit</Btn>
                <Btn icon={RefreshCw}>Regenerate</Btn>
                <Btn icon={Save}>Save to History</Btn>
                <Btn icon={CalendarPlus}>Send to Calendar</Btn>
                <Btn icon={Download}>Export</Btn>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right preview/settings */}
      <div className="space-y-6">
        <div className="kl-card p-6">
          <div className="kl-eyebrow text-accent mb-1">Output Schema</div>
          <h3 className="font-display text-[16px] font-medium tracking-tight mb-3">Expected output</h3>
          <ul className="space-y-2 text-[13px]">
            {["Hook", "Script", "On-screen text", "Production brief", "Captions", "CTA", "Hashtags"].map((x, i) => (
              <li key={x} className="flex items-center gap-2.5 text-foreground/80">
                <span className="font-mono text-[10px] text-accent w-5">0{i + 1}</span>
                <CheckCircle2 className="h-3 w-3 text-accent shrink-0" strokeWidth={2} />
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="kl-card p-6">
          <div className="kl-eyebrow text-accent mb-1">Constraints</div>
          <h3 className="font-display text-[16px] font-medium tracking-tight">Script word target</h3>
          <p className="text-[12px] text-muted-foreground mb-3 mt-0.5">Based on selected duration</p>
          <div className="space-y-1.5 text-[13px]">
            {[["30 sec", "70–85"], ["45 sec", "95–115"], ["60 sec", "120–140"]].map(([d, w]) => (
              <div
                key={d}
                className={`flex items-center justify-between rounded-md px-3 py-2 border transition-colors ${
                  duration.startsWith(d.split(" ")[0])
                    ? "bg-accent/[0.08] border-accent/40"
                    : "bg-transparent border-border"
                }`}
              >
                <span className="font-medium">{d}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{w} words</span>
              </div>
            ))}
          </div>
        </div>

        <div className="kl-card p-6">
          <div className="kl-eyebrow text-accent mb-1">Compliance</div>
          <h3 className="font-display text-[16px] font-medium tracking-tight mb-3">Mandatory footer</h3>
          <div className="rounded-md border border-border bg-transparent p-3 text-[11.5px] leading-relaxed text-muted-foreground font-mono">
            {BRAND.compliance}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({ options, value, onChange }: { options: string[]; value?: string; onChange?: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="kl-input appearance-none pr-9"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
    </div>
  );
}

function Label({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      <Icon className="h-3 w-3" strokeWidth={1.75} /> {children}
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-transparent p-3.5">
      <div className="kl-eyebrow text-[9.5px] mb-1.5">{label}</div>
      <div className="text-[12.5px] text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}

function Btn({ children, icon: Icon, primary }: { children: React.ReactNode; icon: React.ElementType; primary?: boolean }) {
  return (
    <button type="button" className={primary ? "btn-cinematic" : "btn-cinematic-secondary"}>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {children}
    </button>
  );
}

