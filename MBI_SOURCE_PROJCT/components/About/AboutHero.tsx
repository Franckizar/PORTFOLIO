"use client";

import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="w-full bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Photo */}
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-neu-raised">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Intro */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-[0.12em] mb-4">
              <span className="w-6 h-0.5 bg-primary rounded-full" />
              About Me
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-[-0.02em] mb-4">
              I'm Arthur Takam
            </h1>
            <p className="text-xl text-primary font-medium mb-4">
              Full-Stack Developer
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Based in Cameroon, building web applications that solve real problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}