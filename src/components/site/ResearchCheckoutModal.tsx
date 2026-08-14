import { useState } from "react";
import { X, Download, ShieldCheck, CheckCircle2, FileText, Lock, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { type ResearchItem } from "@/data/research-data";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";

interface ResearchCheckoutModalProps {
  item: ResearchItem | null;
  onClose: () => void;
}

export function ResearchCheckoutModal({ item, onClose }: ResearchCheckoutModalProps) {
  const { isAuthenticated, addPurchasedProject } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  if (!item) return null;

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in or register", {
        description: "You need an account to purchase and download research projects.",
      });
      navigate({ to: "/auth" });
      onClose();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      addPurchasedProject({
        title: item.title,
        author: item.author,
        category: item.category,
        academicLevel: item.academicLevel,
        price: item.price,
        abstract: item.abstract,
        fileSize: item.fileSize,
        format: item.format,
      });
      setIsProcessing(false);
      setPurchased(true);
      toast.success("Purchase successful!", {
        description: `You have acquired full access to "${item.title.slice(0, 40)}..."`,
      });
    }, 1000);
  };

  const handleDownloadFile = () => {
    // Generate downloadable text document representing the full paper package
    const fileContent = `===============================================================
STERLING INSIGHT LIMITED - OFFICIAL RESEARCH PROJECT REPOSITORY
===============================================================
Document Title: ${item.title}
Author(s): ${item.author}
Institution: ${item.institution}
Academic Level: ${item.academicLevel}
Category: ${item.category}
Pages: ${item.pages} | Citations: ${item.citations}
Digital Rights Identifier: SIL-VERIFIED-${Date.now()}
===============================================================

ABSTRACT:
${item.abstract}

METHODOLOGY:
${item.methodology}

KEY RESEARCH FINDINGS:
${item.keyFindings.map((f, i) => `${i + 1}. ${f}`).join("\n")}

TABLE OF CONTENTS:
${item.tableOfContents.map((t) => `- ${t}`).join("\n")}

===============================================================
CERTIFICATE OF GENUINE ACQUISITION & RESEARCH LICENSE
Issued via Sterling Insight Intelligence Platform.
Thank you for supporting academic research.
===============================================================`;

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.title.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40)}_SterlingInsight.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Document downloaded to your device");
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

        {purchased ? (
          <div className="py-8 text-center space-y-5">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="text-2xl font-bold font-display">Access Unlocked!</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You now own the full research project files, dataset, and documentation for:
            </p>
            <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-left space-y-2">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                By {item.author} · {item.academicLevel}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-muted-foreground">
                <span className="rounded-md bg-secondary px-2 py-1">Format: {item.format}</span>
                <span className="rounded-md bg-secondary px-2 py-1">Size: {item.fileSize}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadFile}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg"
              >
                <Download className="size-4" />
                Download Complete Project
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate({ to: "/dashboard" });
                }}
                className="w-full rounded-xl border border-border px-6 py-3.5 text-sm font-medium hover:bg-secondary"
              >
                View in Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="pb-5 border-b border-border/60">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  {item.academicLevel}
                </span>
                <span className="text-xs text-muted-foreground">{item.category}</span>
              </div>
              <h3 className="text-xl font-bold font-display leading-snug">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5">
                Author: <strong className="text-foreground">{item.author}</strong> (
                {item.institution})
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-border bg-secondary/30 p-4 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package Content:</span>
                  <span className="font-medium text-foreground">{item.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size & Pages:</span>
                  <span className="font-medium text-foreground">
                    {item.fileSize} · {item.pages} Pages
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plagiarism Integrity:</span>
                  <span className="font-semibold text-emerald-500">
                    Verified & Clean (&lt;5% similarity)
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              {item.price > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Select Checkout Method
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
                      💳 Credit / Debit Card
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
                      🏦 Instant Bank Transfer
                    </button>
                  </div>
                </div>
              )}

              {/* Total & Checkout button */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-4 flex items-center justify-between mt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  <span>Lifetime Download Access</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                    Price
                  </span>
                  <span className="text-xl font-bold font-display text-primary">
                    {item.price === 0 ? "FREE" : `$${item.price} USD`}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_30px_-6px_var(--color-cobalt-glow)] disabled:opacity-60"
              >
                {isProcessing
                  ? "Verifying Payment & Licensing…"
                  : item.price === 0
                    ? "Unlock Free Download"
                    : `Pay $${item.price} & Download Project`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
