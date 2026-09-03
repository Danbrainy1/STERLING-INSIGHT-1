import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ExternalLink,
  Search,
  Bookmark,
  BookmarkCheck,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  Filter,
  Sparkles,
  BookOpen,
  FileCheck2,
  X,
  Send,
  GraduationCap,
  Globe2,
  Coins,
  Rocket,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ThreeDCard } from "@/components/site/ThreeDCard";
import {
  REAL_OPPORTUNITIES,
  type OpportunityItem,
  type OpportunityCategory,
  type OpportunityScope,
} from "@/data/opportunities-data";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      {
        title: "Verified Scholarships, Research Grants & Startup Funding | Sterling Insight",
      },
      {
        name: "description",
        content:
          "Explore active local and international scholarships (MSc & PhD), research grants, startup seed capital, and fellowships with verified direct official links.",
      },
      {
        property: "og:title",
        content: "Verified Scholarships, Research Grants & Startup Funding | Sterling Insight",
      },
      {
        property: "og:description",
        content:
          "Direct access to official portals for Chevening, Gates Cambridge, PTDF, TEF, DAAD, Y Combinator, and international research funding.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

const CATEGORIES: { label: string; value: OpportunityCategory | "All" }[] = [
  { label: "All Opportunities", value: "All" },
  { label: "Master & PhD Scholarships", value: "Scholarship (MSc & PhD)" },
  { label: "Research & Postdoc Grants", value: "Research & Postdoc Grant" },
  { label: "Startup & SME Grants", value: "Startup & SME Grant" },
  { label: "Fellowships", value: "Fellowship" },
  { label: "Conferences & Symposia", value: "Conference & Symposium" },
];

const SCOPES: { label: string; value: OpportunityScope | "All" }[] = [
  { label: "All (Global & Local)", value: "All" },
  { label: "Local (Nigeria & Africa)", value: "Local (Nigeria & Africa)" },
  { label: "International (Global)", value: "International (Global)" },
];

const COVERAGE_FILTERS = [
  "All Coverage",
  "Fully Funded",
  "Grant Award",
  "Equity-Free Investment",
  "Salaried",
  "Partial / Fee Waiver",
];

export function OpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | "All">("All");
  const [selectedScope, setSelectedScope] = useState<OpportunityScope | "All">("All");
  const [selectedCoverage, setSelectedCoverage] = useState<string>("All Coverage");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("sterling_saved_opportunities");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeModalItem, setActiveModalItem] = useState<OpportunityItem | null>(null);
  const [sopAssistanceRequested, setSopAssistanceRequested] = useState(false);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => {
      const isSaved = prev.includes(id);
      const updated = isSaved ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("sterling_saved_opportunities", JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage error:", err);
      }
      if (!isSaved) {
        toast.success("Opportunity bookmarked!", {
          description: "Saved to your academic application shortlist.",
        });
      } else {
        toast.info("Removed from shortlist.");
      }
      return updated;
    });
  };

  const filteredOpportunities = useMemo(() => {
    return REAL_OPPORTUNITIES.filter((opp) => {
      const matchesCategory = selectedCategory === "All" || opp.category === selectedCategory;
      const matchesScope = selectedScope === "All" || opp.scope === selectedScope;
      const matchesCoverage =
        selectedCoverage === "All Coverage" || opp.coverageType === selectedCoverage;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        opp.title.toLowerCase().includes(query) ||
        opp.institution.toLowerCase().includes(query) ||
        opp.location.toLowerCase().includes(query) ||
        opp.description.toLowerCase().includes(query) ||
        opp.category.toLowerCase().includes(query) ||
        opp.scope.toLowerCase().includes(query);

      return matchesCategory && matchesScope && matchesCoverage && matchesSearch;
    });
  }, [selectedCategory, selectedScope, selectedCoverage, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Galvanized Hero with Authentic University/Research Imagery & Telemetry */}
      <PageHero
        eyebrow="Global & Local Academic Registry"
        title="Verified Scholarships, Research Grants & Startup Funding"
        description="Search 30+ verified active calls open for application with direct government, university and investor portals. From Nigerian national calls (PTDF, TEF, NLNG, LSETF) to elite international graduate scholarships and venture grants."
        backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
        tag="Live Portals Verified"
        stats={[
          { value: "30+", label: "Verified Calls" },
          { value: "100%", label: "Direct Portals" },
          { value: "Local & Global", label: "Pan-African & Worldwide" },
          { value: "$15M+", label: "Funding Available" },
        ]}
      />

      {/* Interactive Controls & Filters Bar */}
      <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-5 sm:px-6">
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-border shadow-xl backdrop-blur-xl bg-card/85">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by grant, university, scholarship, startup..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground w-full md:w-auto justify-between md:justify-end">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                {filteredOpportunities.length} Active Verified Calls
              </span>
              {savedIds.length > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary font-semibold flex items-center gap-1">
                  <BookmarkCheck className="size-3.5" />
                  {savedIds.length} Saved in Shortlist
                </span>
              )}
            </div>
          </div>

          {/* Scope Selector: Local vs International */}
          <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
              <Globe2 className="size-3.5 text-primary" /> Scope:
            </span>
            {SCOPES.map((scp) => {
              const active = selectedScope === scp.value;
              return (
                <button
                  key={scp.label}
                  type="button"
                  onClick={() => setSelectedScope(scp.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent"
                  }`}
                >
                  {scp.label}
                </button>
              );
            })}
          </div>

          {/* Category Tabs */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-border/50 pt-3">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border"
                  }`}
                >
                  {cat.label}
                  {active && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 rounded-xl bg-primary -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Coverage Sub-filter */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground font-medium mr-1 flex items-center gap-1">
              <Filter className="size-3" /> Coverage:
            </span>
            {COVERAGE_FILTERS.map((cov) => (
              <button
                key={cov}
                type="button"
                onClick={() => setSelectedCoverage(cov)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedCoverage === cov
                    ? "bg-foreground text-background font-semibold"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cov}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Verified Opportunities */}
      <section className="py-14 px-5 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" /> Verified Active Application Window
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1 text-foreground">
              {selectedCategory === "All"
                ? selectedScope === "All"
                  ? "Featured Local & International Calls"
                  : `${selectedScope} Opportunities`
                : selectedCategory}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-md">
            Every call includes direct links to official government, university, or foundation
            application portals without paywalls.
          </p>
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="glass-panel text-center py-16 px-6 rounded-3xl border border-dashed border-border">
            <GraduationCap className="size-12 mx-auto text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-bold">No opportunities match your current filters</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Try resetting your search query or switching scope to browse our full directory.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedScope("All");
                setSelectedCoverage("All Coverage");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp, i) => {
              const isSaved = savedIds.includes(opp.id);
              return (
                <Reveal key={opp.id} delay={(i % 3) * 60}>
                  <ThreeDCard
                    intensity={8}
                    glareOpacity={0.12}
                    className="h-full rounded-3xl border border-border/80 bg-card/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Realistic Opportunity Photo Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-muted">
                      <img
                        src={opp.imageUrl}
                        alt={opp.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md bg-black/60 text-white border border-white/20 shadow-sm flex items-center gap-1">
                          {opp.scope === "Local (Nigeria & Africa)" ? "🇳🇬 Local" : "🌍 Global"} •{" "}
                          {opp.category}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(opp.id, e)}
                          title={isSaved ? "Remove from shortlist" : "Bookmark opportunity"}
                          className={`size-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                            isSaved
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-black/50 text-white/80 hover:text-white hover:bg-black/70"
                          }`}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="size-4" />
                          ) : (
                            <Bookmark className="size-4" />
                          )}
                        </button>
                      </div>

                      {/* Bottom Image Info */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              opp.status === "Closing Soon"
                                ? "bg-amber-500 text-white"
                                : opp.status === "Always Open / Rolling"
                                  ? "bg-cyan-500 text-white"
                                  : "bg-emerald-500 text-white"
                            }`}
                          >
                            {opp.status}
                          </span>
                          {opp.fundingAmount && (
                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary text-primary-foreground truncate">
                              {opp.fundingAmount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/95 font-medium truncate flex items-center gap-1.5">
                          <Building2 className="size-3.5 text-primary shrink-0" />
                          {opp.institution}
                        </p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-bold text-base font-display text-foreground line-clamp-2 hover:text-primary transition-colors">
                          {opp.title}
                        </h3>

                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                            {opp.location}
                          </span>
                        </div>

                        {/* Coverage Highlight Box */}
                        <div className="mt-3 rounded-2xl bg-secondary/50 p-3 text-xs space-y-1.5 border border-border/70">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-muted-foreground text-[11px]">Type:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-right truncate">
                              {opp.coverageType}
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-foreground/90 line-clamp-1">
                            {opp.coverage}
                          </p>
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/50 text-[11px]">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3 text-muted-foreground" /> Deadline:
                            </span>
                            <span className="font-semibold text-foreground truncate">
                              {opp.deadline}
                            </span>
                          </div>
                        </div>

                        <p className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {opp.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-border/60 flex items-center gap-2">
                        {/* Direct Official Link */}
                        <a
                          href={opp.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_-4px_rgba(0,102,204,0.4)]"
                        >
                          Official Portal
                          <ExternalLink className="size-3.5" />
                        </a>

                        {/* Quick View / Guidance Details */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalItem(opp);
                            setSopAssistanceRequested(false);
                          }}
                          className="px-3 py-2.5 rounded-xl border border-border text-xs font-medium hover:bg-secondary transition-colors text-foreground"
                          title="View complete eligibility, benefits & requirements"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </ThreeDCard>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* Guided Application & Institutional Support Banner with Inspiring Academic Image */}
      <section className="px-5 py-12 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
              alt="Academic collaboration"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover opacity-60 dark:opacity-35 filter saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/45 dark:from-card/95 dark:via-card/90 dark:to-card/70" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary uppercase tracking-wider">
              Sterling Research & Advisory Council
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-3 text-foreground">
              Boost your award chances with peer-reviewed proposal reviews
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Global scholarships (Chevening, Gates Cambridge, DAAD, Commonwealth) and major grant
              evaluators (PTDF, TEF, Wellcome Trust, EIC) screen candidates on narrative clarity,
              statistical rigor, and real-world impact. Sterling’s PhD advisors and data analysts
              polish your drafts before you hit submit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/services"
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-md flex items-center gap-1.5"
              >
                <Rocket className="size-4" />
                Book SOP & Proposal Review
              </a>
              <a
                href="/research"
                className="px-5 py-3 rounded-xl glass-panel text-foreground text-xs font-semibold hover:border-primary transition-all border border-border flex items-center gap-1.5"
              >
                <BookOpen className="size-4" />
                Explore Literature & Data
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Opportunity Modal Dialog */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-3xl rounded-3xl bg-card border border-border shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header Image & Close */}
              <div className="relative h-48 sm:h-56 w-full shrink-0 bg-muted">
                <img
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-4 right-4 size-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="size-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {activeModalItem.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary/80 text-foreground text-xs font-medium border border-border/60">
                      {activeModalItem.scope}
                    </span>
                    {activeModalItem.fundingAmount && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold">
                        {activeModalItem.fundingAmount}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display mt-2 text-foreground">
                    {activeModalItem.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-primary" />
                    {activeModalItem.institution} • {activeModalItem.location}
                  </p>
                </div>
              </div>

              {/* Scrollable Details */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    About This Opportunity
                  </h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {activeModalItem.description}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="rounded-2xl bg-secondary/40 p-5 border border-border/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" /> What Is Covered & Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {activeModalItem.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                        <span className="text-primary font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility & Requirements */}
                <div className="rounded-2xl bg-secondary/40 p-5 border border-border/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-1.5">
                    <FileCheck2 className="size-4 text-foreground" /> Eligibility Criteria &
                    Checklist
                  </h4>
                  <ul className="space-y-2">
                    {activeModalItem.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Area */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      Application Deadline:
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {activeModalItem.deadline}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={activeModalItem.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-all"
                    >
                      Visit Official Portal
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
