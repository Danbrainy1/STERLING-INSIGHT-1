export type UserRole = "Student" | "Researcher" | "Expert" | "Institution";
export type SupportedCurrency = "USD" | "NGN" | "GBP" | "EUR";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  avatar: string;
  joinedDate: string;
  bio?: string;
  currency?: SupportedCurrency;
}

export interface WalletTransaction {
  id: string;
  type: "deposit" | "payment" | "royalty" | "milestone_received" | "withdrawal";
  amount: number; // in USD
  currency: string;
  description: string;
  method: string; // e.g. "Paystack", "Flutterwave", "Stripe", "Local Bank Transfer", "PayPal", "Wallet"
  status: "completed" | "processing" | "pending";
  reference: string;
  createdAt: string;
}

export interface Wallet {
  balanceUSD: number;
  currency: SupportedCurrency;
  transactions: WalletTransaction[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: "Pending" | "In Progress" | "Delivered" | "Released";
  deliveredAt?: string;
  releasedAt?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: "client" | "expert";
  uploaderName: string;
  type: string;
  url?: string;
  uploadedAt: string;
}

export interface ProjectMessage {
  id: string;
  projectId: string;
  sender: "client" | "expert";
  senderName: string;
  senderAvatar: string;
  text: string;
  attachments?: ProjectFile[];
  timestamp: string;
}

export interface HiredProject {
  id: string;
  expertId: string;
  expertName: string;
  expertRole: string;
  expertAvatar: string;
  clientName: string;
  clientEmail: string;
  title: string;
  topic: string;
  serviceCategory: string;
  totalBudget: number;
  escrowFunded: number;
  status: "Active" | "Under Review" | "Completed";
  milestones: ProjectMilestone[];
  files: ProjectFile[];
  messages: ProjectMessage[];
  lastUpdated: string;
  createdAt: string;
}

export interface PayoutDestination {
  type: "local_bank" | "paypal" | "wise" | "wire";
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  routingOrSwift?: string;
  emailOrTag?: string;
}
