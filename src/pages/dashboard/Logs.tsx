import { useEffect, useMemo, useState } from "react";
import { Loader2, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UsageRow {
  date: string;
  request_count: number;
  success_count: number;
  error_count: number;
  billable_units: number;
  latency_p50: number | null;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export default function Usage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<UsageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("usage_aggregates_daily" as never)
        .select(
          "date, request_count, success_count, error_count, billable_units, latency_p50"
        )
        .order("date", { ascending: false });

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setRows([]);
      } else {
        setRows((data as UsageRow[]) ?? []);
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const summary = useMemo(() => {
    const totalRequests = rows.reduce((sum, row) => sum + (row.request_count ?? 0), 0);
    const totalSuccess = rows.reduce((sum, row) => sum + (row.success_count ?? 0), 0);
    const totalErrors = rows.reduce((sum, row) => sum + (row.error_count ?? 0), 0);
    const totalBillable = rows.reduce((sum, row) => sum + (row.billable_units ?? 0), 0);

    const latencyRows = rows.filter((row) => typeof row.latency_p50 === "number");
    const avgLatencyP50 =
      latencyRows.length > 0
        ? Math.round(
            latencyRows.reduce((sum, row) => sum + (row.latency_p50 ?? 0), 0) /
              latencyRows.length
          )
        : 0;

    const errorRate =
      totalRequests > 0 ? ((totalErrors / totalRequests) * 100).toFixed(2) : "0.00";

    return {
      totalRequests,
      totalSuccess,
      totalErrors,
      totalBillable,
      avgLatencyP50,
      errorRate,
    };
  }, [rows]);

  return (
    <>
      <SEO
        title="Usage — Ramptium"
        description="Daily infrastructure metrics including requests, success rate, latency, and billable units."
      />

      <DashboardLayout
        title="Usage"
        description="Daily infrastructure metrics"
        eyebrow="Console / Usage"
      >
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <TerminalCard title="usage-error">
            <p className="text-sm text-destructive">{error}</p>
          </TerminalCard>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Total Requests"
                value={formatNumber(summary.totalRequests)}
                sub="from daily aggregates"
                accent
              />
              <MetricCard
                label="Successful"
                value={formatNumber(summary.totalSuccess)}
                sub={`${summary.errorRate}% error rate`}
              />
              <MetricCard
                label="Avg p50 Latency"
                value={`${summary.avgLatencyP50}ms`}
                sub="daily average"
              />
              <MetricCard
                label="Billable Units"
                value={formatNumber(summary.totalBillable)}
                sub="current period"
              />
            </div>

            <TerminalCard title="usage-by-day">
              {rows.length === 0 ? (
                <div className="py-12 text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-foreground">No usage data yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Request activity will appear here once traffic starts flowing.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {rows.map((row) => {
                    const errorRate = row.request_count
                      ? (row.error_count / row.request_count) * 100
                      : 0;

                    return (
                      <div key={row.date} className="terminal-border p-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-sm text-foreground">
                            {row.date}
                          </span>
                          <span className="font-mono text-primary">
                            {formatNumber(row.request_count)} req
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                          <span>Success: {formatNumber(row.success_count)}</span>
                          <span>Errors: {formatNumber(row.error_count)}</span>
                          <span>Error rate: {errorRate.toFixed(2)}%</span>
                          <span>Latency p50: {row.latency_p50 ?? 0}ms</span>
                          <span>Billable: {formatNumber(row.billable_units)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TerminalCard>
          </div>
        )}
      </DashboardLayout>
    </>
  );
  }
