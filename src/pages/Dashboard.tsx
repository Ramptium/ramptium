import { useState } from "react";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import {
  Activity, Key, BarChart3, Globe, Settings, Copy, Eye, EyeOff,
  RefreshCw, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { StatusDot } from "@/components/shared/StatusDot";
import { cn } from "@/lib/utils";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

const tabs = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "keys", label: "API Keys", icon: Key },
  { id: "usage", label: "Usage", icon: BarChart3 },
  { id: "networks", label: "Networks", icon: Globe },
  { id: "settings", label: "Settings", icon: Settings },
];

const mockKeys = [
  { name: "Production", key: "rpt_live_a8f3k29x...d7e1", full: "rpt_live_a8f3k29x4f8b2a91c3d7e1", created: "2026-03-12", requests: "847M", status: "active" },
  { name: "Staging", key: "rpt_test_b2c4m91y...f3a8", full: "rpt_test_b2c4m91y8d2e7c45f3a8", created: "2026-03-15", requests: "12.4M", status: "active" },
  { name: "Development", key: "rpt_dev_c9d2n47z...e5b2", full: "rpt_dev_c9d2n47z6a1f9b83e5b2", created: "2026-04-01", requests: "340K", status: "active" },
];

const mockLogs = [
  { time: "14:23:01.234", method: "eth_call", chain: "ethereum", status: 200, latency: "8ms" },
  { time: "14:23:01.187", method: "eth_getBalance", chain: "polygon", status: 200, latency: "4ms" },
  { time: "14:23:01.142", method: "eth_sendRawTransaction", chain: "arbitrum", status: 200, latency: "12ms" },
  { time: "14:23:01.098", method: "eth_blockNumber", chain: "base", status: 200, latency: "3ms" },
  { time: "14:23:00.971", method: "eth_getLogs", chain: "ethereum", status: 200, latency: "24ms" },
  { time: "14:23:00.887", method: "eth_estimateGas", chain: "optimism", status: 200, latency: "6ms" },
  { time: "14:23:00.812", method: "eth_getTransactionReceipt", chain: "polygon", status: 429, latency: "2ms" },
  { time: "14:23:00.756", method: "eth_call", chain: "avalanche", status: 200, latency: "9ms" },
];

const networkData = [
  { name: "Ethereum", status: "operational" as const, latency: "12ms", requests: "1.2B", uptime: "99.99%" },
  { name: "Polygon", status: "operational" as const, latency: "8ms", requests: "480M", uptime: "99.99%" },
  { name: "Arbitrum", status: "operational" as const, latency: "6ms", requests: "320M", uptime: "100%" },
  { name: "Base", status: "operational" as const, latency: "7ms", requests: "210M", uptime: "99.98%" },
  { name: "Solana", status: "operational" as const, latency: "4ms", requests: "190M", uptime: "99.97%" },
  { name: "Optimism", status: "operational" as const, latency: "5ms", requests: "87M", uptime: "100%" },
  { name: "Avalanche", status: "operational" as const, latency: "9ms", requests: "64M", uptime: "99.99%" },
  { name: "BSC", status: "operational" as const, latency: "11ms", requests: "52M", uptime: "99.98%" },
];

function UsageBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-mono text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{(value / 1e6).toFixed(1)}M</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
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
    <div className="min-h-screen bg-background">
      <SEO title={"Dashboard — API Keys, Usage & Network Status | Ramptium"} description={"Manage API keys, monitor request volume and latency, inspect real-time logs, and track network health across every supported chain."} keywords={"web3 API dashboard, RPC usage monitoring, API key management"} />
      <Navbar />
      <div className="pt-20">
        <div className="container py-8">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            {/* Header */}
            <motion.div variants={fade} className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Console</p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Monitor your infrastructure in real-time</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 terminal-border">
                <StatusDot status="operational" label="All systems operational" />
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fade} className="flex gap-1 mb-8 overflow-x-auto pb-2 border-b border-border">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2.5 text-sm rounded-md transition-colors whitespace-nowrap -mb-px",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    {active && (
                      <motion.div
                        layoutId="dashboard-tab-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={fade} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard label="Requests Today" value="82.4M" sub="+12.3% from yesterday" accent />
                  <MetricCard label="Avg Latency" value="8.2ms" sub="p50 global" />
                  <MetricCard label="Error Rate" value="0.003%" sub="Last 24 hours" accent />
                  <MetricCard label="Active Keys" value="3" sub="0 rate limited" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <motion.div variants={fade}>
                    <TerminalCard title="requests-24h">
                      <div className="space-y-4">
                        <UsageBar label="00:00 - 06:00" value={24_300_000} max={40_000_000} />
                        <UsageBar label="06:00 - 12:00" value={31_200_000} max={40_000_000} />
                        <UsageBar label="12:00 - 18:00" value={38_700_000} max={40_000_000} />
                        <UsageBar label="18:00 - now" value={18_400_000} max={40_000_000} />
                      </div>
                      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">Quota: 1B / month</span>
                        <span className="text-xs font-mono text-accent">847M used (84.7%)</span>
                      </div>
                    </TerminalCard>
                  </motion.div>

                  <motion.div variants={fade}>
                    <TerminalCard title="request-log" bodyClassName="p-0">
                      <div className="divide-y divide-border max-h-[340px] overflow-y-auto">
                        {mockLogs.map((log, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs font-mono px-4 py-2.5 hover:bg-secondary/30 transition-colors">
                            <span className="text-muted-foreground w-24 shrink-0">{log.time}</span>
                            <span className={cn(
                              "w-10 text-center font-semibold",
                              log.status === 200 ? "text-accent" : "text-destructive"
                            )}>
                              {log.status}
                            </span>
                            <span className="text-foreground truncate">{log.method}</span>
                            <span className="text-muted-foreground ml-auto hidden sm:inline">{log.chain}</span>
                            <span className="text-primary w-12 text-right shrink-0">{log.latency}</span>
                          </div>
                        ))}
                      </div>
                    </TerminalCard>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* API Keys Tab */}
            {activeTab === "keys" && (
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
                <motion.div variants={fade} className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
                    <p className="text-xs text-muted-foreground mt-1">Generate, rotate, and revoke keys. Treat them like passwords.</p>
                  </div>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Key className="h-4 w-4 mr-2" /> Create Key
                  </Button>
                </motion.div>
                {mockKeys.map((k) => (
                  <motion.div key={k.name} variants={fade} className="terminal-border p-5 hover:border-primary/20 transition-colors">
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
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Usage Tab */}
            {activeTab === "usage" && (
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={fade} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard label="This Month" value="847M" sub="of 1B quota" accent />
                  <MetricCard label="Daily Average" value="28.2M" sub="requests/day" />
                  <MetricCard label="Peak Hour" value="4.1M" sub="requests/hour" />
                  <MetricCard label="Compute Units" value="12.4B" sub="CU consumed" />
                </motion.div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <motion.div variants={fade}>
                    <TerminalCard title="usage-by-chain">
                      <div className="space-y-4">
                        <UsageBar label="Ethereum" value={320_000_000} max={350_000_000} />
                        <UsageBar label="Polygon" value={210_000_000} max={350_000_000} />
                        <UsageBar label="Arbitrum" value={140_000_000} max={350_000_000} />
                        <UsageBar label="Base" value={87_000_000} max={350_000_000} />
                        <UsageBar label="Solana" value={52_000_000} max={350_000_000} />
                        <UsageBar label="Other" value={38_000_000} max={350_000_000} />
                      </div>
                    </TerminalCard>
                  </motion.div>
                  <motion.div variants={fade}>
                    <TerminalCard title="usage-by-method">
                      <div className="space-y-4">
                        <UsageBar label="eth_call" value={290_000_000} max={300_000_000} />
                        <UsageBar label="eth_getBalance" value={180_000_000} max={300_000_000} />
                        <UsageBar label="eth_getLogs" value={120_000_000} max={300_000_000} />
                        <UsageBar label="eth_blockNumber" value={95_000_000} max={300_000_000} />
                        <UsageBar label="eth_sendRawTransaction" value={42_000_000} max={300_000_000} />
                      </div>
                    </TerminalCard>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Networks Tab */}
            {activeTab === "networks" && (
              <motion.div variants={stagger} initial="hidden" animate="show">
                <motion.div variants={fade} className="terminal-border overflow-hidden">
                  {/* Desktop header */}
                  <div className="hidden md:grid grid-cols-[1.2fr_1.2fr_0.8fr_1fr_0.8fr] gap-4 px-5 py-3 border-b border-border bg-secondary/30 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    <span>Network</span>
                    <span>Status</span>
                    <span>Latency</span>
                    <span>Requests (30d)</span>
                    <span className="text-right">Uptime</span>
                  </div>
                  <div className="divide-y divide-border">
                    {networkData.map((n) => (
                      <div key={n.name} className="px-5 py-4 hover:bg-secondary/20 transition-colors">
                        {/* Desktop */}
                        <div className="hidden md:grid grid-cols-[1.2fr_1.2fr_0.8fr_1fr_0.8fr] gap-4 items-center">
                          <span className="text-sm font-medium text-foreground">{n.name}</span>
                          <StatusDot status={n.status} label="Operational" />
                          <span className="text-sm font-mono text-accent">{n.latency}</span>
                          <span className="text-sm font-mono text-muted-foreground">{n.requests}</span>
                          <span className="text-sm font-mono text-foreground text-right">{n.uptime}</span>
                        </div>
                        {/* Mobile */}
                        <div className="md:hidden space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{n.name}</span>
                            <StatusDot status={n.status} />
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                            <div>
                              <p className="text-muted-foreground/70 uppercase tracking-wider text-[10px]">Latency</p>
                              <p className="text-accent">{n.latency}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground/70 uppercase tracking-wider text-[10px]">Requests</p>
                              <p className="text-muted-foreground">{n.requests}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-muted-foreground/70 uppercase tracking-wider text-[10px]">Uptime</p>
                              <p className="text-foreground">{n.uptime}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-2xl">
                <motion.div variants={fade} className="terminal-border p-6">
                  <h3 className="font-semibold text-foreground mb-1">Project Settings</h3>
                  <p className="text-xs text-muted-foreground mb-5">Configure your project's identity and integrations.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project Name</label>
                      <Input className="mt-1.5 font-mono" defaultValue="ramptium-prod" />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Webhook URL</label>
                      <Input className="mt-1.5 font-mono" placeholder="https://your-app.com/webhook" />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">IP Allowlist</label>
                      <textarea
                        className="mt-1.5 w-full bg-background border border-input rounded-md px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background h-24 resize-none"
                        placeholder="One CIDR per line, e.g. 192.168.1.0/24"
                      />
                    </div>
                  </div>
                  <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                </motion.div>
                <motion.div variants={fade} className="terminal-border p-6 border-destructive/30">
                  <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Permanently delete this project and all associated data. This action cannot be undone.</p>
                  <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive">Delete Project</Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
