"use client";

export default function AboutTimeline() {
  const timeline = [
    {
      year: "2023 - Present",
      title: "Senior Full-Stack Developer",
      company: "Freelance",
      description: "Building web applications for clients worldwide.",
    },
    {
      year: "2022 - 2023",
      title: "Frontend Developer",
      company: "Tech Startup",
      description: "Led frontend development for SaaS product.",
    },
    {
      year: "2021 - 2022",
      title: "Junior Developer",
      company: "Digital Agency",
      description: "Built client websites and internal tools.",
    },
    {
      year: "2020 - 2021",
      title: "Intern",
      company: "Software Company",
      description: "Learned full-stack development fundamentals.",
    },
  ];

  return (
    <section className="w-full bg-card py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
          Experience Timeline
        </h2>
        <div className="max-w-3xl mx-auto">
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
              <div className="text-sm text-primary font-semibold mb-1">{item.year}</div>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}