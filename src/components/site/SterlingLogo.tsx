import React from "react";
import { Link } from "@tanstack/react-router";

interface SterlingLogoProps {
  variant?: "header" | "full" | "badge" | "mark" | "footer";
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
  onClick?: () => void;
}

export function SterlingLogo({
  variant = "header",
  className = "",
  showTagline = true,
  size = "md",
  asLink = false,
  onClick,
}: SterlingLogoProps) {
  // Sizes
  const emblemSizes = {
    sm: "size-8",
    md: "size-10",
    lg: "size-14",
    xl: "size-20",
  };

  const titleSizes = {
    sm: "text-base tracking-[0.18em]",
    md: "text-lg tracking-[0.2em]",
    lg: "text-2xl tracking-[0.24em]",
    xl: "text-4xl tracking-[0.28em]",
  };

  const insightSizes = {
    sm: "text-[11px] tracking-[0.28em]",
    md: "text-xs tracking-[0.32em]",
    lg: "text-sm tracking-[0.36em]",
    xl: "text-lg tracking-[0.4em]",
  };

  const taglineSizes = {
    sm: "text-[8px] tracking-[0.22em]",
    md: "text-[9px] tracking-[0.24em]",
    lg: "text-[11px] tracking-[0.26em]",
    xl: "text-xs tracking-[0.28em]",
  };

  const renderContent = () => {
    if (variant === "mark") {
      return (
        <div
          className={`relative flex items-center justify-center shrink-0 ${emblemSizes[size]} ${className}`}
        >
          {/* Light Theme Emblem */}
          <img
            src="/sterling-icon-transparent.png"
            alt="Sterling Insight Emblem"
            className="w-full h-full object-contain dark:hidden drop-shadow-sm"
          />
          {/* Dark Theme Emblem */}
          <img
            src="/sterling-icon-dark.png"
            alt="Sterling Insight Emblem"
            className="w-full h-full object-contain hidden dark:block drop-shadow-md"
          />
        </div>
      );
    }

    if (variant === "badge" || variant === "full") {
      return (
        <div className={`flex flex-col items-center text-center select-none ${className}`}>
          {/* Official Emblem Mark with dynamic light/dark variant */}
          <div className="relative mb-3 flex items-center justify-center">
            <img
              src="/sterling-icon-transparent.png"
              alt="Sterling Insight Mark"
              className="h-20 w-20 object-contain dark:hidden transition-transform duration-300 hover:scale-105"
            />
            <img
              src="/sterling-icon-dark.png"
              alt="Sterling Insight Mark"
              className="h-20 w-20 object-contain hidden dark:block transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_15px_rgba(0,102,204,0.35)]"
            />
          </div>

          {/* Stately Serif Title */}
          <h2
            className="font-serif font-bold text-foreground text-2xl sm:text-3xl tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            STERLING
          </h2>

          {/* Cobalt Insight with elegant dashes */}
          <div className="flex items-center gap-3 my-1">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#0066cc]/70" />
            <span
              className="text-[#0066cc] dark:text-[#38bdf8] font-semibold text-xs sm:text-sm tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              INSIGHT
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#0066cc]/70" />
          </div>

          {/* Academic Intelligence, Engineered Tagline */}
          {showTagline && (
            <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.24em] text-muted-foreground uppercase mt-1">
              Academic Intelligence, Engineered
            </p>
          )}
        </div>
      );
    }

    // Header or Footer variant (horizontal layout)
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        {/* Emblem */}
        <div className={`relative flex items-center justify-center shrink-0 ${emblemSizes[size]}`}>
          <img
            src="/sterling-icon-transparent.png"
            alt="Sterling Insight Emblem"
            className="w-full h-full object-contain dark:hidden"
          />
          <img
            src="/sterling-icon-dark.png"
            alt="Sterling Insight Emblem"
            className="w-full h-full object-contain hidden dark:block"
          />
        </div>

        {/* Brand Text Stack */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span
              className={`font-serif font-bold text-foreground ${titleSizes[size]} uppercase`}
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              STERLING
            </span>
            <span
              className={`text-[#0066cc] dark:text-[#38bdf8] font-bold ${insightSizes[size]} uppercase`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              INSIGHT
            </span>
          </div>
          {showTagline && (
            <span
              className={`block mt-1 font-medium text-muted-foreground uppercase ${taglineSizes[size]}`}
            >
              Academic Intelligence, Engineered
            </span>
          )}
        </div>
      </div>
    );
  };

  if (asLink) {
    return (
      <Link to="/" onClick={onClick} className="inline-flex items-center group">
        {renderContent()}
      </Link>
    );
  }

  return renderContent();
}
