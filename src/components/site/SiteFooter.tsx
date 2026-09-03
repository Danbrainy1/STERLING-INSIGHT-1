import { Link } from "@tanstack/react-router";
import { SterlingLogo } from "./SterlingLogo";

const groups = [
  {
    title: "Platform",
    items: [
      { to: "/research", label: "Research Repository" },
      { to: "/services", label: "Research & Analysis Services" },
      { to: "/learning", label: "Academy & LMS" },
    ],
  },
  {
    title: "Growth & Capital",
    items: [
      { to: "/opportunities", label: "Scholarships & Grants" },
      { to: "/opportunities", label: "University Admissions" },
      { to: "/opportunities", label: "Academic Careers" },
    ],
  },
  {
    title: "Organization",
    items: [
      { to: "/contact", label: "Contact Us" },
      { to: "/contact", label: "Institutional Partnerships" },
      { to: "/dashboard", label: "Researcher Portal" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <SterlingLogo variant="header" size="md" asLink />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Academic Intelligence, Engineered — advancing global scholarship through peer-reviewed
            repositories, high-precision statistical modelling, admissions intelligence, and
            institutional partnerships.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Verified Academic Network
            </span>
            <span>Serving 45+ Countries</span>
          </div>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold tracking-wide text-foreground">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.items.map((i) => (
                <li key={i.label}>
                  <Link
                    to={i.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground sm:px-6 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
        <p>© {new Date().getFullYear()} Sterling Insight Limited. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Terms of Academic License
          </Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Security & Integrity
          </Link>
        </div>
      </div>
    </footer>
  );
}
