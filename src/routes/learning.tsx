import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  GraduationCap,
  MessagesSquare,
  Award,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Star,
  Sparkles,
  ShieldCheck,
  X,
  PlayCircle,
  FileCode2,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { Reveal } from "@/components/site/Reveal";
import { ThreeDCard } from "@/components/site/ThreeDCard";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Sterling Academy — Interactive Courses & LMS | Sterling Insight" },
      {
        name: "description",
        content:
          "Learn data analysis in SPSS, Python & R, software engineering, product management, and AI research with cohort labs and verifiable certificates.",
      },
      {
        property: "og:title",
        content: "Sterling Academy — Interactive Courses & LMS | Sterling Insight",
      },
      {
        property: "og:description",
        content:
          "Structured tracks with real lab assignments, mentor feedback, progress tracking, and verifiable certificates.",
      },
    ],
  }),
  component: LearningPage,
});

interface Track {
  id: string;
  name: string;
  duration: string;
  level: "Beginner to Advanced" | "Intermediate" | "Advanced";
  rating: number;
  studentsCount: string;
  imageUrl: string;
  description: string;
  courses: string[];
  skillsGained: string[];
}

const tracks: Track[] = [
  {
    id: "track-data-ai",
    name: "Data Analytics, AI & Research Computing",
    duration: "12 Weeks",
    level: "Beginner to Advanced",
    rating: 4.9,
    studentsCount: "1,420+",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description:
      "Master statistical inference, econometrics, and neural computing from foundational SPSS surveys to production machine learning in Python and R.",
    courses: [
      "Survey Design, Hypothesis Testing & SPSS Mastery",
      "Python for Data Science, Pandas & NumPy Pipelines",
      "Econometric Analysis in STATA & R Studio",
      "Applied LLM Prompt Engineering & Research Automation",
    ],
    skillsGained: ["SPSS", "Python", "R", "Econometrics", "Machine Learning", "Data Cleaning"],
  },
  {
    id: "track-software-eng",
    name: "Modern Software Systems & Web Engineering",
    duration: "16 Weeks",
    level: "Intermediate",
    rating: 4.8,
    studentsCount: "980+",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    description:
      "Build scalable cloud applications, distributed API services, reactive frontends, and database backends with production-grade engineering principles.",
    courses: [
      "TypeScript, React 19 & Architecture Design Systems",
      "Node.js, Express & Serverless API Development",
      "PostgreSQL, Prisma ORM & Database Optimization",
      "CI/CD, Cloud Run & Modern Production Deployments",
    ],
    skillsGained: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
  },
  {
    id: "track-creative-design",
    name: "Digital Product & UI/UX Experience Design",
    duration: "8 Weeks",
    level: "Beginner to Advanced",
    rating: 4.9,
    studentsCount: "820+",
    imageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Learn user-centered interaction design, typography scales, accessibility standards, responsive prototyping, and design tokens.",
    courses: [
      "User Research, Personas & Information Architecture",
      "Advanced Figma Components, Variables & Auto-Layout",
      "Design Systems, Micro-Interactions & Motion Principles",
      "Client Presentation, Usability Testing & Handoff",
    ],
    skillsGained: ["Figma", "Design Systems", "Prototyping", "User Research", "WCAG AA"],
  },
  {
    id: "track-business-product",
    name: "Product Management & Academic Venture Leadership",
    duration: "10 Weeks",
    level: "Intermediate",
    rating: 4.7,
    studentsCount: "750+",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    description:
      "From zero-to-one product development to agile execution, roadmapping, growth metrics, and grant-funded scientific venture management.",
    courses: [
      "Product Strategy, Opportunity Sizing & User Discovery",
      "Agile Scrum, Sprint Planning & PRD Documentation",
      "Unit Economics, Growth Metrics & Retention Analytics",
      "Grant Pitching & Academic Spin-out Commercialization",
    ],
    skillsGained: ["Agile/Scrum", "PRDs", "Product Strategy", "KPIs", "User Journeys"],
  },
  {
    id: "track-financial-markets",
    name: "Quantitative Finance & Global Market Analytics",
    duration: "6 Weeks",
    level: "Advanced",
    rating: 4.8,
    studentsCount: "610+",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Learn financial time-series forecasting, algorithmic volatility modeling, macro-economic indicator interpretation, and portfolio risk management.",
    courses: [
      "Macroeconomic Indicators & Central Bank Policies",
      "Technical Analysis, Candlestick Formations & Liquidity",
      "Risk Management, Position Sizing & Drawdown Controls",
      "Algorithmic Backtesting in Python with QuantConnect",
    ],
    skillsGained: ["Risk Management", "Time Series", "Quantitative Modeling", "Technical Analysis"],
  },
];

const features = [
  {
    icon: GraduationCap,
    title: "Industry & Academic Curriculum",
    description:
      "Hands-on projects co-developed with academic researchers and senior industry practitioners.",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
    badge: "University Accredited",
  },
  {
    icon: BarChart3,
    title: "Live Laboratory Assignments",
    description:
      "Real data sets and code sandboxes with automated grading and instructor code review.",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    badge: "SPSS & Python",
  },
  {
    icon: Award,
    title: "Verifiable Digital Credentials",
    description:
      "Cryptographically verifiable certificates issued on completion, shareable on LinkedIn.",
    imageUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
    badge: "Shareable Credential",
  },
  {
    icon: MessagesSquare,
    title: "Peer & Mentor Discussion Guilds",
    description:
      "Weekly live office hours, asynchronous Q&A forums, and collaborative cohort study groups.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    badge: "Weekly Office Hours",
  },
];

export function LearningPage() {
  const { isAuthenticated } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleEnroll = (track: Track) => {
    toast.success(`Enrolled in ${track.name}!`, {
      description:
        "Welcome to Sterling Academy. Track curriculum has been added to your dashboard.",
    });
    setSelectedTrack(null);
  };

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Sterling Academy · Research, Engineering & Data LMS"
        title="Elevate Your Technical & Academic Craft"
        description="Structured cohort tracks featuring live code laboratories, peer review guilds, statistical datasets in SPSS, Python & R, and verifiable certificates recognized worldwide."
        backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=85"
        tag="Live Interactive Cohorts"
        stats={[
          { value: "4", label: "Specialized Tracks" },
          { value: "50+", label: "Laboratory Datasets" },
          { value: "1-on-1", label: "Mentor Office Hours" },
          { value: "Verifiable", label: "Digital Credentials" },
        ]}
      />

      {/* Feature Value Props */}
      <section className="pb-16 max-w-6xl mx-auto px-5 sm:px-6">
        <FeatureGrid features={features} />
      </section>

      {/* Track Grid with 3D Motion and Realistic Imagery */}
      <section className="pb-24 max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              Current Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1 text-foreground">
              Career & Research Skill Tracks
            </h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-md">
            All tracks include recorded lectures, real project assignments, 1-on-1 advisor office
            hours, and an accredited graduation certificate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <Reveal key={track.id} delay={(i % 3) * 70}>
              <ThreeDCard
                intensity={8}
                glareOpacity={0.12}
                className="h-full rounded-3xl border border-border/80 bg-card/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Realistic Track Banner Image */}
                <div className="relative h-44 w-full overflow-hidden rounded-t-3xl bg-muted">
                  <img
                    src={track.imageUrl}
                    alt={track.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md bg-black/60 text-white border border-white/20">
                      {track.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md bg-emerald-600/90 text-white flex items-center gap-1">
                      <Star className="size-3 fill-current" /> {track.rating}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground">
                      {track.level}
                    </span>
                    <p className="text-xs text-white/90 font-medium mt-1 flex items-center gap-1">
                      <Users className="size-3.5 text-primary" /> {track.studentsCount} scholars
                      enrolled
                    </p>
                  </div>
                </div>

                {/* Track Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base font-display text-foreground line-clamp-1">
                      {track.name}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {track.description}
                    </p>

                    {/* Course list preview */}
                    <div className="mt-4 space-y-1.5 border-t border-border/50 pt-3">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                        Curriculum Highlights:
                      </span>
                      {track.courses.slice(0, 3).map((c) => (
                        <div
                          key={c}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                          <span className="truncate">{c}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {track.skillsGained.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-medium text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTrack(track)}
                      className="px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-secondary transition-colors text-foreground flex items-center gap-1"
                    >
                      <BookOpen className="size-3.5" /> Syllabus
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEnroll(track)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_-4px_rgba(0,102,204,0.4)]"
                    >
                      Enroll Track
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </ThreeDCard>
            </Reveal>
          ))}
        </div>

        {/* Institutional & University Fellowship Cohorts Banner */}
        <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-lg relative mt-16">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80"
              alt="University auditorium seminar"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover opacity-60 dark:opacity-35 filter saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/45 dark:from-card/95 dark:via-card/90 dark:to-card/70" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <GraduationCap className="size-3.5" /> Institutional Academic Partnerships
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-3 text-foreground">
              Upskill university departments & research labs
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We train postgraduate students, university faculty, and NGO policy researchers in
              advanced STATA, SPSS, Python for Data Science, and R econometrics. Includes custom LMS
              tenants, private datasets, and dedicated live mentors.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-md flex items-center gap-1.5"
              >
                Inquire for Institutional Cohort
              </a>
              <a
                href="/opportunities"
                className="px-5 py-3 rounded-xl glass-panel text-foreground text-xs font-semibold hover:border-primary transition-all border border-border flex items-center gap-1.5"
              >
                View Fellowship Grants
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Modal Dialog */}
      <AnimatePresence>
        {selectedTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrack(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl bg-card border border-border shadow-2xl overflow-hidden z-10 my-8 p-6 space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                    {selectedTrack.duration} • {selectedTrack.level}
                  </span>
                  <h3 className="text-xl font-bold font-display mt-2 text-foreground">
                    {selectedTrack.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{selectedTrack.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTrack(null)}
                  className="size-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
                  Complete Course Modules & Lab Schedule
                </h4>
                <div className="space-y-3">
                  {selectedTrack.courses.map((course, idx) => (
                    <div
                      key={course}
                      className="p-3.5 rounded-2xl bg-secondary/40 border border-border/70 flex items-start gap-3"
                    >
                      <span className="size-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{course}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Includes hands-on lab code, real-world datasets, and peer-graded
                          assignment.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold">
                  <ShieldCheck className="size-4" /> Verifiable Certificate Included
                </div>
                <button
                  type="button"
                  onClick={() => handleEnroll(selectedTrack)}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-md hover:bg-primary/90"
                >
                  Confirm Enrollment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
