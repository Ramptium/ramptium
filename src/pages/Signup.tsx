import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, Lock, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/ramptium-logo.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { company, display_name: email.split("@")[0] },
      },
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Workspace created", description: "Check your email if confirmation is required, otherwise you're in." });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <SEO
        title={"Start building — Create your Ramptium account"}
        description={"Free forever. No credit card required. Get an API key and start routing requests across every major chain in 60 seconds."}
        keywords={"web3 signup, blockchain API signup, Ramptium workspace, free rpc"}
      />
      <div className="grid-pattern absolute inset-0 opacity-30 pointer-events-none" />
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
      <div className="container flex-1 flex items-center justify-center py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2.5 mb-10 justify-center">
            <img src={logo} alt="Ramptium" width={28} height={28} className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">Ramptium</span>
          </Link>

          <div className="glass rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Start building</h1>
            <p className="mt-2 text-sm text-muted-foreground">Free forever. No credit card required.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-9 bg-secondary/30 border-border" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Company (optional)</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input id="company" type="text" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Labs" className="pl-9 bg-secondary/30 border-border" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input id="password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="pl-9 bg-secondary/30 border-border" />
                </div>
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                {submitting ? "Creating account…" : <>Create account <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
            <p className="mt-5 text-xs text-muted-foreground text-center leading-relaxed">
              By creating an account you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-accent transition-colors">
              Sign in →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
