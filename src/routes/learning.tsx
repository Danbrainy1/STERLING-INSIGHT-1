import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap,
  MessagesSquare,
  Award,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { Reveal } from "@/components/site/Reveal";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Sterling Academy — Courses & LMS | Sterling Insight" },
      {
        name: "description",
        content:
          "Learn data analysis, data science, development, design, cybersecurity, AI automation, product management, marketing and trading with lessons, quizzes and certificates.",
      },
      { property: "og:title", content: "Sterling Academy — Courses & LMS | Sterling Insight" },
      {
        property: "og:description",
        content:
          "Structured tracks with lessons, assignments, progress tracking, forums and verifiable certificates.",
      },
    ],
  }),
  component: LearningPage,
});

const tracks = [
  {
    name: "Data & AI",
    duration: "12 Weeks",
    courses: [
      "Data Analysis in SPSS & R",
      "Python for Data Science",
      "AI Automation & Prompting",
      "Cybersecurity Fundamentals",
    ],
  },
  {
    name: "Engineering",
    duration: "16 Weeks",
    courses: ["Frontend Development (React)", "Backend Microservices", "UI/UX Design Systems"],
  },
  {
    name: "Creative",
    duration: "8 Weeks",
    courses: ["Graphics & Visual Design", "Video Editing & Animation", "Social Media Strategy"],
  },
  {
    name: "Business",
    duration: "10 Weeks",
    courses: ["Product Management", "Agile Project Management", "Growth Digital Marketing"],
  },
  {
    name: "Markets",
    duration: "6 Weeks",
    courses: ["Forex Market Analysis", "Crypto Trading Protocols"],
  },
] as const;

const features = [
  {
    icon: GraduationCap,
    title: "Structured lessons",
    description: "Video, reading and lab lessons sequenced into industry-aligned learning paths.",
  },
  {
    icon: BarChart3,
    title: "Quizzes & assignments",
    description: "Graded assessments and practical submissions with instructor feedback loops.",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Verifiable, shareable certificates issued on completion of each track.",
  },
  {
    icon: MessagesSquare,
    title: "Discussion forums",
    description: "Cohort forums, peer groups and mentor Q&A alongside every course.",
  },
];

function LearningPage() {
  const { isAuthenticated } = useAuth();

  const handleEnroll = (trackName: string) => {
    toast.success(`Enrolled in ${trackName} Track!`, {
      description: "Welcome to Sterling Academy. Check your dashboard for course materials.",
    });
  };

  return (
    <div>
      <PageHero
        eyebrow="Module G · Sterling Academy"
        title="Master Academic & Industry Intelligence"
        description="Structured learning management experience with progress tracking, assessments, cohort forums and verifiable certificates."
      />
      <section className="pb-16">
        <FeatureGrid features={features} />
      </section>
      <section className="pb-24">
        <SectionHeading eyebrow="Academy Catalogue" title="Career & Skill Tracks" />
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {tracks.map((track, i) => (
            <Reveal key={track.name} delay={(i % 3) * 80}>
              <div className="lift-card glass-panel h-full rounded-3xl p-6 border border-border flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg font-display">{track.name}</h3>
                    <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {track.duration}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {track.courses.map((c) => (
                      <li key={c} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-cobalt-glow shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-500">
                    Certificate Included
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEnroll(track.name)}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)]"
                  >
                    Enroll Track
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
