"use client";

export default function ResumeEducation() {
  const education = [
    {
      degree: "Bachelor's in Computer Science",
      school: "University of Douala",
      period: "2019 - 2022",
      description: "Specialized in Software Engineering and Web Development",
    },
    {
      degree: "Full-Stack Certification",
      school: "Online Bootcamp",
      period: "2021",
      description: "Completed intensive program in MERN stack",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
        <span className="w-8 h-px bg-primary" />
        Education
      </h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="p-5 rounded-xl bg-card shadow-neu-raised-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="font-bold text-foreground">{edu.degree}</h3>
                <p className="text-sm text-primary">{edu.school}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 sm:mt-0">{edu.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}