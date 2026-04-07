import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudyProjects, getProjectBySlug } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudyProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Nir Moran`,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusColors: Record<string, string> = {
    "In Use": "bg-green-100 text-green-700",
    Demo: "bg-blue-100 text-blue-700",
    "Try It": "bg-purple-100 text-purple-700",
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-dark py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-playfair text-xl font-bold text-light tracking-tight"
          >
            Nir Moran
          </Link>
          <Link
            href="/#projects"
            className="text-sm text-light/70 hover:text-primary transition-colors"
          >
            ← All Projects
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div
        className="py-16 px-6"
        style={{ borderBottom: `4px solid ${project.color}` }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[project.status] ?? "bg-gray-100 text-gray-700"}`}
            >
              {project.status}
            </span>
            <span className="text-sm text-muted">{project.statusNote}</span>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-dark mb-3">
            {project.name}
          </h1>
          <p className="text-lg text-muted font-dm">{project.tagline}</p>
        </div>
      </div>

      {/* Body */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Overview */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-dark mb-4">
            Overview
          </h2>
          <p className="text-muted leading-relaxed">{project.description}</p>
        </section>

        {/* Stack */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-dark mb-4">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-sm bg-white border border-gray-200 text-dark px-3 py-1.5 rounded-lg shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-dark mb-4">
              The Challenge
            </h2>
            <p className="text-muted leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <h2 className="font-playfair text-2xl font-bold text-dark mb-4">
              The Solution
            </h2>
            <p className="text-muted leading-relaxed">{project.solution}</p>
          </div>
        </section>

        {/* Links */}
        {(project.links.demo || project.links.github) && (
          <section>
            <h2 className="font-playfair text-2xl font-bold text-dark mb-4">
              Links
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: project.color }}
                >
                  View Demo →
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-dark text-white text-sm font-medium transition-opacity hover:opacity-80"
                >
                  GitHub →
                </a>
              )}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/#projects"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            ← Back to all projects
          </Link>
        </div>
      </main>
    </div>
  );
}
