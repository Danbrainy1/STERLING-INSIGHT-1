import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="hero-aura relative overflow-hidden px-5 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-20">
      <div className="mx-auto max-w-4xl text-center">
        <span className="glass-panel inline-flex rounded-full px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <h1 className="text-gradient mt-6 text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
