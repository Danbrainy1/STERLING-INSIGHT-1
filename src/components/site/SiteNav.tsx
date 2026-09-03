import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  Wallet as WalletIcon,
  MessageSquare,
  ArrowDownLeft,
  Plus,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SterlingLogo } from "./SterlingLogo";
import { useAuth } from "@/lib/auth-context";
import { WalletModal } from "@/components/wallet/WalletModal";
import { formatMoney } from "@/lib/currency";

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
  const { user, isAuthenticated, logout, walletBalanceUSD, activeCurrency, hiredProjects } =
    useAuth();
  const [userDropdown, setUserDropdown] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "glass-panel shadow-lg"
              : "border border-transparent bg-background/40 backdrop-blur-md"
          }`}
        >
          <SterlingLogo variant="header" size="sm" asLink onClick={() => setOpen(false)} />

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
          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle />

            {/* Wallet Quick Pill */}
            {isAuthenticated && user && (
              <button
                type="button"
                onClick={() => setIsWalletModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-secondary/40 hover:bg-secondary/70 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors group"
                title="Sterling Multi-Currency Wallet"
              >
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <WalletIcon className="size-3.5 text-primary group-hover:scale-110 transition-transform" />
                <span>{formatMoney(walletBalanceUSD, activeCurrency)}</span>
              </button>
            )}

            {/* Active Projects Indicator */}
            {isAuthenticated && hiredProjects.length > 0 && (
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors"
                title={`${hiredProjects.length} Active Hired Workspace(s)`}
              >
                <MessageSquare className="size-3.5" />
                <span>{hiredProjects.length}</span>
              </Link>
            )}

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdown((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 p-1.5 pr-3 text-sm font-medium transition-colors hover:border-primary"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="size-7 rounded-lg object-cover"
                  />
                  <span className="max-w-[100px] truncate text-xs">{user.name.split(" ")[0]}</span>
                </button>

                {userDropdown && (
                  <div className="glass-panel absolute right-0 mt-2 w-56 rounded-2xl p-2 shadow-xl border border-border">
                    <div className="px-3 py-2 border-b border-border/60">
                      <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                      <p className="text-[10px] text-emerald-500 font-mono mt-0.5">
                        Wallet: {formatMoney(walletBalanceUSD, activeCurrency)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdown(false);
                        setIsWalletModalOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      <WalletIcon className="size-4 text-emerald-500" />
                      Fund / Withdraw Wallet
                    </button>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      <LayoutDashboard className="size-4 text-primary" />
                      User Dashboard & Workspaces
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
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="rounded-xl border border-border bg-secondary/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="glass-panel mx-auto mt-2 max-w-6xl rounded-2xl p-4 shadow-xl border border-border lg:hidden animate-in fade-in duration-200">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "bg-primary/20 text-foreground font-medium" }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary/15 hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-border/80 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center justify-between px-2 py-1 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-7 rounded-lg object-cover"
                      />
                      <span className="font-semibold text-foreground">{user.name}</span>
                    </div>
                    <span className="font-bold text-emerald-500 font-mono">
                      {formatMoney(walletBalanceUSD, activeCurrency)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setIsWalletModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-2.5 text-xs font-semibold text-foreground"
                  >
                    <WalletIcon className="size-4 text-emerald-500" />
                    Fund / Withdraw Wallet
                  </button>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard & Projects
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="rounded-xl border border-destructive/30 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-border bg-secondary py-2.5 text-center text-xs font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-primary py-2.5 text-center text-xs font-medium text-primary-foreground"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
