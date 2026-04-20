"use client";

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactSocial from "./ContactSocial";

export default function ContactSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-[0.12em] mb-4">
            <span className="w-6 h-0.5 bg-primary rounded-full" />
            Get In Touch
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-[-0.02em] mb-4">
            Let's Work Together
          </h1>
          <p className="text-muted-foreground">
            Have a project in mind? I'd love to hear about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ContactInfo />
          <div>
            <ContactForm />
            <ContactSocial />
          </div>
        </div>
      </div>
    </section>
  );
}