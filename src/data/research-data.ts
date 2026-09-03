export interface ResearchItem {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  institution: string;
  category:
    | "Artificial Intelligence"
    | "Data Science"
    | "Medicine & Health"
    | "Economics & Finance"
    | "Environment & Climate"
    | "Education & Social Sciences";
  academicLevel:
    | "Undergraduate"
    | "Masters Thesis"
    | "PhD Dissertation"
    | "Dataset"
    | "Questionnaire & Template";
  price: number; // 0 for free
  pages: number;
  citations: number;
  rating: number;
  downloads: number;
  publishedDate: string;
  format: string;
  fileSize: string;
  imageUrl?: string;
  abstract: string;
  methodology: string;
  keyFindings: string[];
  tableOfContents: string[];
}

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "res-001",
    title: "Deep Learning Architectures for Multi-Omics Genomic Variant Prediction",
    author: "Dr. Chidi Okafor & Prof. Sarah Jenkins",
    authorRole: "Senior Bioinformatics Researcher",
    institution: "University of Lagos & Imperial College",
    category: "Artificial Intelligence",
    academicLevel: "PhD Dissertation",
    price: 35,
    pages: 184,
    citations: 42,
    rating: 4.9,
    downloads: 312,
    publishedDate: "May 2026",
    format: "PDF, PyTorch Code & Clean CSV Datasets",
    fileSize: "18.5 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    abstract:
      "This dissertation introduces a novel hybrid transformer-convolutional architecture for analyzing high-throughput multi-omics sequencing data. The framework achieves state-of-the-art predictive performance in identifying oncogenic genomic mutations across 12 cancer types with 96.4% precision.",
    methodology:
      "Utilizes deep attention networks trained on TCGA and ICGC multi-omics datasets with 10-fold cross-validation and SHAP explainability analysis.",
    keyFindings: [
      "96.4% accuracy in genomic mutation pathogenicity classification",
      "Reduces computational runtime by 3.8x compared to standard graph networks",
      "Includes complete open-source PyTorch pipeline and 42k row processed dataset",
    ],
    tableOfContents: [
      "Chapter 1: Introduction & Research Questions",
      "Chapter 2: Comprehensive Literature Review of Genomic AI",
      "Chapter 3: Hybrid Transformer-CNN Methodology",
      "Chapter 4: Empirical Experiments & Statistical Results",
      "Chapter 5: Discussion, Ethical Considerations & Future Horizons",
    ],
  },
  {
    id: "res-002",
    title: "Econometric Analysis of Digital Currency Adoption in Sub-Saharan Africa",
    author: "Amina Yusuf, M.Sc.",
    authorRole: "Development Economist",
    institution: "Pan-Atlantic University",
    category: "Economics & Finance",
    academicLevel: "Masters Thesis",
    price: 25,
    pages: 112,
    citations: 28,
    rating: 4.8,
    downloads: 540,
    publishedDate: "Mar 2026",
    format: "PDF, STATA Do-Files & SPSS Dataset",
    fileSize: "8.2 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    abstract:
      "An empirical investigation leveraging Panel Vector Autoregression (PVAR) to measure the impact of mobile money and Central Bank Digital Currencies (CBDCs) on financial inclusion, inflation dynamics, and informal sector velocity across 14 West African nations.",
    methodology:
      "Secondary econometric modeling using 2012-2025 World Bank Global Findex data and central bank transaction registers analyzed via STATA 18.",
    keyFindings: [
      "10% increase in mobile money penetration drives a 2.4% increase in rural financial inclusion",
      "Identifies key liquidity threshold constraints in cross-border remittance corridors",
      "Provides complete STATA code files and cleaned 14-country macroeconomic panel dataset",
    ],
    tableOfContents: [
      "Chapter 1: Macroeconomic Context of Digital Payment Systems",
      "Chapter 2: Theoretical Framework & Financial Inclusion Metrics",
      "Chapter 3: Panel VAR Econometric Model",
      "Chapter 4: Regression Diagnostics & Policy Sensitivity Analysis",
      "Chapter 5: Conclusions & Policy Recommendations",
    ],
  },
  {
    id: "res-003",
    title: "Socio-Economic Impact Assessment Questionnaire & Data Collection Protocol",
    author: "Sterling Research Design Team",
    authorRole: "Methodology Specialists",
    institution: "Sterling Insight Institute",
    category: "Education & Social Sciences",
    academicLevel: "Questionnaire & Template",
    price: 0, // Free
    pages: 24,
    citations: 89,
    rating: 4.9,
    downloads: 1420,
    publishedDate: "Jan 2026",
    format: "DOCX, KoboToolbox XLSForm & SPSS Template",
    fileSize: "2.1 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    abstract:
      "A validated 45-item standardized research survey instrument designed for socio-economic baseline studies, community interventions, and agricultural impact evaluations. Includes Likert scales, reliability benchmarks (Cronbach Alpha = 0.88), and mobile survey deployment files.",
    methodology:
      "Constructed using Delphi expert panel validation across 3 iterative rounds and pre-tested with a pilot cohort of 250 respondents.",
    keyFindings: [
      "Pre-validated Likert constructs with Cronbach alpha > 0.85 across all sub-scales",
      "Ready-to-deploy XLSForm for digital data collection in KoboToolbox / ODK",
      "Includes complete SPSS variable coding dictionary and codebook",
    ],
    tableOfContents: [
      "Section A: Demographic & Household Characteristics",
      "Section B: Income, Asset Ownership & Financial Resilience",
      "Section C: Community Access & Service Satisfaction Scales",
      "Section D: Enumerator Field Manual & Sampling Guidelines",
    ],
  },
  {
    id: "res-004",
    title: "Machine Learning Models for Solar Irradiance Forecasting in Tropical Climates",
    author: "Engr. David Opara & Dr. Marcus Lin",
    authorRole: "Renewable Energy Systems Researcher",
    institution: "Federal University of Technology, Akure",
    category: "Environment & Climate",
    academicLevel: "PhD Dissertation",
    price: 30,
    pages: 165,
    citations: 34,
    rating: 4.7,
    downloads: 290,
    publishedDate: "Apr 2026",
    format: "PDF, Python Jupyter Notebooks & Hourly Solar CSV",
    fileSize: "24.1 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
    abstract:
      "Proposes an ensemble XGBoost-LSTM framework for short-term and ultra-short-term solar irradiance prediction using satellite imagery and microgrid sensors. Results demonstrate a 22% reduction in Mean Absolute Percentage Error (MAPE) under cloudy tropical weather regimes.",
    methodology:
      "Trained on 5 years of hourly solar radiation and meteorological station data using Python, TensorFlow, and Scikit-Learn.",
    keyFindings: [
      "MAPE reduced to 4.2% for 1-hour ahead solar energy generation forecasts",
      "Enables dynamic microgrid battery storage scheduling for commercial microgrids",
      "Includes 5-year high-resolution weather & solar irradiance CSV dataset",
    ],
    tableOfContents: [
      "Chapter 1: Solar Energy Variability in Equatorial West Africa",
      "Chapter 2: Machine Learning Methods for Time Series Forecasting",
      "Chapter 3: Hybrid LSTM-XGBoost Architecture & Hyperparameter Tuning",
      "Chapter 4: Microgrid Grid Simulation & Error Benchmark Analysis",
      "Chapter 5: Technical Recommendations for Solar Developers",
    ],
  },
  {
    id: "res-005",
    title: "AI-Driven Natural Language Processing for Automated Literature Matrix Generation",
    author: "Dr. Alexander Sterling & Team",
    authorRole: "AI Systems Chair",
    institution: "Sterling Academic AI Lab",
    category: "Data Science",
    academicLevel: "Masters Thesis",
    price: 20,
    pages: 98,
    citations: 51,
    rating: 5.0,
    downloads: 870,
    publishedDate: "Feb 2026",
    format: "PDF, Jupyter Notebook & Dataset",
    fileSize: "6.4 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    abstract:
      "An automated semantic extraction pipeline that digests 50+ academic PDF papers, synthesizes methodologies, sample sizes, and key conclusions into structured CSV/Excel literature review matrices using fine-tuned Llama and Gemini embedding pipelines.",
    methodology:
      "Fine-tuned transformer retrieval-augmented generation (RAG) system evaluated on 500 annotated systematic literature reviews.",
    keyFindings: [
      "Reduces literature review preparation time from weeks to under 15 minutes",
      "Extracts sample sizes, statistical tools, and p-values with 94% recall",
      "Includes open Python CLI tool and sample dataset of 1,000 processed paper summaries",
    ],
    tableOfContents: [
      "Chapter 1: The Challenge of Academic Literature Overload",
      "Chapter 2: Information Extraction & RAG Architecture",
      "Chapter 3: System Design & Fine-Tuning Execution",
      "Chapter 4: Accuracy Evaluation & Comparison with Human Reviewers",
      "Chapter 5: Deployment Guidelines & Open Source Code",
    ],
  },
  {
    id: "res-006",
    title: "National Academic Survey Dataset: Post-Graduate Research Challenges (2025-2026)",
    author: "Sterling Data Analytics Division",
    authorRole: "Data Operations Lead",
    institution: "Sterling Insight Limited",
    category: "Education & Social Sciences",
    academicLevel: "Dataset",
    price: 15,
    pages: 15,
    citations: 62,
    rating: 4.8,
    downloads: 610,
    publishedDate: "Jun 2026",
    format: "SPSS (.sav), Stata (.dta), CSV & Codebook PDF",
    fileSize: "12.8 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    abstract:
      "A cleaned, anonymized national dataset capturing survey responses from 3,850 postgraduate students across 28 African and European universities. Measures research funding availability, advisor interaction satisfaction, publication pressure, and statistical analysis hurdles.",
    methodology:
      "Stratified random sampling across Masters and PhD candidates with 95% confidence level and 2.5% margin of error.",
    keyFindings: [
      "68% of respondents report statistical software competence as their primary thesis bottleneck",
      "74% actively seek external expert research advisory services during proposal and data analysis stages",
      "Fully labeled SPSS and Stata files ready for univariate, bivariate, and multivariate analysis",
    ],
    tableOfContents: [
      "Data Codebook: Demographic Variables",
      "Data Codebook: Institutional & Funding Variables",
      "Data Codebook: Methodology & Data Analysis Barriers",
      "Sampling Methodology & Anonymization Protocol",
    ],
  },
];
