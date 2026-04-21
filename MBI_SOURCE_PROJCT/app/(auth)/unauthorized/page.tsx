// app/(auth)/unauthorized/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldX, Home, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/ui/Button";
import { useAuthStore, getDashboardPath } from "@/lib/store/auth";
import logger from "@/lib/utils/logger";

// ─── Halftone Dots ───────────────────────────────────────────────────────────
function HalftoneDots({ fill = "var(--neu-primary)", size = 120, className = "" }) {
  const dots = [];
  const spacing = 12;
  for (let r = 0; r < Math.ceil(size / spacing); r++) {
    for (let c = 0; c < Math.ceil(size / spacing); c++) {
      const x = c * spacing;
      const y = r * spacing;
      const dist = Math.sqrt((x - size / 2) ** 2 + (y - size / 2) ** 2);
      const maxDist = size * 0.5;
      const radius = Math.max(0.5, 3.5 * (1 - dist / maxDist));
      if (dist < maxDist) {
        dots.push(<circle key={`${r}-${c}`} cx={x} cy={y} r={radius} fill={fill} />);
      }
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      {dots}
    </svg>
  );
}

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleGoBack = () => {
    logger.router("User clicked go back from unauthorized page");
    router.back();
  };

  const handleGoHome = () => {
    logger.router("User clicked go home from unauthorized page");
    if (user) {
      router.push(getDashboardPath(user));
    } else {
      router.push("/");
    }
  };

  const handleLogout = () => {
    logger.auth("User logging out from unauthorized page");
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      {/* Navy left accent strip */}
      <div className="fixed left-0 top-16 bottom-0 w-1.5 bg-foreground opacity-80" />

      <div className="w-full max-w-[440px]">
        <div className="relative bg-card rounded-2xl border-2 border-border shadow-neu-raised p-8 md:p-10 text-center">
          {/* Decorations */}
          <div className="absolute top-0 right-0 opacity-[0.08] pointer-events-none">
            <HalftoneDots size={100} />
          </div>
          <div className="absolute bottom-4 left-4 opacity-[0.06] pointer-events-none rotate-180">
            <HalftoneDots size={80} />
          </div>

          {/* Icon */}
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/30">
            <ShieldX className="w-10 h-10 text-red-500" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-black text-foreground mb-2">Access Denied</h1>

          {/* Message */}
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>

          {/* User Info */}
          {user && (
            <div className="mb-6 p-3 rounded-xl bg-muted/30 border border-border">
              <p className="text-sm text-foreground">
                Logged in as{" "}
                <span className="font-semibold text-primary">{user.email}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Role: <span className="font-medium text-primary">{user.role}</span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleGoHome}
              variant="primary"
              icon={Home}
              iconPosition="left"
              className="w-full rounded-xl"
            >
              {user ? "Go to My Dashboard" : "Go to Home"}
            </Button>

            <Button
              onClick={handleGoBack}
              variant="secondary"
              icon={ArrowLeft}
              iconPosition="left"
              className="w-full rounded-xl"
            >
              Go Back
            </Button>

            {user && (
              <Button
                onClick={handleLogout}
                variant="outline"
                icon={LogOut}
                iconPosition="left"
                className="w-full rounded-xl border-red-500/30 text-red-500 hover:bg-red-500/10"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}