"use client";

export default function ResumeSkills() {
  const skillCategories = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "Spring Boot", "Python", "GraphQL", "REST APIs"],
    },
    {
      name: "Database",
      skills: ["PostgreSQL", "MongoDB", "Prisma", "TypeORM"],
    },
    {
      name: "DevOps & Tools",
      skills: ["Docker", "Git", "Vercel", "AWS", "GitHub Actions"],
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
        <span className="w-8 h-px bg-primary" />
        Technical Skills
      </h2>
      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.name} className="p-4 rounded-xl bg-card shadow-neu-raised-sm">
            <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}