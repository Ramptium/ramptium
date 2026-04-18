import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { cn } from "@/lib/utils";

const logs = [
  { time: "14:23:01.234", method: "eth_call", chain: "ethereum", status: 200, latency: "8ms" },
  { time: "14:23:01.187", method: "eth_getBalance", chain: "polygon", status: 200, latency: "4ms" },
  { time: "14:23:01.142", method: "eth_sendRawTransaction", chain: "arbitrum", status: 200, latency: "12ms" },
  { time: "14:23:01.098", method: "eth_blockNumber", chain: "base", status: 200, latency: "3ms" },
  { time: "14:23:00.971", method: "eth_getLogs", chain: "ethereum", status: 200, latency: "24ms" },
  { time: "14:23:00.887", method: "eth_estimateGas", chain: "optimism", status: 200, latency: "6ms" },
  { time: "14:23:00.812", method: "eth_getTransactionReceipt", chain: "polygon", status: 429, latency: "2ms" },
  { time: "14:23:00.756", method: "eth_call", chain: "avalanche", status: 200, latency: "9ms" },
  { time: "14:23:00.701", method: "eth_getCode", chain: "ethereum", status: 200, latency: "11ms" },
  { time: "14:23:00.612", method: "eth_chainId", chain: "base", status: 200, latency: "2ms" },
  { time: "14:23:00.543", method: "eth_call", chain: "arbitrum", status: 200, latency: "5ms" },
  { time: "14:23:00.487", method: "eth_getStorageAt", chain: "ethereum", status: 200, latency: "13ms" },
];

export default function Logs() {
  return (
    <>
      <SEO title={"Request Logs — Console | Ramptium"} description={"Real-time request logs with method, chain, status, and latency for every API call."} />
      <DashboardLayout title="Logs" description="Live request stream from your workspace." eyebrow="Console / Logs">
        <TerminalCard title="request-stream" bodyClassName="p-0">
          <div className="hidden md:grid grid-cols-[1fr_0.6fr_2fr_1fr_0.6fr] gap-4 px-4 py-2.5 border-b border-border bg-secondary/30 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            <span>Time</span>
            <span>Status</span>
            <span>Method</span>
            <span>Chain</span>
            <span className="text-right">Latency</span>
          </div>
          <div className="divide-y divide-border">
            {logs.map((log, i) => (
              <div key={i} className="grid grid-cols-[1fr_0.6fr_2fr_1fr_0.6fr] gap-4 items-center text-xs font-mono px-4 py-2.5 hover:bg-secondary/30 transition-colors">
                <span className="text-muted-foreground truncate">{log.time}</span>
                <span className={cn("font-semibold", log.status === 200 ? "text-accent" : "text-destructive")}>{log.status}</span>
                <span className="text-foreground truncate">{log.method}</span>
                <span className="text-muted-foreground truncate">{log.chain}</span>
                <span className="text-primary text-right">{log.latency}</span>
              </div>
            ))}
          </div>
        </TerminalCard>
      </DashboardLayout>
    </>
  );
}
