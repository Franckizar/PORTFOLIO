// app/(auth)/verify-email/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, AlertCircle, CheckCircle2, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/ui/Button";
import { authApi } from "@/lib/api/auth";
import { verificationSchema, type VerificationFormData } from "@/lib/validations/auth";

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

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { email },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const onSubmit = async (data: VerificationFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authApi.verifyEmail(data);
      setSuccess(response.data.message || "Email verified successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      const response = await authApi.resendVerificationCode({ email });
      setSuccess(response.data.message || "Verification code sent! Check your email.");
      setCanResend(false);
      setCountdown(60);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || "Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
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
              Verify Your Identity
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground leading-[1.2] tracking-[-0.02em] mb-2">
              Check your
              <br />
              <span className="text-primary">inbox</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              We've sent a 6-digit code to<br />
              <span className="font-semibold text-primary">{email}</span>
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
            <input type="hidden" {...register("email")} />

            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-1.5 tracking-wide text-center">
                Verification Code
              </label>
              <input
                type="text"
                placeholder="• • • • • •"
                maxLength={6}
                className="w-full px-4 py-3 text-2xl tracking-[0.5em] text-center font-mono bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors"
                {...register("code")}
                autoComplete="off"
                autoFocus
                disabled={isLoading}
              />
              {errors.code && <p className="mt-1 text-xs text-red-500 text-center">{errors.code.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={Mail}
              iconPosition="right"
              className="w-full rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          {/* Resend Section */}
          <div className="mt-6 text-center relative z-10">
            <p className="text-xs text-muted-foreground mb-2">Didn't receive the code?</p>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || isResending}
              className="text-primary text-sm font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 mx-auto transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`} />
              {isResending ? "Sending..." : canResend ? "Resend Code" : `Resend in ${countdown}s`}
            </button>
          </div>

          {/* Tips */}
          <div className="mt-6 pt-4 border-t border-border text-center relative z-10">
            <p className="text-xs text-muted-foreground">
              Code expires in <span className="font-semibold text-primary">15 minutes</span>
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-4 text-center relative z-10">
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