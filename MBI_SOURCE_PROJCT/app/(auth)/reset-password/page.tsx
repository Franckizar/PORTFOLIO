// app/(auth)/reset-password/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/ui/Button";
import { authApi } from "@/lib/api/auth";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth";

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

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await authApi.resetPassword(token, data.password);
      setSuccess("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
        <div className="fixed left-0 top-16 bottom-0 w-1.5 bg-foreground opacity-80" />
        <div className="w-full max-w-[440px]">
          <div className="relative bg-card rounded-2xl border-2 border-border shadow-neu-raised p-8 text-center">
            <div className="absolute top-0 right-0 opacity-[0.08] pointer-events-none">
              <HalftoneDots size={100} />
            </div>
            <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-black text-foreground mb-2">Invalid Link</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This reset link is invalid or has expired.
            </p>
            <Link href="/forgot-password">
              <Button variant="primary" className="rounded-xl">
                Request New Link
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
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
              Security First
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground leading-[1.2] tracking-[-0.02em] mb-2">
              Create new
              <br />
              <span className="text-primary">password</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a strong password for your account
            </p>
          </div>

          {/* Messages */}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm text-green-500">{success}</p>
            </div>
          )}

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
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border-2 border-border text-foreground text-[15px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  {...register("password")}
                  disabled={isLoading}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-1.5 tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border-2 border-border text-foreground text-[15px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  {...register("confirmPassword")}
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center relative z-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}