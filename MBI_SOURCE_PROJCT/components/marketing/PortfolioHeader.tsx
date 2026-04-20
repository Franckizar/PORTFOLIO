"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, Github, Linkedin, Mail, Download, X, Sun, Moon } from 'lucide-react';
import { useAuthStore, getDashboardPath } from '@/lib/store/auth';
import { Button } from '../ui/ui/Button';
// import { Button } from '@/components/ui/Button';

// ─── Halftone Dots — pure decoration, no color tokens needed here ─────────────
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
          // Uses CSS variable so it adapts to theme automatically
          <circle key={`${r}-${c}`} cx={x} cy={y} r={radius} fill="var(--neu-primary)" />
        );
      }
    }
  }
  return (
    <svg
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className="absolute opacity-[0.12]"
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
// Reads/writes .dark on <html> — your globals.css + tailwind handles the rest
function ThemeToggle() {
  const [isDark,   setIsDark]   = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    const saved       = localStorage.getItem('portfolio-theme');
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
        ? <Sun  size={16} className="text-yellow-400" />
        : <Moon size={16} />
      }
    </button>
  );
}

// ─── Social Icon Button ───────────────────────────────────────────────────────
function SocialBtn({
  href, icon: Icon, label,
}: {
  href: string; icon: React.ElementType; label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        neu-btn neu-raised-sm w-9 h-9 rounded-full shrink-0
        flex items-center justify-center
        text-muted-foreground hover:text-primary
        transition-colors duration-[var(--transition-fast)]
      "
    >
      <Icon size={16} />
    </Link>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export default function PortfolioHeader() {
  const { user }                    = useAuthStore();
  const [activeItem, setActiveItem] = useState('home');
  const [scrolled,   setScrolled]   = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef                      = useRef<HTMLDivElement>(null);
  const animationRef                = useRef<ReturnType<typeof setInterval> | null>(null);

  const navItems = [
    { id: 'home',     label: 'Home',     href: '/' },
    { id: 'about',    label: 'About',    href: '/about' },
    { id: 'contact',  label: 'Contact',  href: '/contact' },
    { id: 'resume',   label: 'Resume',   href: '/resume' },
    { id: 'projects', label: 'Projects', href: '/projects' },
  ];

  const socials = [
    { icon: Github,   href: 'https://github.com/franckizar',        label: 'GitHub'      },
    { icon: Linkedin, href: 'https://linkedin.com/in/arthur-takam', label: 'LinkedIn'    },
    { icon: Mail,     href: 'mailto:arthur@example.com',            label: 'Email'       },
    { icon: Download, href: '/resume.pdf',                          label: 'Download CV' },
  ];

  useEffect(() => { setMounted(true); }, []);

  const dashboardPath = mounted && user ? getDashboardPath(user) : '/dashboard';

  // ── Nav indicator animation (preserved exactly) ───────────────────────────
  const animateIndicator = (from: number, to: number) => {
    if (animationRef.current) clearInterval(animationRef.current);
    const start = Date.now();
    animationRef.current = setInterval(() => {
      const p = Math.min((Date.now() - start) / 500, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const x = from + (to - from) * e;
      const y = -40 * (4 * e * (1 - e));
      const ro = 200 * Math.sin(p * Math.PI);
      if (navRef.current) {
        navRef.current.style.setProperty('--translate-x', `${x}px`);
        navRef.current.style.setProperty('--translate-y', `${y}px`);
        navRef.current.style.setProperty('--rotate-x',   `${ro}deg`);
        if (p >= 1) {
          clearInterval(animationRef.current!);
          animationRef.current = null;
          navRef.current.style.setProperty('--translate-y', '0px');
          navRef.current.style.setProperty('--rotate-x',   '0deg');
        }
      }
    }, 16);
  };

  const getCurrentPosition = () =>
    parseFloat(navRef.current?.style.getPropertyValue('--translate-x') || '0') || 0;

  const getItemCenter = (el: HTMLElement) => {
    if (!navRef.current) return 0;
    const navRect  = navRef.current.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    return itemRect.left + itemRect.width / 2 - navRect.left - 5;
  };

  const moveToItem = (el: HTMLElement) => {
    animateIndicator(getCurrentPosition(), getItemCenter(el));
    navRef.current?.classList.add('show-indicator');
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) =>
    moveToItem(e.currentTarget);

  const handleMouseLeave = () => {
    const active = document.querySelector<HTMLElement>(`[data-nav-id="${activeItem}"]`);
    if (active) moveToItem(active);
    else {
      navRef.current?.classList.remove('show-indicator');
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    }
  };

  useEffect(() => {
    const active = document.querySelector<HTMLElement>(`[data-nav-id="${activeItem}"]`);
    if (active) setTimeout(() => moveToItem(active), 100);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [activeItem]);

  return (
    <>
      {/* ── Fixed Header ─────────────────────────────────────────────────── */}
      <header className={`
        fixed top-0 left-0 right-0 z-[1000] h-16
        bg-card border-b
        transition-all duration-[var(--transition-normal)]
        ${scrolled
          ? 'border-primary/20 shadow-neu-raised-sm'
          : 'border-border'
        }
      `}>

        {/* Halftone corner — color comes from var(--neu-primary) inside the component */}
        <div className="absolute top-0 right-0 w-[120px] h-16 pointer-events-none overflow-hidden">
          <HalftoneDots size={80} />
        </div>

        <nav className="
          flex items-center justify-between
          h-full px-6 md:px-10 mx-auto max-w-[1200px] relative z-10
        ">

          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
            <div className="
              w-[38px] h-[38px] rounded-full shrink-0
              flex items-center justify-center
              neu-btn neu-raised-sm
              bg-neu-primary-gradient
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              {/*
                text-foreground  → light mode: dark navy-ish  |  dark mode: near-white
                text-muted-foreground → same switching, more muted
                NO hardcoded hex colors here
              */}
              <div className="font-bold text-sm text-foreground leading-none tracking-wide">
                ARTHUR TAKAM
              </div>
              <div className="text-[10px] text-muted-foreground tracking-[0.08em] uppercase mt-0.5">
                Portfolio
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────────────── */}
          <div
            ref={navRef}
            className="hidden md:flex gap-9"
            onMouseLeave={handleMouseLeave}
          >
            {navItems.map(({ id, label, href }) => (
              <Link
                key={id}
                href={href}
                data-nav-id={id}
                onMouseEnter={handleMouseEnter}
                onClick={() => setActiveItem(id)}
                className={`
                  text-[13px] tracking-[0.02em] no-underline
                  pb-0.5 border-b-2
                  transition-colors duration-[var(--transition-fast)]
                  ${id === activeItem
                    ? 'font-bold text-primary border-primary'
                    : 'font-medium text-muted-foreground border-transparent hover:text-foreground'
                  }
                `}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right Side ──────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Socials — desktop only */}
            <div className="hidden md:flex items-center gap-2">
              {socials.map((s) => <SocialBtn key={s.label} {...s} />)}
            </div>

            {/* Theme toggle — always visible */}
            <ThemeToggle />

            {/* Auth — your Button component, no raw styling */}
            {mounted && !user ? (
              <Button
                variant="secondary"
                size="sm"
                className="hidden md:inline-flex rounded-full ml-1"
                onClick={() => window.location.href = '/login'}
              >
                Login
              </Button>
            ) : mounted && user ? (
              <Button
                variant="primary"
                size="sm"
                className="hidden md:inline-flex rounded-full ml-1"
                onClick={() => window.location.href = dashboardPath}
              >
                Dashboard
              </Button>
            ) : null}

            {/* Mobile hamburger */}
            <button
              className="
                md:hidden neu-btn neu-raised-sm
                w-9 h-9 rounded-full
                flex items-center justify-center
                text-muted-foreground
              "
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="
          fixed top-16 left-0 right-0 z-[999] md:hidden
          bg-card border-b border-border shadow-neu-raised
          px-6 py-6 animate-fade-in
        ">
          <div className="flex flex-col gap-1">

            {/* Nav links */}
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => { setActiveItem(item.id); setMobileOpen(false); }}
                className={`
                  py-3 text-[15px] no-underline border-b border-border
                  transition-all duration-[var(--transition-fast)]
                  ${activeItem === item.id
                    ? 'font-bold text-primary'
                    : 'font-medium text-muted-foreground'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* Socials row */}
            <div className="flex gap-3 pt-4">
              {socials.map((s) => <SocialBtn key={s.label} {...s} />)}
            </div>

            {/* Auth */}
            <div className="pt-3">
              {mounted && !user && (
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-full"
                  onClick={() => { window.location.href = '/login'; setMobileOpen(false); }}
                >
                  Login
                </Button>
              )}
              {mounted && user && (
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-full"
                  onClick={() => { window.location.href = dashboardPath; setMobileOpen(false); }}
                >
                  Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed header spacer — same height as header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}