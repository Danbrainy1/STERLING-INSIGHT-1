import { useState, type FormEvent } from "react";
import {
  X,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  ShieldCheck,
  User,
  Wallet,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { type Expert } from "@/data/experts-data";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";
import { formatMoney } from "@/lib/currency";
import type { HiredProject } from "@/types";

interface ExpertBookingModalProps {
  expert: Expert | null;
  onClose: () => void;
  onOpenWorkspace?: (project: HiredProject) => void;
}

export function ExpertBookingModal({ expert, onClose, onOpenWorkspace }: ExpertBookingModalProps) {
  const {
    user,
    isAuthenticated,
    walletBalanceUSD,
    activeCurrency,
    addBooking,
    hireExpert,
    register,
    refreshWallet,
  } = useAuth();
  const navigate = useNavigate();

  const [bookingMode, setBookingMode] = useState<"consultation" | "project_hire">("project_hire");
  const [selectedDate, setSelectedDate] = useState("2026-08-22");
  const [selectedSlot, setSelectedSlot] = useState(expert?.availableSlots?.[0] || "10:00 AM WAT");
  const [topic, setTopic] = useState("Empirical Analysis & Methodology Formulation");
  const [notes, setNotes] = useState("");
  const [customBudgetUSD, setCustomBudgetUSD] = useState(
    expert?.hourlyRate ? expert.hourlyRate * 2.5 : 150,
  );

  const [paymentMethod, setPaymentMethod] = useState<
    "wallet" | "paystack" | "flutterwave" | "stripe" | "paypal"
  >(walletBalanceUSD >= 65 ? "wallet" : "paystack");

  // Guest details if not logged in
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdProject, setCreatedProject] = useState<HiredProject | null>(null);

  if (!expert) return null;

  const totalAmountUSD = bookingMode === "consultation" ? expert.hourlyRate : customBudgetUSD;
  const hasWalletFunds = walletBalanceUSD >= totalAmountUSD;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      if (!guestName.trim() || !guestEmail.trim()) {
        toast.error("Please enter your name and email to proceed.");
        return;
      }
      await register({
        name: guestName,
        email: guestEmail,
        password: "secureUserPass123",
        role: "Researcher",
      });
    }

    setIsSubmitting(true);

    try {
      // 1. If project hire, create interactive collaboration room
      let newHiredProj: HiredProject | null = null;
      if (bookingMode === "project_hire") {
        newHiredProj = await hireExpert({
          expertId: expert.id,
          topic,
          budget: customBudgetUSD,
          paymentMethod,
        });
        setCreatedProject(newHiredProj);
      }

      // 2. Also register booking record
      addBooking({
        expertId: expert.id,
        expertName: expert.name,
        expertRole: expert.title,
        expertAvatar: expert.avatar,
        topic,
        date: selectedDate,
        timeSlot: selectedSlot,
        notes: notes || "Empirical research & statistical formulation brief.",
        amount: totalAmountUSD,
      });

      await refreshWallet();
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(
        bookingMode === "project_hire"
          ? "Project commissioned in Escrow!"
          : "Advisory consultation confirmed!",
      );
    } catch (err) {
      console.warn("Booking error:", err);
      setIsSubmitting(false);
      toast.error("Could not process booking. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-border bg-card text-card-foreground">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="text-2xl font-bold font-display">
              {bookingMode === "project_hire"
                ? "Collaboration Workspace Initialized!"
                : "Session Confirmed!"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You are now partnered with <strong className="text-foreground">{expert.name}</strong>.
              Escrow protection is active and your funds will only be released as deliverables are
              approved.
            </p>

            <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expert Advisor:</span>
                <span className="font-semibold">{expert.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Topic:</span>
                <span className="font-semibold truncate max-w-[240px]">{topic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Escrow Amount:</span>
                <span className="font-semibold text-emerald-500 font-mono">
                  {formatMoney(totalAmountUSD, activeCurrency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Service:</span>
                <span className="font-semibold uppercase">{paymentMethod}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              {createdProject && onOpenWorkspace ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenWorkspace(createdProject);
                  }}
                  className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="size-4" />
                  Open Collaboration Chat & Room
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate({ to: "/dashboard" });
                  }}
                  className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="size-4" />
                  View in My Dashboard
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-border px-6 py-3.5 text-sm font-medium hover:bg-secondary"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-border/60">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="size-14 rounded-2xl object-cover border-2 border-primary/30"
              />
              <div>
                <h3 className="text-lg font-bold font-display">{expert.name}</h3>
                <p className="text-xs text-muted-foreground">{expert.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-primary font-mono">
                    {formatMoney(expert.hourlyRate, activeCurrency)} / hr
                  </span>
                  <span className="text-[11px] text-muted-foreground">({expert.institution})</span>
                </div>
              </div>
            </div>

            {/* Mode Toggle: Consultation vs Project Hire */}
            <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-2xl bg-secondary/60 border border-border">
              <button
                type="button"
                onClick={() => setBookingMode("project_hire")}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all ${
                  bookingMode === "project_hire"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="size-3.5" />
                Hire for Project / Escrow
              </button>
              <button
                type="button"
                onClick={() => setBookingMode("consultation")}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all ${
                  bookingMode === "consultation"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Calendar className="size-3.5" />
                1-on-1 Consultation Call
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* If guest */}
              {!isAuthenticated && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3.5 space-y-2">
                  <p className="text-xs font-semibold text-foreground">
                    Your Scholar Contact Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      required
                      placeholder="email@university.edu"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Project Objective / Consultation Focus
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Econometric Data Modeling using STATA & Python"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              {bookingMode === "consultation" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-xl border border-input bg-secondary/50 px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Available Time Slot
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full rounded-xl border border-input bg-secondary/50 px-3 py-2 text-xs outline-none focus:border-primary"
                    >
                      {expert.availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-foreground">
                      Total Milestone Escrow Budget (USD)
                    </label>
                    <span className="text-xs font-mono font-bold text-primary">
                      {formatMoney(customBudgetUSD, activeCurrency)}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    required
                    value={customBudgetUSD}
                    onChange={(e) => setCustomBudgetUSD(Number(e.target.value))}
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2 text-xs outline-none focus:border-primary"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Funds are placed in secure escrow and released milestone-by-milestone upon your
                    explicit approval.
                  </p>
                </div>
              )}

              {/* Payment selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-foreground">
                  Select Payment / Escrow Funding Service
                </label>

                {/* Wallet button */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`w-full rounded-2xl border p-3 flex items-center justify-between transition-all ${
                    paymentMethod === "wallet"
                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                      : "border-border bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Wallet className="size-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">
                      Sterling Wallet ({formatMoney(walletBalanceUSD, activeCurrency)})
                    </span>
                  </div>
                  {hasWalletFunds ? (
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                      Instant 1-Click
                    </span>
                  ) : (
                    <span className="text-[10px] text-destructive">Insufficient balance</span>
                  )}
                </button>

                {/* Local & International Gateways */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paystack")}
                    className={`rounded-xl border p-2 text-center text-xs transition-all ${
                      paymentMethod === "paystack"
                        ? "border-primary bg-primary/10 ring-1 ring-primary font-bold text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="block font-bold">Paystack</span>
                    <span className="text-[9px] text-emerald-500">Local NGN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("flutterwave")}
                    className={`rounded-xl border p-2 text-center text-xs transition-all ${
                      paymentMethod === "flutterwave"
                        ? "border-primary bg-primary/10 ring-1 ring-primary font-bold text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="block font-bold">Flutterwave</span>
                    <span className="text-[9px] text-amber-500">Africa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("stripe")}
                    className={`rounded-xl border p-2 text-center text-xs transition-all ${
                      paymentMethod === "stripe"
                        ? "border-primary bg-primary/10 ring-1 ring-primary font-bold text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="block font-bold">Stripe</span>
                    <span className="text-[9px] text-purple-500">Global Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`rounded-xl border p-2 text-center text-xs transition-all ${
                      paymentMethod === "paypal"
                        ? "border-primary bg-primary/10 ring-1 ring-primary font-bold text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="block font-bold">PayPal</span>
                    <span className="text-[9px] text-blue-500">Worldwide</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_25px_-5px_var(--color-cobalt-glow)] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="size-4 animate-spin" />
                    Engaging Advisor & Initializing Escrow Room…
                  </>
                ) : (
                  <>
                    {bookingMode === "project_hire" ? (
                      <>
                        <Layers className="size-4" />
                        Hire {expert.name} ({formatMoney(totalAmountUSD, activeCurrency)})
                      </>
                    ) : (
                      <>
                        <Calendar className="size-4" />
                        Book Session ({formatMoney(totalAmountUSD, activeCurrency)})
                      </>
                    )}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
