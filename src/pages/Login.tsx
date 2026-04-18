import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Mail, KeyRound, Github as GithubIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/ramptium-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual-only auth: route to dashboard.
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={"Sign In to the Ramptium Console"}
        description={"Access your API keys, usage metrics, and request logs. Sign in to the Ramptium developer console."}
        keywords={"web3 console login, blockchain API sign in, Ramptium developer login"}
      />
      <div className="grid-pattern absolute inset-0 opacity-20 pointer-events-none" />
      <div className="container flex-1 flex items-center justify-center py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-10 justify-center">
            <img src={logo} alt="Ramptium" width={32} height={32} className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight text-foreground">Ramptium</span>
          </Link>

          <div className="terminal-border p-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Access the developer console.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="pl-9 bg-secondary/30 border-border"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                Continue with Email <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground font-mono uppercase tracking-wider">or</span></div>
              </div>

              <Button type="button" variant="outline" className="w-full">
                <GithubIcon className="mr-2 h-4 w-4" /> Continue with GitHub
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <KeyRound className="mr-2 h-4 w-4" /> Continue with API Key
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New to Ramptium?{" "}
            <Link to="/dashboard" className="text-primary hover:text-accent transition-colors">
              Create a workspace
            </Link>
          </p>
          <p className="mt-2 text-center text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
            Visual preview · Auth backend not yet enabled
          </p>
        </motion.div>
      </div>
    </div>
  );
}
