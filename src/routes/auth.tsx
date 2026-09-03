import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { CheckCircle2, Lock, Mail, User, Building, ArrowRight, Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { SterlingLogo } from "@/components/site/SterlingLogo";
import type { SupportedCurrency } from "@/types";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In or Register | Sterling Insight" },
      {
        name: "description",
        content:
          "Access your Sterling Insight research dashboard, wallet, book expert consultations, and manage published research work.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { login, register, isAuthenticated, user, logout, activeCurrency } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"Student" | "Researcher" | "Expert" | "Institution">(
    "Researcher",
  );
  const [institution, setInstitution] = useState("");
  const [currency, setCurrency] = useState<SupportedCurrency>(activeCurrency || "USD");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ok = await login(email, password);
      setLoading(false);
      if (ok) {
        toast.success("Welcome back!", {
          description: "You have signed in to Sterling Insight.",
        });
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Sign in failed.");
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ok = await register({
        name,
        email,
        password,
        role,
        institution,
        currency,
      });
      setLoading(false);
      if (ok) {
        toast.success("Account created successfully!", {
          description: "Welcome to the Sterling Intelligence Platform.",
        });
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      setLoading(false);
      toast.error("Registration failed.");
    }
  };

  const fillQuickDemo = (demoRole: "Researcher" | "Student" | "Expert") => {
    if (demoRole === "Researcher") {
      setEmail("ucheagim1@gmail.com");
      setName("Uche Agim");
      setPassword("password123");
      setInstitution("Pan-Atlantic University & Sterling Research");
      setRole("Researcher");
      setCurrency("NGN");
    } else if (demoRole === "Student") {
      setEmail("scholar.student@university.edu");
      setName("Chinedu Okafor");
      setPassword("password123");
      setInstitution("University of Lagos");
      setRole("Student");
      setCurrency("NGN");
    } else {
      setEmail("expert.advisor@sterling.ai");
      setName("Dr. Aris Thorne");
      setPassword("password123");
      setInstitution("Oxford Institute for Machine Learning");
      setRole("Expert");
      setCurrency("USD");
    }
    toast.info(`Filled credentials for ${demoRole}`);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <SterlingLogo variant="full" size="lg" className="mb-4" />
          <h1 className="text-xl font-bold font-display mt-2">
            {mode === "signin" ? "Sign In to Your Academic Portal" : "Create Your Academic Account"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "signin"
              ? "Access your peer-reviewed repository, hired project rooms, and wallet."
              : "Join 120,000+ researchers, scholars, and academic institutions worldwide."}
          </p>
        </div>

        {/* Currently signed in banner */}
        {isAuthenticated && user && (
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Currently signed in as: <strong>{user.name}</strong>
              </span>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                {user.role}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">{user.email}</p>
            <div className="flex gap-2 pt-1">
              <Link
                to="/dashboard"
                className="flex-1 rounded-xl bg-primary text-primary-foreground py-2 text-center font-semibold text-xs shadow-sm"
              >
                Go to Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-border bg-card px-3 py-2 text-muted-foreground hover:text-destructive text-xs font-medium flex items-center gap-1"
              >
                <LogOut className="size-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Tab switch */}
        <div className="glass-panel rounded-2xl p-1 flex border border-border">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`w-1/2 rounded-xl py-2 text-xs font-semibold transition-all ${
              mode === "signin"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`w-1/2 rounded-xl py-2 text-xs font-semibold transition-all ${
              mode === "register"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border shadow-xl">
          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ucheagim1@gmail.com"
                    className="w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-cobalt-glow)] disabled:opacity-60"
              >
                {loading ? "Authenticating…" : "Sign In to Dashboard"}
                <ArrowRight className="size-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Uche Agim"
                    className="w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Work / Academic Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ucheagim1@gmail.com"
                    className="w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Account Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as "Student" | "Researcher" | "Expert" | "Institution")
                    }
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3 py-2.5 text-xs outline-none focus:border-primary"
                  >
                    <option value="Researcher">Researcher</option>
                    <option value="Student">Student</option>
                    <option value="Expert">Expert Advisor</option>
                    <option value="Institution">Institution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    University / Organization
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. University of Lagos"
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Default Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3 py-2.5 text-xs outline-none focus:border-primary"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="NGN">NGN (₦)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-cobalt-glow)] disabled:opacity-60"
              >
                {loading ? "Creating Account…" : "Register Account"}
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Pre-fills */}
          <div className="mt-6 pt-4 border-t border-border/60 text-center">
            <span className="text-[11px] text-muted-foreground block mb-2 font-medium">
              Quick test accounts:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => fillQuickDemo("Researcher")}
                className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                Scholar (Uche Agim)
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo("Student")}
                className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo("Expert")}
                className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                Advisor (Dr. Thorne)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
