import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LineChart,
  ClipboardList,
  Users,
  Sparkles,
  ShieldCheck,
  Workflow,
  Calendar,
  Star,
  Clock,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { ThreeDCard } from "@/components/site/ThreeDCard";
import { EXPERTS, type Expert } from "@/data/experts-data";
import { ExpertBookingModal } from "@/components/site/ExpertBookingModal";
import { ProjectWorkspaceModal } from "@/components/collaboration/ProjectWorkspaceModal";
import { useAuth } from "@/lib/auth-context";
import { formatMoney } from "@/lib/currency";
import type { HiredProject } from "@/types";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Research & Data Analysis Services | Sterling Insight" },
      {
        name: "description",
        content:
          "Proposal development, literature review, methodology, questionnaire design and statistical analysis in SPSS, Python, R, STATA, EViews and Power BI.",
      },
      { property: "og:title", content: "Research & Data Analysis Services | Sterling Insight" },
      {
        name: "og:description",
        content:
          "Book vetted research advisors and data analysts with milestone tracking from proposal to publication.",
      },
    ],
  }),
  component: ServicesPage,
});

const features = [
  {
    icon: ClipboardList,
    title: "Research support",
    description:
      "Topic selection, proposal development, literature review, methodology design and questionnaire design.",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
    badge: "Turnkey Proposal",
  },
  {
    icon: LineChart,
    title: "Statistical analysis",
    description:
      "Descriptive to advanced inferential modelling, dashboards and machine learning pipelines.",
    items: ["SPSS", "Python", "R", "STATA", "EViews", "Excel", "Power BI"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    badge: "Econometrics",
  },
  {
    icon: Workflow,
    title: "Project tracking",
    description:
      "Every engagement runs on milestones, deliverables, revisions and transparent status updates.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    badge: "Live Workspace",
  },
  {
    icon: Users,
    title: "Consultation booking",
    description:
      "Research advisors, analysts, admission and scholarship consultants, career mentors and academic coaches.",
    items: ["Calendars", "Zoom", "Google Meet", "Session notes"],
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    badge: "1-on-1 Video",
  },
  {
    icon: Sparkles,
    title: "AI assistants",
    description:
      "AI research, writing, admission, scholarship and dataset assistants supporting every workflow.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    badge: "AI Powered",
  },
  {
    icon: ShieldCheck,
    title: "Confidential & secure",
    description:
      "Encrypted uploads, scoped access control and NDA-grade handling of your data and manuscripts.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    badge: "NDA Protected",
  },
];

const steps = [
  [
    "01",
    "Select Specialist",
    "Browse vetted advisors and pick a time slot or commissioned project.",
  ],
  ["02", "Confirm Brief", "Share your study background, survey dataset, and research questions."],
  [
    "03",
    "Live Workspace",
    "Collaborate via encrypted chat, live data files, and milestone outputs.",
  ],
  ["04", "Deliverables", "Receive final models, cleaned datasets, and defence preparation."],
];

function ServicesPage() {
  const { activeCurrency } = useAuth();
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [activeProjectWorkspace, setActiveProjectWorkspace] = useState<HiredProject | null>(null);

  return (
    <div>
      <ExpertBookingModal
        expert={selectedExpert}
        onClose={() => setSelectedExpert(null)}
        onOpenWorkspace={(proj) => setActiveProjectWorkspace(proj)}
      />

      <ProjectWorkspaceModal
        project={activeProjectWorkspace}
        isOpen={!!activeProjectWorkspace}
        onClose={() => setActiveProjectWorkspace(null)}
      />

      <PageHero
        eyebrow="Modules B, C & F · Vetted Advisory Roster"
        title="Book Expert Research Advisors & Data Analysts"
        description="Work 1-on-1 with senior methodologists, SPSS/Python analysts, and grant writers with live milestone escrow and interactive collaboration."
        backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85"
        tag="Vetted Analysts & PhDs"
        stats={[
          { value: "100%", label: "Defence-Ready Delivery" },
          { value: "7+", label: "Statistical Tools (SPSS, R, Python)" },
          { value: "48hr", label: "Initial Milestone Window" },
          { value: "NDA-Grade", label: "Confidentiality" },
        ]}
      />

      {/* Expert Roster Section */}
      <section className="pb-20 px-5 sm:px-6 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Expert Roster"
          title="Meet our vetted academic specialists"
          description="Click to book a 1-on-1 virtual consultation or hire for full milestone-based project execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {EXPERTS.map((expert, i) => (
            <Reveal key={expert.id} delay={(i % 3) * 80}>
              <ThreeDCard
                intensity={8}
                glareOpacity={0.12}
                className="h-full rounded-3xl border border-border bg-card/80 p-6 flex flex-col justify-between space-y-4 shadow-md hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      referrerPolicy="no-referrer"
                      className="size-14 rounded-2xl object-cover border border-border shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-base font-display">{expert.name}</h3>
                      <p className="text-xs text-muted-foreground">{expert.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-semibold">
                        <Star className="size-3.5 fill-current" />
                        {expert.rating}
                        <span className="text-muted-foreground font-normal text-[11px]">
                          ({expert.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{expert.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {expert.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-secondary/80 px-2.5 py-1 text-[11px] font-medium text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                      Hourly Rate
                    </span>
                    <span className="text-lg font-bold font-display text-primary">
                      {formatMoney(expert.hourlyRate, activeCurrency)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedExpert(expert)}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)]"
                  >
                    <Layers className="size-4" />
                    Hire & Collaborate
                  </button>
                </div>
              </ThreeDCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <FeatureGrid features={features} />
      </section>

      <section className="pb-24">
        <SectionHeading eyebrow="How it works" title="A guided, trackable workflow" />
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-6 lg:grid-cols-4">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 90}>
              <div className="lift-card h-full rounded-2xl border border-border bg-secondary/40 p-6">
                <span className="font-display text-2xl text-cobalt-glow">{n}</span>
                <h3 className="mt-3 font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
