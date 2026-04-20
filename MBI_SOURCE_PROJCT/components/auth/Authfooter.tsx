"use client";

import Link from 'next/link';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Zap,
  ArrowUp,
  Heart
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MarketingFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-card border-t border-border overflow-hidden">
      {/* Decorative elements - matching hero aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/5 to-background/10" />
        
        {/* Halftone dots decoration */}
        <div className="absolute top-0 right-0 opacity-[0.03]">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <defs>
              <pattern id="footer-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="var(--neu-primary)" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#footer-dots)" />
          </svg>
        </div>

        {/* Wave lines decoration */}
        <div className="absolute bottom-0 left-0 opacity-[0.03]">
          <svg width="300" height="100" viewBox="0 0 300 100">
            <path
              d="M0 50 Q75 20 150 50 T300 50"
              fill="none"
              stroke="var(--neu-primary)"
              strokeWidth="2"
            />
            <path
              d="M0 70 Q75 40 150 70 T300 70"
              fill="none"
              stroke="var(--neu-primary)"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Glow effect at top */}
        <div 
          className="absolute top-0 left-1/4 right-1/4 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--neu-primary), transparent)',
            opacity: 0.15,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 lg:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group mb-4">
              <h3 className="text-2xl font-black text-foreground tracking-tight">
                Arthur<span className="text-primary">Takam</span>
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-sm">
              Full-stack developer crafting fast, accessible, and beautiful web 
              applications with modern architecture. Let's turn your ideas into 
              products users love.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                { icon: Mail, label: 'Email', href: 'mailto:hello@arthurtakam.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center transition-all duration-300 hover:border-primary hover:shadow-neu-raised-sm hover:-translate-y-0.5"
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-4 h-px bg-primary" />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', href: '/' },
                { name: 'Projects', href: '/projects' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm group inline-flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-4 h-px bg-primary" />
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Resume', href: '/resume' },
                { name: 'GitHub', href: 'https://github.com' },
                { name: 'Blog', href: '/blog' },
                { name: 'Privacy Policy', href: '/privacy' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm group inline-flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative mt-10 pt-8 border-t border-border">
          {/* Decorative line glow */}
          <div 
            className="absolute top-0 left-1/4 right-1/4 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--neu-primary), transparent)',
              opacity: 0.3,
            }}
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-muted-foreground text-xs">
              © {currentYear} Arthur Takam. All rights reserved.
            </p>
            
            <p className="text-muted-foreground text-xs flex items-center gap-1">
              <span>Built with</span>
              <Heart size={10} className="text-primary fill-primary" />
              <span>using Next.js & Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-neu-raised hover:shadow-neu-raised-lg transition-all duration-300 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} className="text-primary" />
      </button>
    </footer>
  );
}