export interface Expert {
  id: string;
  name: string;
  title: string;
  institution: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  specialties: string[];
  bio: string;
  yearsExperience: number;
  completedSessions: number;
  availableDays: string[];
  availableSlots: string[];
  education: string;
}

export const EXPERTS: Expert[] = [
  {
    id: "exp_1",
    name: "Dr. Aris Thorne",
    title: "AI & Machine Learning Advisor",
    institution: "Former Research Scientist at Oxford AI Institute",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    rating: 4.9,
    reviewsCount: 84,
    hourlyRate: 65,
    specialties: [
      "Machine Learning",
      "Python & PyTorch",
      "Neural Networks",
      "NLP",
      "Algorithm Design",
    ],
    bio: "Specializes in guiding postgraduates and corporate researchers through advanced artificial intelligence models, machine learning thesis chapters, and deep learning pipeline optimization.",
    yearsExperience: 12,
    completedSessions: 240,
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["09:00 AM WAT", "11:00 AM WAT", "02:00 PM WAT", "04:00 PM WAT"],
    education: "Ph.D. in Computer Science (Artificial Intelligence) - University of Cambridge",
  },
  {
    id: "exp_2",
    name: "Prof. Elena Vance",
    title: "Grant Writing & Academic Publishing Specialist",
    institution: "Visiting Professor, Pan-Atlantic University",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    rating: 5.0,
    reviewsCount: 112,
    hourlyRate: 75,
    specialties: [
      "Grant Proposals",
      "Journal Submissions",
      "Literature Matrix",
      "Peer Review Revision",
      "Scopus Indexing",
    ],
    bio: "Published over 45 peer-reviewed papers in high-impact journals. Has secured over $1.8M in international academic grants and helps scholars structure publication-ready manuscripts.",
    yearsExperience: 18,
    completedSessions: 380,
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: ["10:00 AM WAT", "01:00 PM WAT", "03:00 PM WAT", "05:00 PM WAT"],
    education: "Ph.D. in Academic Research & Higher Education - Imperial College London",
  },
  {
    id: "exp_3",
    name: "Dr. Sarah Jenkins",
    title: "Statistical Data Analyst (SPSS, R & STATA)",
    institution: "Lead Analyst at Sterling Insight Analytics",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    rating: 4.9,
    reviewsCount: 145,
    hourlyRate: 50,
    specialties: [
      "SPSS",
      "STATA",
      "R Statistical Language",
      "Regression Diagnostics",
      "ANOVA & Multivariate Analysis",
    ],
    bio: "Hands-on data analyst with expertise in cleaning complex survey data, executing multivariate regressions, interpreting p-values, and drafting Chapter 4 results for dissertations.",
    yearsExperience: 10,
    completedSessions: 520,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableSlots: ["08:30 AM WAT", "11:30 AM WAT", "02:30 PM WAT", "04:30 PM WAT"],
    education: "Ph.D. in Applied Statistics & Econometrics - University of Ibadan",
  },
  {
    id: "exp_4",
    name: "Dr. Marcus Lin",
    title: "Research Methodology & Proposal Advisor",
    institution: "Senior Lecturer & Academic Methodologist",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    rating: 4.8,
    reviewsCount: 76,
    hourlyRate: 55,
    specialties: [
      "Research Design",
      "Sampling Protocols",
      "Questionnaire Validation",
      "Mixed-Methods Research",
      "Thesis Defense",
    ],
    bio: "Focuses on converting rough research concepts into rigorous proposal frameworks. Expert in instrument validation, sampling design, and preparing candidates for oral thesis defenses.",
    yearsExperience: 14,
    completedSessions: 190,
    availableDays: ["Monday", "Wednesday", "Thursday"],
    availableSlots: ["09:30 AM WAT", "12:00 PM WAT", "03:30 PM WAT"],
    education: "Ph.D. in Educational Research & Evaluation - University of Cape Town",
  },
  {
    id: "exp_5",
    name: "Dr. Amina Bello",
    title: "Admissions & International Scholarship Mentor",
    institution: "Fulbright & Chevening Scholar Alumni",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=250",
    rating: 5.0,
    reviewsCount: 168,
    hourlyRate: 45,
    specialties: [
      "Chevening / Fulbright",
      "SOP Review",
      "CV Optimization",
      "International Admissions",
      "Interview Coaching",
    ],
    bio: "Has coached over 120 students to win full master's and PhD scholarships in the US, UK, Canada, and Germany. Provides detailed SOP edits and mock interview prep.",
    yearsExperience: 8,
    completedSessions: 410,
    availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"],
    availableSlots: ["10:00 AM WAT", "02:00 PM WAT", "06:00 PM WAT"],
    education: "M.Sc. in International Relations (Chevening Scholar) - LSE",
  },
];
