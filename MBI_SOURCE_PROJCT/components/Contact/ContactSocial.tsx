"use client";

import { Github, Twitter, Linkedin, Instagram, Youtube, Gitlab } from "lucide-react";
import Link from "next/link";

export default function ContactSocial() {
  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-white" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-[#0A66C2]" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "hover:text-[#1DA1F2]" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com", color: "hover:text-[#E4405F]" },
  ];

  return (
    <div className="mt-6 p-6 rounded-xl bg-card shadow-neu-raised-sm">
      <h3 className="font-bold text-foreground mb-4 text-center">Connect Online</h3>
      <div className="flex justify-center gap-4">
        {socials.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center transition-all hover:scale-110 ${social.color}`}
          >
            <social.icon size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
}