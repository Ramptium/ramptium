import { useEffect, useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Profile {
  display_name: string | null;
  company: string | null;
  email: string;
}

interface Subscription {
  plan: string;
  status: string;
  monthly_request_limit: number;
  current_period_end: string | null;
}

export default function DashboardSettings() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [profileRes, subRes] = await Promise.all([
        supabase.from("profiles").select("display_name,company,email").eq("user_id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("plan,status,monthly_request_limit,current_period_end").eq("user_id", user.id).maybeSingle(),
      ]);
      if (cancelled) return;
      setProfile(profileRes.data ?? null);
      setSubscription(subRes.data ?? null);
      setDisplayName(profileRes.data?.display_name ?? "");
      setCompany(profileRes.data?.company ?? "");
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName || null, company: company || null })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Profile updated" });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <>
      <SEO title={"Settings — Console | Ramptium"} description={"Manage workspace, billing, and team for your Ramptium account."} />
      <DashboardLayout title="Settings" description="Workspace and billing." eyebrow="Console / Settings">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <TerminalCard title="profile">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</Label>
                  <Input id="email" value={profile?.email ?? user?.email ?? ""} disabled className="bg-secondary/30 border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Display name</Label>
                  <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-secondary/30 border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Company</Label>
                  <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="bg-secondary/30 border-border" />
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </TerminalCard>

            <TerminalCard title="billing">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Current plan</p>
                  <p className="text-lg font-semibold text-foreground mt-1 capitalize">{subscription?.plan ?? "free"}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(subscription?.monthly_request_limit ?? 100_000).toLocaleString()} requests / month included
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Status</p>
                  <p className="text-sm font-mono text-accent mt-1 capitalize">{subscription?.status ?? "active"}</p>
                </div>
                {subscription?.current_period_end && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Renews</p>
                    <p className="text-sm font-mono text-foreground mt-1">{new Date(subscription.current_period_end).toLocaleDateString()}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" disabled>Upgrade plan</Button>
                  <Button variant="outline" size="sm" disabled>View invoices</Button>
                </div>
                <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest pt-2">
                  Stripe checkout activates once billing is enabled.
                </p>
              </div>
            </TerminalCard>

            <TerminalCard title="session">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Sign out of this workspace on this device.</p>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  <LogOut className="h-3.5 w-3.5 mr-2" /> Sign out
                </Button>
              </div>
            </TerminalCard>

            <TerminalCard title="danger-zone">
              <p className="text-sm text-muted-foreground">
                Permanently delete your workspace and revoke all API keys. This action cannot be undone.
              </p>
              <Button variant="outline" size="sm" disabled className="mt-4 border-destructive/40 text-destructive hover:bg-destructive/10">
                Delete workspace
              </Button>
            </TerminalCard>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
