"use client";

import { Coffee, Book, Music, Camera, Gamepad, Bike } from "lucide-react";

export default function AboutInterests() {
  const interests = [
    { icon: Coffee, label: "Coffee enthusiast" },
    { icon: Book, label: "Tech reader" },
    { icon: Music, label: "Music lover" },
    { icon: Camera, label: "Photography" },
    { icon: Gamepad, label: "Gaming" },
    { icon: Bike, label: "Cycling" },
  ];

  return (
    <section className="w-full bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Beyond the Code
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          When I'm not coding, you can find me...
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {interests.map((item) => (
            <div key={item.label} className="text-center">
              <div className="w-16 h-16 rounded-full bg-card shadow-neu-raised-sm flex items-center justify-center mx-auto mb-2">
                <item.icon size={24} className="text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}