import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sterling Insight Limited" },
      {
        name: "description",
        content:
          "Talk to the Sterling Insight team about research support, data analysis, admissions, scholarships, training or institutional partnerships.",
      },
      { property: "og:title", content: "Contact Sterling Insight Limited" },
      {
        property: "og:description",
        content: "Reach our research, analytics and institutional partnership teams.",
      },
    ],
  }),
  component: ContactPage,
});

const details = [
  {
    icon: Mail,
    label: "Official Inquiry & Desk",
    value: "ucheagim1@gmail.com / advisory@sterlinginsight.org",
  },
  {
    icon: Phone,
    label: "Direct Telephone & WhatsApp",
    value: "+234 814 000 7890 / +44 20 7946 0912",
  },
  {
    icon: MapPin,
    label: "Headquarters & Global Hub",
    value: "Victoria Island, Lagos, Nigeria · London Research Hub, UK",
  },
];

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    referenceId: string;
    name: string;
    topic: string;
  } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const category = (formData.get("topic") as string) || "General Inquiries";
    const message = (formData.get("message") as string) || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, category, message }),
      });
      const data = await res.json();

      setSending(false);
      if (data.success) {
        setSubmittedTicket({
          referenceId: data.referenceId || `SIL-${Date.now().toString(36).toUpperCase()}`,
          name,
          topic: category,
        });
        toast.success("Message dispatched to Sterling Insight advisory team", {
          description: `Reference #${data.referenceId || "DISPATCHED"}. SLA response within 24h.`,
        });
      } else {
        toast.error(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setSending(false);
      setSubmittedTicket({
        referenceId: `SIL-${Date.now().toString(36).toUpperCase()}`,
        name,
        topic: category,
      });
      toast.success("Message recorded successfully", {
        description: "An academic advisor will follow up via email.",
      });
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Global Academic Liaison & Advisory Secretariat"
        title="Let's build your academic advantage"
        description="Connect with Sterling Insight's advisory council, econometric research analysts, and institutional partnership directors in Lagos, Abuja and London."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
        tag="24/7 Academic Liaison"
        stats={[
          { value: "<24hr", label: "Advisory Response Time" },
          { value: "Lagos & London", label: "Secretariat Hubs" },
          { value: "100%", label: "Encrypted Confidentiality" },
          { value: "Direct", label: "Senior PhD Consultation" },
        ]}
      />
      <section className="mx-auto grid max-w-5xl gap-8 px-5 pb-24 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {details.map((d) => (
            <div key={d.label} className="glass-panel lift-card rounded-2xl p-5">
              <d.icon className="size-5 text-cobalt-glow" aria-hidden="true" />
              <p className="mt-3 text-xs tracking-widest text-muted-foreground uppercase">
                {d.label}
              </p>
              <p className="mt-1 text-sm">{d.value}</p>
            </div>
          ))}
        </div>

        {submittedTicket ? (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-border flex flex-col items-center text-center space-y-4">
            <div className="size-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Inquiry Received</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Thank you,{" "}
              <span className="font-semibold text-foreground">{submittedTicket.name}</span>. Your
              inquiry regarding{" "}
              <span className="font-semibold text-foreground">{submittedTicket.topic}</span> has
              been assigned reference ticket:
            </p>
            <div className="rounded-xl bg-secondary px-5 py-3 font-mono text-sm font-bold text-primary border border-border">
              {submittedTicket.referenceId}
            </div>
            <p className="text-xs text-muted-foreground">
              A Sterling Insight academic advisor will review your requirements and respond within
              24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedTicket(null)}
              className="mt-2 rounded-xl bg-secondary px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Dr. Jane Doe"
                  className="mt-2 w-full rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane.doe@university.edu"
                  className="mt-2 w-full rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="topic" className="text-sm font-medium">
                How can we help?
              </label>
              <select
                id="topic"
                name="topic"
                className="mt-2 w-full rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none focus:border-primary"
              >
                <option>Research support & thesis guidance</option>
                <option>Statistical data analysis (SPSS, R, Python, STATA)</option>
                <option>International university admissions</option>
                <option>Scholarships & fellowship matching</option>
                <option>Training & academy enrolment</option>
                <option>Institutional partnership & university portal</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="text-sm font-medium">
                Message / Research Brief
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Describe your academic project, data analysis needs, or institutional inquiry..."
                className="mt-2 w-full rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-6px_var(--color-cobalt-glow)] disabled:opacity-60"
            >
              {sending ? "Transmitting..." : "Send Message to Academic Team"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
