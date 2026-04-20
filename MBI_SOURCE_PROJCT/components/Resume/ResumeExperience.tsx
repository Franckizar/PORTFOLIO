"use client";

export default function ResumeExperience() {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "Freelance",
      period: "2023 - Present",
      description: [
        "Build full-stack web applications for clients worldwide",
        "Specialize in Next.js, React, and Spring Boot",
        "Deliver 10+ projects with 100% client satisfaction",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Tech Startup",
      period: "2022 - 2023",
      description: [
        "Led frontend development for SaaS product",
        "Improved performance by 40%",
        "Mentored 2 junior developers",
      ],
    },
    {
      title: "Junior Developer",
      company: "Digital Agency",
      period: "2021 - 2022",
      description: [
        "Built responsive websites for clients",
        "Collaborated with design team",
        "Maintained and updated existing projects",
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
        <span className="w-8 h-px bg-primary" />
        Work Experience
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="p-5 rounded-xl bg-card shadow-neu-raised-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <div>
                <h3 className="font-bold text-foreground">{exp.title}</h3>
                <p className="text-sm text-primary">{exp.company}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 sm:mt-0">{exp.period}</span>
            </div>
            <ul className="space-y-1 mt-3">
              {exp.description.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}