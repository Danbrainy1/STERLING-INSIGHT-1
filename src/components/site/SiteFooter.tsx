import { Link } from "@tanstack/react-router";

const groups = [
  {
    title: "Platform",
    items: [
      { to: "/research", label: "Research Repository" },
      { to: "/services", label: "Research Services" },
      { to: "/learning", label: "Academy & LMS" },
    ],
  },
  {
    title: "Growth",
    items: [
      { to: "/opportunities", label: "Scholarships" },
      { to: "/opportunities", label: "Admissions" },
      { to: "/opportunities", label: "Careers & Events" },
    ],
  },
  {
    title: "Company",
    items: [
      { to: "/contact", label: "Contact" },
      { to: "/contact", label: "Institutions" },
      { to: "/contact", label: "Support" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold">Sterling Insight Limited</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Research, education, analytics and knowledge infrastructure for students, institutions
            and organisations worldwide.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold">{g.title}</p>
            <ul className="mt-4 space-y-2">
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
      <div className="border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Sterling Insight Limited. All rights reserved.
      </div>
    </footer>
  );
}
