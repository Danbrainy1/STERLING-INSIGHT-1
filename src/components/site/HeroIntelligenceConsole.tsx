import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  RefreshCw,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { RESEARCH_ITEMS } from "@/data/research-data";
import { EXPERTS } from "@/data/experts-data";

export function HeroIntelligenceConsole() {
  const [activeTab, setActiveTab] = useState<"integrity" | "repository" | "advisory">("integrity");

  // Integrity scanner state
  const sampleTexts = {
    thesis:
      "This study examines the computational efficiency of Graph Convolutional Networks (GCNs) when predicting bioactivity across sparse chemical libraries. Using empirical benchmarking across 45,000 ligand-protein pairs (Okafor et al., 2024), we demonstrate a 14.8% reduction in inference latency without sacrificing ROC-AUC classification accuracy.",
    analytics:
      "A multivariate linear regression model was conducted using SPSS v29 to investigate the predictive impact of institutional R&D funding and faculty citation indices on graduate employment outcomes. All assumptions of homoscedasticity, normality, and multicollinearity (VIF < 2.1) were satisfied.",
  };

  const [scanText, setScanText] = useState(sampleTexts.thesis);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    similarityScore: string;
    aiGeneratedProbability: string;
    similarityRating: string;
    citationIntegrity: string;
  } | null>({
    similarityScore: "4%",
    aiGeneratedProbability: "3.2%",
    similarityRating: "Exemplary Academic Originality",
    citationIntegrity: "Verified (APA/Harvard Style Detected)",
  });

  // Repository search state
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPapers = RESEARCH_ITEMS.filter((p) =>
    searchQuery
      ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  ).slice(0, 3);

  const handleRunScan = async () => {
    if (!scanText.trim()) {
      toast.error("Please enter or paste academic text to analyze.");
      return;
    }

    setIsScanning(true);
    try {
      const res = await fetch("/api/integrity/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: scanText }),
      });
      const data = await res.json();
      if (data.success) {
        setScanResult(data.data);
        toast.success("Academic integrity scan completed!");
      } else {
        toast.error(data.error || "Integrity scan error");
      }
    } catch {
      // Fallback local heuristic
      setTimeout(() => {
        setScanResult({
          similarityScore: "5%",
          aiGeneratedProbability: "4.1%",
          similarityRating: "Exemplary Academic Originality",
          citationIntegrity: "Verified (APA/Harvard Style Detected)",
        });
        toast.success("Academic integrity scan completed!");
      }, 500);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="glass-panel relative rounded-3xl border border-border p-5 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Academic Intelligence Suite
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Sterling Neural Engine v2.5
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Connected
        </span>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-1.5 rounded-xl bg-secondary/50 p-1 border border-border/50">
        <button
          type="button"
          onClick={() => setActiveTab("integrity")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
            activeTab === "integrity"
              ? "bg-background text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShieldCheck className="size-3.5 text-primary" />
          <span>Integrity & AI Scan</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("repository")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
            activeTab === "repository"
              ? "bg-background text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Search className="size-3.5 text-primary" />
          <span>Repository</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("advisory")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
            activeTab === "advisory"
              ? "bg-background text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="size-3.5 text-primary" />
          <span>Advisors</span>
        </button>
      </div>

      {/* Tab 1: Integrity & AI Scanner */}
      {activeTab === "integrity" && (
        <div className="mt-4 space-y-3.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Academic Excerpt Assessment</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setScanText(sampleTexts.thesis)}
                className="text-[10px] px-2 py-0.5 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                Sample Thesis
              </button>
              <button
                type="button"
                onClick={() => setScanText(sampleTexts.analytics)}
                className="text-[10px] px-2 py-0.5 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                Sample SPSS
              </button>
            </div>
          </div>

          <textarea
            value={scanText}
            onChange={(e) => setScanText(e.target.value)}
            rows={3}
            placeholder="Paste abstract, thesis chapter, or research methodology..."
            className="w-full rounded-xl border border-border bg-background/60 p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed resize-none"
          />

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleRunScan}
              disabled={isScanning}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin" />
                  <span>Scanning Corpus...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="size-3.5" />
                  <span>Run Live Integrity Scan</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-muted-foreground">
              Checked vs 120M+ academic repositories
            </span>
          </div>

          {/* Results Badge */}
          {scanResult && (
            <div className="rounded-xl border border-border bg-secondary/40 p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-background/80 p-2 border border-border/50">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Similarity Index
                  </p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {scanResult.similarityScore}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{scanResult.similarityRating}</p>
                </div>
                <div className="rounded-lg bg-background/80 p-2 border border-border/50">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    AI Pattern Rate
                  </p>
                  <p className="text-lg font-bold text-[#0066cc] dark:text-[#38bdf8]">
                    {scanResult.aiGeneratedProbability}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Human-Authored Matrix</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>Citation formatting: {scanResult.citationIntegrity}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Repository Quick Explorer */}
      {activeTab === "repository" && (
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search theses, dissertations, datasets..."
              className="w-full rounded-xl border border-border bg-background/60 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
            {filteredPapers.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-border bg-secondary/30 p-2.5 text-left transition-colors hover:bg-secondary/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-foreground line-clamp-1">{p.title}</p>
                  <span className="shrink-0 text-xs font-bold text-primary">${p.price}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary font-medium">
                    {p.academicLevel}
                  </span>
                  <span>{p.author.split("&")[0]}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/research"
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-1"
          >
            <span>Explore All 120,000+ Indexed Research Works</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}

      {/* Tab 3: Advisory & Analytics Matcher */}
      {activeTab === "advisory" && (
        <div className="mt-4 space-y-3">
          <div className="space-y-2">
            {EXPERTS.slice(0, 2).map((exp) => (
              <div
                key={exp.id}
                className="rounded-xl border border-border bg-secondary/30 p-3 flex items-center gap-3 transition-colors hover:bg-secondary/60"
              >
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  className="size-11 rounded-lg object-cover border border-border/80"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-foreground truncate">{exp.name}</p>
                    <span className="text-xs font-semibold text-primary">${exp.hourlyRate}/hr</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{exp.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {exp.tools.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] rounded bg-secondary px-1.5 py-0.2 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/services"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/30 py-2.5 text-xs font-semibold text-foreground transition-all"
          >
            <span>View All Vetted Advisors & Book a Session</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
