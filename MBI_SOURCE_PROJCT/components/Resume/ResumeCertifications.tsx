"use client";

import { Award } from "lucide-react";

export default function ResumeCertifications() {
  const certifications = [
    { name: "AWS Certified Developer", issuer: "Amazon", year: "2023" },
    { name: "Next.js Mastery", issuer: "Vercel", year: "2023" },
    { name: "React Advanced", issuer: "Meta", year: "2022" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
        <span className="w-8 h-px bg-primary" />
        Certifications
      </h2>
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.name} className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-neu-raised-sm">
            <Award size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground text-sm">{cert.name}</p>
              <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}