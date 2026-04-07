"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  ShieldCheck,
  Sun,
  Wallet,
  HeartPulse,
  ScanLine,
  Gamepad2,
  Bot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  ShieldCheck,
  Sun,
  Wallet,
  HeartPulse,
  ScanLine,
  Gamepad2,
  Bot,
};

const projects = [
  {
    icon: "UtensilsCrossed",
    name: "ShamenzEat",
    tagline: "Bilingual Family Recipe Library",
    description:
      "Built for my family to collect and share heritage recipes. Hebrew and English, AI-powered recipe import, family sharing.",
    tech: ["Next.js", "Supabase", "Claude API", "Vercel"],
    link: "https://shamenz-eat.vercel.app",
    color: "#E85D26",
    inUse: false,
  },
  {
    icon: "Gamepad2",
    name: "Hebrew Games Portal",
    tagline: "7 Educational Games in Hebrew",
    description: "A collection of interactive Hebrew-language games built with AI — vocabulary, memory, trivia, and more. All playable in the browser.",
    tech: ["Next.js", "Claude API", "Vercel"],
    link: "/games",
    color: "#7C3AED",
    inUse: false,
  },
  {
    icon: "ShieldCheck",
    name: "Plugat Sheli",
    tagline: "IDF Reserve Platoon Manager",
    description:
      "Built for my reserve unit — personnel tracking, scheduling, operational readiness. Has role-based access and 25 secured API routes.",
    tech: ["Next.js 16", "Prisma", "PostgreSQL", "NextAuth"],
    link: "https://plugat-sheli.vercel.app",
    color: "#2D7D46",
    inUse: false,
  },
  {
    icon: "Sun",
    name: "Sol Israel",
    tagline: "Issue & Shortage Reporter",
    description:
      "A concept app for reporting local issues and shortages. Built on Base44's AI platform.",
    tech: ["Base44", "No-Code AI"],
    link: "https://app-6ff33b95.base44.app",
    color: "#4361EE",
    inUse: false,
  },
  {
    icon: "Wallet",
    name: "Split Ease",
    tagline: "Smart Expense Splitter",
    description:
      "Expense splitting for groups — clean interface, instant calculations, Hebrew-first. My sisters actually use this one.",
    tech: ["Base44", "Natural Language"],
    link: "https://split-ease-a6de60aa.base44.app",
    color: "#8B5CF6",
    inUse: true,
  },
  {
    icon: "HeartPulse",
    name: "Medicine Tracker",
    tagline: "Family Health Assistant",
    description:
      "Built for my parents to track medications, dosages, schedules, and refills. My parents use this daily.",
    tech: ["AI-Built", "Health"],
    link: null,
    color: "#0EA5E9",
    inUse: true,
  },
  {
    icon: "ScanLine",
    name: "Receipt Scanner",
    tagline: "Smart Grocery Manager",
    description:
      "A proof of concept — scans receipts, extracts purchase data, builds custom grocery lists with AI OCR.",
    tech: ["AI-Built", "OCR"],
    link: null,
    color: "#D946EF",
    inUse: false,
  },
  {
    icon: "Gamepad2",
    name: "Pudgy Pals",
    tagline: "Fun Game",
    description:
      "A playful game with bear characters — because building should also be fun.",
    tech: ["AI-Built", "Vercel"],
    link: "https://pudgy-pals.vercel.app",
    color: "#F59E0B",
    inUse: false,
  },
  {
    icon: "Bot",
    name: "Bob — AI Agent",
    tagline: "Personal Assistant",
    description:
      "Scheduled AI agent runs twice daily — syncs projects, teaches marketing, sends action items.",
    tech: ["Claude Desktop", "Scheduled Tasks", "Gmail API"],
    link: null,
    color: "#06B6D4",
    inUse: false,
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      className="rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 fade-up h-full"
      style={{
        borderLeft: hovered
          ? `3px solid ${project.color}`
          : "3px solid transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${project.color}1A` }}
        >
          {(() => {
            const Icon = iconMap[project.icon];
            return Icon ? (
              <Icon size={24} strokeWidth={2} style={{ color: project.color }} />
            ) : null;
          })()}
        </div>
        {project.inUse && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            In Use
          </span>
        )}
      </div>

      <h3 className="font-bold text-lg mt-4 text-dark">{project.name}</h3>
      <p className="text-muted text-sm">{project.tagline}</p>
      <p className="text-sm text-muted mt-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>

    </div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function Projects() {
  return (
    <section id="projects" className="bg-light py-24">
      <div className="text-center mb-16 px-4">
        <p className="uppercase tracking-widest text-sm text-muted mb-4 font-dm">
          What I&apos;ve Built
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-dark">
          9 Projects.
        </h2>
        <p className="text-muted text-lg mt-4 font-dm">
          Some are used daily, some are experiments. All of them work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
