// Single source of truth for page content. Every fact comes from the master CV.
export const PROFILE = {
  name: "Shrikant Dubale",
  first: "Shrikant",
  initials: "SD",
  role: "AI Engineer",
  tagline: "LLM & agentic systems · Backend engineer",
  email: "shrikantd.jobs@gmail.com",
  location: "Germany · Munich-flexible / remote-friendly",
  summary:
    "AI Engineer with 10+ years of software development experience, specializing in LLM-powered backend systems, AI agent workflows, and Retrieval-Augmented Generation (RAG) pipelines. Builds production-ready GenAI services, end-to-end agent orchestration (LangChain, LangGraph, CrewAI), vector search, prompt engineering, and cloud deployment (AWS, Azure).",
  extra: "Strong RESTful API and microservices background with a track record of shipping AI services from PoC to production and ramping quickly on new stacks.",
  github: "https://github.com/shrikant-d",
  linkedin: "https://www.linkedin.com/in/shrikant-dubale/",
  quote: "I ship AI services from proof of concept to production, and ramp up fast on new stacks.",
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export type Family = "AI & Agents" | "Backend" | "Languages" | "Robotics" | "Cloud & DevOps" | "Databases" | "Practices";
export const FAMILIES: Family[] = ["AI & Agents", "Backend", "Languages", "Robotics", "Cloud & DevOps", "Databases", "Practices"];

// [name, family, symbol]
const S: [string, Family, string][] = [
  ["LangChain", "AI & Agents", "Lc"], ["LangGraph", "AI & Agents", "Lg"], ["CrewAI", "AI & Agents", "Cr"],
  ["OpenAI API", "AI & Agents", "Oa"], ["Hugging Face", "AI & Agents", "Hf"], ["RAG", "AI & Agents", "Rg"],
  ["Vector databases", "AI & Agents", "Vd"], ["Prompt engineering", "AI & Agents", "Pe"],
  ["Agent tool integration", "AI & Agents", "At"], ["Self-correction loops", "AI & Agents", "Sc"],
  ["REST APIs", "Backend", "Re"], ["Microservices", "Backend", "Ms"], ["FastAPI", "Backend", "Fa"],
  ["Flask", "Backend", "Fl"], ["Django", "Backend", "Dj"], [".NET", "Backend", "Nt"],
  ["Python", "Languages", "Py"], ["Java", "Languages", "Ja"], ["JavaScript", "Languages", "Js"],
  ["C / C++", "Languages", "Cc"], ["C#", "Languages", "Cs"], ["Shell", "Languages", "Sh"],
  ["ROS 2", "Robotics", "Ro"], ["Nav2", "Robotics", "Nv"], ["SLAM", "Robotics", "Sl"],
  ["Gazebo", "Robotics", "Gz"], ["YOLO", "Robotics", "Yo"],
  ["AWS", "Cloud & DevOps", "Aw"], ["Azure", "Cloud & DevOps", "Az"], ["Docker", "Cloud & DevOps", "Dk"],
  ["Kubernetes", "Cloud & DevOps", "K8"], ["GitHub Actions", "Cloud & DevOps", "Ga"], ["Jenkins", "Cloud & DevOps", "Jk"],
  ["PostgreSQL", "Databases", "Pg"], ["MongoDB", "Databases", "Mg"], ["Redis", "Databases", "Rd"],
  ["Oracle PL/SQL", "Databases", "Or"], ["SQLite", "Databases", "Sq"],
  ["Agile / Scrum", "Practices", "Ag"], ["MLflow", "Practices", "Ml"],
];
export const SKILLS = S.map(([name, family, symbol], i) => ({ name, family, symbol, n: i + 1 }));

export type Project = {
  id: string; index: string; kicker: string; title: string; description: string;
  features: string[]; tech: string[]; ui: "sql" | "code" | "search" | "robot" | "model";
};
export const PROJECTS: Project[] = [
  {
    id: "rag-db", index: "01", kicker: "M.Sc. thesis", title: "Extending RAG to Databases",
    description: "An agentic pipeline for RAG on databases. I benchmarked five schema-grounding setups for text-to-SQL on Chinook, TPC-H and Spider with Gemma, Claude Haiku and Qwen.",
    features: ["Vector retrieval", "Schema stuffing", "Self-selection", "LangGraph agents, with and without a join graph", "Result-grounded hallucination check with an LLM judge", "Self-correction loop that repairs failed SQL from database errors"],
    tech: ["LangGraph", "RAG", "Vector databases", "Self-correction loops"], ui: "sql",
  },
  {
    id: "jivs", index: "02", kicker: "JiVS Hackathon 2025 · 1st place", title: "Legacy code modernization",
    description: "An LLM agent pipeline for legacy code modernization that automates code generation and converts enterprise application screenshots into maintainable source code.",
    features: ["LLM agent pipeline", "Automated code generation", "Screenshot-to-source conversion", "Maintainable output"],
    tech: ["Agent tool integration", "Prompt engineering"], ui: "code",
  },
  {
    id: "bmw", index: "03", kicker: "BMW Innovation Day · May 2024", title: "Multilingual knowledge base",
    description: "A multilingual RAG knowledge base built on vector embeddings and LLMs across 8+ languages. The AI-powered search cut internal maintenance time by 10M+ minutes annually.",
    features: ["8+ languages", "Vector embeddings", "AI-powered search", "10M+ minutes saved a year"],
    tech: ["RAG", "Vector databases", "Prompt engineering"], ui: "search",
  },
  {
    id: "robot", index: "04", kicker: "Robotics", title: "Indoor delivery robot",
    description: "ROS 2 autonomous navigation and object detection. A simulated mobile robot in Gazebo navigates through obstacles on its own, using SLAM for mapping and localization and Nav2 for path planning.",
    features: ["SLAM mapping and localization", "Nav2 planning and obstacle avoidance", "YOLO object detection", "ROS 2 nodes in C++ and Python"],
    tech: ["ROS 2", "Nav2", "SLAM", "Gazebo", "YOLO", "C / C++", "Python"], ui: "robot",
  },
  {
    id: "fraud", index: "05", kicker: "Machine learning", title: "Explainable fraud detection",
    description: "An Explainable AI fraud detection model that reaches 94% accuracy using XGBoost and LIME.",
    features: ["XGBoost classifier", "LIME explanations", "94% accuracy"],
    tech: ["Python"], ui: "model",
  },
];

export type Stop = { when: string; year: string; title: string; place: string; detail: string };
export const PATH: Stop[] = [
  { year: "2014", when: "Jul 2014 – Feb 2017", title: "Senior Programmer Analyst", place: "Accelya · India", detail: "Improved database performance by 30% through query indexing and restructuring, automated workflows with shell scripts (−40% manual effort) and built a Redis caching layer that cut data processing time by 60%." },
  { year: "2017", when: "Feb 2017 – Dec 2021", title: "Software Development Specialist", place: "Amdocs · India", detail: "Migrated modules to microservices, cut REST API load times by 40% and integrated multi-payment gateways with full PCI DSS compliance." },
  { year: "2022", when: "Apr 2022 – present", title: "M.Sc. Computer and Systems Engineering", place: "Technical University of Ilmenau", detail: "Research thesis: Extending RAG to Databases, an agentic pipeline for RAG on databases." },
  { year: "2022", when: "Mar 2022 – Jul 2023", title: "Software Developer", place: "Amdocs · Germany", detail: "Led architecture and deployment of REST APIs in C# at 99% uptime, added MongoDB caching (−30% latency) and mentored an 8-member Agile team (+40% delivery productivity)." },
  { year: "2023", when: "Sep 2023 – May 2024", title: "Engineering Intern", place: "Actian · Ilmenau, Germany", detail: "Designed a distributed query architecture for Apache Iceberg (−35% retrieval latency) and built a C/Java query engine that handles 100,000 records in 600 ms." },
  { year: "2024", when: "Sep 2024 – present", title: "Working Student", place: "Adtran · Meiningen, Germany", detail: "Automated infrastructure monitoring test suites with Robot Framework and built NETCONF/SNMP-based test coverage for OTDR, DPA and PES telemetry measurements." },
];

export const ACHIEVEMENTS = [
  { mark: "JiVS", value: 1, suffix: "st", label: "Hackathon place", caption: "JiVS Hackathon 2025", detail: "LLM agent pipeline for legacy code modernization" },
  { mark: "BMW", value: 10, suffix: "M+", label: "Minutes saved a year", caption: "BMW Innovation Day", detail: "Multilingual RAG knowledge base, 8+ languages" },
  { mark: "XAI", value: 94, suffix: "%", label: "Fraud detection accuracy", caption: "Explainable AI", detail: "XGBoost with LIME explanations" },
  { mark: "Actian", value: 35, suffix: "%", label: "Lower retrieval latency", caption: "Apache Iceberg", detail: "Distributed query architecture with optimized indexing" },
  { mark: "Query", value: 600, suffix: " ms", label: "For 100,000 records", caption: "Custom query engine", detail: "Real-time analytical processing in C and Java" },
  { mark: "Amdocs", value: 40, suffix: "%", label: "Delivery productivity", caption: "8-member Agile team", detail: "Managed and mentored the team" },
];

export const FACTS = [
  ["Based", "Germany, Munich-flexible"],
  ["Studying", "M.Sc., TU Ilmenau"],
  ["Now", "Working student, Adtran"],
  ["Email", PROFILE.email],
];
