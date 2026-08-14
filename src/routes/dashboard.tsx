import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Calendar,
  BookOpen,
  Upload,
  Download,
  Video,
  DollarSign,
  LogOut,
  Settings,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Building,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { PublishResearchModal } from "@/components/site/PublishResearchModal";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "User Dashboard | Sterling Insight" },
      {
        name: "description",
        content:
          "Manage your expert advisory bookings, purchased research projects, published works, and account settings.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const {
    user,
    isAuthenticated,
    bookings,
    purchasedProjects,
    publishedProjects,
    logout,
    updateProfile,
  } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "purchased" | "published" | "settings"
  >("overview");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState(user?.name || "");
  const [editBio, setEditBio] = useState(user?.bio || "");
  const [editInstitution, setEditInstitution] = useState(user?.institution || "");

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold font-display">Authentication Required</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Please sign in or register to access your user dashboard.
        </p>
        <Link
          to="/auth"
          className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
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

  const totalPublishedEarnings = publishedProjects.reduce((acc, p) => acc + p.earnings, 0);

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <PublishResearchModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />

      <div className="mx-auto max-w-6xl space-y-8">
        {/* User Header Profile Card */}
        <div className="hero-aura glass-panel rounded-3xl p-6 sm:p-8 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="size-20 rounded-2xl object-cover border-2 border-primary/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-display">{user.name}</h1>
                <span className="rounded-full bg-primary/20 px-3 py-0.5 text-xs font-semibold text-primary">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Building className="size-3.5 text-cobalt-glow" />
                {user.institution || "Independent Researcher"} · Member since {user.joinedDate}
              </p>
              {user.bio && (
                <p className="text-xs text-foreground/80 mt-2 max-w-xl line-clamp-2">{user.bio}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground shadow-sm transition-shadow hover:shadow-[0_0_20px_-4px_var(--color-cobalt-glow)]"
            >
              <Plus className="size-4" />
              Publish Research Work
            </button>
            <button
              type="button"
              onClick={() => logout()}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary/60 px-3.5 py-2.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-border/60 pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: Sparkles },
            { id: "bookings", label: `My Bookings (${bookings.length})`, icon: Calendar },
            {
              id: "purchased",
              label: `Purchased Projects (${purchasedProjects.length})`,
              icon: BookOpen,
            },
            {
              id: "published",
              label: `Published Works (${publishedProjects.length})`,
              icon: Upload,
            },
            { id: "settings", label: "Account Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "overview" | "bookings" | "purchased" | "published" | "settings"
                  )
                }
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap ${
                  active
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

        {/* Tab Contents */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel rounded-2xl p-5 border border-border space-y-1">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
                  <span>Consultations Booked</span>
                  <Calendar className="size-4 text-cobalt-glow" />
                </div>
                <p className="text-2xl font-bold font-display">{bookings.length}</p>
                <p className="text-[11px] text-muted-foreground">Vetted expert sessions</p>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-border space-y-1">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
                  <span>Purchased Papers</span>
                  <BookOpen className="size-4 text-cobalt-glow" />
                </div>
                <p className="text-2xl font-bold font-display">{purchasedProjects.length}</p>
                <p className="text-[11px] text-muted-foreground">Full thesis & datasets unlocked</p>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-border space-y-1">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
                  <span>Published Works</span>
                  <Upload className="size-4 text-cobalt-glow" />
                </div>
                <p className="text-2xl font-bold font-display">{publishedProjects.length}</p>
                <p className="text-[11px] text-muted-foreground">Active in marketplace</p>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-border space-y-1">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
                  <span>Royalty Earnings</span>
                  <DollarSign className="size-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold font-display text-emerald-500">
                  ${totalPublishedEarnings} USD
                </p>
                <p className="text-[11px] text-muted-foreground">Accumulated royalties</p>
              </div>
            </div>

            {/* Recent Bookings preview */}
            <div className="glass-panel rounded-3xl p-6 border border-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold font-display">
                  Upcoming Expert Advisory Sessions
                </h3>
                <Link to="/services" className="text-xs text-primary font-medium hover:underline">
                  Book Another Expert →
                </Link>
              </div>

              {bookings.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  No active bookings found.
                </p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-secondary/40 p-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={b.expertAvatar}
                          alt={b.expertName}
                          className="size-11 rounded-xl object-cover border border-border"
                        />
                        <div>
                          <p className="text-sm font-semibold">{b.topic}</p>
                          <p className="text-xs text-muted-foreground">
                            With {b.expertName} · {b.expertRole}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3 text-primary" /> {b.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="size-3 text-primary" /> {b.timeSlot}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-500">
                          {b.status}
                        </span>
                        <a
                          href="https://meet.google.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground"
                        >
                          <Video className="size-3.5" />
                          Join Meeting Room
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display">My Booked Advisory Consultations</h2>
              <Link
                to="/services"
                className="rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
              >
                + Book New Consultation
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="glass-panel rounded-3xl p-10 text-center space-y-3 border border-border">
                <Calendar className="mx-auto size-10 text-muted-foreground" />
                <p className="text-sm font-medium">
                  You haven't booked any expert advisory sessions yet.
                </p>
                <Link
                  to="/services"
                  className="inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground"
                >
                  Explore Vetted Experts
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="glass-panel rounded-2xl p-5 border border-border space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.expertAvatar}
                          alt={b.expertName}
                          className="size-12 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-sm">{b.topic}</h3>
                          <p className="text-xs text-muted-foreground">
                            {b.expertName} ({b.expertRole})
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-500">
                        ${b.amount} USD · {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>
                        <strong>Date & Time:</strong> {b.date} at {b.timeSlot}
                      </div>
                      <div>
                        <strong>Booked Date:</strong> {b.bookedAt}
                      </div>
                      <div className="sm:col-span-2">
                        <strong>Research Brief Notes:</strong> {b.notes}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <a
                        href="https://meet.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                      >
                        <Video className="size-4" />
                        Launch Virtual Workspace
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Purchased Tab */}
        {activeTab === "purchased" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display">My Unlocked Research Library</h2>
              <Link
                to="/research"
                className="rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
              >
                Explore Research Repository
              </Link>
            </div>

            {purchasedProjects.length === 0 ? (
              <div className="glass-panel rounded-3xl p-10 text-center space-y-3 border border-border">
                <BookOpen className="mx-auto size-10 text-muted-foreground" />
                <p className="text-sm font-medium">
                  You haven't purchased or downloaded any research projects yet.
                </p>
                <Link
                  to="/research"
                  className="inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground"
                >
                  Browse Research Marketplace
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {purchasedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="glass-panel rounded-2xl p-5 border border-border space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                          {p.academicLevel}
                        </span>
                        <h3 className="font-semibold text-base mt-1">{p.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Author: {p.author} · Category: {p.category}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-500 whitespace-nowrap">
                        {p.price === 0 ? "FREE" : `$${p.price} USD`}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">{p.abstract}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-border/60">
                      <span className="text-[11px] text-muted-foreground">
                        Acquired on {p.purchasedAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const fileContent = `STERLING INSIGHT - RESEARCH DOCUMENT\nTitle: ${p.title}\nAuthor: ${p.author}\nAbstract: ${p.abstract}`;
                          const blob = new Blob([fileContent], { type: "text/plain" });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = `${p.title.slice(0, 30)}.txt`;
                          link.click();
                          URL.revokeObjectURL(url);
                          toast.success("Document downloaded");
                        }}
                        className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                      >
                        <Download className="size-4" />
                        Download Document Package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Published Tab */}
        {activeTab === "published" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display">My Published Research Works</h2>
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
              >
                <Plus className="size-4" />
                Publish New Work
              </button>
            </div>

            {publishedProjects.length === 0 ? (
              <div className="glass-panel rounded-3xl p-10 text-center space-y-3 border border-border">
                <Upload className="mx-auto size-10 text-muted-foreground" />
                <p className="text-sm font-medium">You haven't published any research work yet.</p>
                <p className="text-xs text-muted-foreground">
                  Publish your thesis or dataset to earn royalties.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(true)}
                  className="inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground"
                >
                  Publish First Work
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {publishedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="glass-panel rounded-2xl p-5 border border-border space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500">
                            {p.status}
                          </span>
                          <span className="text-xs text-muted-foreground">{p.academicLevel}</span>
                        </div>
                        <h3 className="font-semibold text-base mt-1">{p.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Published Date: {p.publishedAt}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-display text-emerald-500 block">
                          ${p.earnings} Earned
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {p.downloads} Downloads
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">{p.abstract}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border max-w-2xl space-y-5">
            <h2 className="text-lg font-bold font-display">Edit Profile & Account Settings</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Institution / Organization
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
                  Academic Bio
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
                className="rounded-xl bg-primary px-6 py-2.5 text-xs font-medium text-primary-foreground shadow-sm"
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
