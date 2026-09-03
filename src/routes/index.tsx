import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  CalendarDays,
  FileSearch,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  ExternalLink,
  Globe2,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { NeuralCanvas } from "@/components/site/NeuralCanvas";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { HeroIntelligenceConsole } from "@/components/site/HeroIntelligenceConsole";
import { SterlingLogo } from "@/components/site/SterlingLogo";
import { ThreeDCard } from "@/components/site/ThreeDCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sterling Insight | Research, Learning & Academic Intelligence" },
      {
        name: "description",
        content:
          "Sterling Insight Limited is an AI-powered research repository, statistical analytics, admissions, scholarship and learning platform for students, researchers and institutions.",
      },
      {
        property: "og:title",
        content: "Sterling Insight | Research, Learning & Academic Intelligence",
      },
      {
        property: "og:description",
        content:
          "Research marketplace, data analytics in SPSS/Python/R, admissions, scholarships, consultations and academy — one intelligent platform.",
      },
    ],
  }),
  component: Home,
});

const modules = [
  {
    icon: BookOpen,
    title: "Research Repository Marketplace",
    description:
      "Search, buy or rent theses, dissertations, journals, datasets and templates across every academic level.",
    items: ["Undergraduate", "Masters", "PhD", "Datasets"],
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    badge: "120K+ Papers",
  },
  {
    icon: FileSearch,
    title: "Research Services & Writing",
    description:
      "Proposal development, literature review, methodology, questionnaire design and publication support with live project tracking.",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    badge: "Turnkey Delivery",
  },
  {
    icon: LineChart,
    title: "Statistical Data Analysis",
    description:
      "Expert analysis in SPSS, Python, R, STATA, EViews, Excel, Power BI and machine learning econometric workflows.",
    items: ["SPSS", "Python", "R", "Power BI"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    badge: "Econometrics",
  },
  {
    icon: GraduationCap,
    title: "Admissions, Grants & Scholarships",
    description:
      "Local Nigerian & international admissions, 30+ verified grants, matching engine, eligibility checks and SOP review.",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    badge: "Local & Global",
  },
  {
    icon: Users,
    title: "Consultations & Collaboration",
    description:
      "Book advisors, analysts and mentors with calendars, video sessions, session notes and a shared research workspace.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    badge: "Verified PhDs",
  },
  {
    icon: ShieldCheck,
    title: "Research Integrity Suite",
    description:
      "Plagiarism checking, AI content analysis, citation generation, reference validation and quality scoring.",
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    badge: "Turnitin-Grade",
  },
];

const ecosystem = [
  {
    icon: Sparkles,
    title: "AI Ecosystem",
    text: "Research, admission, scholarship, writing and dataset assistants.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Briefcase,
    title: "Careers & Internships",
    text: "Internships, graduate roles and research assistant openings.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: CalendarDays,
    title: "Events Platform",
    text: "Conferences, webinars and workshops with ticketing and certificates.",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Award,
    title: "Opportunity Hub",
    text: "Fellowships, grants, competitions and funding application support.",
    imageUrl:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Building2,
    title: "Institutional Portal",
    text: "Universities post admissions, recruit students and read analytics.",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: BrainCircuit,
    title: "Community",
    text: "Forums, groups, messaging and global academic communities.",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  },
];

const stats = [
  { value: "120K+", label: "Research materials indexed" },
  { value: "45+", label: "Countries served" },
  { value: "30+", label: "Active verified calls" },
  { value: "24/7", label: "Expert support" },
];

function Home() {
  return (
    <div>
      {/* Galvanized Hero Section with High-Resolution Backdrop & Neural Canvas */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 border-b border-border/40">
        {/* Photographic Background with Vivid Architectural Imagery & Neural Canvas */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-65 dark:opacity-40 filter saturate-125 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background dark:from-background/85 dark:via-background/75 dark:to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        </div>

        <NeuralCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-60 z-0" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase border border-border/80 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <Sparkles
                  className="size-3.5 text-[#0066cc] dark:text-[#38bdf8]"
                  aria-hidden="true"
                />
                Academic Intelligence, Engineered
              </span>
            </div>

            <h1 className="mt-6 text-4xl leading-[1.08] font-bold sm:text-6xl text-foreground font-display">
              Advancing global scholarship with{" "}
              <span
                className="font-serif text-[#0066cc] dark:text-[#38bdf8] font-bold italic tracking-wide"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                engineered precision
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              Sterling Insight Limited unifies an open peer-reviewed research repository, expert
              statistical analysis in SPSS, Python and R, verified local & international funding
              registries, and academic advisory into one institutional ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/opportunities"
                className="rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all shadow-md hover:bg-primary/90 hover:shadow-[0_0_24px_-4px_rgba(0,102,204,0.4)] flex items-center gap-2"
              >
                <Globe2 className="size-4" />
                Explore 30+ Verified Grants & Scholarships
              </Link>
              <Link
                to="/services"
                className="glass-panel rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary border border-border"
              >
                Book Expert Analyst
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-border/60 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold text-foreground">{s.value}</dd>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </dl>
          </div>

          <Reveal className="w-full">
            <HeroIntelligenceConsole />
          </Reveal>
        </div>
      </section>

      {/* Platform Modules with Visual Photographic Cards */}
      <section className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Platform modules"
          title="One ecosystem for the entire academic journey"
          description="Every module is multi-tenant, permission-aware and built to scale from a single student to a full university."
        />
        <FeatureGrid features={modules} />
      </section>

      {/* Featured Live Global & Local Opportunities Showcase */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" /> Active Local & International Calls
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1 text-foreground">
              Current Scholarships, Fellowships & Startup Grants
            </h2>
          </div>
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            Explore All 30+ Verified Calls <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Local African Call - PTDF */}
          <ThreeDCard
            intensity={6}
            glareOpacity={0.12}
            className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md flex flex-col justify-between"
          >
            <div className="relative h-44 w-full overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                alt="PTDF Scholarship"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground">
                🇳🇬 Local (Nigeria & Africa)
              </span>
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white uppercase">
                Open Now
              </span>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[11px] text-white/80 font-medium">Petroleum Tech Dev Fund</p>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  PTDF MSc & PhD Scholarship Scheme
                </h3>
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-muted-foreground line-clamp-2">
                100% full tuition, living allowance, roundtrip flights, and research grants for
                master's and doctorate degrees in Nigeria, UK, Germany and France.
              </p>
              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] text-emerald-500 font-semibold">100% Full Ride</span>
                <a
                  href="https://scholarship.ptdf.gov.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Official Portal <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </ThreeDCard>

          {/* Card 2: Local African Startup Grant - TEF */}
          <ThreeDCard
            intensity={6}
            glareOpacity={0.12}
            className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md flex flex-col justify-between"
          >
            <div className="relative h-44 w-full overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                alt="Tony Elumelu Foundation"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground">
                🇳🇬 Local (Nigeria & Africa)
              </span>
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500 text-white uppercase">
                Startup Grant
              </span>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[11px] text-white/80 font-medium">The Tony Elumelu Foundation</p>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  TEF Pan-African Entrepreneurship Grant
                </h3>
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-muted-foreground line-clamp-2">
                $5,000 non-refundable equity-free seed grant plus 12-week intensive business
                management curriculum and 1-on-1 mentorship for African startup founders.
              </p>
              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] text-primary font-semibold">$5,000 Cash Grant</span>
                <a
                  href="https://www.tefconnect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Official Portal <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </ThreeDCard>

          {/* Card 3: International PhD Call - Gates Cambridge */}
          <ThreeDCard
            intensity={6}
            glareOpacity={0.12}
            className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md flex flex-col justify-between"
          >
            <div className="relative h-44 w-full overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80"
                alt="Gates Cambridge"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground">
                🌍 International (Global)
              </span>
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white uppercase">
                Open Now
              </span>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[11px] text-white/80 font-medium">University of Cambridge</p>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  Gates Cambridge Scholarship (MPhil/PhD)
                </h3>
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-muted-foreground line-clamp-2">
                Full university fees at Cambridge, £21,000/yr maintenance stipend, visa fees, and
                flights for research postgraduates.
              </p>
              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] text-emerald-500 font-semibold">Fully Funded</span>
                <a
                  href="https://www.gatescambridge.org/apply/eligibility/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Official Portal <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </ThreeDCard>
        </div>
      </section>

      {/* Extended Ecosystem with Visual Highlights */}
      <section className="py-12 sm:py-20">
        <SectionHeading
          eyebrow="Extended ecosystem"
          title="Beyond research and learning"
          description="Everything academic institutions, laboratories, and individual scholars need to produce world-class output."
        />
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {ecosystem.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 80}>
              <div className="lift-card h-full rounded-2xl border border-border bg-card/70 overflow-hidden flex flex-col justify-between shadow-sm">
                {e.imageUrl && (
                  <div className="relative h-36 w-full overflow-hidden bg-muted">
                    <img
                      src={e.imageUrl}
                      alt={e.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 flex size-8 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground shadow-sm">
                      <e.icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-base font-display text-foreground">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Call to Action Banner Galvanized with Atmospheric Campus Image */}
      <section className="px-5 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden border border-border/80 shadow-2xl p-8 sm:p-16 text-center">
            {/* High Resolution Architectural Image Backdrop */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"
                alt="University Quadrangle"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-60 dark:opacity-35 filter saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-card/85 via-card/65 to-card/95 dark:from-card/90 dark:via-card/80 dark:to-card/95" />
            </div>

            <div className="relative z-10">
              <SterlingLogo variant="badge" size="md" className="mb-6 mx-auto" />
              <h2 className="text-3xl font-bold sm:text-4xl text-foreground font-display">
                Build your academic and research advantage today
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
                Join thousands of students, university researchers, and institutions using Sterling
                Insight to discover funding, publish peer-reviewed papers, and analyse data with
                statistical rigor.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all shadow-md hover:bg-primary/90 hover:shadow-[0_0_24px_-4px_rgba(0,102,204,0.4)] flex items-center gap-2"
                >
                  <Globe2 className="size-4" />
                  View All Verified Opportunities
                </Link>
                <Link
                  to="/contact"
                  className="glass-panel rounded-xl px-6 py-3 text-sm font-semibold transition-colors hover:border-primary border border-border text-foreground"
                >
                  Talk to Our Advisory Team
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
