"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/ui/Button";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="w-full min-h-[calc(100vh-200px)] bg-background flex items-center justify-center py-20">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg className="w-12 h-12 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
          Something went wrong!
        </h1>
        
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again or contact support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary" icon={RefreshCw} iconPosition="right" className="rounded-full">
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary" icon={Home} iconPosition="right" className="rounded-full">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}