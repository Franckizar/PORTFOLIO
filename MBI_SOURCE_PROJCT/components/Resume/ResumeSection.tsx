"use client";

import ResumeHeader from "./ResumeHeader";
import ResumeExperience from "./ResumeExperience";
import ResumeEducation from "./ResumeEducation";
import ResumeSkills from "./ResumeSkills";
import ResumeCertifications from "./ResumeCertifications";

export default function ResumeSection() {
  return (
    <main>
      <ResumeHeader />
      <section className="w-full bg-background py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-8">
              <ResumeExperience />
              <ResumeEducation />
            </div>
            <div className="space-y-8">
              <ResumeSkills />
              <ResumeCertifications />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}