"use client";

import { useState } from "react";
import { Button } from "@/components/ui/ui/Button";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Message
        </label>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors resize-none"
          required
        />
      </div>
      <Button type="submit" variant="primary" icon={Send} iconPosition="right" className="w-full rounded-full">
        Send Message
      </Button>
    </form>
  );
}