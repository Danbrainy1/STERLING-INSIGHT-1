import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { ThreeDCard } from "./ThreeDCard";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  items?: string[];
  imageUrl?: string;
  badge?: string;
};

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 90}>
          <ThreeDCard
            intensity={6}
            glareOpacity={0.1}
            className="h-full rounded-3xl border border-border/80 bg-card/85 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {f.imageUrl && (
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                <img
                  src={f.imageUrl}
                  alt={f.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                {f.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-background/80 backdrop-blur-md text-foreground border border-border shadow-sm">
                    {f.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            )}

            <div
              className={`p-6 flex-1 flex flex-col justify-between ${!f.imageUrl ? "pt-6" : "pt-3"}`}
            >
              <div>
                {!f.imageUrl && (
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/20 text-primary mb-4">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                )}
                <h3 className="text-lg font-bold font-display text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>

              {f.items && (
                <ul className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-border/60">
                  {f.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full bg-secondary/60 border border-border/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ThreeDCard>
        </Reveal>
      ))}
    </div>
  );
}
