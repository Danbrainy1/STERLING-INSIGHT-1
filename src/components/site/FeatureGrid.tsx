import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  items?: string[];
};

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 90}>
          <article className="lift-card glass-panel h-full rounded-2xl p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/25 text-foreground">
              <f.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            {f.items && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {f.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
