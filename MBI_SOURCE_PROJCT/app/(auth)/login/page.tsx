// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/ui/Button";
import { authApi } from "@/lib/api/auth";
import { useAuthStore, getDashboardPath } from "@/lib/store/auth";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

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

// ─── Wave lines ───────────────────────────────────────────────────────────────
function WaveLines({ stroke = "var(--neu-primary)", className = "" }) {
  return (
    <svg width="80" height="40" viewBox="0 0 80 40" className={className} aria-hidden="true">
      {[0, 12, 24].map((y, i) => (
        <path
          key={i}
          d={`M0 ${y + 6} Q20 ${y} 40 ${y + 6} Q60 ${y + 12} 80 ${y + 6}`}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.4 - i * 0.08}
        />
      ))}
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { checkAuth } = useAuthStore();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      await authApi.login(data);
      await checkAuth();

      const { user } = useAuthStore.getState();
      if (user) {
        router.replace(getDashboardPath(user));
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid email or password.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      {/* Navy left accent strip */}
      <div className="fixed left-0 top-16 bottom-0 w-1.5 bg-foreground opacity-80" />

      <div className="w-full max-w-[440px]">
        <div className="relative bg-card rounded-2xl border-2 border-border shadow-neu-raised p-8 md:p-10">
          {/* Decorations */}
          <div className="absolute top-0 right-0 opacity-[0.08] pointer-events-none">
            <HalftoneDots size={100} />
          </div>
          <div className="absolute bottom-4 left-4 opacity-[0.06] pointer-events-none rotate-180">
            <HalftoneDots size={80} />
          </div>
          <div className="absolute top-6 left-6 pointer-events-none opacity-20">
            <WaveLines />
          </div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-[0.12em] mb-3">
              <span className="w-6 h-0.5 bg-primary rounded-full" />
              Welcome Back
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground leading-[1.2] tracking-[-0.02em] mb-2">
              Sign in to your
              <br />
              <span className="text-primary">account</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
            <button className="flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-border bg-background text-foreground text-sm font-medium hover:border-primary hover:bg-primary/5 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-border bg-background text-foreground text-sm font-medium hover:border-primary hover:bg-primary/5 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-border bg-background text-foreground text-sm font-medium hover:border-primary hover:bg-primary/5 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              Discord
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-card text-muted-foreground">or continue with email</span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-1.5 tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="arthur@takam.dev"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border-2 border-border text-foreground text-[15px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  {...register("email")}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-semibold text-foreground tracking-wide">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-medium text-primary hover:underline transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border-2 border-border text-foreground text-[15px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  {...register("password")}
                  disabled={isLoading}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={LogIn}
              iconPosition="right"
              className="w-full rounded-xl mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center relative z-10">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline transition">
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}