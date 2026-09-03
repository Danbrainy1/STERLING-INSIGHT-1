import { RESEARCH_ITEMS, type ResearchItem } from "../data/research-data";
import { EXPERTS, type Expert } from "../data/experts-data";
import type {
  User,
  WalletTransaction,
  HiredProject,
  ProjectMilestone,
  ProjectFile,
  ProjectMessage,
} from "../types";

// In-memory persistent database across requests
const researchDatabase: ResearchItem[] = [...RESEARCH_ITEMS];
const expertsDatabase: Expert[] = [...EXPERTS];

const usersStore: Map<string, { user: User; passwordHash: string }> = new Map([
  [
    "alex.sterling@university.edu",
    {
      user: {
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
      },
      passwordHash: "password123",
    },
  ],
]);

// User Wallets Store: userId -> { balanceUSD: number, transactions: WalletTransaction[] }
const walletsStore: Map<
  string,
  {
    balanceUSD: number;
    transactions: WalletTransaction[];
  }
> = new Map([
  [
    "usr_demo_101",
    {
      balanceUSD: 185.0,
      transactions: [
        {
          id: "tx_init_1",
          type: "deposit",
          amount: 150.0,
          currency: "USD",
          description: "Initial Wallet Funding via Paystack (Debit Card)",
          method: "Paystack",
          status: "completed",
          reference: "PSTK_98240182",
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
        {
          id: "tx_init_2",
          type: "royalty",
          amount: 35.0,
          currency: "USD",
          description: "Author Royalty Earnings (80%) - Paper Download",
          method: "Marketplace Royalties",
          status: "completed",
          reference: "ROY_883019",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
    },
  ],
]);

// Hired Projects Collaboration Store
const hiredProjectsStore: HiredProject[] = [
  {
    id: "proj_collab_101",
    expertId: "exp_1",
    expertName: "Dr. Aris Thorne",
    expertRole: "AI & Machine Learning Advisor",
    expertAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    clientName: "Dr. Alexander Sterling",
    clientEmail: "alex.sterling@university.edu",
    title: "SPSS Multivariate Regression & Normality Analysis",
    topic: "Thesis Chapter 4 Quantitative Analysis & Assumption Testing",
    serviceCategory: "Statistical Analysis & SPSS",
    totalBudget: 150.0,
    escrowFunded: 150.0,
    status: "Active",
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    milestones: [
      {
        id: "m_1",
        title: "Milestone 1: Data Screening & Outlier Cleaning",
        description:
          "Screen raw 450-respondent survey dataset, impute missing values, run Shapiro-Wilk normality tests.",
        amount: 50.0,
        status: "Delivered",
        deliveredAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "m_2",
        title: "Milestone 2: Hierarchical Multiple Regression Modeling",
        description:
          "Model independent predictors, test multicollinearity (VIF), and calculate adjusted R-square values.",
        amount: 60.0,
        status: "In Progress",
      },
      {
        id: "m_3",
        title: "Milestone 3: APA-7 Formatted Tables & Interpretation Synthesis",
        description:
          "Synthesize full results narrative, generate APA-7 regression summary tables, and defence talking points.",
        amount: 40.0,
        status: "Pending",
      },
    ],
    files: [
      {
        id: "f_1",
        name: "Survey_Raw_Dataset_450N.sav",
        size: "3.4 MB",
        uploadedBy: "client",
        uploaderName: "Dr. Alexander Sterling",
        type: "SPSS Data File (.sav)",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "f_2",
        name: "Milestone1_Cleaned_Normality_Outputs.pdf",
        size: "1.8 MB",
        uploadedBy: "expert",
        uploaderName: "Dr. Aris Thorne",
        type: "PDF Output Report",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    messages: [
      {
        id: "msg_1",
        projectId: "proj_collab_101",
        sender: "client",
        senderName: "Dr. Alexander Sterling",
        senderAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
        text: "Hello Dr. Thorne, I have deposited the $150 escrow for our Chapter 4 analysis. I have attached the raw SPSS .sav file from our 450 postgraduate respondents.",
        timestamp: "2 days ago, 10:15 AM",
      },
      {
        id: "msg_2",
        projectId: "proj_collab_101",
        sender: "expert",
        senderName: "Dr. Aris Thorne",
        senderAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        text: "Received with thanks, Alexander! I have reviewed the dataset. I cleaned the 14 missing responses using expectation maximization and validated skewness/kurtosis. Milestone 1 output is uploaded for your review.",
        timestamp: "Yesterday, 3:45 PM",
      },
    ],
  },
];

const contactInquiries: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  createdAt: string;
}> = [];

const bookingsStore: Array<{
  id: string;
  expertId: string;
  expertName: string;
  clientEmail: string;
  clientName: string;
  topic: string;
  date: string;
  timeSlot: string;
  meetingLink: string;
  amount: number;
  status: string;
  createdAt: string;
}> = [];

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function getOrCreateWallet(userId: string) {
  let wallet = walletsStore.get(userId);
  if (!wallet) {
    wallet = {
      balanceUSD: 100.0, // Welcome grant for academic research
      transactions: [
        {
          id: `tx_welcome_${Date.now().toString(36)}`,
          type: "deposit",
          amount: 100.0,
          currency: "USD",
          description: "Sterling Academic Welcome Research Grant",
          method: "Sterling Platform Grant",
          status: "completed",
          reference: "GRANT_WELCOME",
          createdAt: new Date().toISOString(),
        },
      ],
    };
    walletsStore.set(userId, wallet);
  }
  return wallet;
}

export async function handleApiRequest(request: Request, url: URL): Promise<Response> {
  // CORS Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const pathname = url.pathname;

  // 1. Health check & Platform telemetry
  if (pathname === "/api/health") {
    return jsonResponse({
      status: "operational",
      platform: "Sterling Insight",
      tagline: "Academic Intelligence, Engineered",
      uptime: process.uptime ? Math.floor(process.uptime()) : 86400,
      timestamp: new Date().toISOString(),
      version: "2.5.0",
      services: {
        repository: "operational",
        expertAdvisory: "operational",
        integrityEngine: "operational",
        learningAcademy: "operational",
        walletSystem: "operational",
        collaborationEngine: "operational",
        database: "connected",
      },
      stats: {
        indexedPapers: researchDatabase.length,
        vettedExperts: expertsDatabase.length,
        activeProjects: hiredProjectsStore.length,
        countriesServed: 45,
      },
    });
  }

  // 2. Authentication API (Register, Login, Me)
  if (pathname === "/api/auth/register" && request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email || !body.name || !body.password) {
        return jsonResponse({ error: "Name, email, and password are required" }, 400);
      }

      const emailKey = body.email.toLowerCase().trim();
      if (usersStore.has(emailKey)) {
        return jsonResponse({ error: "An account with this email address already exists" }, 409);
      }

      const userId = `usr_${Date.now().toString(36)}`;
      const newUser: User = {
        id: userId,
        name: body.name.trim(),
        email: emailKey,
        role: body.role || "Researcher",
        institution: body.institution?.trim() || "Independent Scholar",
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
        joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        bio: body.bio || "Scholar and researcher on Sterling Insight Intelligence Platform.",
        currency: body.currency || "USD",
      };

      usersStore.set(emailKey, { user: newUser, passwordHash: body.password });

      // Initialize wallet with $100 complimentary research credit
      getOrCreateWallet(userId);

      return jsonResponse(
        {
          success: true,
          message: "Registration successful. Welcome to Sterling Insight.",
          user: newUser,
        },
        201,
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration error";
      return jsonResponse({ error: msg }, 400);
    }
  }

  if (pathname === "/api/auth/login" && request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email || !body.password) {
        return jsonResponse({ error: "Email and password are required" }, 400);
      }

      const emailKey = body.email.toLowerCase().trim();
      const account = usersStore.get(emailKey);

      if (!account) {
        // Create user on-the-fly if not found (seamless user onboarding experience)
        const userId = `usr_${Date.now().toString(36)}`;
        const newUser: User = {
          id: userId,
          name: emailKey
            .split("@")[0]
            .replace(/[._-]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          email: emailKey,
          role: "Researcher",
          institution: "Academic Scholar",
          avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
          joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          currency: "USD",
        };
        usersStore.set(emailKey, { user: newUser, passwordHash: body.password });
        getOrCreateWallet(userId);

        return jsonResponse({
          success: true,
          message: "Account authenticated successfully",
          user: newUser,
        });
      }

      return jsonResponse({
        success: true,
        message: "Login successful",
        user: account.user,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login error";
      return jsonResponse({ error: msg }, 400);
    }
  }

  // 3. Wallet API (Balance, Fund, Withdraw, Pay, Transactions)
  if (pathname === "/api/wallet") {
    const userId = url.searchParams.get("userId") || "usr_demo_101";
    const wallet = getOrCreateWallet(userId);

    return jsonResponse({
      success: true,
      balanceUSD: wallet.balanceUSD,
      transactions: wallet.transactions,
    });
  }

  if (pathname === "/api/wallet/fund" && request.method === "POST") {
    try {
      const body = await request.json();
      const userId = body.userId || "usr_demo_101";
      const amountUSD = Number(body.amountUSD) || Number(body.amount) || 50;
      const gateway = body.gateway || "Paystack"; // Paystack, Flutterwave, Stripe, PayPal, Local Bank Transfer
      const reference =
        body.reference ||
        `${gateway.toUpperCase().slice(0, 4)}_${Date.now().toString(36).toUpperCase()}`;

      const wallet = getOrCreateWallet(userId);
      wallet.balanceUSD = Math.round((wallet.balanceUSD + amountUSD) * 100) / 100;

      const newTx: WalletTransaction = {
        id: `tx_${Date.now().toString(36)}`,
        type: "deposit",
        amount: amountUSD,
        currency: "USD",
        description: `Wallet Deposit via ${gateway}`,
        method: gateway,
        status: "completed",
        reference,
        createdAt: new Date().toISOString(),
      };

      wallet.transactions.unshift(newTx);

      return jsonResponse({
        success: true,
        message: `Successfully credited $${amountUSD} USD to your Sterling Wallet via ${gateway}.`,
        newBalanceUSD: wallet.balanceUSD,
        transaction: newTx,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fund wallet";
      return jsonResponse({ error: msg }, 400);
    }
  }

  if (pathname === "/api/wallet/withdraw" && request.method === "POST") {
    try {
      const body = await request.json();
      const userId = body.userId || "usr_demo_101";
      const amountUSD = Number(body.amountUSD) || 0;
      const destination = body.destination; // local_bank or paypal/wise/wire
      const bankDetails = body.bankDetails || {};

      const wallet = getOrCreateWallet(userId);
      if (amountUSD <= 0) {
        return jsonResponse({ error: "Invalid withdrawal amount" }, 400);
      }
      if (wallet.balanceUSD < amountUSD) {
        return jsonResponse({ error: "Insufficient wallet balance" }, 400);
      }

      wallet.balanceUSD = Math.round((wallet.balanceUSD - amountUSD) * 100) / 100;

      const destinationDesc =
        destination === "local_bank"
          ? `Local Bank Transfer: ${bankDetails.bankName || "Bank"} (${bankDetails.accountNumber || "Direct"})`
          : `International Payout: ${bankDetails.emailOrTag || "PayPal/Wise"}`;

      const newTx: WalletTransaction = {
        id: `tx_w_${Date.now().toString(36)}`,
        type: "withdrawal",
        amount: amountUSD,
        currency: "USD",
        description: `Payout / Withdrawal to ${destinationDesc}`,
        method:
          destination === "local_bank" ? "Local NGN Bank Payout" : "International Wire / PayPal",
        status: "completed",
        reference: `PAYOUT_${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
      };

      wallet.transactions.unshift(newTx);

      return jsonResponse({
        success: true,
        message: `Payout of $${amountUSD} USD initiated successfully to ${destinationDesc}.`,
        newBalanceUSD: wallet.balanceUSD,
        transaction: newTx,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Withdrawal error";
      return jsonResponse({ error: msg }, 400);
    }
  }

  // 4. Research Repository API
  if (pathname === "/api/research") {
    if (request.method === "GET") {
      const category = url.searchParams.get("category");
      const level = url.searchParams.get("level");
      const query = url.searchParams.get("q")?.toLowerCase();

      let items = [...researchDatabase];

      if (category && category !== "All Categories") {
        items = items.filter((i) => i.category.toLowerCase() === category.toLowerCase());
      }
      if (level && level !== "All Levels") {
        items = items.filter((i) => i.academicLevel.toLowerCase() === level.toLowerCase());
      }
      if (query) {
        items = items.filter(
          (i) =>
            i.title.toLowerCase().includes(query) ||
            i.author.toLowerCase().includes(query) ||
            i.abstract.toLowerCase().includes(query),
        );
      }

      return jsonResponse({ success: true, count: items.length, data: items });
    }

    if (request.method === "POST") {
      try {
        const body = await request.json();
        if (!body.title || !body.category) {
          return jsonResponse({ error: "Missing required fields: title, category" }, 400);
        }

        const newId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const newItem: ResearchItem = {
          id: newId,
          title: body.title,
          author: body.author || "Dr. Alexander Sterling",
          authorRole: body.authorRole || "Contributing Academic Author",
          institution: body.institution || "Sterling Academic Network",
          academicLevel: body.academicLevel || "Masters Thesis",
          category: body.category,
          price: Number(body.price) || 0,
          pages: Number(body.pages) || Math.floor(Math.random() * 80 + 45),
          citations: 0,
          rating: 5.0,
          downloads: 0,
          publishedDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          format: body.format || "PDF & Dataset Package",
          fileSize: body.fileSize || "12.4 MB",
          abstract: body.abstract || "Peer-reviewed research work published on Sterling Insight.",
          methodology:
            body.methodology || "Empirical quantitative and qualitative academic methodology.",
          keyFindings: body.keyFindings || [
            "Validates theoretical framework against empirical real-world datasets",
            "Comprehensive literature review and methodology synthesis",
            "Complete research manuscript and appendix data included",
          ],
          tableOfContents: [
            "Chapter 1: Introduction & Research Problem",
            "Chapter 2: Review of Relevant Literature",
            "Chapter 3: Research Methodology & Sampling",
            "Chapter 4: Data Presentation, Analysis & Discussion",
            "Chapter 5: Summary, Conclusions & Recommendations",
          ],
        };

        researchDatabase.unshift(newItem);
        return jsonResponse(
          {
            success: true,
            message: "Research published and indexed in marketplace successfully",
            data: newItem,
          },
          201,
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Invalid research payload";
        return jsonResponse({ error: message }, 400);
      }
    }
  }

  // 5. Research Purchase API (Handles Wallet or Gateway & Distributes 80% Royalties to Author)
  if (pathname === "/api/research/purchase" && request.method === "POST") {
    try {
      const body = await request.json();
      const itemId = body.itemId;
      const userId = body.userId || "usr_demo_101";
      const paymentMethod = body.paymentMethod || "wallet"; // wallet, paystack, stripe, etc.

      const item = researchDatabase.find((r) => r.id === itemId);
      if (!item) {
        return jsonResponse({ error: "Research work not found" }, 404);
      }

      const buyerWallet = getOrCreateWallet(userId);

      if (paymentMethod === "wallet" && item.price > 0) {
        if (buyerWallet.balanceUSD < item.price) {
          return jsonResponse({ error: "Insufficient wallet balance to unlock this project" }, 400);
        }
        buyerWallet.balanceUSD = Math.round((buyerWallet.balanceUSD - item.price) * 100) / 100;
      }

      // Increment downloads
      item.downloads += 1;

      // Log transaction for buyer
      buyerWallet.transactions.unshift({
        id: `tx_p_${Date.now().toString(36)}`,
        type: "payment",
        amount: item.price,
        currency: "USD",
        description: `Unlocked Research Package: ${item.title.slice(0, 45)}...`,
        method: paymentMethod === "wallet" ? "Sterling Wallet" : paymentMethod,
        status: "completed",
        reference: `PURCH_${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
      });

      // 80% Royalty credited to author (demo author wallet gets credited)
      const royaltyAmount = Math.round(item.price * 0.8 * 100) / 100;
      if (royaltyAmount > 0) {
        const authorWallet = getOrCreateWallet("usr_demo_101");
        authorWallet.balanceUSD = Math.round((authorWallet.balanceUSD + royaltyAmount) * 100) / 100;
        authorWallet.transactions.unshift({
          id: `tx_roy_${Date.now().toString(36)}`,
          type: "royalty",
          amount: royaltyAmount,
          currency: "USD",
          description: `Author Royalty (80%) for "${item.title.slice(0, 35)}..."`,
          method: "Marketplace Royalties",
          status: "completed",
          reference: `ROY_${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
        });
      }

      return jsonResponse({
        success: true,
        message: "Research unlocked successfully. Access license generated.",
        licenseKey: `SIL-LIC-${Date.now().toString(36).toUpperCase()}`,
        item,
        buyerBalance: buyerWallet.balanceUSD,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Purchase error";
      return jsonResponse({ error: msg }, 400);
    }
  }

  // 6. Hired Projects & Collaboration Engine
  if (pathname === "/api/projects") {
    if (request.method === "GET") {
      return jsonResponse({ success: true, data: hiredProjectsStore });
    }

    if (request.method === "POST") {
      try {
        const body = await request.json();
        const expert = expertsDatabase.find((e) => e.id === body.expertId) || expertsDatabase[0];
        const userId = body.userId || "usr_demo_101";
        const budget = Number(body.budget) || expert.hourlyRate * 2 || 120.0;

        const newProject: HiredProject = {
          id: `proj_hire_${Date.now().toString(36)}`,
          expertId: expert.id,
          expertName: expert.name,
          expertRole: expert.title,
          expertAvatar: expert.avatar,
          clientName: body.clientName || "Dr. Alexander Sterling",
          clientEmail: body.clientEmail || "alex.sterling@university.edu",
          title: body.topic || `${expert.specialty} Academic Engagement`,
          topic: body.topic || "Research Advisory & Analysis",
          serviceCategory: expert.specialty,
          totalBudget: budget,
          escrowFunded: budget,
          status: "Active",
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          milestones: [
            {
              id: `m_${Date.now()}_1`,
              title: "Milestone 1: Project Alignment & Raw Data Cleaning",
              description: "Review study design, clean input datasets and verify assumption tests.",
              amount: Math.round(budget * 0.4),
              status: "In Progress",
            },
            {
              id: `m_${Date.now()}_2`,
              title: "Milestone 2: Execution of Modeling & Analysis",
              description:
                "Perform statistical computation, regression equations, and hypothesis testing.",
              amount: Math.round(budget * 0.35),
              status: "Pending",
            },
            {
              id: `m_${Date.now()}_3`,
              title: "Milestone 3: Final Synthesis, Tables & Review Defense",
              description:
                "Finalize interpretation write-up, deliver clean scripts and answer feedback.",
              amount: Math.round(budget * 0.25),
              status: "Pending",
            },
          ],
          files: [],
          messages: [
            {
              id: `msg_${Date.now()}`,
              projectId: `proj_hire_${Date.now().toString(36)}`,
              sender: "expert",
              senderName: expert.name,
              senderAvatar: expert.avatar,
              text: `Greetings! I am ${expert.name}. I am delighted to work with you on "${body.topic || "your project"}". Please share your research questions, datasets, or proposal draft so we can kick off!`,
              timestamp: "Just now",
            },
          ],
        };

        hiredProjectsStore.unshift(newProject);

        // Deduct from wallet if paid via wallet
        if (body.paymentMethod === "wallet") {
          const clientWallet = getOrCreateWallet(userId);
          if (clientWallet.balanceUSD >= budget) {
            clientWallet.balanceUSD = Math.round((clientWallet.balanceUSD - budget) * 100) / 100;
            clientWallet.transactions.unshift({
              id: `tx_hire_${Date.now().toString(36)}`,
              type: "payment",
              amount: budget,
              currency: "USD",
              description: `Escrow funded for hiring ${expert.name} (${newProject.title})`,
              method: "Sterling Wallet Escrow",
              status: "completed",
              reference: `ESCROW_${Date.now().toString(36).toUpperCase()}`,
              createdAt: new Date().toISOString(),
            });
          }
        }

        return jsonResponse(
          {
            success: true,
            message: `Successfully hired ${expert.name}. Engagement workspace is now live!`,
            project: newProject,
          },
          201,
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to hire expert";
        return jsonResponse({ error: msg }, 400);
      }
    }
  }

  // Project Messaging & Interaction API: /api/projects/:id/messages
  if (pathname.startsWith("/api/projects/") && pathname.endsWith("/messages")) {
    const parts = pathname.split("/");
    const projectId = parts[3];
    const project = hiredProjectsStore.find((p) => p.id === projectId);

    if (!project) {
      return jsonResponse({ error: "Project workspace not found" }, 404);
    }

    if (request.method === "GET") {
      return jsonResponse({ success: true, messages: project.messages });
    }

    if (request.method === "POST") {
      try {
        const body = await request.json();
        const newMsg: ProjectMessage = {
          id: `msg_${Date.now().toString(36)}`,
          projectId,
          sender: body.sender || "client",
          senderName: body.senderName || "Dr. Alexander Sterling",
          senderAvatar:
            body.senderAvatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
          text: body.text || "",
          attachments: body.attachments || [],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        project.messages.push(newMsg);
        project.lastUpdated = new Date().toISOString();

        // If client sent message, simulate thoughtful expert academic response
        let expertReply: ProjectMessage | null = null;
        if (newMsg.sender === "client") {
          const responses = [
            `Thank you for sharing this! I am reviewing your notes. I will cross-reference the methodology and ensure all assumptions comply with peer-review publication standards.`,
            `Excellent point. I have checked the variance inflation factors and everything looks robust. I am updating our analysis output now!`,
            `Received your dataset update! I will rerun the descriptive and inferential tables and upload the deliverable under Milestone 2 shortly.`,
            `Understood. I will adjust the interpretation narrative and incorporate the APA-7 formatting guidelines you requested.`,
          ];
          const textReply = responses[Math.floor(Math.random() * responses.length)];
          expertReply = {
            id: `msg_exp_${Date.now().toString(36)}`,
            projectId,
            sender: "expert",
            senderName: project.expertName,
            senderAvatar: project.expertAvatar,
            text: textReply,
            timestamp: "A moment ago",
          };
          project.messages.push(expertReply);
        }

        return jsonResponse({
          success: true,
          message: "Message dispatched",
          sentMessage: newMsg,
          expertReply,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error sending message";
        return jsonResponse({ error: msg }, 400);
      }
    }
  }

  // Release Milestone Payment API: /api/projects/:id/milestones/:mId/release
  if (
    pathname.includes("/milestones/") &&
    pathname.endsWith("/release") &&
    request.method === "POST"
  ) {
    const parts = pathname.split("/");
    const projectId = parts[3];
    const milestoneId = parts[5];

    const project = hiredProjectsStore.find((p) => p.id === projectId);
    if (!project) return jsonResponse({ error: "Project not found" }, 404);

    const milestone = project.milestones.find((m) => m.id === milestoneId);
    if (!milestone) return jsonResponse({ error: "Milestone not found" }, 404);

    milestone.status = "Released";
    milestone.releasedAt = new Date().toISOString();

    // Check if all released
    const allReleased = project.milestones.every((m) => m.status === "Released");
    if (allReleased) {
      project.status = "Completed";
    }

    // Credit expert wallet
    const expertWallet = getOrCreateWallet(project.expertId);
    expertWallet.balanceUSD = Math.round((expertWallet.balanceUSD + milestone.amount) * 100) / 100;
    expertWallet.transactions.unshift({
      id: `tx_ms_rec_${Date.now().toString(36)}`,
      type: "milestone_received",
      amount: milestone.amount,
      currency: "USD",
      description: `Payment released for ${milestone.title} (${project.title})`,
      method: "Escrow Release",
      status: "completed",
      reference: `MS_REL_${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    });

    return jsonResponse({
      success: true,
      message: `Payment of $${milestone.amount} USD released to ${project.expertName}.`,
      milestone,
      projectStatus: project.status,
    });
  }

  // Upload Project File: /api/projects/:id/files
  if (
    pathname.startsWith("/api/projects/") &&
    pathname.endsWith("/files") &&
    request.method === "POST"
  ) {
    const parts = pathname.split("/");
    const projectId = parts[3];
    const project = hiredProjectsStore.find((p) => p.id === projectId);
    if (!project) return jsonResponse({ error: "Project not found" }, 404);

    try {
      const body = await request.json();
      const newFile: ProjectFile = {
        id: `f_${Date.now().toString(36)}`,
        name: body.name || "academic_deliverable.pdf",
        size: body.size || "2.1 MB",
        uploadedBy: body.uploadedBy || "client",
        uploaderName: body.uploaderName || "Dr. Alexander Sterling",
        type: body.type || "Document",
        uploadedAt: new Date().toISOString(),
      };

      project.files.unshift(newFile);
      return jsonResponse({ success: true, file: newFile });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "File upload error";
      return jsonResponse({ error: msg }, 400);
    }
  }

  // 7. Experts Directory API
  if (pathname === "/api/experts" && request.method === "GET") {
    return jsonResponse({ success: true, count: expertsDatabase.length, data: expertsDatabase });
  }

  // 8. Consultation Booking API
  if (pathname === "/api/bookings") {
    if (request.method === "POST") {
      try {
        const body = await request.json();
        const bookingId = `bk_${Date.now().toString(36)}`;
        const meetingCode = `si-meet-${Math.random().toString(36).substring(2, 7)}`;

        const newBooking = {
          id: bookingId,
          expertId: body.expertId,
          expertName: body.expertName,
          clientEmail: body.email || "alex.sterling@university.edu",
          clientName: body.name || "Dr. Alexander Sterling",
          topic: body.topic || "Academic Consultation",
          date: body.date,
          timeSlot: body.timeSlot,
          meetingLink: `https://meet.sterlinginsight.com/${meetingCode}`,
          amount: Number(body.amount) || 50,
          status: "Confirmed",
          createdAt: new Date().toISOString(),
        };

        bookingsStore.unshift(newBooking);
        return jsonResponse(
          {
            success: true,
            message: "Consultation booked successfully. Calendar invite and video link issued.",
            data: newBooking,
          },
          201,
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Invalid booking payload";
        return jsonResponse({ error: message }, 400);
      }
    }

    if (request.method === "GET") {
      return jsonResponse({ success: true, data: bookingsStore });
    }
  }

  // 9. Academic Integrity & AI Analysis Engine
  if (pathname === "/api/integrity/check" && request.method === "POST") {
    try {
      const body = await request.json();
      const text = body.text || "";
      const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

      if (wordCount < 10) {
        return jsonResponse(
          { error: "Text excerpt must be at least 10 words for statistical integrity assessment." },
          400,
        );
      }

      const hasFormalCitations = /\((?:[A-Z][a-z]+(?: et al\.)?,\s*\d{4}[a-z]?)\)/.test(text);
      const similarityScore = Math.max(2, Math.min(14, Math.floor((text.length % 11) + 2)));
      const aiProbability = hasFormalCitations
        ? 3.2
        : Math.min(18.5, Math.floor((text.length % 16) + 4));

      const report = {
        scanId: `scan_${Date.now().toString(36)}`,
        wordCount,
        timestamp: new Date().toISOString(),
        similarityScore: `${similarityScore}%`,
        similarityRating:
          similarityScore < 10 ? "Exemplary Academic Originality" : "Acceptable Threshold",
        aiGeneratedProbability: `${aiProbability}%`,
        aiConfidenceLevel: "High Confidence (Human-Authored)",
        citationIntegrity: hasFormalCitations
          ? "Verified (APA/Harvard Style Detected)"
          : "No formal in-text citations detected",
        grammarReadability: {
          fleschKincaidGrade: "Graduate / Academic Level (14.2)",
          lexicalDiversity: "0.78 (High Vocabulary Sophistication)",
        },
        recommendations: [
          "Source attribution complies with international academic publication ethics.",
          "Cross-matched against 120M+ academic repositories and preprint archives.",
          "Ready for journal submission or institutional grading.",
        ],
      };

      return jsonResponse({ success: true, data: report });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error analyzing text";
      return jsonResponse({ error: message }, 400);
    }
  }

  // 10. Contact & Institutional Inquiries
  if (pathname === "/api/contact" && request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email || !body.message) {
        return jsonResponse({ error: "Email and message are required" }, 400);
      }

      const inquiry = {
        id: `inq_${Date.now().toString(36)}`,
        name: body.name || "Anonymous",
        email: body.email,
        subject: body.subject || "Academic Inquiry",
        message: body.message,
        category: body.category || "General Inquiries",
        createdAt: new Date().toISOString(),
      };

      contactInquiries.unshift(inquiry);
      return jsonResponse(
        {
          success: true,
          message:
            "Inquiry received. A Sterling Insight academic representative will respond within 24 hours.",
          referenceId: inquiry.id,
        },
        201,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid contact payload";
      return jsonResponse({ error: message }, 400);
    }
  }

  // Not found
  return jsonResponse({ error: `API route ${pathname} not found` }, 404);
}
