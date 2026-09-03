import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export interface PageHeroStat {
  label: string;
  value: string;
}

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  backgroundImage?: string;
  badgeIcon?: ReactNode;
  stats?: PageHeroStat[];
  tag?: string;
  highlightWords?: string;
  heroVisual?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  backgroundImage = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85",
  badgeIcon,
  stats,
  tag,
  heroVisual,
}: PageHeroProps) {
  const fallbackImg =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85";

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border/40">
      {/* Background Media with Dark/Light Adaptive Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={backgroundImage}
          alt=""
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== fallbackImg) {
              target.src = fallbackImg;
            }
          }}
          className="h-full w-full object-cover object-center filter saturate-125 contrast-105 opacity-65 dark:opacity-40"
        />

        {/* Dual Light/Dark Vignette Overlays with Clear Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background dark:from-background/85 dark:via-background/75 dark:to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent dark:from-primary/25" />

        {/* Dynamic Subtle Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {badgeIcon || <Sparkles className="size-3.5 text-primary" />}
          <span>{eyebrow}</span>
          {tag && (
            <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
              {tag}
            </span>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-display leading-[1.12]"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-3xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed"
        >
          {description}
        </motion.p>

        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md sm:grid-cols-4 sm:p-5 shadow-sm"
          >
            {stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xl sm:text-2xl font-bold font-display text-foreground tracking-tight">
                  {s.value}
                </p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {heroVisual && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10"
          >
            {heroVisual}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: heroVisual ? 0.45 : 0.35 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
