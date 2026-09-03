import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Calendar,
  BookOpen,
  Upload,
  Download,
  DollarSign,
  LogOut,
  Settings,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Building,
  Wallet as WalletIcon,
  MessageSquare,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { PublishResearchModal } from "@/components/site/PublishResearchModal";
import { WalletModal } from "@/components/wallet/WalletModal";
import { ProjectWorkspaceModal } from "@/components/collaboration/ProjectWorkspaceModal";
import { formatMoney } from "@/lib/currency";
import type { HiredProject, SupportedCurrency } from "@/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Academic & Advisory Dashboard | Sterling Insight" },
      {
        name: "description",
        content:
          "Manage your Sterling wallet, hired academic project workspaces, live expert chats, published research manuscripts, and earnings.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const {
    user,
    isAuthenticated,
    walletBalanceUSD,
    walletTransactions,
    activeCurrency,
    setActiveCurrency,
    hiredProjects,
    bookings,
    purchasedProjects,
    publishedProjects,
    logout,
    updateProfile,
  } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    "overview" | "wallet" | "projects" | "bookings" | "purchased" | "published" | "settings"
  >("overview");

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletModalTab, setWalletModalTab] = useState<"fund" | "withdraw" | "history">("fund");

  // Project Workspace Modal State
  const [selectedProject, setSelectedProject] = useState<HiredProject | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState(user?.name || "");
  const [editBio, setEditBio] = useState(user?.bio || "");
  const [editInstitution, setEditInstitution] = useState(user?.institution || "");

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 text-center flex flex-col items-center justify-center">
        <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
          <User className="size-8" />
        </div>
        <h2 className="text-2xl font-bold font-display">Authentication Required</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Please sign in or register to access your Sterling wallet, hired experts, and academic
          projects.
        </p>
        <Link
          to="/auth"
          className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md"
        >
          Sign In / Register
        </Link>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      bio: editBio,
      institution: editInstitution,
    });
    toast.success("Profile updated successfully!");
  };

  const handleOpenWorkspace = (proj: HiredProject) => {
    setSelectedProject(proj);
    setIsWorkspaceOpen(true);
  };

  const openFundWallet = () => {
    setWalletModalTab("fund");
    setIsWalletModalOpen(true);
  };

  const openWithdrawWallet = () => {
    setWalletModalTab("withdraw");
    setIsWalletModalOpen(true);
  };

  const totalPublishedEarnings = publishedProjects.reduce((acc, p) => acc + p.earnings, 0);

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      {/* Modals */}
      <PublishResearchModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        defaultTab={walletModalTab}
        onClose={() => setIsWalletModalOpen(false)}
      />

      <ProjectWorkspaceModal
        project={selectedProject}
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
      />

      <div className="mx-auto max-w-6xl space-y-8">
        {/* User Header Profile Card */}
        <div className="hero-aura glass-panel rounded-3xl p-6 sm:p-8 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="size-16 sm:size-20 rounded-2xl object-cover border-2 border-primary/30 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-display">{user.name}</h1>
                <span className="rounded-full bg-primary/15 text-primary border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Building className="size-3.5 text-primary" />
                {user.institution || "Independent Scholar"} · Member since {user.joinedDate}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Quick Wallet Info Badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 px-4 py-2 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  Wallet Balance
                </span>
                <span className="text-sm font-bold font-display text-emerald-500">
                  {formatMoney(walletBalanceUSD, activeCurrency)}
                </span>
              </div>
              <button
                type="button"
                onClick={openFundWallet}
                className="rounded-lg bg-primary/10 hover:bg-primary/20 text-primary p-1.5 transition-colors"
                title="Fund Wallet"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsPublishModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-shadow hover:shadow-[0_0_20px_-5px_var(--color-cobalt-glow)]"
            >
              <Upload className="size-4" />
              Publish Research
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="rounded-xl border border-border bg-secondary p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border/80 scrollbar-none">
          {[
            { id: "overview", label: "Overview", icon: Sparkles },
            {
              id: "wallet",
              label: `Wallet (${formatMoney(walletBalanceUSD, activeCurrency)})`,
              icon: WalletIcon,
            },
            {
              id: "projects",
              label: `Hired Workspaces (${hiredProjects.length})`,
              icon: MessageSquare,
            },
            {
              id: "published",
              label: `My Published Works (${publishedProjects.length})`,
              icon: Upload,
            },
            {
              id: "purchased",
              label: `Purchased Manuscripts (${purchasedProjects.length})`,
              icon: BookOpen,
            },
            {
              id: "bookings",
              label: `Advisory Sessions (${bookings.length})`,
              icon: Calendar,
            },
            { id: "settings", label: "Profile Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: Wallet */}
              <div className="glass-panel rounded-2xl p-5 border border-border space-y-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-medium">Wallet Balance</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <WalletIcon className="size-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-emerald-500">
                    {formatMoney(walletBalanceUSD, activeCurrency)}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Available for escrow & purchases
                  </p>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={openFundWallet}
                    className="flex-1 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary py-1.5 text-[11px] font-semibold text-center"
                  >
                    + Fund
                  </button>
                  <button
                    type="button"
                    onClick={openWithdrawWallet}
                    className="flex-1 rounded-lg border border-border hover:bg-secondary py-1.5 text-[11px] font-semibold text-center"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Metric 2: Active Projects */}
              <div className="glass-panel rounded-2xl p-5 border border-border space-y-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-medium">Hired Projects</span>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="size-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-foreground">
                    {hiredProjects.length}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Encrypted collaboration rooms
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("projects")}
                  className="w-full rounded-lg border border-border hover:bg-secondary py-1.5 text-[11px] font-semibold text-center flex items-center justify-center gap-1"
                >
                  View Workspaces <ChevronRight className="size-3" />
                </button>
              </div>

              {/* Metric 3: Published Works */}
              <div className="glass-panel rounded-2xl p-5 border border-border space-y-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-medium">Published Research</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <Upload className="size-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-foreground">
                    {publishedProjects.length}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Total Earned:{" "}
                    <strong className="text-emerald-500">
                      {formatMoney(totalPublishedEarnings, activeCurrency)}
                    </strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(true)}
                  className="w-full rounded-lg border border-border hover:bg-secondary py-1.5 text-[11px] font-semibold text-center flex items-center justify-center gap-1"
                >
                  Upload New Paper
                </button>
              </div>

              {/* Metric 4: Library */}
              <div className="glass-panel rounded-2xl p-5 border border-border space-y-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-medium">Acquired Manuscripts</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <BookOpen className="size-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-foreground">
                    {purchasedProjects.length}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Full dataset & citation access
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("purchased")}
                  className="w-full rounded-lg border border-border hover:bg-secondary py-1.5 text-[11px] font-semibold text-center flex items-center justify-center gap-1"
                >
                  Access Library
                </button>
              </div>
            </div>

            {/* Active Hired Project Spotlight */}
            {hiredProjects.length > 0 && (
              <div className="glass-panel rounded-3xl p-6 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-display">Active Advisory Workspace</h3>
                    <p className="text-xs text-muted-foreground">
                      Live collaboration with your hired research and methodology advisor
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("projects")}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View All Workspaces ({hiredProjects.length})
                  </button>
                </div>

                <div className="rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={hiredProjects[0].expertAvatar}
                      alt={hiredProjects[0].expertName}
                      className="size-14 rounded-2xl object-cover border-2 border-primary/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">
                          {hiredProjects[0].expertName}
                        </h4>
                        <span className="rounded-full bg-emerald-500/20 text-emerald-500 px-2 py-0.5 text-[10px] font-semibold">
                          {hiredProjects[0].status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {hiredProjects[0].title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Escrow:{" "}
                        <strong className="text-emerald-500">
                          {formatMoney(hiredProjects[0].totalBudget, activeCurrency)}
                        </strong>{" "}
                        · {hiredProjects[0].milestones.length} Milestones ·{" "}
                        {hiredProjects[0].messages.length} Messages
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenWorkspace(hiredProjects[0])}
                    className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <MessageSquare className="size-4" />
                    Open Chat & Milestones
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: WALLET & PAYMENTS */}
        {/* ========================================================= */}
        {activeTab === "wallet" && (
          <div className="space-y-6">
            <div className="hero-aura glass-panel rounded-3xl p-6 sm:p-8 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-emerald-500/20 text-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase">
                    Escrow Ready
                  </span>
                  <span className="text-xs text-muted-foreground">Multi-Currency Wallet</span>
                </div>
                <h3 className="text-3xl font-bold font-display text-foreground">
                  {formatMoney(walletBalanceUSD, activeCurrency)}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports instant local funding (Paystack, Flutterwave, Bank Transfer) and
                  international clearing (Stripe, PayPal, Wise).
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={openFundWallet}
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground shadow-lg hover:shadow-[0_0_20px_-5px_var(--color-cobalt-glow)] transition-shadow"
                >
                  <ArrowDownLeft className="size-4 text-emerald-400" />
                  Deposit & Fund Wallet
                </button>
                <button
                  type="button"
                  onClick={openWithdrawWallet}
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <ArrowUpRight className="size-4 text-cobalt-glow" />
                  Withdraw Funds / Payout
                </button>
              </div>
            </div>

            {/* Transactions */}
            <div className="glass-panel rounded-3xl p-6 border border-border space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold font-display">
                  Wallet Transactions & Settlement Log
                </h4>
                <span className="text-xs text-muted-foreground">
                  {walletTransactions.length} Recorded
                </span>
              </div>

              {walletTransactions.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  No wallet transactions recorded yet. Click "Deposit & Fund Wallet" to get started.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {walletTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-secondary/30 p-3.5 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-9 items-center justify-center rounded-xl border ${
                            tx.type === "deposit" ||
                            tx.type === "royalty" ||
                            tx.type === "milestone_received"
                              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-500"
                              : "bg-destructive/15 border-destructive/30 text-destructive"
                          }`}
                        >
                          {tx.type === "deposit" ||
                          tx.type === "royalty" ||
                          tx.type === "milestone_received" ? (
                            <ArrowDownLeft className="size-4" />
                          ) : (
                            <ArrowUpRight className="size-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{tx.description}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {tx.method} · Ref: {tx.reference} ·{" "}
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`font-bold font-mono text-sm block ${
                            tx.type === "deposit" ||
                            tx.type === "royalty" ||
                            tx.type === "milestone_received"
                              ? "text-emerald-500"
                              : "text-destructive"
                          }`}
                        >
                          {tx.type === "deposit" ||
                          tx.type === "royalty" ||
                          tx.type === "milestone_received"
                            ? "+"
                            : "-"}
                          {formatMoney(tx.amount, activeCurrency)}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: HIRED PROJECTS & WORKSPACES */}
        {/* ========================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold font-display">
                  Hired Expert Projects & Collaboration Rooms
                </h3>
                <p className="text-xs text-muted-foreground">
                  Communicate with individuals you have hired, exchange research datasets, and
                  release escrow milestone payouts.
                </p>
              </div>

              <Link
                to="/services"
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
              >
                <Plus className="size-3.5" />
                Hire Another Expert
              </Link>
            </div>

            {hiredProjects.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-border rounded-3xl p-8 space-y-3">
                <MessageSquare className="size-12 text-muted-foreground mx-auto" />
                <h4 className="text-base font-bold text-foreground">No Hired Experts Yet</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Browse our certified academic advisors for data analysis, econometric modeling,
                  SPSS, Python scripts, or thesis formatting.
                </p>
                <Link
                  to="/services"
                  className="inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground"
                >
                  Browse Academic Advisors
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {hiredProjects.map((p) => (
                  <div
                    key={p.id}
                    className="glass-panel rounded-3xl p-5 sm:p-6 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={p.expertAvatar}
                        alt={p.expertName}
                        className="size-14 rounded-2xl object-cover border-2 border-primary/30 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold font-display text-foreground">
                            {p.expertName}
                          </h4>
                          <span className="rounded-full bg-emerald-500/15 text-emerald-500 px-2 py-0.5 text-[10px] font-semibold">
                            {p.status}
                          </span>
                        </div>
                        <p className="text-xs text-foreground font-medium">{p.title}</p>
                        <p className="text-[11px] text-muted-foreground">{p.expertRole}</p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 flex-wrap">
                          <span>
                            Escrow:{" "}
                            <strong className="text-emerald-500 font-mono">
                              {formatMoney(p.totalBudget, activeCurrency)}
                            </strong>
                          </span>
                          <span>• {p.milestones.length} Milestones</span>
                          <span>• {p.files.length} Files</span>
                          <span>• {p.messages.length} Messages</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenWorkspace(p)}
                      className="w-full md:w-auto rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      <MessageSquare className="size-4" />
                      Open Workspace & Chat
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PUBLISHED RESEARCH */}
        {/* ========================================================= */}
        {activeTab === "published" && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold font-display">My Published Research Works</h3>
                <p className="text-xs text-muted-foreground">
                  Your active manuscripts in the global marketplace. You receive 80% royalties on
                  each download.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
              >
                <Plus className="size-4" />
                Upload New Research
              </button>
            </div>

            {publishedProjects.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-border rounded-3xl p-8 space-y-3">
                <Upload className="size-12 text-muted-foreground mx-auto" />
                <h4 className="text-base font-bold text-foreground">No Research Published Yet</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Upload your thesis, dissertation, journal paper, or dataset package to start
                  earning royalties in your wallet.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(true)}
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground"
                >
                  Publish Manuscript Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {publishedProjects.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel rounded-3xl p-5 sm:p-6 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold">
                          {item.academicLevel}
                        </span>
                        <span className="rounded-full bg-emerald-500/15 text-emerald-500 px-2 py-0.5 text-[10px] font-semibold">
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.abstract}</p>
                      <p className="text-[11px] text-muted-foreground pt-1">
                        Category: {item.category} · Published on {item.publishedAt}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 border-border pt-3 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-foreground block">
                          Listing Price: {item.price === 0 ? "Free" : `$${item.price} USD`}
                        </span>
                        <span className="text-[11px] text-emerald-500 font-semibold block">
                          Earned: {formatMoney(item.earnings, activeCurrency)} ({item.downloads}{" "}
                          sales)
                        </span>
                      </div>
                      <Link
                        to="/research"
                        className="rounded-xl border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary flex items-center gap-1"
                      >
                        View in Hub <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PURCHASED MANUSCRIPTS */}
        {/* ========================================================= */}
        {activeTab === "purchased" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-bold font-display">Acquired Academic Manuscripts</h3>
              <p className="text-xs text-muted-foreground">
                Download your perpetual access research papers, methodology frameworks, and dataset
                packages.
              </p>
            </div>

            {purchasedProjects.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-border rounded-3xl p-8 space-y-3">
                <BookOpen className="size-12 text-muted-foreground mx-auto" />
                <h4 className="text-base font-bold text-foreground">No Manuscripts Acquired Yet</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Browse hundreds of verified empirical dissertations, theses, and dataset
                  collections in the Sterling Repository.
                </p>
                <Link
                  to="/research"
                  className="inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground"
                >
                  Explore Research Hub
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {purchasedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="glass-panel rounded-3xl p-5 sm:p-6 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold">
                        {p.category}
                      </span>
                      <h4 className="text-base font-bold text-foreground">{p.title}</h4>
                      <p className="text-xs text-muted-foreground">By {p.author}</p>
                      <p className="text-[11px] text-muted-foreground pt-1">
                        Acquired: {p.purchasedAt} · Format: {p.format || "PDF Manuscript"} (
                        {p.fileSize || "14.2 MB"})
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const content = `STERLING INSIGHT VERIFIED MANUSCRIPT
Title: ${p.title}
Author: ${p.author}
Category: ${p.category}
Acquisition ID: ${p.id}
License: Perpetual Scholar Citation License
======================================================
Abstract:
${p.abstract}
======================================================`;
                        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${p.title.slice(0, 30)}.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        toast.success("Downloaded manuscript!");
                      }}
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm flex items-center gap-1.5"
                    >
                      <Download className="size-3.5" />
                      Download Package
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: ADVISORY SESSIONS */}
        {/* ========================================================= */}
        {activeTab === "bookings" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-bold font-display">Scheduled Advisory Sessions</h3>
              <p className="text-xs text-muted-foreground">
                One-on-one virtual consultation appointments with verified academic experts.
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-border rounded-3xl p-8 space-y-3">
                <Calendar className="size-12 text-muted-foreground mx-auto" />
                <h4 className="text-base font-bold text-foreground">No Sessions Booked</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Book a consultation session with an expert to review your statistical methodology
                  or proposal.
                </p>
                <Link
                  to="/services"
                  className="inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground"
                >
                  Find an Advisor
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="glass-panel rounded-3xl p-5 sm:p-6 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={b.expertAvatar}
                        alt={b.expertName}
                        className="size-12 rounded-2xl object-cover border border-border"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-foreground">{b.expertName}</h4>
                          <span className="rounded-full bg-emerald-500/15 text-emerald-500 px-2 py-0.5 text-[10px] font-semibold">
                            {b.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{b.topic}</p>
                        <p className="text-[11px] text-primary font-medium mt-1">
                          📅 {b.date} at {b.timeSlot}
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <span className="font-bold text-foreground block">
                        {formatMoney(b.amount, activeCurrency)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Verified Consultation
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: PROFILE SETTINGS */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border max-w-2xl space-y-6">
            <div>
              <h3 className="text-base font-bold font-display">Account & Profile Settings</h3>
              <p className="text-xs text-muted-foreground">
                Update your scholar credentials, institution affiliation, and default currency.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Academic Institution / Affiliation
                </label>
                <input
                  type="text"
                  value={editInstitution}
                  onChange={(e) => setEditInstitution(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Preferred Currency
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["USD", "NGN", "GBP", "EUR"] as SupportedCurrency[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCurrency(c)}
                      className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                        activeCurrency === c
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Academic Bio & Specialization
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
