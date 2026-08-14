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
  { icon: Mail, label: "Email", value: "hello@sterlinginsight.com" },
  { icon: Phone, label: "Phone", value: "+234 (0) 800 000 0000" },
  { icon: MapPin, label: "Office", value: "Lagos, Nigeria · Serving 45+ countries" },
];

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Message sent", {
        description: "Our team will respond within one business day.",
      });
    }, 600);
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Let's build your academic advantage"
        description="Tell us what you need — research support, analytics, admissions guidance, training or an institutional partnership."
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
              <option>Research support</option>
              <option>Data analysis</option>
              <option>Admissions</option>
              <option>Scholarships</option>
              <option>Training & academy</option>
              <option>Institutional partnership</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-2 w-full rounded-xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-6px_var(--color-cobalt-glow)] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </div>
  );
}
