"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  const info = [
    { icon: Mail, label: "Email", value: "hello@arthurtakam.com", link: "mailto:hello@arthurtakam.com" },
    { icon: Phone, label: "Phone", value: "+237 6XX XXX XXX", link: "tel:+2376XXXXXXXX" },
    { icon: MapPin, label: "Location", value: "Douala, Cameroon", link: null },
    { icon: Clock, label: "Response Time", value: "Within 24 hours", link: null },
  ];

  return (
    <div className="space-y-5">
      {info.map((item) => (
        <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-neu-raised-sm">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <item.icon size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
            {item.link ? (
              <a href={item.link} className="text-foreground font-medium hover:text-primary transition-colors">
                {item.value}
              </a>
            ) : (
              <p className="text-foreground font-medium">{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}