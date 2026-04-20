"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/ui/Button";

// ─── Reusable Section Header ─────────────────────────────────────────────
function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-[0.12em] mb-4">
        <span className="w-6 h-0.5 bg-primary rounded-full" />
        {tag}
      </div>
      <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-[-0.02em] mb-4">
        {title}
      </h2>
      <p className="text-muted-foreground text-[15px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────
function ProjectCard({
  title,
  description,
  tags,
  image,
  githubUrl,
  liveUrl,
  featured = false,
}: {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-neu-raised transition-all duration-300 hover:shadow-neu-raised-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
          Featured
        </div>
      )}

      {/* Image container */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={18} />
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN SECTION: Featured Projects
// ──────────────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const projects = [
    {
      title: "AI Analytics Dashboard",
      description: "Real-time analytics platform with AI-powered insights, serving 10k+ daily active users.",
      tags: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
      image: "/images/projects/project1.PNG",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured marketplace with real-time inventory, payments, and order tracking.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/images/projects/project2.jpg",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Portfolio CMS",
      description: "Headless CMS for creative professionals with drag-drop builder and SEO tools.",
      tags: ["Next.js", "Sanity", "Tailwind", "Vercel"],
      image: "/images/projects/project3.jpg",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: true,
    },
  ];

  return (
    <section className="w-full bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          tag="Portfolio"
          title="Featured Projects"
          description="Here are some of my best works. Each project represents a unique challenge solved with creativity and technical expertise."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right" className="rounded-full">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}