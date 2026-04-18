import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/shared/MetricCard";
import { TerminalCard } from "@/components/shared/TerminalCard";

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

export default function Usage() {
  return (
    <>
      <SEO title={"Usage Metrics — Console | Ramptium"} description={"Track requests, compute units, and per-chain usage across your Ramptium workspace."} />
      <DashboardLayout title="Usage" description="Track requests and compute units across chains and methods." eyebrow="Console / Usage">
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="This Month" value="847M" sub="of 1B quota" accent />
            <MetricCard label="Daily Average" value="28.2M" sub="requests/day" />
            <MetricCard label="Peak Hour" value="4.1M" sub="requests/hour" />
            <MetricCard label="Compute Units" value="12.4B" sub="CU consumed" />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
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
            <TerminalCard title="usage-by-method">
              <div className="space-y-4">
                <UsageBar label="eth_call" value={290_000_000} max={300_000_000} />
                <UsageBar label="eth_getBalance" value={180_000_000} max={300_000_000} />
                <UsageBar label="eth_getLogs" value={120_000_000} max={300_000_000} />
                <UsageBar label="eth_blockNumber" value={95_000_000} max={300_000_000} />
                <UsageBar label="eth_sendRawTransaction" value={42_000_000} max={300_000_000} />
              </div>
            </TerminalCard>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
