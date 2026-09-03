export type OpportunityCategory =
  | "Scholarship (MSc & PhD)"
  | "Research & Postdoc Grant"
  | "Startup & SME Grant"
  | "Fellowship"
  | "Internship"
  | "Training & Workshop"
  | "Conference & Symposium";

export type OpportunityScope = "Local (Nigeria & Africa)" | "International (Global)";

export type OpportunityStatus = "Open for Application" | "Closing Soon" | "Always Open / Rolling";

export interface OpportunityItem {
  id: string;
  title: string;
  category: OpportunityCategory;
  scope: OpportunityScope;
  institution: string;
  location: string;
  coverage: string;
  fundingAmount?: string;
  coverageType:
    | "Fully Funded"
    | "Salaried"
    | "Grant Award"
    | "Equity-Free Investment"
    | "Partial / Fee Waiver"
    | "Free Certification";
  deadline: string;
  eligibleAudience: string;
  description: string;
  benefits: string[];
  requirements: string[];
  officialUrl: string;
  imageUrl: string;
  status: OpportunityStatus;
  featured?: boolean;
}

export const REAL_OPPORTUNITIES: OpportunityItem[] = [
  // ==========================================
  // 1. LOCAL (NIGERIA & AFRICA) OPPORTUNITIES
  // ==========================================
  {
    id: "opp-ptdf-overseas-local",
    title: "PTDF Overseas & In-Country MSc & PhD Scholarship Scheme",
    category: "Scholarship (MSc & PhD)",
    scope: "Local (Nigeria & Africa)",
    institution: "Petroleum Technology Development Fund (PTDF) Nigeria",
    location: "Nigeria, UK, Germany, France, Malaysia",
    coverage: "100% Tuition, Monthly Maintenance Allowance, Flights & Health Insurance",
    fundingAmount: "100% Full Ride (Tuition + Stipend)",
    coverageType: "Fully Funded",
    deadline: "Annual Call (Open for 2026/2027 Session)",
    eligibleAudience: "Nigerian graduates with minimum 2:1 for MSc, and 2:1 + Merit for PhD",
    description:
      "The Petroleum Technology Development Fund (PTDF) is the Federal Government agency mandated to build indigenous human capacity and develop technology in oil, gas, renewable energy, and data science. The scholarship supports Master’s (MSc) and Doctorate (PhD) degrees in designated public institutions in Nigeria and top partner universities across the United Kingdom, Germany, France, and Malaysia.",
    benefits: [
      "100% coverage of university tuition and laboratory bench fees",
      "Monthly living stipend benchmarked to host country living costs",
      "Return economy flight tickets and visa procurement reimbursement",
      "Annual research book and conference presentation allowance",
      "Direct pathway to national energy and technological research projects",
    ],
    requirements: [
      "Nigerian citizenship with verified National Identity Number (NIN)",
      "Minimum of Second Class Upper (2:1) in first degree, or 2:2 with relevant professional master's degree",
      "NYSC Discharge or Exemption Certificate",
      "Research proposal relating to energy transition, petroleum engineering, AI, or geosciences (PhD applicants)",
    ],
    officialUrl: "https://scholarship.ptdf.gov.ng/",
    imageUrl:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-tef-entrepreneurship",
    title: "Tony Elumelu Foundation (TEF) Entrepreneurship Programme",
    category: "Startup & SME Grant",
    scope: "Local (Nigeria & Africa)",
    institution: "The Tony Elumelu Foundation (TEF)",
    location: "Pan-Africa (54 African Nations)",
    coverage: "$5,000 Non-Refundable Seed Capital + 12-Week Business Mentorship",
    fundingAmount: "$5,000 Equity-Free Seed Grant",
    coverageType: "Grant Award",
    deadline: "Annual Cycle: Opens Jan 1 – Closes March 1 / Mid-Year Cohorts",
    eligibleAudience:
      "African entrepreneurs (18+) with business ideas or businesses under 5 years old",
    description:
      "The Tony Elumelu Foundation is Africa’s leading philanthropy empowering young African entrepreneurs across all 54 African countries. Through TEFConnect, selected entrepreneurs receive a world-class 12-week business management training curriculum, dedicated 1-on-1 mentorship, access to pan-African trade networks, and a $5,000 non-refundable cash grant to scale their enterprise.",
    benefits: [
      "$5,000 non-refundable cash seed funding paid directly into business bank account",
      "12-week intensive online business management and financial literacy training",
      "Direct 1-on-1 mentorship by verified corporate leaders and venture builders",
      "Lifetime membership in TEFConnect alumni network of over 18,000 African founders",
      "Opportunity to pitch to angel investors and commercial banks at TEF annual forums",
    ],
    requirements: [
      "African citizen residing in any of the 54 African nations",
      "Must be 18 years or older with valid government-issued photo identification",
      "Business idea or operational enterprise legally operating in Africa for under 5 years",
      "Submission of comprehensive business plan, market validation, and financial roadmap",
    ],
    officialUrl: "https://www.tefconnect.com/",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-nlng-postgraduate",
    title: "Nigeria LNG (NLNG) Postgraduate Overseas Scholarship",
    category: "Scholarship (MSc & PhD)",
    scope: "Local (Nigeria & Africa)",
    institution: "Nigeria LNG Limited (NLNG)",
    location: "United Kingdom Top Universities",
    coverage: "Full Tuition Fees + Overseas Living Allowance + Roundtrip Flights",
    fundingAmount: "100% Full Overseas MSc Funding (£35,000+)",
    coverageType: "Fully Funded",
    deadline: "Annual Call (Applications Open Annually in Q2/Q3)",
    eligibleAudience:
      "Nigerian university graduates with First Class or Second Class Upper degrees",
    description:
      "The NLNG Postgraduate Scholarship Scheme is one of the most prestigious corporate scholarships in West Africa. It funds high-achieving Nigerian scholars for one-year master’s degree programs at top-tier United Kingdom universities in disciplines critical to national technological and economic diversification, including engineering, environmental sciences, data analytics, and economics.",
    benefits: [
      "100% tuition and laboratory fees paid directly to the UK university",
      "Comprehensive monthly living stipend covering accommodation, food, and transport",
      "Economy class roundtrip flight tickets from Nigeria to the UK",
      "Warm clothing allowance, book grants, and dissertation field research support",
    ],
    requirements: [
      "Must be a provisional or permanent resident citizen of Nigeria",
      "Graduated with minimum Second Class Upper (2:1) in first degree from an accredited university",
      "Completed compulsory National Youth Service Corps (NYSC) program",
      "Not older than 30 years at the time of application submission",
    ],
    officialUrl: "https://www.nigerialng.com/the-community/pages/scholarship.aspx",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-lagos-innovates",
    title: "Lagos Innovates Workspace Vouchers & Tech Idea Grants",
    category: "Startup & SME Grant",
    scope: "Local (Nigeria & Africa)",
    institution: "Lagos State Employment Trust Fund (LSETF)",
    location: "Lagos, Nigeria",
    coverage: "Up to 75% Tech Hub Workspace Vouchers + Seed Grants & Talent Credits",
    fundingAmount: "Up to ₦15,000,000 Support & Vouchers",
    coverageType: "Grant Award",
    deadline: "Always Open / Monthly Rolling Approvals",
    eligibleAudience:
      "Founders, tech startups, data science builders, and researchers based in Lagos",
    description:
      "Lagos Innovates is a dedicated initiative by the Lagos State Employment Trust Fund designed to make Lagos Africa's foremost tech hub. The program covers 30% to 75% of the cost of high-speed workspace facilities, electricity, cloud hosting, and seed ideation vouchers for promising technological startups, research innovators, and female entrepreneurs.",
    benefits: [
      "Subsidized workspace vouchers redeemable across 40+ partner tech hubs in Lagos",
      "High-speed fiber internet and uninterrupted electricity for deep work and coding",
      "Access to Lagos State Government investor roundtables and regulatory sandboxes",
      "Equity-free idea grants for validated early-stage MVP prototypes",
    ],
    requirements: [
      "Startup founder or researcher registered or residing within Lagos State",
      "Lagos State Residents Registration Agency (LASRRA) identification card",
      "Clear pitch deck highlighting technical innovation, problem statement, and job creation",
    ],
    officialUrl: "https://www.lagosinnovates.ng/",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    status: "Always Open / Rolling",
    featured: false,
  },
  {
    id: "opp-africas-business-heroes",
    title: "Africa’s Business Heroes (ABH) Prize Competition",
    category: "Startup & SME Grant",
    scope: "Local (Nigeria & Africa)",
    institution: "Jack Ma Foundation & Alibaba Philanthropy",
    location: "Pan-Africa",
    coverage: "$1.5 Million USD Equity-Free Grant Pool ($100k - $300k Per Finalist)",
    fundingAmount: "$1,500,000 Annual Grant Pool",
    coverageType: "Grant Award",
    deadline: "Annual Call: Opens Q1 – Pitch Finale Q4",
    eligibleAudience: "African business owners with track record of local economic impact",
    description:
      "The Africa’s Business Heroes (ABH) prize competition is the flagship philanthropic program funded by the Jack Ma Foundation. Annually, 10 finalists are awarded shares of a $1.5 million non-dilutive grant pool, broadcast across global networks, and connected to international venture capital investors and mentors.",
    benefits: [
      "Top 10 finalists receive non-dilutive grants ranging from $100,000 to $300,000 each",
      "Global media visibility, television broadcast, and press coverage",
      "Participation in executive leadership immersions at Alibaba headquarters and international hubs",
      "Mentorship from Africa’s most celebrated enterprise executives",
    ],
    requirements: [
      "Applicant must be an African national or child/grandchild of an African national",
      "Company must be legally registered and headquartered in an African nation",
      "Must have at least 3 years of audited operating track record and revenue generation",
    ],
    officialUrl: "https://africabusinessheroes.org/en/the-prize",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-tetfund-nrf",
    title: "TETFund National Research Fund (NRF) Intervention Grants",
    category: "Research & Postdoc Grant",
    scope: "Local (Nigeria & Africa)",
    institution: "Tertiary Education Trust Fund (TETFund) Nigeria",
    location: "Nigerian Universities & Poly-institutions",
    coverage: "Up to ₦50 Million Per Approved Research Project (Equipment, Data & Travel)",
    fundingAmount: "Up to ₦50,000,000 Research Grant",
    coverageType: "Grant Award",
    deadline: "Periodic Calls / Concept Note Submissions",
    eligibleAudience:
      "University lecturers, PhD research teams, and principal investigators in Nigeria",
    description:
      "The National Research Fund (NRF) was established by TETFund to stimulate national economic development, technological self-reliance, and health security. It awards multi-million naira grants across Science, Technology, Innovation, Humanities, and Social Sciences for researchers addressing national priority challenges.",
    benefits: [
      "Direct research grant disbursement up to ₦50 million for multi-disciplinary teams",
      "Procurement of advanced laboratory equipment, specialized software, and reagents",
      "Funding for fieldwork data collection, sample testing, and enumeration surveys",
      "Support for publishing in high-impact Scopus/Web of Science indexed journals",
    ],
    requirements: [
      "Principal Investigator (PI) must be a PhD holder in an accredited Nigerian public tertiary institution",
      "Submission of a multidisciplinary research proposal aligned with national developmental priorities",
      "Institutional endorsement from the Vice Chancellor or Rector of the host university",
    ],
    officialUrl: "https://tetfund.gov.ng/",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-orange-corners-nigeria",
    title: "Orange Corners Innovation Fund (OCIF) Nigeria",
    category: "Startup & SME Grant",
    scope: "Local (Nigeria & Africa)",
    institution: "Kingdom of the Netherlands & FATE Foundation",
    location: "Nigeria (Lagos, Abuja & Regional Hubs)",
    coverage: "Up to €40,000 Blended Grant & Growth Capital + 6-Month Incubation",
    fundingAmount: "Up to €40,000 Blended Finance",
    coverageType: "Grant Award",
    deadline: "Bi-annual Cohort Cycles (Q1 & Q3 Calls)",
    eligibleAudience:
      "Innovative Nigerian youth entrepreneurs (18-35) in Circular Economy, Tech, and Agribusiness",
    description:
      "Orange Corners is an initiative of the Ministry of Foreign Affairs of the Netherlands implemented by FATE Foundation in Nigeria. Selected young entrepreneurs undergo an intensive 6-month enterprise development program, receive legal and IP guidance, and qualify for grant funding through the Orange Corners Innovation Fund.",
    benefits: [
      "Up to €40,000 in blended grant funding and low-interest growth capital",
      "6-month structured acceleration curriculum delivered by industry veterans",
      "Direct market access and business linkage to Dutch-Nigerian trade networks",
      "Personalized financial modeling, branding, and governance advisory",
    ],
    requirements: [
      "Nigerian founder aged 18 to 35 years old",
      "Operating a validated business in Agriculture, Health, Circular Economy, or Digital Solutions",
      "Demonstrated traction with minimum viable product (MVP) and existing customer base",
    ],
    officialUrl: "https://www.orangecorners.com/country/nigeria/",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-aas-fellowships",
    title: "African Academy of Sciences (AAS) Postdoctoral Research Fellowships",
    category: "Research & Postdoc Grant",
    scope: "Local (Nigeria & Africa)",
    institution: "The African Academy of Sciences (AAS)",
    location: "African Universities & Research Institutes",
    coverage: "Up to $150,000 Research Grant + Postdoctoral Salary & Lab Bench Fees",
    fundingAmount: "$150,000 Research Fellowship",
    coverageType: "Grant Award",
    deadline: "Annual Call across Health, Climate & AI Disciplines",
    eligibleAudience:
      "Early-career African postdoctoral scientists who obtained PhD within the last 7 years",
    description:
      "The African Academy of Sciences (AAS) supports visionary African scientists conducting cutting-edge discoveries on the continent. Fellows receive substantial financial awards to establish independent research laboratories, train graduate research assistants, and publish high-impact clinical and ecological breakthroughs.",
    benefits: [
      "Fellowship grant funding up to $150,000 over 2 to 3 years",
      "Competitive postdoctoral salary plus research equipment procurement funds",
      "International conference travel allowance and open-access publication fees",
      "Mentorship and networking with elected Fellows of the African Academy of Sciences",
    ],
    requirements: [
      "Citizen of an African country based at an African university or research institute",
      "PhD degree completed within the past 7 years in STEM, Public Health, or Environmental Science",
      "Strong peer-reviewed publication record in recognized international journals",
    ],
    officialUrl: "https://www.aasciences.africa/",
    imageUrl:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-she-leads-africa",
    title: "She Leads Africa (SLA) Accelerator & Female Venture Grants",
    category: "Startup & SME Grant",
    scope: "Local (Nigeria & Africa)",
    institution: "She Leads Africa & Venture Partners",
    location: "Nigeria, Ghana, Kenya, South Africa",
    coverage: "Equity-Free Cash Grants + Investor Demo Day + High-Growth Mentorship",
    fundingAmount: "₦10,000,000 - $30,000 Equity-Free Grants",
    coverageType: "Grant Award",
    deadline: "Annual Accelerator Cycle (Rolling Submissions)",
    eligibleAudience: "Female founders and co-founders building tech-enabled enterprises in Africa",
    description:
      "She Leads Africa is a premier global media and accelerator platform dedicated to helping female entrepreneurs build scalable, high-impact businesses. Through cohort-based accelerator programs, founders gain intensive coaching in unit economics, digital marketing, and investor readiness, culminating in equity-free cash prizes.",
    benefits: [
      "Direct equity-free cash grants awarded to top pitch performers",
      "Access to SLA’s private angel network and international venture capitalists",
      "Press features across SLA digital channels reaching over 800,000 readers",
      "Hands-on pitch deck scrubbing, legal structuring, and sales optimization",
    ],
    requirements: [
      "Business must be at least 50% women-owned or founded by a female executive",
      "Headquartered and operating within sub-Saharan Africa",
      "Demonstrable revenue or customer traction within the last 12 months",
    ],
    officialUrl: "https://sheleadsafrica.org/",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },

  // ==========================================
  // 2. INTERNATIONAL RESEARCH & GRADUATE SCHOLARSHIPS (MASTER & PHD)
  // ==========================================
  {
    id: "opp-chevening-2027",
    title: "Chevening Postgraduate Master’s Scholarships 2027/2028",
    category: "Scholarship (MSc & PhD)",
    scope: "International (Global)",
    institution: "UK Foreign, Commonwealth & Development Office (FCDO)",
    location: "United Kingdom (All UK Universities)",
    coverage: "100% Tuition, Monthly Living Allowance, Return Flights & Visa",
    fundingAmount: "100% Full Ride (£40,000+)",
    coverageType: "Fully Funded",
    deadline: "November 03, 2026",
    eligibleAudience: "Graduates with at least 2 years work experience across all fields",
    description:
      "Chevening is the UK government’s premier international awards programme aimed at developing future global leaders. It enables outstanding emerging leaders from across the globe to pursue one-year master’s degrees in any subject at any accredited UK university.",
    benefits: [
      "Full university tuition fees for any accredited one-year master's program in the UK",
      "Monthly living stipend to cover accommodation and day-to-day living expenses",
      "Economy class return airfare to the UK from home country",
      "Arrival and departure allowances plus travel grant to attend Chevening events",
      "Access to an exclusive network of over 55,000 alumni worldwide",
    ],
    requirements: [
      "Citizen of a Chevening-eligible country or territory",
      "Undergraduate degree equivalent to an upper second-class 2:1 honours degree",
      "Minimum of two years (equivalent to 2,800 hours) of work or leadership experience",
      "Submit three different eligible UK university courses",
    ],
    officialUrl: "https://www.chevening.org/apply/",
    imageUrl:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-gates-cambridge",
    title: "Gates Cambridge Scholarship (MPhil & PhD by Research)",
    category: "Scholarship (MSc & PhD)",
    scope: "International (Global)",
    institution: "University of Cambridge & Bill and Melinda Gates Foundation",
    location: "Cambridge, United Kingdom",
    coverage: "Full University Composition Fee + £21,000/yr Living Stipend + Flights",
    fundingAmount: "Full Ride + £21,000/yr Allowance",
    coverageType: "Fully Funded",
    deadline: "December 2026 / January 2027 (Course Dependent)",
    eligibleAudience:
      "Citizens of any country outside the United Kingdom pursuing graduate degrees",
    description:
      "Gates Cambridge Scholarships are prestigious, competitive full-cost awards for graduate study and research in any subject available at the University of Cambridge. The programme seeks scholars who demonstrate outstanding intellectual ability, leadership potential, and commitment to improving the lives of others.",
    benefits: [
      "Full University Composition Fee paid at the appropriate international rate",
      "A maintenance allowance for a single student (£21,000 per annum for 12 months)",
      "One economy single airfare at both the beginning and end of the course",
      "Inbound visa costs & the cost of the UK Immigration Health Surcharge",
      "Discretionary academic development funding up to £2,000 for conferences and courses",
    ],
    requirements: [
      "Citizens of any country outside the UK applying for PhD, MSc/MLitt, or one-year postgraduate course",
      "Evidence of outstanding academic excellence (typically First Class or top 5% of graduating class)",
      "A compelling statement explaining alignment with the Gates Cambridge mission",
    ],
    officialUrl: "https://www.gatescambridge.org/apply/eligibility/",
    imageUrl:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-daad-germany",
    title: "DAAD Research Grants – Doctoral Programmes in Germany",
    category: "Research & Postdoc Grant",
    scope: "International (Global)",
    institution: "German Academic Exchange Service (DAAD)",
    location: "Germany (German Universities & Max Planck / Fraunhofer Institutes)",
    coverage: "€1,300/Month Stipend + Full Health Insurance + Research Allowance + Travel",
    fundingAmount: "€1,300/mo + €460/yr Research Allowance",
    coverageType: "Fully Funded",
    deadline: "October / November Annual Cycles (Open for 2026/2027)",
    eligibleAudience: "International postgraduates and doctoral candidates across all disciplines",
    description:
      "DAAD research grants provide foreign doctoral candidates and young academics with the opportunity to conduct a full doctoral degree or structured doctoral research project in Germany at state or state-recognized universities or non-university research institutions.",
    benefits: [
      "Monthly payments of €1,300 for doctoral candidates",
      "Payments towards health, accident, and personal liability insurance cover in Germany",
      "Travel allowance, unless these costs are covered by the home country or another funding source",
      "One-off research allowance of €460 per year plus language course subsidy",
    ],
    requirements: [
      "Master’s degree or equivalent completed no more than 6 years prior to application",
      "Detailed, well-planned research proposal agreed with an academic supervisor in Germany",
      "Proof of English or German language proficiency appropriate for the research field",
    ],
    officialUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    imageUrl:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-commonwealth-phd",
    title: "Commonwealth PhD & Master’s Scholarships (UK)",
    category: "Scholarship (MSc & PhD)",
    scope: "International (Global)",
    institution: "Commonwealth Scholarship Commission (CSC UK)",
    location: "United Kingdom",
    coverage: "Full Tuition + Return Airfare + £1,347 - £1,652/Month Living Allowance",
    fundingAmount: "100% Full Funding (Tuition + Stipend)",
    coverageType: "Fully Funded",
    deadline: "October 2026 (Annual Nominating Call)",
    eligibleAudience: "Citizens of Commonwealth developing countries with high academic merit",
    description:
      "Commonwealth Scholarships enable talented and motivated individuals to gain the knowledge and skills required for sustainable development. Funded by the UK Foreign, Commonwealth & Development Office, scholarships support full-time doctoral and master's research across six development themes.",
    benefits: [
      "Full approved tuition fees covered directly with the UK institution",
      "Monthly stipend of £1,347 per month (or £1,652 per month for London universities)",
      "Approved return airfare from home country to the United Kingdom",
      "Study travel grant towards the cost of study-related travel within the UK or overseas",
      "Warm clothing allowance where applicable",
    ],
    requirements: [
      "Citizen of or granted refugee status by an eligible Commonwealth country",
      "Permanently resident in an eligible Commonwealth country",
      "First degree of at least upper second-class (2:1) honours standard",
      "Supported by a national nominating agency or approved university",
    ],
    officialUrl: "https://cscuk.fcdo.gov.uk/apply/",
    imageUrl:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-swiss-excellence",
    title: "Swiss Government Excellence Scholarships for Foreign Scholars",
    category: "Research & Postdoc Grant",
    scope: "International (Global)",
    institution: "Federal Commission for Scholarships for Foreign Students (FCS), Switzerland",
    location: "Switzerland (ETH Zurich, EPFL, University of Geneva, Basel, Zurich)",
    coverage: "CHF 1,920/Month Stipend + University Tuition Waiver + Health Insurance",
    fundingAmount: "CHF 1,920/mo + Housing Allowance",
    coverageType: "Fully Funded",
    deadline: "September – December Annual Cycles (Country Dependent)",
    eligibleAudience: "Postgraduate researchers and PhD scholars from over 180 countries",
    description:
      "Each year the Swiss Confederation awards Government Excellence Scholarships to promote international exchange and research cooperation between Switzerland and over 180 other countries. The research scholarship is available to post-graduate researchers in any discipline who hold a master's degree and plan to pursue a doctorate or post-doctorate.",
    benefits: [
      "Monthly scholarship payment of CHF 1,920 for PhD researchers (CHF 3,500 for Postdocs)",
      "Exemption from university tuition fees at Swiss federal institutes and cantonal universities",
      "Mandatory Swiss health insurance paid by the FCS",
      "Flight allowance or return ticket for non-EU scholars at the conclusion of fellowship",
      "One-time housing allowance of CHF 300 paid at the start of the scholarship",
    ],
    requirements: [
      "Master's degree or equivalent university degree achieved before 31 July of the starting year",
      "Letter of support from a designated professor at the Swiss host institution",
      "A precise research proposal including timescale and methodology",
    ],
    officialUrl: "https://www.sbfi.admin.ch/scholarships_eng",
    imageUrl:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-mext-japan",
    title: "Japanese Government (MEXT) Postgraduate Research Scholarships",
    category: "Scholarship (MSc & PhD)",
    scope: "International (Global)",
    institution: "Ministry of Education, Culture, Sports, Science and Technology (MEXT) Japan",
    location: "Japan (Tokyo, Kyoto, Osaka & Partner National Universities)",
    coverage: "100% Tuition Waiver + ¥145,000/Month Stipend + Tokyo Roundtrip Airfare",
    fundingAmount: "100% Full Funding (¥145,000/mo + Tuition)",
    coverageType: "Fully Funded",
    deadline: "May – June (Embassy Track) & October – December (University Track)",
    eligibleAudience: "International graduates under 35 holding bachelor's or master's degrees",
    description:
      "The Monbukagakusho (MEXT) Research Scholarship is Japan’s most prestigious state grant for international scholars. Recipients spend their first 6 months mastering Japanese language, followed by enrolled master’s or doctoral degree research under leading faculty in robotics, nanotechnology, economics, and environmental science.",
    benefits: [
      "Full waiver of university entrance examination fees, matriculation fees, and tuition",
      "Monthly living allowance of ¥143,000 to ¥145,000 (with additional regional top-ups)",
      "Round-trip international flight tickets between home country and Tokyo/Osaka",
      "Intensive Japanese language and cultural orientation coursework",
    ],
    requirements: [
      "Nationality of a country that has diplomatic relations with Japan",
      "Under 35 years of age on April 1 of the arrival year",
      "Minimum 16 years of completed schooling (bachelor’s degree completed)",
      "Willingness to study the Japanese language and conduct dedicated academic research",
    ],
    officialUrl: "https://www.studyinjapan.go.jp/en/planning/scholarship/",
    imageUrl:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-australia-rtp",
    title: "Australian Government Research Training Program (RTP)",
    category: "Research & Postdoc Grant",
    scope: "International (Global)",
    institution: "Australian Department of Education & Australian Universities",
    location: "Australia (ANU, Melbourne, Sydney, UNSW, Monash, Queensland)",
    coverage: "Full Tuition Fee Offset + AUD $32,000 - $38,000/Year Tax-Free Stipend",
    fundingAmount: "AUD $34,000/yr Tax-Free Stipend + Fees",
    coverageType: "Fully Funded",
    deadline: "July – October (Annual Major International Rounds)",
    eligibleAudience: "Domestic and international Master by Research and PhD candidates",
    description:
      "The Australian Government Research Training Program (RTP) provides block grants to higher education providers to support domestic and international students undertaking Research Doctorate and Research Masters degrees. RTP covers tuition fees, provides living allowances, and funds project expenses.",
    benefits: [
      "Full tuition fee offset (waiver) for the duration of the research master's or PhD degree",
      "Tax-free fortnightly living stipend (AUD $32,000 to $38,000+ per year depending on university)",
      "Overseas Student Health Cover (OSHC) for the candidate and immediate dependents",
      "Relocation allowance and thesis publication allowance",
    ],
    requirements: [
      "Enrolled or offered unconditional admission into an accredited Higher Degree by Research (HDR)",
      "First-class honours degree or master's by research with high distinction publication record",
      "English language proficiency meeting Australian university postgraduate standards",
    ],
    officialUrl: "https://www.education.gov.au/research-block-grants/research-training-program",
    imageUrl:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-fulbright-foreign",
    title: "Fulbright Foreign Student Program (Master’s & PhD in USA)",
    category: "Scholarship (MSc & PhD)",
    scope: "International (Global)",
    institution: "United States Department of State (Bureau of Educational and Cultural Affairs)",
    location: "United States (Over 300 US Accredited Universities)",
    coverage: "Full Tuition, Living Stipend, Health Benefit Plan & Transatlantic Airfare",
    fundingAmount: "100% Full Funding (Tuition + US Stipend)",
    coverageType: "Fully Funded",
    deadline: "February – June (Country-Specific Annual Deadlines)",
    eligibleAudience: "Young professionals, artists, and graduate students from 160+ countries",
    description:
      "The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States. Operating in more than 160 countries worldwide, approximately 4,000 foreign students receive Fulbright scholarships each year.",
    benefits: [
      "Full tuition fee waivers or payments arranged directly with host US universities",
      "Monthly living stipend tailored to the local cost of living in the US host city",
      "J-1 visa sponsorship and pre-academic English preparation programs in the US",
      "Accident and sickness health benefits plan (ASPE)",
      "Round-trip economy airfare between home country and the United States",
    ],
    requirements: [
      "Citizen of an eligible Fulbright partner country with a four-year bachelor's degree",
      "Demonstrated leadership, academic excellence, and commitment to cross-cultural exchange",
      "Competitive GRE / GMAT and TOEFL / IELTS examination scores",
    ],
    officialUrl: "https://foreign.fulbrightonline.org/",
    imageUrl:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-rhodes-oxford",
    title: "The Rhodes Scholarship at the University of Oxford",
    category: "Scholarship (MSc & PhD)",
    scope: "International (Global)",
    institution: "The Rhodes Trust, Oxford",
    location: "Oxford, United Kingdom",
    coverage: "All University & College Fees + £19,092/Year Living Stipend + Flights",
    fundingAmount: "Full Oxford Fees + £19,092/yr",
    coverageType: "Fully Funded",
    deadline: "July – October (Region-Specific Annual Cycles)",
    eligibleAudience: "Young leaders (aged 18-25) with outstanding intellect and moral character",
    description:
      "The Rhodes Scholarship is the world’s oldest and perhaps most prestigious international scholarship programme, enabling outstanding young people from across the world to study full-time postgraduate degrees at the University of Oxford.",
    benefits: [
      "All Oxford University and College tuition fees covered in full",
      "Annual living stipend of £19,092 paid directly to the scholar",
      "Two economy class flights to Oxford at beginning and conclusion of studies",
      "Full coverage of UK visa application fees and International Health Surcharge (IHS)",
      "Residence and community access at Rhodes House, Oxford",
    ],
    requirements: [
      "Citizenship of an eligible Rhodes constituency",
      "First class honours degree or GPA of 3.70/4.00 or higher",
      "Energy to use one's talents to the full, truth, courage, devotion to duty, and sympathy for the weak",
    ],
    officialUrl: "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/",
    imageUrl:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-wellcome-trust-discovery",
    title: "Wellcome Trust Discovery Awards (Health & Life Sciences Research)",
    category: "Research & Postdoc Grant",
    scope: "International (Global)",
    institution: "Wellcome Trust UK",
    location: "UK, Republic of Ireland & Low-and-Middle-Income Countries",
    coverage: "Up to £3.5 Million Research Project Funding Over Up to 8 Years",
    fundingAmount: "Up to £3,500,000 Direct Research Funding",
    coverageType: "Grant Award",
    deadline: "Tri-annual Review Rounds (Open for 2026/2027 Submissions)",
    eligibleAudience:
      "Established researchers and collaborative teams pursuing groundbreaking scientific discoveries",
    description:
      "The Wellcome Trust Discovery Awards provide funding for established researchers and teams of any discipline who want to pursue bold and creative research ideas that have the potential to deliver significant shifts in understanding that could improve human life, health, and wellbeing.",
    benefits: [
      "Total grant funding of up to £3.5 million over a maximum period of 8 years",
      "Staff salaries including postdocs, PhD students, and bioinformaticians",
      "Advanced laboratory equipment, materials, clinical consumables, and sequencing costs",
      "Overseas travel, open-access journal publication costs, and public engagement events",
    ],
    requirements: [
      "Researchers based at an eligible administering organisation in the UK, Ireland, or LMICs",
      "International reputation for excellence in biomedical, clinical, data, or social sciences",
      "A bold research programme offering transformative potential rather than incremental progress",
    ],
    officialUrl: "https://wellcome.org/grant-funding/schemes/discovery-awards",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    status: "Closing Soon",
    featured: true,
  },
  {
    id: "opp-msca-postdoc",
    title: "Marie Skłodowska-Curie Actions (MSCA) Postdoctoral Fellowships",
    category: "Research & Postdoc Grant",
    scope: "International (Global)",
    institution: "European Commission (Horizon Europe Framework)",
    location: "European Union & Associated Research Nations",
    coverage: "Full Salary (~€5,080/Month Gross) + Mobility + Family & Research Allowance",
    fundingAmount: "€5,080/mo + €1,000/mo Research Allowance",
    coverageType: "Salaried",
    deadline: "September 2026 (Annual European Commission Call)",
    eligibleAudience: "Postdoctoral researchers of any nationality holding a PhD",
    description:
      "MSCA Postdoctoral Fellowships enhance the creative and innovative potential of researchers holding a PhD and who wish to acquire new skills through advanced training, international, interdisciplinary, and inter-sectoral mobility across Europe.",
    benefits: [
      "Living allowance benchmarked at €5,080 per month before country correction coefficient",
      "Mobility allowance of €600 per month and family allowance (€660/mo) where applicable",
      "Research, training, and networking costs of €1,000 per month",
      "Management and indirect costs of €650 per month paid to the host university",
    ],
    requirements: [
      "Must have a PhD degree at the date of the call deadline",
      "Maximum of 8 years full-time equivalent research experience after PhD",
      "Comply with MSCA mobility rule: must not have resided in host country for >12 months in the last 3 years",
    ],
    officialUrl:
      "https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-nsf-grfp",
    title: "NSF Graduate Research Fellowship Program (GRFP)",
    category: "Scholarship (MSc & PhD)",
    scope: "International (Global)",
    institution: "US National Science Foundation (NSF)",
    location: "United States Accredited Graduate Institutions",
    coverage: "$37,000 Annual Stipend + $16,000 Cost-of-Education Allowance For 3 Years",
    fundingAmount: "$37,000/yr Stipend + $16,000 Tuition Offset",
    coverageType: "Fully Funded",
    deadline: "October 2026 (Annual Field-Specific Cycles)",
    eligibleAudience:
      "Early-stage graduate students pursuing research-based master's and doctoral degrees",
    description:
      "The NSF GRFP recognizes and supports outstanding graduate students in NSF-supported STEM disciplines who are pursuing research-based master's and doctoral degrees at accredited United States institutions.",
    benefits: [
      "Five-year fellowship period with three years of generous financial support",
      "Annual stipend of $37,000 paid directly to the fellow",
      "Cost-of-education allowance of $16,000 paid directly to the graduate institution",
      "No post-graduation service requirement; freedom to conduct self-directed scientific inquiry",
    ],
    requirements: [
      "US citizen, US national, or permanent resident",
      "Intending to enroll or enrolled in a full-time research-based master's or PhD in STEM",
      "Completed no more than one academic year of full-time graduate study",
    ],
    officialUrl: "https://www.nsfgrfp.org/",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },

  // ==========================================
  // 3. STARTUP & SMALL BUSINESS GRANTS & FUNDING (GLOBAL)
  // ==========================================
  {
    id: "opp-ycombinator",
    title: "Y Combinator Startup Accelerator & $500,000 Standard Investment",
    category: "Startup & SME Grant",
    scope: "International (Global)",
    institution: "Y Combinator (YC)",
    location: "San Francisco, California & Global Batch",
    coverage: "$500,000 Standard Deal ($125k for 7% + $375k MFN SAFE) + 3-Month Batch",
    fundingAmount: "$500,000 Investment & Seed Capital",
    coverageType: "Equity-Free Investment",
    deadline: "Winter (W27) & Summer (S27) Rolling Cohort Deadlines",
    eligibleAudience: "Founders across AI, software, hardware, biotech, and fintech worldwide",
    description:
      "Y Combinator is the world’s foremost startup accelerator, having backed Airbnb, Stripe, Dropbox, Coinbase, Flutterwave, and Reddit. Twice a year, YC invests $500,000 in early-stage startups and guides founders through intensive product building, growth scaling, and Demo Day investor pitching.",
    benefits: [
      "$500,000 investment on standard terms ($125,000 on 7% equity plus $375,000 uncapped MFN SAFE)",
      "Weekly 1-on-1 office hours with YC partners and tech luminaries",
      "Access to the legendary Bookface directory of over 9,000 active founders worldwide",
      "Participation in YC Demo Day, pitching to over 1,500 accredited global venture investors",
      "Over $500,000 in partner credits (AWS, Google Cloud, Stripe, OpenAI, Microsoft)",
    ],
    requirements: [
      "Any team or solo founder with a prototype, validated insight, or existing user traction",
      "Clear video introduction and comprehensive online written application",
      "Willingness to incorporate a Delaware C-Corp and participate actively in the batch",
    ],
    officialUrl: "https://www.ycombinator.com/apply/",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-google-startups",
    title: "Google for Startups Accelerator & Black/Women Founders Funds",
    category: "Startup & SME Grant",
    scope: "International (Global)",
    institution: "Google for Startups",
    location: "Africa, Europe, Americas, APAC",
    coverage: "Up to $150,000 Non-Dilutive Cash Grant + $200k Google Cloud Credits + AI Mentors",
    fundingAmount: "$150,000 Equity-Free Cash Grant",
    coverageType: "Grant Award",
    deadline: "Annual Cohorts (Rolling Applications Across Regional Funds)",
    eligibleAudience: "Seed to Series A tech startups utilizing AI, ML, or cloud architectures",
    description:
      "Google for Startups Accelerator and the Founders Funds provide non-dilutive equity-free cash awards, cloud infrastructure credits, and direct access to Google’s senior engineering, product, and machine learning research teams.",
    benefits: [
      "Up to $150,000 non-dilutive equity-free cash awards deposited directly to company accounts",
      "Up to $200,000 in Google Cloud and Firebase platform credits for 2 years",
      "1-on-1 technical mentorship from Google Brain, DeepMind, and Android engineers",
      "Dedicated investor showcase and global PR coverage through Google channels",
    ],
    requirements: [
      "Legally registered technology startup in eligible regional zones",
      "Demonstrable use of AI, Machine Learning, or scalable cloud backends",
      "At least one full-time technical founder and an active product in the market",
    ],
    officialUrl: "https://startup.google.com/programs/",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-cartier-women",
    title: "Cartier Women’s Initiative Awards (Global Impact Grants)",
    category: "Startup & SME Grant",
    scope: "International (Global)",
    institution: "Cartier & INSEAD Business School",
    location: "Global (All Regional Categories)",
    coverage: "$100,000 First Prize Grant | $60,000 Second Prize | $30,000 Third Prize",
    fundingAmount: "Up to $100,000 Grant Award",
    coverageType: "Grant Award",
    deadline: "Annual Call: Opens May – Closes July / Awards Gala Q2",
    eligibleAudience:
      "Women-run and women-owned businesses driving UN Sustainable Development Goals",
    description:
      "The Cartier Women's Initiative is an annual international entrepreneurship programme that aims to drive change by empowering women impact entrepreneurs. The awards recognize early-stage businesses that demonstrate a strong, sustainable social or environmental impact.",
    benefits: [
      "$100,000 grant for 1st place awardees; $60,000 for 2nd place; $30,000 for 3rd place",
      "Tailored 1-on-1 executive coaching and leadership training by INSEAD faculty",
      "International media visibility, video profiles, and investor networking events",
      "Peer community of over 300 global female impact founders",
    ],
    requirements: [
      "For-profit business owned and run by a woman holding a major leadership role",
      "Operating for between 1 and 6 years with initial market traction and revenue",
      "Clear alignment with at least one United Nations Sustainable Development Goal (UN SDG)",
    ],
    officialUrl: "https://www.cartierwomensinitiative.com/",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-eic-accelerator",
    title: "European Innovation Council (EIC) Accelerator Grants",
    category: "Startup & SME Grant",
    scope: "International (Global)",
    institution: "European Innovation Council (European Commission)",
    location: "European Union & Associated Countries",
    coverage: "Non-Dilutive Grant up to €2.5 Million + Direct Equity Investment up to €15 Million",
    fundingAmount: "Up to €2,500,000 Grant + €15M Equity",
    coverageType: "Grant Award",
    deadline: "Cut-Off Dates in March, June, and October 2026",
    eligibleAudience:
      "Deep-tech SMEs, university spin-offs, and startups with breakthrough scientific innovation",
    description:
      "The EIC Accelerator supports individual Small and Medium Enterprises (SMEs), particularly startups and spinout companies, to develop and scale up game-changing innovations. It offers blended finance combining up to €2.5M in non-repayable grants with direct equity investments up to €15M.",
    benefits: [
      "Non-dilutive grant component up to €2.5 million covering 70% of eligible R&D costs",
      "Direct equity investment component up to €15 million through the EIC Fund",
      "Business acceleration services, coaching, and introduction to corporate buyers",
      "Access to European research laboratories and supercomputing facilities",
    ],
    requirements: [
      "High-impact deep-tech innovation at Technology Readiness Level (TRL) 5/6 moving to TRL 8",
      "Company legally established in an EU Member State or Horizon Europe Associated Country",
      "High growth potential with strong market commercialization strategy",
    ],
    officialUrl: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-halcyon-fellowship",
    title: "Halcyon Incubator & Social Enterprise Fellowships",
    category: "Startup & SME Grant",
    scope: "International (Global)",
    institution: "Halcyon Social Enterprise, Washington DC",
    location: "Washington, DC, USA & Hybrid",
    coverage: "$10,000 Equity-Free Stipend + 8-Week Free Housing in DC + Amazon AWS Credits",
    fundingAmount: "$10,000 Cash Stipend + Full Residency",
    coverageType: "Grant Award",
    deadline: "Biannual Cohorts: Fall 2026 & Spring 2027 Rounds",
    eligibleAudience:
      "Early-stage for-profit social entrepreneurs addressing climate, health, and equity",
    description:
      "Halcyon accelerates social entrepreneurs through world-class residencies in Washington, DC. Fellows receive free housing, workspace, a $10,000 equity-free living stipend, legal advice, and executive pitch coaching.",
    benefits: [
      "$10,000 per venture equity-free cash living stipend",
      "8-week intensive in-person residency with fully covered luxury housing in Washington DC",
      "Over $300,000 in pro-bono legal support and cloud hosting credits",
      "Direct introductions to impact venture capital firms, family offices, and grantmakers",
    ],
    requirements: [
      "Early-stage for-profit venture centered on measurable social or environmental impact",
      "At least one co-founder able to commit full-time to the Washington DC residency period",
      "Working minimum viable product (MVP) with early user adoption",
    ],
    officialUrl: "https://halcyonhouse.org/fellowships/",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },
  {
    id: "opp-seedstars-fund",
    title: "Seedstars International Ventures Seed & Growth Fund",
    category: "Startup & SME Grant",
    scope: "International (Global)",
    institution: "Seedstars International",
    location: "Emerging Markets (Africa, LATAM, MENA, CEE, Asia)",
    coverage: "Up to $250,000 Early-Stage Capital + Growth Track Mentorship",
    fundingAmount: "Up to $250,000 Investment",
    coverageType: "Equity-Free Investment",
    deadline: "Always Open / Monthly Pitch Applications",
    eligibleAudience: "Tech startups operating in emerging and frontier economies",
    description:
      "Seedstars International Ventures invests in early-stage tech startups solving fundamental societal problems in emerging markets across education, agriculture, healthcare, and financial services.",
    benefits: [
      "Up to $250,000 investment with potential follow-on rounds up to $500,000",
      "Access to Seedstars Growth Track program covering performance marketing and fundraising",
      "Network of mentors spanning 90+ countries and global institutional co-investors",
    ],
    requirements: [
      "Tech-driven scalable business model operating in an emerging or frontier market",
      "Demonstrated initial revenue generation and clear monthly user growth rate",
      "Scalable solution addressing financial inclusion, agriculture, or essential services",
    ],
    officialUrl: "https://www.seedstars.com/community/entrepreneurs/",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    status: "Always Open / Rolling",
    featured: false,
  },
  {
    id: "opp-innovate-uk-smart",
    title: "Innovate UK Smart Grants for Commercial R&D",
    category: "Startup & SME Grant",
    scope: "International (Global)",
    institution: "UK Research and Innovation (UKRI)",
    location: "United Kingdom & UK Collaboration Partners",
    coverage: "Up to £2 Million Non-Repayable Grant Funding for Disruptive Tech Innovations",
    fundingAmount: "Up to £2,000,000 Non-Repayable Grant",
    coverageType: "Grant Award",
    deadline: "Quarterly Review Rounds (Open for 2026/2027 Rounds)",
    eligibleAudience:
      "UK micro, small, and medium businesses working independently or collaboratively",
    description:
      "Innovate UK Smart Grants is the UK government's open grant funding competition supporting game-changing commercial R&D. Projects must deliver disruptive, innovative technologies that generate substantial economic impact.",
    benefits: [
      "Non-repayable grant funding covering up to 70% of project costs for micro/small businesses",
      "Total project grant size from £100,000 to £2,000,000",
      "Retain 100% intellectual property (IP) and commercial rights",
      "Support from Innovate UK EDGE advisors for market scale-up",
    ],
    requirements: [
      "UK registered business of any size (lead applicant)",
      "Project must show clear potential for significant commercial exploitation",
      "Project duration between 6 and 36 months",
    ],
    officialUrl: "https://www.ukri.org/councils/innovate-uk/",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: false,
  },

  // ==========================================
  // 4. PRESTIGIOUS FELLOWSHIPS & CONFERENCES
  // ==========================================
  {
    id: "opp-neurips-2026",
    title: "NeurIPS Conference & Machine Learning Research Grants",
    category: "Conference & Symposium",
    scope: "International (Global)",
    institution: "Neural Information Processing Systems Foundation",
    location: "Vancouver, Canada & Virtual",
    coverage: "Travel Grants ($2,500+) + Full Registration Waivers + Workshop Mentorship",
    fundingAmount: "$2,500+ Travel Awards + Free Registration",
    coverageType: "Partial / Fee Waiver",
    deadline: "Annual Call (Submissions: May – June | Event: December)",
    eligibleAudience:
      "Researchers, PhD candidates, and engineers in AI, deep learning, and statistics",
    description:
      "NeurIPS is the premier international conference on Neural Information Processing Systems. Its travel and diversity grants provide fully covered admission, airfare stipends, and accommodation to enable underrepresented researchers and doctoral candidates to present their breakthroughs.",
    benefits: [
      "Full conference registration fee waiver including workshops and tutorials",
      "Travel stipends up to $2,500 for student first-authors travelling internationally",
      "Exclusive invitation to Black in AI, LatinX in AI, and WiML workshop mentoring dinners",
      "Direct exposure to recruiters from Google DeepMind, OpenAI, Meta FAIR, and Anthropic",
    ],
    requirements: [
      "Author or co-author of an accepted paper or workshop submission, or student researcher",
      "Demonstrated financial need or affiliation with underrepresented regions",
    ],
    officialUrl: "https://neurips.cc/",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    status: "Open for Application",
    featured: true,
  },
  {
    id: "opp-nih-research",
    title: "NIH Research Project Grants (R01 & F31/F32 Fellowships)",
    category: "Research & Postdoc Grant",
    scope: "International (Global)",
    institution: "National Institutes of Health (NIH), USA",
    location: "USA & Global Research Partner Laboratories",
    coverage: "Up to $500,000/Year Direct Costs for Biomedical & Public Health Projects",
    fundingAmount: "Up to $500,000/yr Direct Research Funding",
    coverageType: "Grant Award",
    deadline: "Standard NIH Submission Cycles (February, June, October)",
    eligibleAudience:
      "Principal investigators, predoctoral fellows (F31), and postdoctoral scientists (F32)",
    description:
      "The NIH is the primary agency of the United States government responsible for biomedical and public health research. The R01 is the original and historically oldest grant mechanism used by NIH, providing support for health-related research and development.",
    benefits: [
      "Up to $250,000 to $500,000+ per year in direct costs for multi-year project investigations",
      "Salary support for principal investigators, postdoctoral researchers, and lab technicians",
      "Funding for specialized clinical laboratory supplies, computational modeling, and genomics",
    ],
    requirements: [
      "Rigorous scientific methodology in biomedical, behavioral, or public health science",
      "Submission via institutional Grants.gov and eRA Commons research administration systems",
    ],
    officialUrl: "https://grants.nih.gov/grants/funding/r01.htm",
    imageUrl:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    status: "Always Open / Rolling",
    featured: false,
  },
];
