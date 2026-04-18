import { useState } from "react";
import { Key, Copy, Eye, EyeOff, RefreshCw, Check, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialKeys = [
  { name: "Production", key: "rpt_live_a8f3k29x...d7e1", full: "rpt_live_a8f3k29x4f8b2a91c3d7e1", created: "2026-03-12", requests: "847M", status: "active" },
  { name: "Staging", key: "rpt_test_b2c4m91y...f3a8", full: "rpt_test_b2c4m91y8d2e7c45f3a8", created: "2026-03-15", requests: "12.4M", status: "active" },
  { name: "Development", key: "rpt_dev_c9d2n47z...e5b2", full: "rpt_dev_c9d2n47z6a1f9b83e5b2", created: "2026-04-01", requests: "340K", status: "active" },
];

export default function ApiKeys() {
  const [keys] = useState(initialKeys);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyKey = async (name: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(name);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch { /* noop */ }
  };

  return (
    <>
      <SEO title={"API Keys — Console | Ramptium"} description={"Create, rotate, and revoke API keys for the Ramptium infrastructure platform."} />
      <DashboardLayout title="API Keys" description="Generate, rotate, and revoke keys. Treat them like passwords." eyebrow="Console / Keys">
        <div className="flex justify-end mb-4">
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Key className="h-4 w-4 mr-2" /> Create Key
          </Button>
        </div>
        <div className="space-y-4">
          {keys.map((k) => (
            <motion.div
              key={k.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-border p-5 hover:border-primary/20 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{k.name}</h3>
                    <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wider">{k.status}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-sm font-mono text-muted-foreground truncate">
                      {showKey === k.name ? k.full : k.key}
                    </code>
                    <button
                      onClick={() => setShowKey(showKey === k.name ? null : k.name)}
                      className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      aria-label={showKey === k.name ? "Hide key" : "Reveal key"}
                    >
                      {showKey === k.name ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleCopyKey(k.name, k.full)}
                      className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      aria-label="Copy key"
                    >
                      {copiedKey === k.name ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 lg:gap-6 text-xs text-muted-foreground flex-wrap">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">Created</span>
                    <span className="font-mono text-foreground">{k.created}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">Requests</span>
                    <span className="font-mono text-foreground">{k.requests}</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Rotate
                  </Button>
                  <Button variant="outline" size="sm" className={cn("border-border text-muted-foreground hover:text-destructive")}>
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Revoke
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}
