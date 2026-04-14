import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity, Key, BarChart3, Globe, Settings, Copy, Eye, EyeOff,
  RefreshCw, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  { name: "Production", key: "rpt_live_a8f3k29x...d7e1", created: "2026-03-12", requests: "847M", status: "active" },
  { name: "Staging", key: "rpt_test_b2c4m91y...f3a8", created: "2026-03-15", requests: "12.4M", status: "active" },
  { name: "Development", key: "rpt_dev_c9d2n47z...e5b2", created: "2026-04-01", requests: "340K", status: "active" },
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

// Simple bar chart component
function UsageBar({ label, value, max, color }: { label: string; value: number; max: number; color?: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-mono text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{(value / 1e6).toFixed(1)}M</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showKey, setShowKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container py-8">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            {/* Header */}
            <motion.div variants={fade} className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Monitor your infrastructure in real-time</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot status="operational" label="All systems operational" />
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fade} className="flex gap-1 mb-8 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div variants={stagger} className="space-y-6">
                <motion.div variants={fade} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard label="Requests Today" value="82.4M" sub="+12.3% from yesterday" accent />
                  <MetricCard label="Avg Latency" value="8.2ms" sub="p50 global" />
                  <MetricCard label="Error Rate" value="0.003%" sub="Last 24 hours" accent />
                  <MetricCard label="Active Keys" value="3" sub="0 rate limited" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Usage over time */}
                  <motion.div variants={fade}>
                    <TerminalCard title="requests-24h">
                      <div className="space-y-4">
                        <UsageBar label="00:00 - 06:00" value={24_300_000} max={40_000_000} />
                        <UsageBar label="06:00 - 12:00" value={31_200_000} max={40_000_000} />
                        <UsageBar label="12:00 - 18:00" value={38_700_000} max={40_000_000} />
                        <UsageBar label="18:00 - Now" value={18_400_000} max={40_000_000} />
                      </div>
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">Quota: 1B / month</span>
                        <span className="text-xs font-mono text-accent">847M used (84.7%)</span>
                      </div>
                    </TerminalCard>
                  </motion.div>

                  {/* Recent requests */}
                  <motion.div variants={fade}>
                    <TerminalCard title="request-log">
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {mockLogs.map((log, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs font-mono">
                            <span className="text-muted-foreground w-24 shrink-0">{log.time}</span>
                            <span className={cn(
                              "w-8 text-center",
                              log.status === 200 ? "text-accent" : "text-destructive"
                            )}>
                              {log.status}
                            </span>
                            <span className="text-foreground shrink-0">{log.method}</span>
                            <span className="text-muted-foreground ml-auto">{log.chain}</span>
                            <span className="text-primary w-12 text-right">{log.latency}</span>
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
              <motion.div variants={stagger} className="space-y-4">
                <motion.div variants={fade} className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    <Key className="h-4 w-4 mr-2" /> Create Key
                  </Button>
                </motion.div>
                {mockKeys.map((k) => (
                  <motion.div key={k.name} variants={fade} className="terminal-border p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{k.name}</h3>
                          <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">{k.status}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-sm font-mono text-muted-foreground">
                            {showKey === k.name ? k.key.replace("...", "4f8b2a91c3") : k.key}
                          </code>
                          <button onClick={() => setShowKey(showKey === k.name ? null : k.name)} className="text-muted-foreground hover:text-foreground">
                            {showKey === k.name ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                          <button className="text-muted-foreground hover:text-foreground">
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <span className="font-mono">Created {k.created}</span>
                        <span className="font-mono">{k.requests} requests</span>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Rotate
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Usage Tab */}
            {activeTab === "usage" && (
              <motion.div variants={stagger} className="space-y-6">
                <motion.div variants={fade} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard label="This Month" value="847M" sub="of 1B quota" accent />
                  <MetricCard label="Daily Average" value="28.2M" sub="requests/day" />
                  <MetricCard label="Peak Hour" value="4.1M" sub="requests/hour" />
                  <MetricCard label="Compute Units" value="12.4B" sub="CU consumed" />
                </motion.div>
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
              </motion.div>
            )}

            {/* Networks Tab */}
            {activeTab === "networks" && (
              <motion.div variants={stagger}>
                <motion.div variants={fade} className="terminal-border overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-border bg-secondary/30 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    <span>Network</span>
                    <span>Status</span>
                    <span>Latency</span>
                    <span>Requests (30d)</span>
                    <span>Uptime</span>
                  </div>
                  {networkData.map((n) => (
                    <div key={n.name} className="grid grid-cols-5 gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                      <span className="text-sm font-medium text-foreground">{n.name}</span>
                      <StatusDot status={n.status} label="Operational" />
                      <span className="text-sm font-mono text-accent">{n.latency}</span>
                      <span className="text-sm font-mono text-muted-foreground">{n.requests}</span>
                      <span className="text-sm font-mono text-foreground">{n.uptime}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div variants={stagger} className="space-y-6 max-w-2xl">
                <motion.div variants={fade} className="terminal-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Project Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project Name</label>
                      <input className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="ramptium-prod" />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Webhook URL</label>
                      <input className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://your-app.com/webhook" />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">IP Allowlist</label>
                      <textarea className="mt-1 w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary h-20 resize-none" placeholder="One IP per line..." />
                    </div>
                  </div>
                  <Button className="mt-6 bg-primary text-primary-foreground">Save Changes</Button>
                </motion.div>
                <motion.div variants={fade} className="terminal-border p-6 border-destructive/30">
                  <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Permanently delete this project and all associated data.</p>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">Delete Project</Button>
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
