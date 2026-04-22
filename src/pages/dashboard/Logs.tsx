import { useEffect, useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface LogRow {
  id: string;
  rpc_method: string;
  response_status: number;
  latency_ms: number;
  retry_count: number;
  upstream_provider: string | null;
  created_at: string;
}

export default function Logs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("request_events" as never)
        .select("id,rpc_method,response_status,latency_ms,retry_count,upstream_provider,created_at")
        .order("created_at", { ascending: false })
        .limit(200);

      if (!cancelled) {
        setLogs((data as LogRow[]) ?? []);
        setLoading(false);
      }
    })();

    const channel = supabase
      .channel("request_events_stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "request_events" },
        (payload) => {
          setLogs((prev) => [payload.new as LogRow, ...prev].slice(0, 200));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <>
      <SEO title={"Request Logs — Console | Ramptium"} description={"Real-time request logs with method, provider, status, retry count, and latency for every API call."} />
      <DashboardLayout title="Logs" description="Live request stream from your workspace." eyebrow="Console / Logs">
        <TerminalCard title="request-stream" bodyClassName="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : logs.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-foreground">No logs yet</p>
              <p className="text-xs text-muted-foreground mt-1">Requests routed through Ramptium will stream here in real time.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[1fr_0.6fr_2fr_1fr_0.6fr_0.8fr] gap-4 px-4 py-2.5 border-b border-border bg-secondary/30 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                <span>Time</span>
                <span>Status</span>
                <span>Method</span>
                <span>Provider</span>
                <span>Retries</span>
                <span className="text-right">Latency</span>
              </div>
              <div className="divide-y divide-border max-h-[640px] overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="grid grid-cols-[1fr_0.6fr_2fr_1fr_0.6fr_0.8fr] gap-4 items-center text-xs font-mono px-4 py-2.5 hover:bg-secondary/30 transition-colors">
                    <span className="text-muted-foreground truncate">
                      {new Date(log.created_at).toLocaleTimeString([], { hour12: false })}.{String(new Date(log.created_at).getMilliseconds()).padStart(3, "0")}
                    </span>
                    <span className={cn("font-semibold", log.response_status < 400 ? "text-accent" : "text-destructive")}>{log.response_status}</span>
                    <span className="text-foreground truncate">{log.rpc_method}</span>
                    <span className="text-muted-foreground truncate">{log.upstream_provider ?? "n/a"}</span>
                    <span className="text-muted-foreground truncate">{log.retry_count}</span>
                    <span className="text-primary text-right">{log.latency_ms ?? 0}ms</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </TerminalCard>
      </DashboardLayout>
    </>
  );
}
