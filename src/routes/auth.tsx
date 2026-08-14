import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BrainCircuit, CheckCircle2, Lock, Mail, User, Building, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In or Register | Sterling Insight" },
      {
        name: "description",
        content:
          "Access your Sterling Insight research dashboard, book expert consultations, and manage published research work.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"Student" | "Researcher" | "Expert" | "Institution">(
    "Researcher",
  );
  const [institution, setInstitution] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
  }

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      toast.success("Welcome back!", {
        description: "You have signed in to Sterling Insight.",
      });
      navigate({ to: "/dashboard" });
    }, 600);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      register({
        name,
        email,
        password,
        role,
        institution,
      });
      setLoading(false);
      toast.success("Account created successfully!", {
        description: "Welcome to the Sterling Intelligence Platform.",
      });
      navigate({ to: "/dashboard" });
    }, 600);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg mb-3">
            <BrainCircuit className="size-6" />
          </div>
          <h1 className="text-2xl font-bold font-display">
            {mode === "signin" ? "Sign in to Sterling Insight" : "Create your Account"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "signin"
              ? "Access your research library, expert bookings, and academic datasets."
              : "Join 120,000+ researchers, students, and institutions."}
          </p>
        </div>

        {/* Tab switch */}
        <div className="glass-panel rounded-2xl p-1 mb-6 flex border border-border">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`w-1/2 rounded-xl py-2 text-xs font-medium transition-all ${
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
            className={`w-1/2 rounded-xl py-2 text-xs font-medium transition-all ${
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
                    placeholder="alex.sterling@university.edu"
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
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-cobalt-glow)] disabled:opacity-60"
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
                    placeholder="Dr. Alexander Sterling"
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
                    placeholder="alex.sterling@university.edu"
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
                      setRole(
                        e.target.value as "Student" | "Researcher" | "Expert" | "Institution"
                      )
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

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  University / Organization
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Lagos Academic Research Institute"
                    className="w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-cobalt-glow)] disabled:opacity-60"
              >
                {loading ? "Creating Account…" : "Register Account"}
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
