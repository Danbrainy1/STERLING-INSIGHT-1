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
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { EXPERTS, type Expert } from "@/data/experts-data";
import { ExpertBookingModal } from "@/components/site/ExpertBookingModal";

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
        property: "og:description",
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
  },
  {
    icon: LineChart,
    title: "Statistical analysis",
    description:
      "Descriptive to advanced inferential modelling, dashboards and machine learning pipelines.",
    items: ["SPSS", "Python", "R", "STATA", "EViews", "Excel", "Power BI"],
  },
  {
    icon: Workflow,
    title: "Project tracking",
    description:
      "Every engagement runs on milestones, deliverables, revisions and transparent status updates.",
  },
  {
    icon: Users,
    title: "Consultation booking",
    description:
      "Research advisors, analysts, admission and scholarship consultants, career mentors and academic coaches.",
    items: ["Calendars", "Zoom", "Google Meet", "Session notes"],
  },
  {
    icon: Sparkles,
    title: "AI assistants",
    description:
      "AI research, writing, admission, scholarship and dataset assistants supporting every workflow.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential & secure",
    description:
      "Encrypted uploads, scoped access control and NDA-grade handling of your data and manuscripts.",
  },
];

const steps = [
  ["01", "Select Specialist", "Browse vetted advisors and pick a time slot."],
  ["02", "Confirm Brief", "Share your study background and research questions."],
  ["03", "Live Workspace", "Collaborate via video call, screen sharing, and code."],
  ["04", "Deliverables", "Receive final models, cleaned datasets, and defence prep."],
];

function ServicesPage() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  return (
    <div>
      <ExpertBookingModal expert={selectedExpert} onClose={() => setSelectedExpert(null)} />

      <PageHero
        eyebrow="Modules B, C & F · Vetted Advisory Roster"
        title="Book Expert Research Advisors & Data Analysts"
        description="Work 1-on-1 with senior methodologists, SPSS/Python analysts, and grant writers with live milestone tracking."
      />

      {/* Expert Roster Section */}
      <section className="pb-20 px-5 sm:px-6 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Expert Roster"
          title="Meet our vetted academic specialists"
          description="Click to book a 1-on-1 virtual consultation or project milestone."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {EXPERTS.map((expert, i) => (
            <Reveal key={expert.id} delay={(i % 3) * 80}>
              <div className="lift-card glass-panel h-full rounded-3xl p-6 border border-border flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start gap-3">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="size-14 rounded-2xl object-cover border border-border"
                    />
                    <div>
                      <h3 className="font-bold text-base font-display">{expert.name}</h3>
                      <p className="text-xs text-muted-foreground">{expert.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-semibold">
                        <Star className="size-3.5 fill-current" />
                        {expert.rating}
                        <span className="text-muted-foreground font-normal">
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
                      ${expert.hourlyRate} USD
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedExpert(expert)}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)]"
                  >
                    <Calendar className="size-4" />
                    Book Consultation
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <FeatureGrid features={features} />
      </section>

      <section className="pb-24">
        <SectionHeading eyebrow="How it works" title="A guided, trackable workflow" />
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
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
