import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  Briefcase,
  CalendarDays,
  Building2,
  Coins,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Admissions, Scholarships & Careers | Sterling Insight" },
      {
        name: "description",
        content:
          "Nigerian and international admissions, scholarship matching, fellowships, grants, internships, graduate jobs and academic events in one hub.",
      },
      { property: "og:title", content: "Admissions, Scholarships & Careers | Sterling Insight" },
      {
        property: "og:description",
        content:
          "Find and win the right opportunity with matching engines, eligibility checks and application support.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

const opportunitiesList = [
  {
    id: "opp_1",
    title: "Chevening Postgraduate Scholarship 2026/2027",
    category: "Fully Funded Scholarship",
    institution: "UK Foreign, Commonwealth & Development Office",
    coverage: "100% Tuition, Monthly Stipend & Flights",
    deadline: "Nov 02, 2026",
    eligible: "Masters Candidates",
  },
  {
    id: "opp_2",
    title: "Global AI & Climate Research Innovation Grant",
    category: "Research Funding Grant",
    institution: "Sterling Insight Research Foundation",
    coverage: "Up to $50,000 USD Grant",
    deadline: "Sep 30, 2026",
    eligible: "Postdoctoral & PhD Researchers",
  },
  {
    id: "opp_3",
    title: "International Graduate Research Assistantship",
    category: "Research Internship & Job",
    institution: "Imperial College AI Lab",
    coverage: "Salaried Position + Tuition Waiver",
    deadline: "Oct 15, 2026",
    eligible: "Data Science & CS Graduates",
  },
  {
    id: "opp_4",
    title: "African Doctoral Fellowship in Applied Economics",
    category: "Doctoral Fellowship",
    institution: "African Development Institute",
    coverage: "Full PhD Funding & Research Mobility",
    deadline: "Dec 10, 2026",
    eligible: "PhD Candidates",
  },
];

const features = [
  {
    icon: GraduationCap,
    title: "Admission portal",
    description:
      "Nigerian and international undergraduate, postgraduate and professional programmes with application tracking.",
  },
  {
    icon: Award,
    title: "Scholarship portal",
    description:
      "A living scholarship database with a matching engine, eligibility checker, SOP and CV review.",
  },
  {
    icon: Coins,
    title: "Research funding",
    description: "Grant listings plus structured support for competitive grant applications.",
  },
  {
    icon: Briefcase,
    title: "Internships & careers",
    description:
      "Internships, graduate roles, research assistant positions and practical career resources.",
  },
  {
    icon: CalendarDays,
    title: "Events & conferences",
    description: "Conferences, webinars and workshops with ticketing and attendance certificates.",
  },
  {
    icon: Building2,
    title: "Institutional portal",
    description:
      "Universities and organisations post admissions and scholarships, recruit students and read analytics.",
  },
];

function OpportunitiesPage() {
  const handleApply = (oppTitle: string) => {
    toast.success("Application Initialized!", {
      description: `SOP and document review started for ${oppTitle}. Check your dashboard.`,
    });
  };

  return (
    <div>
      <PageHero
        eyebrow="Modules D, E, I, J, K & P · Opportunity Engine"
        title="Admissions, Scholarships and Career Opportunities"
        description="Matching engines, eligibility intelligence and SOP review — so every application you submit is your strongest one."
      />

      <section className="pb-16 px-5 sm:px-6 max-w-6xl mx-auto space-y-6">
        <SectionHeading
          eyebrow="Featured Listings"
          title="Active Scholarships, Grants & Fellowships"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunitiesList.map((opp, i) => (
            <Reveal key={opp.id} delay={i * 80}>
              <div className="lift-card glass-panel rounded-3xl p-6 border border-border flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {opp.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Deadline: {opp.deadline}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg font-display mt-2">{opp.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Issued by {opp.institution}</p>

                  <div className="mt-4 rounded-2xl bg-secondary/40 p-3 text-xs space-y-1 border border-border/60">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage:</span>
                      <span className="font-semibold text-emerald-500">{opp.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Audience:</span>
                      <span className="font-medium">{opp.eligible}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleApply(opp.title)}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)]"
                  >
                    Start Guided Application
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <FeatureGrid features={features} />
      </section>
    </div>
  );
}
