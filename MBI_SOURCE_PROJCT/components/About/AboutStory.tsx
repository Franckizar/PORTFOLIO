"use client";

import { Code2, Rocket, Heart } from "lucide-react";

export default function AboutStory() {
  return (
    <section className="w-full bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
          My Journey
        </h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I started coding at 16, fascinated by how a few lines of code could 
            create something visible and interactive. What began as curiosity 
            quickly became passion.
          </p>
          <p>
            After completing my degree in Computer Science, I dove deep into 
            full-stack development, mastering both frontend aesthetics and 
            backend architecture. I've worked with startups, agencies, and 
            directly with clients to bring ideas to life.
          </p>
          <p>
            Today, I focus on building fast, accessible web applications with 
            modern technologies like Next.js, React, and Spring Boot. I believe 
            great software isn't just functional—it's a pleasure to use.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { icon: Code2, title: "3+ Years", description: "Professional experience" },
            { icon: Rocket, title: "50+ Projects", description: "Delivered successfully" },
            { icon: Heart, title: "100% Passion", description: "For what I do" },
          ].map((item) => (
            <div key={item.title} className="text-center p-4">
              <item.icon size={32} className="text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}