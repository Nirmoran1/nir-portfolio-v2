export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "In Use" | "Demo" | "Try It";
  statusNote: string;
  links: {
    demo?: string;
    github?: string;
  };
  challenge: string;
  solution: string;
  color: string;
};

export const caseStudyProjects: Project[] = [
  {
    slug: "shamenz-eat",
    name: "ShamenzEat",
    tagline: "Bilingual Family Recipe Library",
    description:
      "A personal recipe app built so my family could stop losing heritage recipes in WhatsApp chats. Supports Hebrew and English, lets family members import recipes from any URL with AI, and keeps everything organized in one place. Used daily by family.",
    stack: ["Next.js", "Supabase", "Claude API", "Vercel"],
    status: "In Use",
    statusNote: "Used daily by family",
    links: {
      demo: "https://shamenz-eat.vercel.app",
    },
    challenge:
      "Family recipes were scattered across WhatsApp messages, phone photos, and handwritten notes — impossible to search, easy to lose, and impossible to share with relatives who read Hebrew.",
    solution:
      "Built a bilingual app with AI-powered recipe import: paste any URL or describe a dish and Claude extracts the ingredients, steps, and metadata automatically. Family members can browse by language, cuisine, or who submitted it.",
    color: "#E85D26",
  },
  {
    slug: "plugat-sheli",
    name: "Plugat Sheli",
    tagline: "IDF Reserve Platoon Manager",
    description:
      "A reserve unit management tool built as a functional demo. Handles personnel tracking, scheduling, and operational readiness with role-based access and 25 secured API routes. Built as a demo to show what a real system could look like — not adopted by the IDF.",
    stack: ["Next.js 16", "Prisma", "PostgreSQL", "NextAuth"],
    status: "Demo",
    statusNote: "Built as functional demo",
    links: {
      demo: "https://plugat-sheli.vercel.app",
    },
    challenge:
      "Reserve unit coordination in Israel relies heavily on WhatsApp and spreadsheets — no central system, no role-based permissions, and no way to track readiness across dozens of personnel.",
    solution:
      "Designed and built a full-stack web app with auth, role permissions (commander vs. soldier views), personnel records, and scheduling. 25 secured API routes cover every core operation a unit commander would need.",
    color: "#2D7D46",
  },
  {
    slug: "split-ease",
    name: "Split Ease",
    tagline: "Smart Expense Splitter",
    description:
      "An expense splitting app for groups — clean interface, instant calculations, Hebrew-first design. Built for my sisters who needed a simple way to split shared costs without the complexity of apps like Splitwise. They use it regularly.",
    stack: ["Base44", "Natural Language"],
    status: "In Use",
    statusNote: "Used by Nir's sisters",
    links: {
      demo: "https://split-ease-a6de60aa.base44.app",
    },
    challenge:
      "Existing expense-splitting apps are feature-heavy and confusing for non-tech users. My sisters needed something simple, in Hebrew, and fast to use on mobile.",
    solution:
      "Built with Base44's AI platform using natural language requirements. The result is a minimal, focused tool — enter expenses, select who owes what, get clear totals. No account required, works on mobile.",
    color: "#8B5CF6",
  },
  {
    slug: "medicine-tracker",
    name: "Medicine Tracker",
    tagline: "Family Health Assistant",
    description:
      "A medication management app built specifically for my parents. Tracks prescriptions, dosages, schedules, and refill dates in one place. My parents use it daily to manage multiple medications without missing doses or mixing up timing.",
    stack: ["AI-Built", "Health"],
    status: "In Use",
    statusNote: "Used by Nir's parents",
    links: {},
    challenge:
      "My parents manage several medications with different dosages and schedules. Keeping track with paper or phone notes led to missed doses and confusion about what had been taken.",
    solution:
      "Built a simple tracker with medication records, daily schedule view, and reminder logic. Designed with large text and minimal UI so it works for older users who aren't comfortable with complex apps.",
    color: "#0EA5E9",
  },
  {
    slug: "sol-israel",
    name: "Sol Israel",
    tagline: "Issue & Shortage Reporter",
    description:
      "A concept app for reporting local issues and shortages in Israel. Users can submit reports about neighborhood problems, supply shortages, or infrastructure issues. Built on Base44's AI platform as a civic-tech demo.",
    stack: ["Base44", "No-Code AI"],
    status: "Try It",
    statusNote: "Built as functional demo",
    links: {
      demo: "https://app-6ff33b95.base44.app",
    },
    challenge:
      "Local residents in Israel often have no easy way to report non-emergency issues like potholes, broken lights, or supply shortages. WhatsApp neighborhood groups are noisy and unstructured.",
    solution:
      "Created a simple reporting interface where users submit issues with a category, description, and optional photo. Built as a proof of concept using Base44's AI-first platform — the entire app was built through natural language prompting.",
    color: "#4361EE",
  },
  {
    slug: "receipt-scanner",
    name: "Receipt Scanner",
    tagline: "Smart Grocery Manager",
    description:
      "A proof of concept that scans grocery receipts and extracts purchase data using AI OCR. Builds a running list of what you buy, identifies patterns, and can suggest future shopping lists. Explores what AI-powered household data could look like.",
    stack: ["AI-Built", "OCR"],
    status: "Try It",
    statusNote: "Built as functional demo",
    links: {},
    challenge:
      "Most people throw away grocery receipts and lose track of spending patterns, frequently bought items, and price changes over time. Re-entering data manually is tedious.",
    solution:
      "Built an AI-powered scanner that takes a photo of a receipt and uses OCR to extract store name, items, prices, and date. Data is stored and aggregated to show spending trends and auto-generate future shopping lists.",
    color: "#D946EF",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return caseStudyProjects.find((p) => p.slug === slug);
}
