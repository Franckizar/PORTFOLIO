// app/dashboard/superadmin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore, getDashboardPath } from "@/lib/store/auth";
import { api } from "@/lib/api";
import { Crown, Shield, Users, Settings, Plus, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/ui/Button";
import Link from "next/link";

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

interface SuperAdminProfile {
  systemName: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: string;
  lastLoginAt?: string;
}

interface CreateAdminForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function SuperAdminDashboard() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<SuperAdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [createForm, setCreateForm] = useState<CreateAdminForm>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/v1/superadmin/profile/me");
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch superadmin profile", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCreateAdmin = async () => {
    if (!createForm.firstname || !createForm.lastname || !createForm.email || !createForm.password) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    setIsCreating(true);
    setMessage(null);

    try {
      await api.post("/v1/superadmin/create-admin", createForm);
      setMessage({ type: "success", text: "Admin account created successfully!" });
      setCreateForm({ firstname: "", lastname: "", email: "", password: "" });
      setShowCreateAdmin(false);
    } catch (err: any) {
      setMessage({ type: "error", text: err?.response?.data?.message || "Failed to create admin" });
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background p-6 lg:p-8">
      {/* Navy left accent strip */}
      <div className="fixed left-0 top-16 bottom-0 w-1.5 bg-foreground opacity-80" />

      <div className="max-w-6xl mx-auto relative">
        {/* Halftone decoration */}
        <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none">
          <HalftoneDots size={200} />
        </div>

        {/* Header */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Super Admin
                <span className="text-primary ml-2">Dashboard</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Welcome back, <span className="text-primary font-semibold">{user?.firstname}</span> — you have full system control
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 relative z-10">
          <div className="bg-card border-2 border-border rounded-2xl p-5 shadow-neu-raised-sm">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Role</span>
            </div>
            <div className="text-xl font-black text-primary">SUPERADMIN</div>
            <p className="text-xs text-muted-foreground mt-1">Full system access</p>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-5 shadow-neu-raised-sm">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">System Status</span>
            </div>
            <div className="text-xl font-black text-green-500">Operational</div>
            <p className="text-xs text-muted-foreground mt-1">All systems online</p>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-5 shadow-neu-raised-sm">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Platform</span>
            </div>
            <div className="text-lg font-bold text-foreground truncate">
              {profile?.systemName || "E-Gaming Platform"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active system</p>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-3 rounded-xl border-2 flex items-start gap-2 relative z-10 ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}>
            {message.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            ) : (
              <Shield className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            )}
            <p className={`text-sm ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}>
              {message.text}
            </p>
          </div>
        )}

        {/* Admin Management Section */}
        <div className="relative mb-8 z-10">
          <div className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-neu-raised">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">Admin Management</h2>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                iconPosition="left"
                onClick={() => setShowCreateAdmin(!showCreateAdmin)}
                className="rounded-full"
              >
                Create Admin
              </Button>
            </div>

            {/* Create Admin Form */}
            {showCreateAdmin && (
              <div className="px-6 py-5 border-b border-border bg-muted/10">
                <h3 className="font-semibold text-foreground mb-4 text-sm">New Admin Account</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="First name"
                    value={createForm.firstname}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, firstname: e.target.value }))}
                    className="px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={createForm.lastname}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, lastname: e.target.value }))}
                    className="px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={createForm.email}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="Temporary password"
                    value={createForm.password}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="px-4 py-2.5 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleCreateAdmin}
                    disabled={isCreating}
                    variant="primary"
                    size="sm"
                    className="rounded-full"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      "Create Admin"
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowCreateAdmin(false)}
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="px-6 py-4 text-center border-t border-border bg-muted/5">
              <p className="text-xs text-muted-foreground">
                Admins created here are immediately active — no email verification required.
                They can approve players and manage the platform.
              </p>
            </div>
          </div>
        </div>

        {/* System Profile */}
        <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-neu-raised relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">System Profile</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wide">Contact Email</div>
              <div className="text-foreground font-medium">{profile?.contactEmail || user?.email}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wide">Contact Phone</div>
              <div className="text-foreground font-medium">{profile?.contactPhone || "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wide">Account Created</div>
              <div className="text-foreground font-medium">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1 text-xs uppercase tracking-wide">Last Login</div>
              <div className="text-foreground font-medium">
                {profile?.lastLoginAt ? new Date(profile.lastLoginAt).toLocaleString() : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}