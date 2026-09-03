import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type {
  User,
  SupportedCurrency,
  WalletTransaction,
  HiredProject,
  ProjectMilestone,
  ProjectFile,
  ProjectMessage,
} from "@/types";

export type { User };

export interface BookedSession {
  id: string;
  expertId: string;
  expertName: string;
  expertRole: string;
  expertAvatar: string;
  topic: string;
  date: string;
  timeSlot: string;
  notes: string;
  amount: number;
  status: "Scheduled" | "Completed" | "Cancelled";
  bookedAt: string;
}

export interface PurchasedProject {
  id: string;
  title: string;
  author: string;
  category: string;
  academicLevel: string;
  price: number;
  purchasedAt: string;
  abstract: string;
  fileSize?: string;
  format?: string;
}

export interface PublishedProject {
  id: string;
  title: string;
  category: string;
  academicLevel: string;
  price: number;
  downloads: number;
  earnings: number;
  publishedAt: string;
  status: "Published" | "Under Review";
  abstract: string;
  fileName?: string;
  fileSize?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  walletBalanceUSD: number;
  walletTransactions: WalletTransaction[];
  activeCurrency: SupportedCurrency;
  setActiveCurrency: (c: SupportedCurrency) => void;
  fundWallet: (amountUSD: number, gateway: string, reference?: string) => Promise<boolean>;
  withdrawWallet: (
    amountUSD: number,
    destination: "local_bank" | "paypal" | "wise" | "wire",
    bankDetails: Record<string, string>,
  ) => Promise<boolean>;
  hiredProjects: HiredProject[];
  hireExpert: (data: {
    expertId: string;
    topic: string;
    budget: number;
    paymentMethod: string;
  }) => Promise<HiredProject | null>;
  sendProjectMessage: (
    projectId: string,
    text: string,
    attachments?: ProjectFile[],
  ) => Promise<void>;
  releaseMilestone: (projectId: string, milestoneId: string) => Promise<boolean>;
  uploadProjectFile: (
    projectId: string,
    file: Omit<ProjectFile, "id" | "uploadedAt">,
  ) => Promise<void>;
  bookings: BookedSession[];
  purchasedProjects: PurchasedProject[];
  publishedProjects: PublishedProject[];
  login: (email: string, pass: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: User["role"];
    institution?: string;
    currency?: SupportedCurrency;
  }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addBooking: (booking: Omit<BookedSession, "id" | "bookedAt" | "status">) => void;
  addPurchasedProject: (project: Omit<PurchasedProject, "id" | "purchasedAt">) => void;
  addPublishedProject: (
    project: Omit<PublishedProject, "id" | "downloads" | "earnings" | "publishedAt" | "status">,
  ) => void;
  refreshWallet: () => Promise<void>;
}

const DEFAULT_USER: User = {
  id: "usr_demo_101",
  name: "Dr. Alexander Sterling",
  email: "alex.sterling@university.edu",
  role: "Researcher",
  institution: "Lagos Academic Research Institute",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  joinedDate: "Jan 2026",
  bio: "Senior AI Researcher focused on NLP and Machine Learning for academic synthesis and dataset analytics.",
  currency: "USD",
};

const INITIAL_BOOKINGS: BookedSession[] = [
  {
    id: "bk_101",
    expertId: "exp_1",
    expertName: "Dr. Aris Thorne",
    expertRole: "AI & Machine Learning Advisor",
    expertAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    topic: "SPSS & Python Data Regression Modeling",
    date: "2026-08-20",
    timeSlot: "10:00 AM - 11:00 AM WAT",
    notes: "Reviewing multivariate regression dataset for thesis chapter 4.",
    amount: 65,
    status: "Scheduled",
    bookedAt: "2026-08-10",
  },
];

const INITIAL_PURCHASED: PurchasedProject[] = [
  {
    id: "proj_purch_1",
    title: "Application of Graph Neural Networks in Drug Discovery",
    author: "Prof. Elena Vance & Team",
    category: "Artificial Intelligence",
    academicLevel: "PhD Dissertation",
    price: 35,
    purchasedAt: "2026-08-01",
    abstract:
      "A comprehensive investigation of GNN models predicting molecular bioactivity with high confidence benchmarks.",
    fileSize: "14.2 MB",
    format: "PDF & Python Notebooks",
  },
];

const INITIAL_PUBLISHED: PublishedProject[] = [
  {
    id: "pub_101",
    title: "Optimizing Transformer Latency for Low-Resource Languages",
    category: "Natural Language Processing",
    academicLevel: "Masters Thesis",
    price: 25,
    downloads: 18,
    earnings: 360,
    publishedAt: "2026-07-15",
    status: "Published",
    abstract:
      "Proposing weight quantization and speculative decoding for West African language translation models.",
    fileName: "Transformer_Optimization_Master_Thesis.pdf",
    fileSize: "8.4 MB",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sterling_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
      return DEFAULT_USER;
    }
    return DEFAULT_USER;
  });

  const [activeCurrency, setActiveCurrency] = useState<SupportedCurrency>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sterling_currency");
      if (saved && (saved === "USD" || saved === "NGN" || saved === "GBP" || saved === "EUR")) {
        return saved as SupportedCurrency;
      }
    }
    return "USD";
  });

  const [walletBalanceUSD, setWalletBalanceUSD] = useState<number>(185.0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [hiredProjects, setHiredProjects] = useState<HiredProject[]>([]);

  const [bookings, setBookings] = useState<BookedSession[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sterling_bookings");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [purchasedProjects, setPurchasedProjects] = useState<PurchasedProject[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sterling_purchased");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_PURCHASED;
  });

  const [publishedProjects, setPublishedProjects] = useState<PublishedProject[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sterling_published");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_PUBLISHED;
  });

  // Sync wallet from server
  const refreshWallet = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/wallet?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setWalletBalanceUSD(data.balanceUSD ?? 185.0);
        setWalletTransactions(data.transactions ?? []);
      }
    } catch (err) {
      console.warn("Wallet sync:", err);
    }
  };

  // Sync projects from server
  const refreshProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setHiredProjects(data.data ?? []);
      }
    } catch (err) {
      console.warn("Projects sync:", err);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("sterling_user", JSON.stringify(user));
      refreshWallet();
      refreshProjects();
    } else {
      localStorage.removeItem("sterling_user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    localStorage.setItem("sterling_currency", activeCurrency);
  }, [activeCurrency]);

  useEffect(() => {
    localStorage.setItem("sterling_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("sterling_purchased", JSON.stringify(purchasedProjects));
  }, [purchasedProjects]);

  useEffect(() => {
    localStorage.setItem("sterling_published", JSON.stringify(publishedProjects));
  }, [publishedProjects]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          return true;
        }
      }
    } catch (e) {
      console.warn("Login API error, fallback to local:", e);
    }

    const VERIFIED_AVATARS = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200",
    ];
    const pickedAvatar = VERIFIED_AVATARS[email.length % VERIFIED_AVATARS.length];

    const newUser: User = {
      id: "usr_" + Date.now().toString().slice(-6),
      name: email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: "Researcher",
      avatar: pickedAvatar,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      currency: activeCurrency,
    };
    setUser(newUser);
    return true;
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role: User["role"];
    institution?: string;
    currency?: SupportedCurrency;
  }): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const resData = await res.json();
        if (resData.user) {
          setUser(resData.user);
          if (data.currency) setActiveCurrency(data.currency);
          return true;
        }
      }
    } catch (e) {
      console.warn("Register API error, fallback:", e);
    }

    const newUser: User = {
      id: "usr_" + Date.now().toString().slice(-6),
      name: data.name,
      email: data.email,
      role: data.role,
      institution: data.institution || "Independent Scholar",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      currency: data.currency || activeCurrency,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  const fundWallet = async (
    amountUSD: number,
    gateway: string,
    reference?: string,
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/wallet/fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "usr_demo_101",
          amountUSD,
          gateway,
          reference,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setWalletBalanceUSD(data.newBalanceUSD);
        if (data.transaction) {
          setWalletTransactions((prev) => [data.transaction, ...prev]);
        }
        return true;
      }
    } catch (err) {
      console.warn("Wallet fund error:", err);
    }
    // Fallback optimistic
    setWalletBalanceUSD((prev) => Math.round((prev + amountUSD) * 100) / 100);
    return true;
  };

  const withdrawWallet = async (
    amountUSD: number,
    destination: "local_bank" | "paypal" | "wise" | "wire",
    bankDetails: Record<string, string>,
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "usr_demo_101",
          amountUSD,
          destination,
          bankDetails,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setWalletBalanceUSD(data.newBalanceUSD);
        if (data.transaction) {
          setWalletTransactions((prev) => [data.transaction, ...prev]);
        }
        return true;
      }
    } catch (err) {
      console.warn("Withdrawal error:", err);
    }
    return false;
  };

  const hireExpert = async (data: {
    expertId: string;
    topic: string;
    budget: number;
    paymentMethod: string;
  }): Promise<HiredProject | null> => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId: user?.id || "usr_demo_101",
          clientName: user?.name || "Dr. Alexander Sterling",
          clientEmail: user?.email || "alex.sterling@university.edu",
        }),
      });
      if (res.ok) {
        const resData = await res.json();
        if (resData.project) {
          setHiredProjects((prev) => [resData.project, ...prev]);
          if (data.paymentMethod === "wallet") {
            setWalletBalanceUSD((prev) =>
              Math.max(0, Math.round((prev - data.budget) * 100) / 100),
            );
          }
          return resData.project;
        }
      }
    } catch (err) {
      console.warn("Hire expert error:", err);
    }
    return null;
  };

  const sendProjectMessage = async (
    projectId: string,
    text: string,
    attachments?: ProjectFile[],
  ) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "client",
          senderName: user?.name || "Dr. Alexander Sterling",
          senderAvatar:
            user?.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
          text,
          attachments,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setHiredProjects((prev) =>
          prev.map((p) => {
            if (p.id === projectId) {
              const updatedMessages = [...p.messages, data.sentMessage];
              if (data.expertReply) {
                updatedMessages.push(data.expertReply);
              }
              return { ...p, messages: updatedMessages, lastUpdated: new Date().toISOString() };
            }
            return p;
          }),
        );
      }
    } catch (err) {
      console.warn("Send message error:", err);
    }
  };

  const releaseMilestone = async (projectId: string, milestoneId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${projectId}/milestones/${milestoneId}/release`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setHiredProjects((prev) =>
          prev.map((p) => {
            if (p.id === projectId) {
              const updatedMilestones = p.milestones.map((m) =>
                m.id === milestoneId
                  ? { ...m, status: "Released" as const, releasedAt: new Date().toISOString() }
                  : m,
              );
              return {
                ...p,
                milestones: updatedMilestones,
                status: data.projectStatus || p.status,
              };
            }
            return p;
          }),
        );
        return true;
      }
    } catch (err) {
      console.warn("Release milestone error:", err);
    }
    return false;
  };

  const uploadProjectFile = async (
    projectId: string,
    file: Omit<ProjectFile, "id" | "uploadedAt">,
  ) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/files`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(file),
      });
      if (res.ok) {
        const data = await res.json();
        setHiredProjects((prev) =>
          prev.map((p) => (p.id === projectId ? { ...p, files: [data.file, ...p.files] } : p)),
        );
      }
    } catch (err) {
      console.warn("Upload project file error:", err);
    }
  };

  const addBooking = (booking: Omit<BookedSession, "id" | "bookedAt" | "status">) => {
    const newSession: BookedSession = {
      ...booking,
      id: "bk_" + Date.now().toString().slice(-6),
      bookedAt: new Date().toISOString().split("T")[0],
      status: "Scheduled",
    };
    setBookings((prev) => [newSession, ...prev]);
  };

  const addPurchasedProject = (project: Omit<PurchasedProject, "id" | "purchasedAt">) => {
    const newPurchased: PurchasedProject = {
      ...project,
      id: "purch_" + Date.now().toString().slice(-6),
      purchasedAt: new Date().toISOString().split("T")[0],
    };
    setPurchasedProjects((prev) => [newPurchased, ...prev]);
  };

  const addPublishedProject = (
    project: Omit<PublishedProject, "id" | "downloads" | "earnings" | "publishedAt" | "status">,
  ) => {
    const newPublished: PublishedProject = {
      ...project,
      id: "pub_" + Date.now().toString().slice(-6),
      downloads: 0,
      earnings: 0,
      publishedAt: new Date().toISOString().split("T")[0],
      status: "Published",
    };
    setPublishedProjects((prev) => [newPublished, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        walletBalanceUSD,
        walletTransactions,
        activeCurrency,
        setActiveCurrency,
        fundWallet,
        withdrawWallet,
        hiredProjects,
        hireExpert,
        sendProjectMessage,
        releaseMilestone,
        uploadProjectFile,
        bookings,
        purchasedProjects,
        publishedProjects,
        login,
        register,
        logout,
        updateProfile,
        addBooking,
        addPurchasedProject,
        addPublishedProject,
        refreshWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
