import { useEffect, useState } from "react";
import { Key, Copy, Check, Trash2, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  environment: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
}

export default function ApiKeys() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEnv, setNewEnv] = useState<"production" | "development" | "testing">("production");
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadKeys = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("api_keys")
      .select("id,name,key_prefix,environment,created_at,last_used_at,revoked_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Failed to load keys", description: error.message, variant: "destructive" });
    setKeys(data ?? []);
    setLoading(false);
  };

  useEffect(() => { loadKeys(); }, [user]);

  const handleCreate = async () => {
    if (!newName.trim()) {
      toast({ title: "Name required", description: "Give the key a recognizable label.", variant: "destructive" });
      return;
    }
    setCreating(true);
    const { data, error } = await supabase.functions.invoke("generate-api-key", {
      body: { name: newName.trim(), environment: newEnv },
    });
    setCreating(false);
    if (error || !data?.full_key) {
      toast({ title: "Could not create key", description: error?.message ?? "Unknown error", variant: "destructive" });
      return;
    }
    setRevealedKey(data.full_key);
    setShowCreate(false);
    setNewName("");
    loadKeys();
  };

  const handleRevoke = async (id: string) => {
    const { error } = await supabase.from("api_keys").update({ revoked_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      toast({ title: "Revoke failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Key revoked", description: "It can no longer authenticate requests." });
    loadKeys();
  };

  const copyKey = async () => {
    if (!revealedKey) return;
    await navigator.clipboard.writeText(revealedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <SEO title={"API Keys — Console | Ramptium"} description={"Create, rotate, and revoke API keys for the Ramptium infrastructure platform."} />
      <DashboardLayout title="API Keys" description="Generate and revoke keys. Treat them like passwords." eyebrow="Console / Keys">
        <div className="flex justify-end mb-4">
          <Button size="sm" onClick={() => setShowCreate(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Key className="h-4 w-4 mr-2" /> Create Key
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : keys.length === 0 ? (
          <div className="terminal-border p-12 text-center">
            <Key className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-foreground">No API keys yet</p>
            <p className="text-xs text-muted-foreground mt-1">Create your first key to start routing requests.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {keys.map((k) => {
              const revoked = !!k.revoked_at;
              return (
                <motion.div
                  key={k.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="terminal-border p-5 hover:border-primary/20 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-foreground">{k.name}</h3>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded uppercase tracking-wider ${revoked ? "text-destructive bg-destructive/10" : "text-accent bg-accent/10"}`}>
                          {revoked ? "revoked" : "active"}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded uppercase tracking-wider">{k.environment}</span>
                      </div>
                      <code className="text-sm font-mono text-muted-foreground mt-2 block truncate">
                        {k.key_prefix}…{"•".repeat(24)}
                      </code>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-6 text-xs text-muted-foreground flex-wrap">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">Created</span>
                        <span className="font-mono text-foreground">{new Date(k.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">Last used</span>
                        <span className="font-mono text-foreground">{k.last_used_at ? new Date(k.last_used_at).toLocaleDateString() : "Never"}</span>
                      </div>
                      {!revoked && (
                        <Button onClick={() => handleRevoke(k.id)} variant="outline" size="sm" className="border-border text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Create dialog */}
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create API key</DialogTitle>
              <DialogDescription>Generate a new key for routing requests through Ramptium.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="key-name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</Label>
                <Input id="key-name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Production · backend" className="bg-secondary/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Environment</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["production", "development", "testing"] as const).map((env) => (
                    <button
                      key={env}
                      type="button"
                      onClick={() => setNewEnv(env)}
                      className={`px-3 py-2 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
                        newEnv === env ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreate(false)} disabled={creating}>Cancel</Button>
              <Button onClick={handleCreate} disabled={creating} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {creating ? "Creating…" : "Create key"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reveal once dialog */}
        <Dialog open={!!revealedKey} onOpenChange={(o) => !o && setRevealedKey(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save your key</DialogTitle>
              <DialogDescription className="flex items-start gap-2 text-foreground">
                <AlertCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <span>This is the only time the full key will be shown. Store it in a secret manager.</span>
              </DialogDescription>
            </DialogHeader>
            <div className="terminal-border p-3 mt-2 flex items-center gap-2">
              <code className="text-sm font-mono text-foreground break-all flex-1">{revealedKey}</code>
              <Button size="sm" variant="ghost" onClick={copyKey}>
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={() => setRevealedKey(null)} className="bg-primary text-primary-foreground hover:bg-primary/90">I've saved it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
}
