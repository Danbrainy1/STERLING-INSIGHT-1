import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative flex size-9 items-center justify-center rounded-xl border border-border bg-secondary/80 text-foreground transition-all hover:border-primary hover:bg-primary/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun
        className={`size-4.5 transition-all duration-300 ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0 absolute"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`size-4.5 transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100 text-cobalt-glow"
            : "-rotate-90 scale-0 opacity-0 absolute"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
