"use client";

import Link from "next/link";
import { Button } from "@/components/ui/ui/Button";
import { Home, ArrowLeft, Search, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, var(--neu-primary)/0.08 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Halftone dots decoration */}
      <div className="absolute top-20 right-20 opacity-[0.03] pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <defs>
            <pattern id="notfound-dots" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="2" fill="var(--neu-primary)" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#notfound-dots)" />
        </svg>
      </div>

      {/* Wave lines decoration */}
      <div className="absolute bottom-0 left-0 opacity-[0.05] pointer-events-none">
        <svg width="400" height="150" viewBox="0 0 400 150">
          <path
            d="M0 100 Q100 50 200 100 T400 100"
            fill="none"
            stroke="var(--neu-primary)"
            strokeWidth="3"
          />
          <path
            d="M0 120 Q100 70 200 120 T400 120"
            fill="none"
            stroke="var(--neu-primary)"
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d="M0 140 Q100 90 200 140 T400 140"
            fill="none"
            stroke="var(--neu-primary)"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full border-2 border-primary/10 animate-float" />
      <div className="absolute bottom-1/3 right-10 w-12 h-12 rounded-lg border-2 border-primary/10 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-2/3 left-1/4 w-8 h-8 rounded-full bg-primary/5 animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number with glow */}
          <div className="relative mb-8">
            <div className="text-[120px] md:text-[180px] font-black text-foreground tracking-[-0.05em] leading-none">
              4
              <span className="text-primary relative inline-block animate-bounce-subtle">
                0
                <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full -z-10" />
              </span>
              4
            </div>
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            </div>
          </div>

          {/* Error message */}
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-[0.12em] mb-4">
            <span className="w-6 h-0.5 bg-primary rounded-full" />
            Page Not Found
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-[-0.02em] mb-4">
            Oops! You've wandered off course
          </h1>
          
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to where you belong.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button variant="primary" size="lg" icon={Home} iconPosition="right" className="rounded-full w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" size="lg" icon={Search} iconPosition="right" className="rounded-full w-full sm:w-auto">
                Browse Projects
              </Button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground mb-4">
              Or try one of these popular pages:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { name: "About Me", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Contact", href: "/contact" },
                { name: "Resume", href: "/resume" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Powered by */}
          <div className="mt-8 pt-4">
            <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
              <span>Lost?</span>
              <Zap size={8} className="text-primary" />
              <span>Let me guide you home</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button (floating) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-neu-raised hover:shadow-neu-raised-lg transition-all duration-300 hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <ArrowLeft size={18} className="text-primary rotate-90" />
      </button>
    </section>
  );
}