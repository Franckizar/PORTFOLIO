"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/ui/Button";
// import { Button } from "@/components/ui/Button";

// ─── Halftone Dots — uses CSS var so it flips with dark mode ─────────────────
function HalftoneDots({
  fill = "var(--neu-primary)",
  size = 120,
  className = "",
}: {
  fill?: string;
  size?: number;
  className?: string;
}) {
  const dots = [];
  const spacing = 12;
  for (let r = 0; r < Math.ceil(size / spacing); r++) {
    for (let c = 0; c < Math.ceil(size / spacing); c++) {
      const x = c * spacing;
      const y = r * spacing;
      const dist = Math.sqrt((x - size / 2) ** 2 + (y - size / 2) ** 2);
      const maxDist = size * 0.5;
      const radius = Math.max(0.5, 3.5 * (1 - dist / maxDist));
      if (dist < maxDist) {
        dots.push(
          <circle key={`${r}-${c}`} cx={x} cy={y} r={radius} fill={fill} />
        );
      }
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

// ─── Wave lines ───────────────────────────────────────────────────────────────
function WaveLines({
  stroke = "var(--neu-primary)",
  className = "",
}: {
  stroke?: string;
  className?: string;
}) {
  return (
    <svg
      width="80"
      height="40"
      viewBox="0 0 80 40"
      className={className}
      aria-hidden="true"
    >
      {[0, 12, 24].map((y, i) => (
        <path
          key={i}
          d={`M0 ${y + 6} Q20 ${y} 40 ${y + 6} Q60 ${y + 12} 80 ${y + 6}`}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.4 - i * 0.08}
        />
      ))}
    </svg>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-black text-primary leading-none">{value}</div>
      <div className="text-[11px] text-muted-foreground font-medium tracking-[0.05em] uppercase mt-0.5">
        {label}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    /*
      No paddingTop here — the header's own <div className="h-16"> spacer
      already handles the offset. Adding padding here was the extra space.
    */
    <section className="
      w-full bg-background
      min-h-[calc(100vh-64px)]
      flex
    ">
      {/* Navy left accent strip */}
      <div className="w-1.5 shrink-0 bg-foreground opacity-80" />

      <div className="flex flex-1 min-h-full">

        {/* ── Left panel ─────────────────────────────────────────────────── */}
        <div className="
          flex-[0_0_52%] relative
          flex flex-col justify-center
          px-14 py-16
          bg-card
        ">
          {/* Halftone top-right decoration */}
          <div className="absolute top-0 right-4 opacity-[0.18] pointer-events-none">
            <HalftoneDots fill="var(--neu-error)" size={110} />
          </div>

          {/* Wave bottom-left decoration */}
          <div className="absolute bottom-7 left-8 pointer-events-none">
            <WaveLines />
          </div>

          {/* Tag */}
          <div className="
            inline-flex items-center gap-2
            text-[11px] font-semibold text-primary
            uppercase tracking-[0.12em] mb-4
          ">
            <span className="w-6 h-0.5 bg-primary rounded-full" />
            Full-Stack Developer
          </div>

          {/* Headline */}
          <h1 className="
            text-[clamp(2.4rem,4.5vw,3.5rem)]
            font-black text-foreground
            leading-[1.12] tracking-[-0.02em]
            mb-5
          ">
            Crafting digital
            <br />
            experiences that
            <br />
            <span className="text-primary">inspire & convert</span>
          </h1>

          {/* Sub */}
          <p className="
            text-[15px] text-muted-foreground
            leading-relaxed mb-10 max-w-[380px]
          ">
            I build fast, accessible, and beautiful web applications with
            Next.js, Spring Boot, and modern architecture. Let's turn your
            ideas into products users love.
          </p>

          {/* CTAs — Button component */}
          <div className="flex items-center gap-4 mb-12">
            <Link href="/projects">
              <Button variant="primary" size="lg" className="rounded-full">
                View My Work
              </Button>
            </Link>

            <Link href="/resume">
              <Button
                variant="secondary"
                size="lg"
                icon={Download}
                iconPosition="right"
                className="rounded-full"
              >
                Download CV
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <StatPill value="50+" label="Projects" />
            <div className="w-px h-8 bg-border" />
            <StatPill value="3+" label="Years Exp" />
            <div className="w-px h-8 bg-border" />
            <StatPill value="Next.js" label="Specialty" />
          </div>
        </div>

        {/* ── Right panel ────────────────────────────────────────────────── */}
        <div className="
          flex-1 relative overflow-hidden
          bg-[linear-gradient(135deg,hsl(var(--muted))_0%,hsl(var(--secondary))_100%)]
        ">
          {/* Halftone bottom-left */}
          <div className="absolute bottom-0 left-2 opacity-[0.15] pointer-events-none">
            <HalftoneDots fill="var(--neu-primary)" size={130} />
          </div>

          {/* Geometric rings — top-right */}
          <div className="
            absolute top-5 right-5
            w-14 h-14 rounded-full
            border-[2.5px] border-primary/30
          " />
          <div className="
            absolute top-8 right-8
            w-9 h-9 rounded-full
            border-2 border-foreground/15
          " />

          {/* Wave top-left */}
          <div className="absolute top-7 left-7 rotate-90 pointer-events-none">
            <WaveLines stroke="var(--neu-primary)" className="opacity-25" />
          </div>

          {/* Profile photo */}
          <div className="
            absolute inset-0
            flex items-end justify-center
            pb-8
          ">
            <div className="
              relative w-[85%] h-[90%]
              rounded-[2rem_2rem_0_0] overflow-hidden
              shadow-neu-raised
            ">
              {/* Replace src with your real photo */}
              <Image
                src="/6.webp"
                alt="Arthur Takam — Full-Stack Developer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 48vw"
                priority
              />
            </div>
          </div>

          {/* Open to Work badge */}
          <div className="
            absolute top-1/2 -left-9 -translate-y-1/2 z-10
            w-[90px] h-[90px] rounded-full
            bg-foreground
            border-[4px] border-card
            flex flex-col items-center justify-center
            shadow-neu-raised
          ">
            <span className="
              text-[9px] font-bold uppercase tracking-[0.08em]
              text-muted-foreground leading-none
            ">
              Open
            </span>
            <span className="
              text-[14px] font-black text-card
              leading-[1.1] text-center
            ">
              TO
              <br />
              WORK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}