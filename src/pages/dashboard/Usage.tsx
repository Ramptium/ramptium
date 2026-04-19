import { useEffect, useState } from "react";
import { Loader2, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/shared/MetricCard";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UsageRow {
  day: string;
  chain: string;
  request_count: number;
  error_count: number;
  avg_latency_ms: number;
}

function formatNumber(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
}

function UsageBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-mono text-muted-foreground capitalize">{label}</span>
        <span className="font-mono text-foreground">{formatNumber(value)}</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Usage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<UsageRow[]>([]);
  const [subscription, setSubscription] = useState<{ monthly_request_limit: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const monthStart = new Date();
      monthStart.setDate(1);
      const monthStartIso = monthStart.toISOString().slice(0, 10);

      const [usageRes, subRes] = await Promise.all([
        supabase.from("usage_stats").select("day,chain,request_count,error_count,avg_latency_ms").eq("user_id", user.id).gte("day", monthStartIso),
        supabase.from("subscriptions").select("monthly_request_limit").eq("user_id", user.id).maybeSingle(),
      ]);
      if (cancelled) return;
      setRows(usageRes.data ?? []);
      setSubscription(subRes.data ?? null);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user]);

  const totalRequests = rows.reduce((s, r) => s + Number(r.request_count || 0), 0);
  const days = new Set(rows.map((r) => r.day)).size || 1;
  const dailyAvg = totalRequests / days;
  const totalErrors = rows.reduce((s, r) => s + Number(r.error_count || 0), 0);

  const byChain = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.chain] = (acc[r.chain] ?? 0) + Number(r.request_count || 0);
    return acc;
  }, {});
  const chainEntries = Object.entries(byChain).sort((a, b) => b[1] - a[1]);
  const maxChain = chainEntries[0]?.[1] ?? 1;

  const quota = subscription?.monthly_request_limit ?? 100_000;

  return (
    <>
      <SEO title={"Usage Metrics — Console | Ramptium"} description={"Track requests, compute units, and per-chain usage across your Ramptium workspace."} />
      <DashboardLayout title="Usage" description="Track requests across chains and methods." eyebrow="Console / Usage">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard label="This Month" value={formatNumber(totalRequests)} sub={`of ${formatNumber(quota)} quota`} accent />
              <MetricCard label="Daily Average" value={formatNumber(dailyAvg)} sub="requests/day" />
              <MetricCard label="Errors" value={formatNumber(totalErrors)} sub="last 30 days" />
              <MetricCard label="Active Chains" value={String(chainEntries.length)} sub="this month" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <TerminalCard title="usage-by-chain">
                {chainEntries.length === 0 ? (
                  <div className="py-12 text-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No usage recorded yet</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Data appears here once requests start flowing.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chainEntries.map(([chain, value]) => (
                      <UsageBar key={chain} label={chain} value={value} max={maxChain} />
                    ))}
                  </div>
                )}
              </TerminalCard>
              <TerminalCard title="quota-progress">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-mono text-muted-foreground">Monthly</span>
                      <span className="font-mono text-foreground">{formatNumber(totalRequests)} / {formatNumber(quota)}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${Math.min(100, (totalRequests / quota) * 100)}%` }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                    Quota resets on the 1st of every month. Overage billed automatically when payment is configured.
                  </p>
                </div>
              </TerminalCard>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
