// components/auth/AuthHeader.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// ─── Halftone Dots decoration ───────────────────────────────────────────────
function HalftoneDots({ size = 80 }: { size?: number }) {
  const dots = [];
  const spacing = 10;
  for (let r = 0; r < Math.ceil(size / spacing); r++) {
    for (let c = 0; c < Math.ceil(size / spacing); c++) {
      const x = c * spacing;
      const y = r * spacing;
      const dist = Math.sqrt((x - size / 2) ** 2 + (y - size / 2) ** 2);
      const maxDist = size * 0.5;
      const radius = Math.max(0.5, 2.5 * (1 - dist / maxDist));
      if (dist < maxDist) {
        dots.push(
          <circle key={`${r}-${c}`} cx={x} cy={y} r={radius} fill="var(--neu-primary)" />
        );
      }
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute opacity-[0.08] pointer-events-none"
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    setIsDark(shouldBeDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  if (!mounted) return (
    <div className="w-9 h-9 rounded-full neu-raised-sm neu-skeleton shrink-0" />
  );

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        neu-btn neu-raised-sm w-9 h-9 rounded-full shrink-0
        flex items-center justify-center
        text-muted-foreground hover:text-primary
        transition-colors duration-[var(--transition-fast)]
      "
    >
      {isDark
        ? <Sun size={16} className="text-yellow-400" />
        : <Moon size={16} />
      }
    </button>
  );
}

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] h-16 bg-card border-b border-border">
      {/* Halftone corner decoration */}
      <div className="absolute top-0 right-0 w-[120px] h-16 pointer-events-none overflow-hidden">
        <HalftoneDots size={80} />
      </div>

      <div className="flex items-center justify-between h-full px-6 md:px-10 mx-auto max-w-[1200px] relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0 group">
          <div className="
            w-[38px] h-[38px] rounded-full shrink-0
            flex items-center justify-center
            neu-btn neu-raised-sm
            bg-neu-primary-gradient
            group-hover:scale-105 transition-transform
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="font-bold text-sm text-foreground leading-none tracking-wide">
              ARTHUR TAKAM
            </div>
            <div className="text-[10px] text-muted-foreground tracking-[0.08em] uppercase mt-0.5">
              Portfolio
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="
              text-[13px] font-medium tracking-[0.02em] no-underline
              text-muted-foreground hover:text-foreground
              transition-colors duration-[var(--transition-fast)]
              px-3 py-1.5
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
              text-[13px] font-semibold tracking-[0.02em] no-underline
              px-4 py-1.5 rounded-full
              bg-primary text-primary-foreground
              hover:bg-primary/90
              transition-all duration-[var(--transition-fast)]
              shadow-neu-raised-sm
            "
          >
            Sign Up
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}