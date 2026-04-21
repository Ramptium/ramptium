import { useEffect, useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Key, BarChart3, FileText, Loader2, Zap, Gauge, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const fade = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

interface Subscription {
  plan: string;
  status: string;
  monthly_request_limit: number;
}

interface UsageRow {
  request_count: number;
  error_count: number;
  avg_latency_ms: number;
  day: string;
}

interface RecentLog {
  id: string;
  method: string;
  chain: string;
  status_code: number;
  latency_ms: number;
  created_at: string;
}

function formatNumber(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
}

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usageMonth, setUsageMonth] = useState<UsageRow[]>([]);
  const [keyCount, setKeyCount] = useState(0);
  const [recentLogs, setRecentLogs] = useState<RecentLog[]>([]);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      const monthStart = new Date();
      monthStart.setDate(1);
      const monthStartIso = monthStart.toISOString().slice(0, 10);

      const [subRes, usageRes, keysRes, logsRes] = await Promise.all([
        supabase.from("subscriptions").select("plan,status,monthly_request_limit").eq("user_id", user.id).maybeSingle(),
        supabase.from("usage_stats").select("request_count,error_count,avg_latency_ms,day").eq("user_id", user.id).gte("day", monthStartIso),
        supabase.from("api_keys").select("id", { count: "exact", head: true }).eq("user_id", user.id).is("revoked_at", null),
        supabase.from("rpc_logs").select("id,method,chain,status_code,latency_ms,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(8),
      ]);

      if (cancelled) return;
      setSubscription(subRes.data ?? null);
      setUsageMonth(usageRes.data ?? []);
      setKeyCount(keysRes.count ?? 0);
      setRecentLogs(logsRes.data ?? []);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [user]);

  const totalRequests = usageMonth.reduce((s, r) => s + Number(r.request_count || 0), 0);
  const totalErrors = usageMonth.reduce((s, r) => s + Number(r.error_count || 0), 0);
  const avgLatency = usageMonth.length
    ? Math.round(usageMonth.reduce((s, r) => s + Number(r.avg_latency_ms || 0), 0) / usageMonth.length)
    : 0;
  const errorRate = totalRequests > 0 ? ((totalErrors / totalRequests) * 100).toFixed(3) : "0.000";
  const quota = subscription?.monthly_request_limit ?? 100_000;
  const quotaPct = Math.min(100, (totalRequests / quota) * 100);
  const userLabel = user?.email?.split("@")[0] ?? "builder";

  return (
    <>
      <SEO
        title={"Dashboard — API Keys, Usage & Network Status | Ramptium"}
        description={"Manage API keys, monitor request volume and latency, inspect real-time logs, and track network health across every supported chain."}
        keywords={"web3 API dashboard, RPC usage monitoring, API key management"}
      />
      <DashboardLayout
        title="Overview"
        description={user?.email ? `${greeting}, ${userLabel}` : "Workspace overview"}
        eyebrow="Console"
      >
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-6">
            <motion.div variants={fade} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Requests (MTD)"
                value={formatNumber(totalRequests)}
                sub={`of ${formatNumber(quota)} quota`}
                accent
                icon={<Activity className="h-3.5 w-3.5" />}
              />
              <MetricCard
                label="Avg Latency"
                value={`${avgLatency}ms`}
                sub="across active chains"
                icon={<Gauge className="h-3.5 w-3.5" />}
              />
              <MetricCard
                label="Error Rate"
                value={`${errorRate}%`}
                sub="last 30 days"
                icon={<AlertTriangle className="h-3.5 w-3.5" />}
              />
              <MetricCard
                label="Active Keys"
                value={String(keyCount)}
                sub={subscription ? `${subscription.plan} plan` : "free plan"}
                icon={<Key className="h-3.5 w-3.5" />}
              />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div variants={fade}>
                <TerminalCard title="quota">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-mono text-muted-foreground">Monthly usage</span>
                        <span className="font-mono text-foreground">{formatNumber(totalRequests)} / {formatNumber(quota)}</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${quotaPct}%` }} />
                      </div>
                      <p className="mt-2 text-xs font-mono text-muted-foreground">{quotaPct.toFixed(1)}% used</p>
                    </div>
                    <div className="pt-4 border-t border-border space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan</span>
                        <span className="font-mono text-foreground capitalize">{subscription?.plan ?? "free"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-mono text-accent capitalize">{subscription?.status ?? "active"}</span>
                      </div>
                    </div>
                    <Link to="/dashboard/usage">
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        View detailed usage <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </TerminalCard>
              </motion.div>

              <motion.div variants={fade}>
                <TerminalCard title="recent-requests" bodyClassName="p-0">
                  {recentLogs.length === 0 ? (
                    <div className="px-5 py-12 text-center">
                      <Activity className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">No requests yet</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">Create an API key to start routing traffic.</p>
                      <Link to="/dashboard/api-keys">
                        <Button size="sm" variant="outline" className="mt-4">
                          <Key className="h-3.5 w-3.5 mr-2" /> Create API key
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-border max-h-[340px] overflow-y-auto">
                      {recentLogs.map((log) => (
                        <div key={log.id} className="flex items-center gap-3 text-xs font-mono px-4 py-2.5 hover:bg-secondary/30 transition-colors">
                          <span className="text-muted-foreground w-20 shrink-0">
                            {new Date(log.created_at).toLocaleTimeString([], { hour12: false })}
                          </span>
                          <span className={cn(
                            "w-10 text-center font-semibold",
                            log.status_code < 400 ? "text-accent" : "text-destructive"
                          )}>{log.status_code}</span>
                          <span className="text-foreground truncate">{log.method}</span>
                          <span className="text-muted-foreground ml-auto hidden sm:inline">{log.chain}</span>
                          <span className="text-primary w-12 text-right shrink-0">{log.latency_ms}ms</span>
                        </div>
                      ))}
                    </div>
                  )}
                </TerminalCard>
              </motion.div>
            </div>

            <motion.div variants={fade} className="grid sm:grid-cols-3 gap-4">
              <Link to="/dashboard/api-keys" className="terminal-border p-5 hover:border-primary/30 transition-colors group">
                <Key className="h-5 w-5 text-primary mb-3" />
                <p className="font-medium text-foreground">API Keys</p>
                <p className="text-xs text-muted-foreground mt-1">Create, rotate, revoke</p>
              </Link>
              <Link to="/dashboard/usage" className="terminal-border p-5 hover:border-primary/30 transition-colors group">
                <BarChart3 className="h-5 w-5 text-primary mb-3" />
                <p className="font-medium text-foreground">Usage</p>
                <p className="text-xs text-muted-foreground mt-1">Per-chain breakdown</p>
              </Link>
              <Link to="/dashboard/logs" className="terminal-border p-5 hover:border-primary/30 transition-colors group">
                <FileText className="h-5 w-5 text-primary mb-3" />
                <p className="font-medium text-foreground">Logs</p>
                <p className="text-xs text-muted-foreground mt-1">Live request stream</p>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </DashboardLayout>
    </>
  );
}
