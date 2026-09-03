import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Upload,
  Star,
  Download,
  Eye,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Filter,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { ThreeDCard } from "@/components/site/ThreeDCard";
import { RESEARCH_ITEMS, type ResearchItem } from "@/data/research-data";
import { ResearchCheckoutModal } from "@/components/site/ResearchCheckoutModal";
import { PublishResearchModal } from "@/components/site/PublishResearchModal";
import { useAuth } from "@/lib/auth-context";
import { formatMoney } from "@/lib/currency";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Repository Marketplace | Sterling Insight" },
      {
        name: "description",
        content:
          "Search, buy or rent theses, dissertations, journals, datasets and research templates. Researchers upload work, set pricing and earn royalties.",
      },
      { property: "og:title", content: "Research Repository Marketplace | Sterling Insight" },
      {
        name: "og:description",
        content:
          "A global marketplace for academic research: projects, journals, datasets and templates with secure downloads and royalties.",
      },
    ],
  }),
  component: ResearchPage,
});

const categories = [
  "All Categories",
  "Artificial Intelligence",
  "Data Science",
  "Economics & Finance",
  "Environment & Climate",
  "Education & Social Sciences",
];

const academicLevels = [
  "All Levels",
  "PhD Dissertation",
  "Masters Thesis",
  "Undergraduate",
  "Dataset",
  "Questionnaire & Template",
];

function ResearchPage() {
  const { activeCurrency } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [allResearchItems, setAllResearchItems] = useState<ResearchItem[]>(RESEARCH_ITEMS);

  // Fetch live published items from API
  useEffect(() => {
    fetch("/api/research")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          // Merge API items, avoiding duplicates
          setAllResearchItems((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newUnique = data.data.filter((item: ResearchItem) => !existingIds.has(item.id));
            return [...newUnique, ...prev];
          });
        }
      })
      .catch((e) => console.warn("API research fetch error:", e));
  }, []);

  const handleNewPublication = (
    newItem: Partial<ResearchItem> & {
      title: string;
      price: number;
      category: string;
      academicLevel: string;
      abstract: string;
      author: string;
    },
  ) => {
    const formattedItem: ResearchItem = {
      id: newItem.id || `res_${Date.now()}`,
      title: newItem.title,
      category: newItem.category,
      academicLevel: newItem.academicLevel,
      price: newItem.price,
      rating: 5.0,
      downloads: 1,
      abstract: newItem.abstract,
      methodology: newItem.methodology || "Empirical and quantitative analysis framework.",
      keyFindings: [
        "Verified empirical data models and statistical correlation significance.",
        "Comprehensive academic literature review and hypothesis testing.",
      ],
      tableOfContents: [
        "Chapter 1: Introduction & Problem Statement",
        "Chapter 2: Literature Review",
        "Chapter 3: Methodology & Statistical Architecture",
        "Chapter 4: Data Presentation & Analysis",
        "Chapter 5: Discussion, Conclusion & Recommendations",
      ],
      author: newItem.author,
      institution: newItem.institution || "Sterling Academic Network",
      format: newItem.format || "PDF Manuscript & Datasets",
      pages: 120,
      citations: 45,
      fileSize: newItem.fileSize || "14.2 MB",
    };

    setAllResearchItems((prev) => [formattedItem, ...prev]);
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
  };

  // Filter items
  const filteredItems = allResearchItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || item.academicLevel === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div>
      <ResearchCheckoutModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      <PublishResearchModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublished={handleNewPublication}
      />

      <PageHero
        eyebrow="Module A · Peer-Reviewed Research Repository"
        title="Curated, integrity-checked research and datasets"
        description="Search, buy or rent verified theses, dissertations, questionnaires, and econometric datasets across 20+ disciplines. Every upload is screened for methodological validity and plagiarism."
        backgroundImage="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2000&q=85"
        tag="120K+ Papers & Datasets"
        stats={[
          { value: "120K+", label: "Verified Papers" },
          { value: "100%", label: "Peer-Reviewed" },
          { value: "45+", label: "Academic Disciplines" },
          { value: "Instant", label: "Direct Download" },
        ]}
      />

      <section className="pb-24 px-5 sm:px-6 max-w-6xl mx-auto space-y-8">
        {/* Search & Filter Header Bar */}
        <div className="glass-panel rounded-3xl p-6 border border-border space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search research topics, keywords, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-input bg-secondary/50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary"
              />
            </div>

            {/* Actions */}
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground shadow-sm hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)] transition-shadow"
            >
              <Upload className="size-4" />
              Publish Your Research Work
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
            <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
              <Filter className="size-3" /> Filter Domain:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">
              Academic Level:
            </span>
            {academicLevels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`rounded-full px-3 py-1 text-[11px] transition-all ${
                  selectedLevel === lvl
                    ? "bg-primary/20 text-primary border border-primary/40 font-semibold"
                    : "bg-secondary/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Research Items Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">
              Showing <strong className="text-foreground">{filteredItems.length}</strong> indexed
              research items
            </p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center border border-border space-y-3">
              <BookOpen className="mx-auto size-10 text-muted-foreground" />
              <h3 className="text-base font-semibold">
                No research projects match your search criteria.
              </h3>
              <p className="text-xs text-muted-foreground">
                Try clearing your search query or filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSelectedLevel("All Levels");
                }}
                className="rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item, i) => (
                <Reveal key={item.id} delay={(i % 2) * 80}>
                  <ThreeDCard
                    intensity={8}
                    glareOpacity={0.12}
                    className="h-full rounded-3xl border border-border bg-card/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {item.imageUrl && (
                      <div className="relative h-44 w-full overflow-hidden bg-muted">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md bg-black/60 text-white border border-white/20">
                            {item.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary text-primary-foreground">
                            {item.academicLevel}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3">
                          <p className="text-[11px] text-white/90 font-medium truncate">
                            {item.institution}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Top Info */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] text-muted-foreground font-medium">
                            {item.publishedDate}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                            <Star className="size-3.5 fill-current" />
                            {item.rating}
                            <span className="text-muted-foreground font-normal text-[11px]">
                              ({item.downloads} downloads)
                            </span>
                          </div>
                        </div>

                        <h3 className="font-bold text-base sm:text-lg font-display leading-snug hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-xs text-muted-foreground mt-1.5">
                          Author: <strong className="text-foreground">{item.author}</strong> (
                          {item.institution})
                        </p>

                        <p className="text-xs text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">
                          {item.abstract}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-border/60">
                        {/* Specs */}
                        <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                          <span className="rounded-md bg-secondary/80 px-2 py-1">
                            Format: {item.format}
                          </span>
                          <span className="rounded-md bg-secondary/80 px-2 py-1">
                            {item.pages} Pages
                          </span>
                          <span className="rounded-md bg-secondary/80 px-2 py-1">
                            {item.citations} Citations
                          </span>
                        </div>

                        {/* Footer Price & Action */}
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                              Access Price
                            </span>
                            <span className="text-lg font-bold font-display text-primary">
                              {item.price === 0 ? "FREE" : formatMoney(item.price, activeCurrency)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedItem(item)}
                              className="rounded-xl border border-border px-3 py-2 text-xs font-medium hover:bg-secondary transition-colors"
                            >
                              Preview
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedItem(item)}
                              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)]"
                            >
                              <Download className="size-3.5" />
                              {item.price === 0 ? "Get Free" : "Buy & Access"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ThreeDCard>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Galvanized Academic Integrity & Verification Guarantee Banner */}
        <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-lg relative mt-12">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80"
              alt="Scientific research verification"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover opacity-60 dark:opacity-35 filter saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/45 dark:from-card/95 dark:via-card/90 dark:to-card/70" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <ShieldCheck className="size-3.5" /> Sterling Academic Integrity Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-3 text-foreground">
              Every dissertation and dataset is triple-screened
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We employ automated cross-citation verification against Crossref, DOI indexers, and
              deep semantic similarity models. Authors retain intellectual property while buyers
              receive reproducible data and clean code scripts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-md flex items-center gap-1.5"
              >
                <Upload className="size-4" />
                Publish Your Research & Earn
              </button>
              <a
                href="/services"
                className="px-5 py-3 rounded-xl glass-panel text-foreground text-xs font-semibold hover:border-primary transition-all border border-border flex items-center gap-1.5"
              >
                <FileText className="size-4" />
                Request Custom Data Collection
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
