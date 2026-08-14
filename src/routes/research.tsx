import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { RESEARCH_ITEMS, type ResearchItem } from "@/data/research-data";
import { ResearchCheckoutModal } from "@/components/site/ResearchCheckoutModal";
import { PublishResearchModal } from "@/components/site/PublishResearchModal";

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
        property: "og:description",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Filter items
  const filteredItems = RESEARCH_ITEMS.filter((item) => {
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
      />

      <PageHero
        eyebrow="Module A · Research Marketplace"
        title="Curated, integrity-checked academic repository"
        description="Search, buy or rent theses, dissertations, datasets and questionnaires. Researchers upload work and earn royalties."
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
                  <div className="lift-card glass-panel h-full rounded-3xl p-6 border border-border flex flex-col justify-between space-y-4">
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                          {item.academicLevel}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                          <Star className="size-3.5 fill-current" />
                          {item.rating}
                          <span className="text-muted-foreground font-normal">
                            ({item.downloads} downloads)
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg font-display leading-snug hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-muted-foreground mt-2">
                        Author: <strong className="text-foreground">{item.author}</strong> (
                        {item.institution})
                      </p>

                      <p className="text-xs text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
                        {item.abstract}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-border/60">
                      {/* Specs */}
                      <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
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
                          <span className="text-xl font-bold font-display text-primary">
                            {item.price === 0 ? "FREE" : `$${item.price} USD`}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedItem(item)}
                          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)]"
                        >
                          <Download className="size-4" />
                          {item.price === 0 ? "Get Free Download" : "Buy & Download"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
