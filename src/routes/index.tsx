import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  BrainCircuit,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Users,
  Sparkles,
  Building2,
  Briefcase,
  CalendarDays,
  Award,
  FileSearch,
} from "lucide-react";
import { NeuralCanvas } from "@/components/site/NeuralCanvas";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FeatureGrid } from "@/components/site/FeatureGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sterling Insight | Research, Learning & Academic Intelligence" },
      {
        name: "description",
        content:
          "Sterling Insight Limited is an AI-powered research repository, analytics, admissions, scholarship and learning platform for students, researchers and institutions.",
      },
      {
        property: "og:title",
        content: "Sterling Insight | Research, Learning & Academic Intelligence",
      },
      {
        property: "og:description",
        content:
          "Research marketplace, data analytics, admissions, scholarships, consultations and an academy — one intelligent platform.",
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
  },
  {
    icon: FileSearch,
    title: "Research Services",
    description:
      "Proposal development, literature review, methodology, questionnaire design and publication support with live project tracking.",
  },
  {
    icon: LineChart,
    title: "Statistical Data Analysis",
    description:
      "Expert analysis in SPSS, Python, R, STATA, EViews, Excel, Power BI and machine learning workflows.",
    items: ["SPSS", "Python", "R", "Power BI"],
  },
  {
    icon: GraduationCap,
    title: "Admissions & Scholarships",
    description:
      "Nigerian and international admissions, a scholarship database, matching engine, eligibility checks and SOP review.",
  },
  {
    icon: Users,
    title: "Consultations & Collaboration",
    description:
      "Book advisors, analysts and mentors with calendars, video sessions, session notes and a shared research workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Research Integrity Suite",
    description:
      "Plagiarism checking, AI content analysis, citation generation, reference validation and quality scoring.",
  },
];

const ecosystem = [
  {
    icon: Sparkles,
    title: "AI Ecosystem",
    text: "Research, admission, scholarship, writing and dataset assistants.",
  },
  {
    icon: Briefcase,
    title: "Careers & Internships",
    text: "Internships, graduate roles and research assistant openings.",
  },
  {
    icon: CalendarDays,
    title: "Events Platform",
    text: "Conferences, webinars and workshops with ticketing and certificates.",
  },
  {
    icon: Award,
    title: "Opportunity Hub",
    text: "Fellowships, grants, competitions and funding application support.",
  },
  {
    icon: Building2,
    title: "Institutional Portal",
    text: "Universities post admissions, recruit students and read analytics.",
  },
  {
    icon: BrainCircuit,
    title: "Community",
    text: "Forums, groups, messaging and global academic communities.",
  },
];

const stats = [
  { value: "120K+", label: "Research materials indexed" },
  { value: "45+", label: "Countries served" },
  { value: "98%", label: "Project delivery rate" },
  { value: "24/7", label: "Expert support" },
];

function Home() {
  return (
    <div>
      <section className="hero-aura relative overflow-hidden">
        <NeuralCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-36 pb-20 sm:px-6 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
          <div>
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
              <Sparkles className="size-3.5 text-cobalt-glow" aria-hidden="true" />
              Academic intelligence, engineered
            </span>
            <h1 className="text-gradient mt-6 text-4xl leading-[1.05] font-semibold sm:text-6xl">
              The intelligence platform for research, learning and opportunity
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Sterling Insight Limited unifies a research marketplace, expert analytics, admissions
              and scholarship guidance, consultations and a modern academy into one secure,
              AI-powered ecosystem.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/research"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-6px_var(--color-cobalt-glow)]"
              >
                Explore research hub
              </Link>
              <Link
                to="/services"
                className="glass-panel rounded-xl px-6 py-3 text-sm font-medium transition-colors hover:border-primary"
              >
                Book an expert
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold">{s.value}</dd>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </dl>
          </div>

          <Reveal className="hidden lg:block">
            <div className="glass-panel relative rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Intelligence Console</p>
                <span className="rounded-full bg-primary/25 px-2.5 py-1 text-[11px]">Live</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["AI Research Assistant", "Drafting literature matrix"],
                  ["Dataset Analysis", "SPSS regression complete"],
                  ["Scholarship Match", "12 new eligible awards"],
                  ["Integrity Check", "Similarity 4% · verified"],
                ].map(([t, s]) => (
                  <div
                    key={t}
                    className="lift-card rounded-xl border border-border bg-secondary/50 p-4"
                  >
                    <p className="text-sm font-medium">{t}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Platform modules"
          title="One ecosystem for the entire academic journey"
          description="Every module is multi-tenant, permission-aware and built to scale from a single student to a full university."
        />
        <FeatureGrid features={modules} />
      </section>

      <section className="py-8 sm:py-16">
        <SectionHeading eyebrow="Extended ecosystem" title="Beyond research and learning" />
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {ecosystem.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 80}>
              <div className="lift-card h-full rounded-2xl border border-border bg-secondary/40 p-6">
                <e.icon className="size-5 text-cobalt-glow" aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <div className="hero-aura glass-panel mx-auto max-w-5xl rounded-3xl px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Build your academic advantage today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Join students, researchers and institutions using Sterling Insight to publish faster,
              analyse deeper and win more opportunities.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Talk to our team
              </Link>
              <Link to="/learning" className="glass-panel rounded-xl px-6 py-3 text-sm font-medium">
                Browse the academy
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
