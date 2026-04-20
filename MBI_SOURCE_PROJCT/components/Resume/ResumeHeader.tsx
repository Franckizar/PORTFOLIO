"use client";

import { Button } from "@/components/ui/ui/Button";
import { Download, Printer } from "lucide-react";
import Link from "next/link";

export default function ResumeHeader() {
  return (
    <section className="w-full bg-card py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            My Resume
          </h1>
          <p className="text-muted-foreground mb-6">
            3+ years of experience • Full-Stack Developer
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" icon={Download} iconPosition="right" className="rounded-full">
              Download PDF
            </Button>
            <Button variant="secondary" icon={Printer} iconPosition="right" className="rounded-full">
              Print
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}