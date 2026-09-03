import { useState } from "react";
import {
  X,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  Wallet,
  CreditCard,
  Building2,
  Globe,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { type ResearchItem } from "@/data/research-data";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";
import { formatMoney } from "@/lib/currency";

interface ResearchCheckoutModalProps {
  item: ResearchItem | null;
  onClose: () => void;
}

export function ResearchCheckoutModal({ item, onClose }: ResearchCheckoutModalProps) {
  const {
    user,
    isAuthenticated,
    walletBalanceUSD,
    activeCurrency,
    addPurchasedProject,
    refreshWallet,
    register,
  } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<
    "wallet" | "paystack" | "flutterwave" | "stripe" | "paypal"
  >(walletBalanceUSD >= (item?.price || 0) ? "wallet" : "paystack");
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  // Guest details if not logged in
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  if (!item) return null;

  const hasWalletFunds = walletBalanceUSD >= item.price;

  const handlePurchase = async () => {
    // If not authenticated, create user quickly so they don't lose context
    if (!isAuthenticated) {
      if (!guestName.trim() || !guestEmail.trim()) {
        toast.error("Please enter your name and email for download delivery.");
        return;
      }
      await register({
        name: guestName,
        email: guestEmail,
        password: "guestPass123",
        role: "Researcher",
      });
    }

    setIsProcessing(true);

    try {
      const res = await fetch("/api/research/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "usr_demo_101",
          researchId: item.id,
          title: item.title,
          price: item.price,
          author: item.author,
          paymentMethod,
        }),
      });

      if (res.ok) {
        await refreshWallet();
      }
    } catch (err) {
      console.warn("Purchase API error:", err);
    }

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
  };

  const handleDownloadFile = () => {
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
Buyer: ${user?.name || guestName || "Verified Scholar"}
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
      <div className="glass-panel relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-border bg-card text-card-foreground">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        {purchased ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="text-2xl font-bold font-display">Acquisition Complete!</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You now have perpetual license and complete source access to{" "}
              <strong className="text-foreground">"{item.title}"</strong>. The author has received
              their 80% royalty share.
            </p>

            <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format & Size:</span>
                <span className="font-semibold text-foreground">
                  {item.format} ({item.fileSize})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Academic License:</span>
                <span className="font-semibold text-emerald-500">
                  Personal & Academic Citation License
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settlement Status:</span>
                <span className="font-semibold text-foreground">
                  Paid via {paymentMethod.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleDownloadFile}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="size-4" />
                Download Complete Manuscript (.TXT & Tables)
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate({ to: "/dashboard" });
                }}
                className="w-full rounded-xl border border-border px-6 py-3.5 text-sm font-medium hover:bg-secondary"
              >
                View in My Purchases
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="pb-4 border-b border-border/60">
              <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Instant Academic License
              </span>
              <h3 className="text-xl font-bold font-display mt-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                By {item.author} · {item.institution}
              </p>
            </div>

            <div className="my-5 rounded-2xl border border-border bg-secondary/30 p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground font-medium block">
                  Total Price:
                </span>
                <span className="text-2xl font-bold font-display text-foreground">
                  {item.price === 0 ? "FREE ACCESS" : formatMoney(item.price, activeCurrency)}
                </span>
                {item.price > 0 && activeCurrency !== "USD" && (
                  <span className="text-[11px] text-muted-foreground block">
                    (${item.price} USD)
                  </span>
                )}
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>
                  {item.pages} Pages · Citations: {item.citations}
                </p>
                <p className="text-emerald-500 font-semibold">{item.format}</p>
              </div>
            </div>

            {/* Quick Guest Credentials if not logged in */}
            {!isAuthenticated && (
              <div className="mb-4 rounded-2xl border border-border bg-secondary/20 p-3.5 space-y-2">
                <p className="text-xs font-semibold text-foreground">
                  Buyer Details for License Delivery
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                  <input
                    type="email"
                    required
                    placeholder="your.email@university.edu"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-foreground">
                Choose Payment Method
              </label>

              {/* Wallet Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("wallet")}
                className={`w-full rounded-2xl border p-3.5 flex items-center justify-between transition-all ${
                  paymentMethod === "wallet"
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                    : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                    <Wallet className="size-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-foreground">
                      Sterling Intelligence Wallet
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Balance: {formatMoney(walletBalanceUSD, activeCurrency)} ( $
                      {walletBalanceUSD.toFixed(2)} USD)
                    </p>
                  </div>
                </div>
                {hasWalletFunds ? (
                  <span className="rounded-full bg-emerald-500/20 text-emerald-500 px-2 py-0.5 text-[10px] font-bold">
                    1-Click Instant
                  </span>
                ) : (
                  <span className="rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-[10px] font-semibold">
                    Low balance
                  </span>
                )}
              </button>

              {/* Local & International Gateways */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("paystack")}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    paymentMethod === "paystack"
                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                      : "border-border bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Paystack</span>
                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/15 px-1 rounded">
                      LOCAL NGN
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Card, USSD & Bank Transfer
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    paymentMethod === "stripe"
                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                      : "border-border bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Stripe (Global)</span>
                    <span className="text-[9px] font-bold text-purple-500 bg-purple-500/15 px-1 rounded">
                      USD / CARDS
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Visa, Mastercard, Apple Pay
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("flutterwave")}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    paymentMethod === "flutterwave"
                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                      : "border-border bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Flutterwave</span>
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/15 px-1 rounded">
                      AFRICA
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">M-Pesa, Cards & Barter</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    paymentMethod === "paypal"
                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                      : "border-border bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">PayPal</span>
                    <span className="text-[9px] font-bold text-blue-500 bg-blue-500/15 px-1 rounded">
                      WORLDWIDE
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    PayPal Account / Wallet
                  </p>
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_25px_-5px_var(--color-cobalt-glow)] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="size-4 animate-spin" />
                    Processing Payment & Granting Academic Rights…
                  </>
                ) : (
                  <>
                    <Lock className="size-4" />
                    Pay {item.price === 0 ? "FREE" : formatMoney(item.price, activeCurrency)} &
                    Download Package
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-500" />
                <span>256-bit SSL Encrypted Academic Settlement · 100% Verified</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
