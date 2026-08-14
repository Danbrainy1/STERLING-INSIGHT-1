import { useState, type FormEvent } from "react";
import { X, Calendar, Clock, DollarSign, CheckCircle2, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { type Expert } from "@/data/experts-data";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";

interface ExpertBookingModalProps {
  expert: Expert | null;
  onClose: () => void;
}

export function ExpertBookingModal({ expert, onClose }: ExpertBookingModalProps) {
  const { isAuthenticated, addBooking } = useAuth();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("2026-08-22");
  const [selectedSlot, setSelectedSlot] = useState(expert?.availableSlots[0] || "10:00 AM WAT");
  const [topic, setTopic] = useState("Research Methodology & Proposal Review");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!expert) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please sign in or register to book an expert consultation.",
      });
      navigate({ to: "/auth" });
      onClose();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addBooking({
        expertId: expert.id,
        expertName: expert.name,
        expertRole: expert.title,
        expertAvatar: expert.avatar,
        topic,
        date: selectedDate,
        timeSlot: selectedSlot,
        notes: notes || "Standard academic advisory session brief.",
        amount: expert.hourlyRate,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Consultation booked successfully!", {
        description: `Session scheduled with ${expert.name} on ${selectedDate}.`,
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-border bg-card text-card-foreground">
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
            <h3 className="text-2xl font-bold font-display">Booking Confirmed!</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your consultation with <strong className="text-foreground">{expert.name}</strong> is
              scheduled for <span className="text-primary font-medium">{selectedDate}</span> at{" "}
              <span className="text-primary font-medium">{selectedSlot}</span>.
            </p>
            <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expert:</span>
                <span className="font-semibold">{expert.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Topic:</span>
                <span className="font-semibold">{topic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-semibold text-emerald-500">${expert.hourlyRate} USD</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate({ to: "/dashboard" });
                }}
                className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Go to My Dashboard
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-border px-6 py-3 text-sm font-medium hover:bg-secondary"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header / Expert Bio */}
            <div className="flex items-start gap-4 pb-6 border-b border-border/60">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="size-16 rounded-2xl object-cover border border-border shadow-sm"
              />
              <div>
                <span className="inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  ${expert.hourlyRate} / hour
                </span>
                <h3 className="text-xl font-bold font-display mt-1">{expert.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {expert.title} · {expert.institution}
                </p>
                <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-semibold">
                  ★ {expert.rating}{" "}
                  <span className="text-muted-foreground font-normal">
                    ({expert.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Consultation Topic */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Consultation Focus Area
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                >
                  <option value="Research Methodology & Proposal Review">
                    Research Methodology & Proposal Review
                  </option>
                  <option value="Statistical Data Analysis (SPSS / R / Python)">
                    Statistical Data Analysis (SPSS / R / Python)
                  </option>
                  <option value="Journal Publication & Manuscript Editing">
                    Journal Publication & Manuscript Editing
                  </option>
                  <option value="Scholarship & Admissions Guidance">
                    Scholarship & Admissions Guidance
                  </option>
                  <option value="Thesis Defense & Oral Presentation Prep">
                    Thesis Defense & Oral Presentation Prep
                  </option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min="2026-08-15"
                      required
                      className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Available Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  >
                    {expert.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Research Brief */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Research Brief / Key Questions for the Expert
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Describe your study topic, specific dataset challenges, or questions..."
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`rounded-xl border p-3 text-xs font-medium text-left transition-all ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary/40 text-muted-foreground"
                    }`}
                  >
                    💳 Card / Debit (Instant)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("transfer")}
                    className={`rounded-xl border p-3 text-xs font-medium text-left transition-all ${
                      paymentMethod === "transfer"
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary/40 text-muted-foreground"
                    }`}
                  >
                    🏦 Bank Transfer / Wire
                  </button>
                </div>
              </div>

              {/* Price & Guarantee Summary */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  <span>100% Satisfaction or free session reschedule</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                    Total
                  </span>
                  <span className="text-lg font-bold font-display text-primary">
                    ${expert.hourlyRate} USD
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-6px_var(--color-cobalt-glow)] disabled:opacity-60"
              >
                {isSubmitting
                  ? "Processing Payment & Reservation…"
                  : `Confirm & Pay $${expert.hourlyRate}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
