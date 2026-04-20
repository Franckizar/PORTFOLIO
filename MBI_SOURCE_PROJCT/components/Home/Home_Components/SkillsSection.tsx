"use client";

import { Code2, Sparkles, Zap, Shield, Rocket } from "lucide-react";

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

// ─── Skill Category ───────────────────────────────────────────────────────
function SkillCategory({
  title,
  skills,
  icon: Icon,
}: {
  title: string;
  skills: string[];
  icon: React.ElementType;
}) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-neu-raised-sm hover:shadow-neu-raised transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon size={16} className="text-primary" />
        </div>
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Value Prop Card ──────────────────────────────────────────────────────
function ValuePropCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 rounded-2xl bg-card shadow-neu-raised-sm hover:shadow-neu-raised transition-all duration-300 group">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN SECTION: Skills Grid
// ──────────────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
    },
    {
      title: "Backend",
      icon: Zap,
      skills: ["Node.js", "Spring Boot", "Python", "GraphQL", "REST APIs", "WebSockets"],
    },
    {
      title: "Database & DevOps",
      icon: Shield,
      skills: ["PostgreSQL", "MongoDB", "Docker", "AWS", "Vercel", "GitHub Actions"],
    },
    {
      title: "Tools & Others",
      icon: Sparkles,
      skills: ["Figma", "Jest", "Storybook", "Webpack", "Vite", "ESLint"],
    },
  ];

  const valueProps = [
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Agile methodology ensures quick iterations and on-time delivery.",
    },
    {
      icon: Shield,
      title: "Quality First",
      description: "Comprehensive testing and code reviews for robust applications.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized code that loads fast and ranks well on search engines.",
    },
  ];

  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          tag="Expertise"
          title="Skills & Technologies"
          description="I work with modern tools and frameworks to deliver cutting-edge solutions that stand the test of time."
        />

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} {...category} />
          ))}
        </div>

        {/* Value propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
          {valueProps.map((prop) => (
            <ValuePropCard key={prop.title} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}