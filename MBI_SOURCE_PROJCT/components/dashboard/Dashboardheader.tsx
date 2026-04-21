// components/dashboard/DashboardHeader.tsx
"use client";

import { Bell, Search, User, Menu, LogOut, Settings } from "lucide-react";
import { useAuthStore, getDashboardPath } from "@/lib/store/auth";
import { useState } from "react";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/ui/Button";

// ─── Halftone Dots ───────────────────────────────────────────────────────────
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
          <circle key={`${r}-${c}`} cx={x} cy={y} r={radius} fill="var(--neu-primary)" />
        );
      }
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute opacity-[0.06] pointer-events-none"
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

export default function DashboardHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [imageError, setImageError] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const imageUrl = user?.logoPath ?? null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleLogoClick = () => {
    if (user) {
      router.push(getDashboardPath(user));
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      {/* Halftone decoration */}
      <div className="absolute top-0 right-0 w-[100px] h-16 pointer-events-none overflow-hidden">
        <HalftoneDots size={80} />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/40" />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Logo - Clickable to go to dashboard */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 no-underline shrink-0 group"
          >
            <div className="
              w-[38px] h-[38px] rounded-full shrink-0
              flex items-center justify-center
              neu-btn neu-raised-sm
              bg-neu-primary-gradient
              group-hover:scale-105 transition-transform
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-bold text-sm text-foreground leading-none tracking-wide">
                ARTHUR TAKAM
              </div>
              <div className="text-[10px] text-muted-foreground tracking-[0.08em] uppercase mt-0.5">
                Dashboard
              </div>
            </div>
          </button>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4">
            <div className={cn(
              "relative w-full transition-all duration-200",
              searchFocused ? "scale-[1.02]" : ""
            )}>
              <Search className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                searchFocused ? "text-primary" : "text-muted-foreground"
              )} />
              <input
                type="search"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 text-sm rounded-xl transition-all",
                  "bg-background border-2 text-foreground placeholder:text-muted-foreground/50",
                  "focus:outline-none",
                  searchFocused
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                )}
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="
                  neu-btn neu-raised-sm w-9 h-9 rounded-full shrink-0
                  flex items-center justify-center
                  text-muted-foreground hover:text-primary
                  transition-colors relative
                "
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-12 w-80 bg-card border-2 border-border rounded-2xl shadow-neu-raised overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">Notifications</span>
                      <span className="text-xs text-primary font-semibold">3 new</span>
                    </div>
                    {[
                      { text: "Welcome to your dashboard!", time: "Just now" },
                      { text: "Your profile is ready", time: "1h ago" },
                      { text: "Check out new features", time: "3h ago" },
                    ].map((n, i) => (
                      <div key={i} className="px-4 py-3 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors">
                        <p className="text-sm text-foreground">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    ))}
                    <div className="px-4 py-2 text-center">
                      <button className="text-xs text-primary font-semibold hover:underline">
                        View all
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-border" />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 group"
              >
                <div className="
                  relative w-9 h-9 rounded-full overflow-hidden
                  neu-btn neu-raised-sm
                  bg-muted flex items-center justify-center
                  group-hover:scale-105 transition-transform
                ">
                  {imageUrl && !imageError ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <User size={16} className="text-muted-foreground" />
                  )}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {user?.firstname} {user?.lastname}
                  </p>
                  <p className="text-[10px] text-primary uppercase tracking-wider leading-tight">
                    {user?.role?.replace("_", " ")}
                  </p>
                </div>
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-12 w-56 bg-card border-2 border-border rounded-2xl shadow-neu-raised overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground">
                        {user?.firstname} {user?.lastname}
                      </p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings size={14} />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
}