"use client";

// import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

// ─── Stats Counter (animated) ─────────────────────────────────────────────
function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => {
      if (prev >= value) {
        clearInterval(interval);
        return value;
      }
      return prev + Math.ceil(value / 50);
    });
  }, 20);
  return () => clearInterval(interval);
}, [value]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-black text-primary">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-1">
        {label}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN SECTION: About
// ──────────────────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left side - Stats & visual */}
          <div className="flex-1">
            <div className="relative">
              {/* Decorative halftone */}
              <div className="absolute -top-10 -left-10 opacity-10 pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="20" cy="20" r="4" fill="var(--neu-primary)" />
                  <circle cx="35" cy="20" r="3.5" fill="var(--neu-primary)" />
                  <circle cx="50" cy="20" r="3" fill="var(--neu-primary)" />
                  <circle cx="20" cy="35" r="3.5" fill="var(--neu-primary)" />
                  <circle cx="35" cy="35" r="3" fill="var(--neu-primary)" />
                  <circle cx="50" cy="35" r="2.5" fill="var(--neu-primary)" />
                </svg>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-neu-raised relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Available for work
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  I turn complex problems into elegant solutions
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  With over 3 years of experience in full-stack development, 
                  I specialize in building fast, scalable web applications that 
                  users love. My approach combines clean architecture with 
                  performance-first thinking.
                </p>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
                  <StatCounter value={50} label="Projects" suffix="+" />
                  <StatCounter value={3} label="Years" suffix="+" />
                  <StatCounter value={24} label="Clients" suffix="+" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Philosophy */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-[0.12em] mb-4">
                <span className="w-6 h-0.5 bg-primary rounded-full" />
                My Philosophy
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-[-0.02em] mb-4">
                Code that performs.
                <br />
                Design that delights.
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                I believe great software sits at the intersection of technical 
                excellence and human experience. Every line of code I write is 
                intentional — balancing performance, accessibility, and 
                maintainability.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { text: "Performance-first architecture" },
                { text: "Accessible by default" },
                { text: "Clean, maintainable code" },
                { text: "Continuous learning & improvement" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}