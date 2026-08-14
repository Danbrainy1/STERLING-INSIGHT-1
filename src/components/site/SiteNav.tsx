import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, BrainCircuit, User, LayoutDashboard, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth-context";

const links = [
  { to: "/", label: "Home" },
  { to: "/research", label: "Research Hub" },
  { to: "/services", label: "Services & Experts" },
  { to: "/learning", label: "Academy" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
          scrolled
            ? "glass-panel shadow-lg"
            : "border border-transparent bg-background/40 backdrop-blur-md"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-sm">
            <BrainCircuit className="size-5 text-primary-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm leading-tight font-semibold tracking-tight">
            Sterling Insight
            <span className="block text-[11px] font-normal text-muted-foreground">
              Intelligence Platform
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-primary/20 text-foreground font-medium" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary/15 hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdown((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 p-1.5 pr-3 text-sm font-medium transition-colors hover:border-primary"
              >
                <img src={user.avatar} alt={user.name} className="size-7 rounded-lg object-cover" />
                <span className="max-w-[100px] truncate text-xs">{user.name.split(" ")[0]}</span>
              </button>

              {userDropdown && (
                <div className="glass-panel absolute right-0 mt-2 w-52 rounded-2xl p-2 shadow-xl border border-border">
                  <div className="px-3 py-2 border-b border-border/60">
                    <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    <LayoutDashboard className="size-4 text-primary" />
                    User Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="rounded-xl border border-border bg-secondary/50 px-3.5 py-2 text-xs font-medium transition-colors hover:bg-secondary"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-cobalt-glow)]"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border bg-secondary/60 p-2"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="glass-panel mx-auto mt-2 max-w-6xl rounded-2xl p-4 lg:hidden border border-border shadow-2xl">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "bg-primary/20 text-foreground font-medium" }}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-3 border-t border-border/60">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground"
                >
                  <LayoutDashboard className="size-4" />
                  My Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-border px-4 py-2 text-xs font-medium text-destructive"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-border bg-secondary/80 px-4 py-2 text-xs font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
