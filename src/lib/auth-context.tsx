import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Researcher" | "Expert" | "Institution";
  institution?: string;
  avatar: string;
  joinedDate: string;
  bio?: string;
}

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
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  bookings: BookedSession[];
  purchasedProjects: PurchasedProject[];
  publishedProjects: PublishedProject[];
  login: (email: string, pass: string) => boolean;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: User["role"];
    institution?: string;
  }) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addBooking: (booking: Omit<BookedSession, "id" | "bookedAt" | "status">) => void;
  addPurchasedProject: (project: Omit<PurchasedProject, "id" | "purchasedAt">) => void;
  addPublishedProject: (
    project: Omit<PublishedProject, "id" | "downloads" | "earnings" | "publishedAt" | "status">,
  ) => void;
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
    earnings: 450,
    publishedAt: "2026-07-15",
    status: "Published",
    abstract:
      "Proposing weight quantization and speculative decoding for West African language translation models.",
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
      return DEFAULT_USER; // Default logged-in demo user for immediate convenience
    }
    return DEFAULT_USER;
  });

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

  useEffect(() => {
    if (user) {
      localStorage.setItem("sterling_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sterling_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("sterling_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("sterling_purchased", JSON.stringify(purchasedProjects));
  }, [purchasedProjects]);

  useEffect(() => {
    localStorage.setItem("sterling_published", JSON.stringify(publishedProjects));
  }, [publishedProjects]);

  const login = (email: string, _pass: string) => {
    const newUser: User = {
      id: "usr_" + Date.now().toString().slice(-6),
      name: email
        .split("@")[0]
        .replace(".", " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: "Researcher",
      avatar: `https://images.unsplash.com/photo-${1500000000000 + email.length * 100000}?auto=format&fit=crop&q=80&w=200`,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };
    setUser(newUser);
    return true;
  };

  const register = (data: {
    name: string;
    email: string;
    password: string;
    role: User["role"];
    institution?: string;
  }) => {
    const newUser: User = {
      id: "usr_" + Date.now().toString().slice(-6),
      name: data.name,
      email: data.email,
      role: data.role,
      institution: data.institution || "Independent Researcher",
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
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
