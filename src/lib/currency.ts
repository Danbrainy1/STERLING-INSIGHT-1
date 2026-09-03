import type { SupportedCurrency } from "@/types";

export const CURRENCY_RATES: Record<
  SupportedCurrency,
  { rate: number; symbol: string; prefix: string }
> = {
  USD: { rate: 1.0, symbol: "$", prefix: "$" },
  NGN: { rate: 1550.0, symbol: "₦", prefix: "₦" },
  GBP: { rate: 0.78, symbol: "£", prefix: "£" },
  EUR: { rate: 0.92, symbol: "€", prefix: "€" },
};

export function convertFromUSD(amountUSD: number, currency: SupportedCurrency = "USD"): number {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  return Math.round(amountUSD * info.rate * 100) / 100;
}

export function convertToUSD(amount: number, fromCurrency: SupportedCurrency = "USD"): number {
  const info = CURRENCY_RATES[fromCurrency] || CURRENCY_RATES.USD;
  return Math.round((amount / info.rate) * 100) / 100;
}

export function formatMoney(amountUSD: number, currency: SupportedCurrency = "USD"): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountUSD * info.rate;

  if (currency === "NGN") {
    return `₦${Math.round(converted).toLocaleString("en-NG")}`;
  }

  return `${info.symbol}${converted.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
