// ─────────────────────────────────────────────────────────────
//  PORTFOLIO DATA — edit everything here.
//  Replace the placeholder links/handles with your real ones.
// ─────────────────────────────────────────────────────────────

export const BRAND = "Yashfolio";

export const PROFILE = {
  name: "Yash Gaikwad",
  monogram: "Y·G",
  role: "Software Developer",
  tagline: "MERN · Python · Docker · Linux",
  email: "yashgaikwad2311@gmail.com",
  github: "https://github.com/Blank-nirl",
  linkedin: "#",
  instagram: "https://www.instagram.com/yash_irl23",
};

export const CONTACT_LINKS = [
  {
    label: "Gmail",
    handle: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    label: "GitHub",
    handle: "github.com/Blank-nirl",
    href: PROFILE.github,
  },
  {
    label: "LinkedIn",
    handle: "coming soon",
    href: "#",
    disabled: true,
  },
  {
    label: "Instagram",
    handle: "@yash_irl23",
    href: PROFILE.instagram,
  },
];

// Lines of the handwritten letter, typed out one by one.
export const ABOUT_LINES = [
  "Dear reader — I'm Yash Gaikwad, and I believe good software should feel like a well-bound book: sturdy, honest, and a pleasure to open.",
  "My craft is the MERN stack — React frontends that feel alive, Node.js backends that stay calm under load, and MongoDB schemas that keep their promises.",
  "Python handles my automation and data work, Docker keeps every environment reproducible, and Linux is the terminal I call home.",
  "Whether you need a landing page or a long-running platform, I like clean structure, quiet code, and shipping things that work — let's write the next chapter together.",
];

export const SKILLS = [
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", slug: "css3" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Express", slug: "express" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Python", slug: "python" },
  { name: "Docker", slug: "docker" },
  { name: "Linux", slug: "linux" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
];

export const PROJECTS = [
  {
    title: "PyClimaExplorer v2",
    tagline: "CESM climate data analytics & AI",
    description:
      "CESM climate data visualization & analytics platform built for Technex '26 at IIT (BHU) Varanasi. Features 3D climate trend diffing, Groq AI assistant (LLaMA 3.3 70B), and graph explainability.",
    tech: ["Python", "FastAPI", "React", "Groq AI"],
    link: "https://github.com/Prof-Noobs/Hack-it-Outd1",
  },
  {
    title: "Ecothon",
    tagline: "sustainability & eco-hackathon platform",
    description:
      "Eco-tech prototype developed for round-2 of the Eco-Hackathon. Focuses on environmental tracking, sustainable practice metrics, and green tech solutions.",
    tech: ["React", "Python", "JavaScript", "CSS3"],
    link: "https://github.com/Prof-Noobs/Ecothon",
  },
  {
    title: "CreditBridge",
    tagline: "trusted MSME credit intelligence",
    description:
      "Premium MSME credit intelligence platform featuring a Next.js App Router frontend, Node.js/Express backend anchored to a simulated blockchain ledger, and a Python FastAPI ML scoring engine with SHAP explainability.",
    tech: ["Next.js", "Node.js", "FastAPI", "Python", "Prisma"],
    link: "https://github.com/sscodings/Hack2Skill",
  },
];

export const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export function roman(num: number): string {
  return ROMAN[num - 1] ?? String(num);
}
