export const profile = {
  name: "Sharan Kumar Reddy",
  shortName: "Sharan",
  role: "Software Engineer",
  company: "Indpro",
  location: "Bengaluru, India",
  email: "reddysharankumar@gmail.com",
  github: "https://github.com/sharankumarreddyk",
  linkedin: "https://www.linkedin.com/in/k-sharan-kumar-reddy-01b93930b/",
  blurb:
    "I build product systems end-to-end — web, AI, infra — and ship them. Currently at Indpro, working across a portfolio of Swedish products: learning platforms, e-commerce, startup-ecosystem analytics, and sustainability APIs.",
  tagline: "Building software that ships.",
};

export type SkillGroup = {
  label: string;
  number: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    number: "01",
    label: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Svelte / SvelteKit",
      "Angular",
      "Ionic",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    number: "02",
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "Python",
      "FastAPI",
      "Django",
      "Directus",
      "REST · GraphQL",
    ],
  },
  {
    number: "03",
    label: "AI & Data",
    items: [
      "OpenAI",
      "Anthropic",
      "Ollama",
      "Semantic Kernel",
      "RAG pipelines",
      "Qdrant (vector DB)",
      "OCR (Tesseract / PaddleOCR)",
      "Embeddings",
    ],
  },
  {
    number: "04",
    label: "Data & Storage",
    items: ["PostgreSQL", "Supabase", "MongoDB", "Qdrant", "SQL & migrations"],
  },
  {
    number: "05",
    label: "DevOps & Cloud",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Linode",
      "Vercel",
      "Terraform",
      "GitHub Actions",
      "Sentry",
      "Playwright",
    ],
  },
];

export const marqueeStack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Svelte",
  "Node.js",
  "Express",
  "Directus",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Qdrant",
  "Docker",
  "Kubernetes",
  "AWS",
  "Linode",
  "Vercel",
  "OpenAI",
  "Anthropic",
  "RAG",
  "Tailwind",
  "GSAP",
];

export type ProgressionStep = {
  period: string;
  title: string;
  type: "Intern" | "Contract" | "Full-time";
  current?: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  points: string[];
  stat: { k: string; v: string };
  startISO?: string;
  progression?: ProgressionStep[];
};

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Indpro",
    period: "Oct 2024 — Present",
    location: "Bengaluru · for the Stockholm HQ",
    startISO: "2024-10-01",
    stat: { k: "50+", v: "PRs merged / month" },
    progression: [
      {
        period: "Oct '24 — Nov '24",
        title: "Full Stack Developer",
        type: "Intern",
      },
      {
        period: "Dec '24 — Feb '25",
        title: "Junior Software Developer",
        type: "Intern",
      },
      {
        period: "Mar '25 — Jun '25",
        title: "Junior Software Engineer",
        type: "Contract",
      },
      {
        period: "Jul '25 — Present",
        title: "Junior Software Engineer",
        type: "Full-time",
        current: true,
      },
    ],
    points: [
      "Ship across a multi-product portfolio: AI learning platform, startup-ecosystem analytics, e-commerce returns, sustainability APIs.",
      "Full-stack delivery in TypeScript + Python — React / Next.js / Svelte on the front, Node / FastAPI on the back, Postgres / Qdrant underneath.",
      "Own features end-to-end: design, backend, frontend, data, deploy — across 7+ repos in active rotation.",
    ],
  },
  {
    role: "BCA — Bachelor of Computer Applications",
    company: "MS Ramaiah College of Arts, Science and Commerce",
    period: "2022 — 2025",
    location: "Bengaluru",
    stat: { k: "3 yrs", v: "self-taught the modern stack" },
    points: [
      "Foundations in algorithms, OS, networks, databases, and software engineering.",
      "Self-directed deep dives into modern web, AI and infra outside the curriculum.",
    ],
  },
  {
    role: "MEC & CMA Foundation",
    company: "Master Minds",
    period: "2020 — 2022",
    location: "Pre-degree",
    stat: { k: "2022", v: "pivot: commerce → code" },
    points: ["Commerce & finance foundation before pivoting to software."],
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  url: string;
  cover:
    | "kubeai"
    | "restaurantos"
    | "aiskills"
    | "collegeerp"
    | "linkbuild"
    | "projects"
    | "gym";
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    name: "RestaurantOS",
    description:
      "Full-stack restaurant management system — orders, menu, kitchen, billing. Dockerised for one-command deploys.",
    tags: ["JavaScript", "Node.js", "Docker"],
    url: "https://github.com/sharankumarreddyk/RestaurantOS",
    cover: "restaurantos",
  },
  {
    name: "AI-Skills",
    description:
      "Personal lab for AI experiments — TypeScript & Python prototypes exploring agentic workflows and tooling patterns.",
    tags: ["Python", "TypeScript", "AI"],
    url: "https://github.com/sharankumarreddyk/AI-Skills",
    cover: "aiskills",
  },
  {
    name: "College-ERP",
    description:
      "End-to-end ERP for a college — students, faculty, attendance, results. JavaScript across the stack.",
    tags: ["JavaScript", "Full-stack"],
    url: "https://github.com/sharankumarreddyk/College-ERP",
    cover: "collegeerp",
  },
  {
    name: "Gym-website",
    description:
      "Marketing site for a fitness brand — Svelte + Tailwind & DaisyUI, with route-based sections, dark-mode toggle, and component primitives in a SvelteKit project.",
    tags: ["Svelte", "SvelteKit", "Tailwind", "DaisyUI"],
    url: "https://github.com/sharankumarreddyk/Gym-website",
    cover: "gym",
  },
];

export const navLinks = [
  { label: "Index", href: "#top", number: "00" },
  { label: "Work", href: "#work", number: "01" },
  { label: "Projects", href: "#projects", number: "02" },
  { label: "Skills", href: "#skills", number: "03" },
  { label: "Experience", href: "#experience", number: "04" },
  { label: "About", href: "#about", number: "05" },
  { label: "Contact", href: "#contact", number: "06" },
];
