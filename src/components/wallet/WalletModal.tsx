import { useState, type FormEvent } from "react";
import {
  X,
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  Globe,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  DollarSign,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { formatMoney, convertFromUSD, CURRENCY_RATES } from "@/lib/currency";
import type { SupportedCurrency } from "@/types";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "fund" | "withdraw" | "history";
}

const LOCAL_BANKS = [
  "Access Bank",
  "Guaranty Trust Bank (GTBank)",
  "First Bank of Nigeria",
  "Zenith Bank",
  "United Bank for Africa (UBA)",
  "Kuda Microfinance Bank",
  "Stanbic IBTC Bank",
  "Fidelity Bank",
  "Sterling Bank",
  "Moniepoint Microfinance Bank",
  "Standard Bank (Africa)",
];

export function WalletModal({ isOpen, onClose, defaultTab = "fund" }: WalletModalProps) {
  const {
    user,
    walletBalanceUSD,
    walletTransactions,
    activeCurrency,
    setActiveCurrency,
    fundWallet,
    withdrawWallet,
    refreshWallet,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"fund" | "withdraw" | "history">(defaultTab);

  // Fund state
  const [fundAmountUSD, setFundAmountUSD] = useState<number>(50);
  const [fundGateway, setFundGateway] = useState<
    "paystack" | "flutterwave" | "local_bank_transfer" | "stripe" | "paypal"
  >("paystack");
  const [isFunding, setIsFunding] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [fundSuccessMsg, setFundSuccessMsg] = useState<string | null>(null);

  // Withdraw state
  const [withdrawAmountUSD, setWithdrawAmountUSD] = useState<number>(
    Math.min(50, walletBalanceUSD),
  );
  const [payoutMethod, setPayoutMethod] = useState<"local_bank" | "paypal" | "wise">("local_bank");
  const [selectedBank, setSelectedBank] = useState(LOCAL_BANKS[0]);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState(user?.name || "Dr. Alexander Sterling");
  const [intlEmail, setIntlEmail] = useState(user?.email || "");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFundSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (fundAmountUSD <= 0) {
      toast.error("Please enter a valid amount to fund.");
      return;
    }

    setIsFunding(true);
    setFundSuccessMsg(null);

    const gatewayNames: Record<string, string> = {
      paystack: "Paystack (Cards / Bank / USSD)",
      flutterwave: "Flutterwave (Mobile Money / Barter)",
      local_bank_transfer: "Sterling Instant Virtual Account",
      stripe: "Stripe (International Visa / Mastercard / Apple Pay)",
      paypal: "PayPal Express Checkout",
    };

    const ref = `${fundGateway.toUpperCase().slice(0, 4)}_${Date.now().toString(36).toUpperCase()}`;

    // Simulate gateway handoff & instant verification
    setTimeout(async () => {
      const ok = await fundWallet(fundAmountUSD, gatewayNames[fundGateway] || fundGateway, ref);
      setIsFunding(false);
      if (ok) {
        setFundSuccessMsg(
          `Successfully credited ${formatMoney(fundAmountUSD, activeCurrency)} (${formatMoney(
            fundAmountUSD,
            "USD",
          )}) into your Sterling Wallet via ${gatewayNames[fundGateway]}.`,
        );
        toast.success("Wallet credited successfully!", {
          description: `Reference: ${ref}`,
        });
      } else {
        toast.error("Funding transaction could not be completed.");
      }
    }, 1200);
  };

  const handleWithdrawSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (withdrawAmountUSD <= 0) {
      toast.error("Please specify a valid withdrawal amount.");
      return;
    }
    if (withdrawAmountUSD > walletBalanceUSD) {
      toast.error("Insufficient wallet balance.");
      return;
    }

    setIsWithdrawing(true);
    setWithdrawSuccessMsg(null);

    const details =
      payoutMethod === "local_bank"
        ? {
            bankName: selectedBank,
            accountNumber: accountNumber || "0248918231",
            accountName,
          }
        : {
            emailOrTag: intlEmail,
          };

    setTimeout(async () => {
      const ok = await withdrawWallet(withdrawAmountUSD, payoutMethod, details);
      setIsWithdrawing(false);
      if (ok) {
        setWithdrawSuccessMsg(
          `Payout of ${formatMoney(withdrawAmountUSD, activeCurrency)} has been transferred to ${
            payoutMethod === "local_bank"
              ? `${selectedBank} (${accountNumber || "0248918231"})`
              : intlEmail
          }.`,
        );
        toast.success("Payout processed successfully!");
      } else {
        toast.error("Withdrawal request failed. Please try again.");
      }
    }, 1200);
  };

  const copyVirtualAccount = () => {
    navigator.clipboard.writeText("0248918231");
    setCopiedAccount(true);
    toast.info("Virtual account number copied to clipboard: 0248918231");
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-border bg-card text-card-foreground">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Header & Balance Card */}
        <div className="pb-5 border-b border-border/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/20">
                <WalletIcon className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">Sterling Intelligence Wallet</h3>
                <p className="text-xs text-muted-foreground">
                  Multi-currency wallet for research purchases, advisory escrow & author royalties
                </p>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 p-1 text-xs">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground px-1.5">
                Currency:
              </span>
              {(["USD", "NGN", "GBP", "EUR"] as SupportedCurrency[]).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setActiveCurrency(cur)}
                  className={`rounded-lg px-2 py-1 font-semibold transition-all ${
                    activeCurrency === cur
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          {/* Current Balance Display */}
          <div className="mt-5 rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Available Wallet Balance</p>
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span className="text-3xl font-bold font-display text-foreground">
                  {formatMoney(walletBalanceUSD, activeCurrency)}
                </span>
                {activeCurrency !== "USD" && (
                  <span className="text-xs text-muted-foreground">
                    (~${walletBalanceUSD.toFixed(2)} USD)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-500 flex items-center gap-1 mt-1">
                <ShieldCheck className="size-3.5" />
                Protected by Sterling Escrow & Verified Academic Settlement
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("fund");
                  setFundSuccessMsg(null);
                }}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === "fund"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border border-border bg-secondary hover:bg-secondary/80"
                }`}
              >
                <ArrowDownLeft className="size-4 text-emerald-500" />
                Fund Wallet
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("withdraw");
                  setWithdrawSuccessMsg(null);
                }}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === "withdraw"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border border-border bg-secondary hover:bg-secondary/80"
                }`}
              >
                <ArrowUpRight className="size-4 text-cobalt-glow" />
                Withdraw / Payout
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 border-b border-border/60 py-3">
          <button
            type="button"
            onClick={() => setActiveTab("fund")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === "fund"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <ArrowDownLeft className="size-3.5" />
            Deposit & Payment Gateways
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("withdraw")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === "withdraw"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <ArrowUpRight className="size-3.5" />
            Withdraw / Bank Payout
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === "history"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Clock className="size-3.5" />
            Transactions ({walletTransactions.length})
          </button>
        </div>

        {/* TAB 1: FUND WALLET */}
        {activeTab === "fund" && (
          <div className="mt-5 space-y-5">
            {fundSuccessMsg ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-3">
                <CheckCircle2 className="size-10 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-foreground">Deposit Confirmed!</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">{fundSuccessMsg}</p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFundSuccessMsg(null)}
                    className="rounded-xl bg-primary px-5 py-2 text-xs font-medium text-primary-foreground"
                  >
                    Make Another Deposit
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-border px-5 py-2 text-xs font-medium hover:bg-secondary"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFundSubmit} className="space-y-4">
                {/* Amount quick picks */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Select Funding Amount
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[25, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setFundAmountUSD(amt)}
                        className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                          fundAmountUSD === amt
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        ${amt} USD
                        <span className="block text-[10px] font-normal text-muted-foreground">
                          {formatMoney(amt, activeCurrency)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="relative mt-2">
                    <span className="absolute left-3.5 top-2.5 text-xs text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      min="5"
                      max="5000"
                      required
                      value={fundAmountUSD}
                      onChange={(e) => setFundAmountUSD(Number(e.target.value))}
                      placeholder="Custom USD amount"
                      className="w-full rounded-xl border border-input bg-secondary/50 pl-8 pr-28 py-2.5 text-xs outline-none focus:border-primary"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-primary">
                      ≈ {formatMoney(fundAmountUSD, activeCurrency)}
                    </span>
                  </div>
                </div>

                {/* Gateway selection: Local vs International */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Select Payment Method (Local & International Gateways)
                  </label>

                  {/* Local Gateways (Nigeria / Africa / Regional) */}
                  <div className="space-y-2 mb-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Local Payment Services (NGN, Cards, USSD, Bank Transfer)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFundGateway("paystack")}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          fundGateway === "paystack"
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                            : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">Paystack</span>
                          <span className="rounded bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 text-[9px] font-bold">
                            LOCAL NGN
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Debit Cards, USSD, Bank Transfer & Mobile Money
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFundGateway("flutterwave")}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          fundGateway === "flutterwave"
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                            : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">Flutterwave</span>
                          <span className="rounded bg-amber-500/20 text-amber-500 px-1.5 py-0.5 text-[9px] font-bold">
                            AFRICA
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Barter, M-Pesa, Bank Account & Cards
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFundGateway("local_bank_transfer")}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          fundGateway === "local_bank_transfer"
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                            : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">Virtual Bank</span>
                          <span className="rounded bg-blue-500/20 text-blue-500 px-1.5 py-0.5 text-[9px] font-bold">
                            INSTANT
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Dedicated Sterling Virtual Account
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* International Gateways (Global / USD / EUR / GBP) */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      International Payment Services (Global)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFundGateway("stripe")}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          fundGateway === "stripe"
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                            : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">Stripe Payments</span>
                          <span className="rounded bg-purple-500/20 text-purple-500 px-1.5 py-0.5 text-[9px] font-bold">
                            GLOBAL
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Visa, Mastercard, Amex, Apple Pay, Google Pay
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFundGateway("paypal")}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          fundGateway === "paypal"
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                            : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">PayPal</span>
                          <span className="rounded bg-blue-500/20 text-blue-500 px-1.5 py-0.5 text-[9px] font-bold">
                            WORLDWIDE
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          PayPal Balance, Linked Bank or Credit
                        </p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bank details panel if local bank selected */}
                {fundGateway === "local_bank_transfer" && (
                  <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4 text-xs space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <Building2 className="size-4 text-primary" />
                      Dedicated Sterling Virtual Account Details
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      Transfer your local currency equivalent directly to this automated account.
                      Your wallet is credited immediately upon transfer reception.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                      <div className="bg-card/70 p-2 rounded-xl border border-border">
                        <span className="text-muted-foreground block text-[10px]">Bank Name:</span>
                        <span className="font-bold text-foreground">Sterling Bank Plc</span>
                      </div>
                      <div className="bg-card/70 p-2 rounded-xl border border-border flex items-center justify-between">
                        <div>
                          <span className="text-muted-foreground block text-[10px]">
                            Account No:
                          </span>
                          <span className="font-bold text-foreground">0248918231</span>
                        </div>
                        <button
                          type="button"
                          onClick={copyVirtualAccount}
                          className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {copiedAccount ? (
                            <Check className="size-4 text-emerald-500" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </button>
                      </div>
                      <div className="col-span-2 bg-card/70 p-2 rounded-xl border border-border">
                        <span className="text-muted-foreground block text-[10px]">
                          Beneficiary Name:
                        </span>
                        <span className="font-bold text-foreground">
                          Sterling Insight / {user?.name || "Dr. Alexander Sterling"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isFunding}
                  className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_25px_-5px_var(--color-cobalt-glow)] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isFunding ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      Connecting to {fundGateway.toUpperCase()} & Verifying Payment…
                    </>
                  ) : (
                    <>
                      <ArrowDownLeft className="size-4" />
                      Pay {formatMoney(fundAmountUSD, activeCurrency)} & Fund Wallet
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: WITHDRAW / RECEIVE PAYOUT */}
        {activeTab === "withdraw" && (
          <div className="mt-5 space-y-5">
            {withdrawSuccessMsg ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-3">
                <CheckCircle2 className="size-10 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-foreground">Payout Dispatched!</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {withdrawSuccessMsg}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setWithdrawSuccessMsg(null)}
                    className="rounded-xl bg-primary px-5 py-2 text-xs font-medium text-primary-foreground"
                  >
                    Request Another Payout
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-border px-5 py-2 text-xs font-medium hover:bg-secondary"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-foreground">
                      Withdrawal Amount (USD)
                    </label>
                    <span className="text-[11px] text-muted-foreground">
                      Max: ${walletBalanceUSD.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      min="1"
                      max={walletBalanceUSD}
                      required
                      value={withdrawAmountUSD}
                      onChange={(e) => setWithdrawAmountUSD(Number(e.target.value))}
                      className="w-full rounded-xl border border-input bg-secondary/50 pl-8 pr-28 py-2.5 text-xs outline-none focus:border-primary"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-primary">
                      ≈ {formatMoney(withdrawAmountUSD, activeCurrency)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Payout Destination
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setPayoutMethod("local_bank")}
                      className={`rounded-xl border p-2.5 text-xs font-medium text-center transition-all ${
                        payoutMethod === "local_bank"
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Building2 className="size-4 mx-auto mb-1 text-primary" />
                      Local Bank Account
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod("paypal")}
                      className={`rounded-xl border p-2.5 text-xs font-medium text-center transition-all ${
                        payoutMethod === "paypal"
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Globe className="size-4 mx-auto mb-1 text-blue-500" />
                      PayPal Payout
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod("wise")}
                      className={`rounded-xl border p-2.5 text-xs font-medium text-center transition-all ${
                        payoutMethod === "wise"
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <CreditCard className="size-4 mx-auto mb-1 text-emerald-500" />
                      Wise / Wire
                    </button>
                  </div>

                  {payoutMethod === "local_bank" ? (
                    <div className="space-y-3 rounded-2xl border border-border bg-secondary/20 p-4">
                      <div>
                        <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                          Select Local Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                        >
                          {LOCAL_BANKS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                            10-Digit NUBAN Account Number
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="0123456789"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                            Verified Beneficiary Name
                          </label>
                          <input
                            type="text"
                            required
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                      <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                        {payoutMethod === "paypal"
                          ? "PayPal Email Address"
                          : "Wise Tag / IBAN Email"}
                      </label>
                      <input
                        type="email"
                        required
                        value={intlEmail}
                        onChange={(e) => setIntlEmail(e.target.value)}
                        placeholder="scholar@university.edu"
                        className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isWithdrawing || walletBalanceUSD <= 0}
                  className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_25px_-5px_var(--color-cobalt-glow)] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isWithdrawing ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      Dispatched to Bank Clearing Switch…
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="size-4" />
                      Withdraw {formatMoney(withdrawAmountUSD, activeCurrency)} to Account
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: TRANSACTION HISTORY */}
        {activeTab === "history" && (
          <div className="mt-5 space-y-3">
            {walletTransactions.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                No transactions recorded yet.
              </p>
            ) : (
              walletTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-secondary/30 p-3.5 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-9 items-center justify-center rounded-xl border ${
                        tx.type === "deposit" ||
                        tx.type === "royalty" ||
                        tx.type === "milestone_received"
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-500"
                          : "bg-destructive/15 border-destructive/30 text-destructive"
                      }`}
                    >
                      {tx.type === "deposit" ||
                      tx.type === "royalty" ||
                      tx.type === "milestone_received" ? (
                        <ArrowDownLeft className="size-4" />
                      ) : (
                        <ArrowUpRight className="size-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{tx.description}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {tx.method} · Ref: {tx.reference} ·{" "}
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-bold font-mono text-sm block ${
                        tx.type === "deposit" ||
                        tx.type === "royalty" ||
                        tx.type === "milestone_received"
                          ? "text-emerald-500"
                          : "text-destructive"
                      }`}
                    >
                      {tx.type === "deposit" ||
                      tx.type === "royalty" ||
                      tx.type === "milestone_received"
                        ? "+"
                        : "-"}
                      {formatMoney(tx.amount, activeCurrency)}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">{tx.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
