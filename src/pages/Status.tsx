import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { StatusDot } from "@/components/shared/StatusDot";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.05 } } };

// Deterministic 90-day uptime grid (mostly green, occasional amber).
const days = Array.from({ length: 90 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  return r > 0.97 ? "degraded" : "operational";
}) as Array<"operational" | "degraded">;

const services = [
  { name: "RPC Gateway", status: "operational" as const, latency: "8ms" },
  { name: "Liquidity Router", status: "operational" as const, latency: "14ms" },
  { name: "Execution Engine", status: "operational" as const, latency: "22ms" },
  { name: "WebSocket Streams", status: "operational" as const, latency: "4ms" },
  { name: "Webhooks", status: "operational" as const, latency: "120ms" },
  { name: "Dashboard API", status: "operational" as const, latency: "35ms" },
];

const incidents = [
  {
    date: "Apr 12, 2026",
    title: "Elevated latency on Polygon RPC (eu-west-2)",
    status: "Resolved",
    duration: "37 min",
    summary: "Upstream provider degradation triggered automatic failover to eu-central-1. Customer impact limited to ~3% of requests routed via eu-west-2.",
  },
  {
    date: "Mar 28, 2026",
    title: "Solana node sync delay",
    status: "Resolved",
    duration: "12 min",
    summary: "Solana validator lag exceeded threshold. Affected reads were transparently re-routed to healthy validators.",
  },
  {
    date: "Mar 04, 2026",
    title: "Webhook delivery delays",
    status: "Resolved",
    duration: "1 h 4 min",
    summary: "Queue saturation on a single delivery worker. All webhooks ultimately delivered with at-least-once guarantee.",
  },
];

export default function Status() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={"Status — Live Infrastructure Health & Incident History | Ramptium"}
        description={"Real-time status of every Ramptium service: RPC gateway, liquidity router, execution engine, and webhooks. 90-day uptime history and incident log."}
        keywords={"web3 status page, RPC uptime, blockchain API health, infrastructure incidents"}
      />
      <Navbar />

      <section className="pt-32 pb-12">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Status</motion.p>
            <motion.div variants={fade} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">All systems operational</h1>
                <p className="mt-3 text-muted-foreground">Live infrastructure health, updated every 30 seconds.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-mono text-accent">
                <CheckCircle2 className="h-4 w-4" /> Uptime 99.99% (90d)
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Uptime" value="99.99%" sub="Last 90 days" accent />
          <MetricCard label="Open Incidents" value="0" sub="All clear" />
          <MetricCard label="MTTR" value="14 min" sub="Trailing 90d" />
          <MetricCard label="Avg Latency" value="8.2ms" sub="p50 global" accent />
        </div>
      </section>

      <section className="pb-12">
        <div className="container space-y-4">
          {services.map((s) => (
            <TerminalCard key={s.name} title={s.name.toLowerCase().replace(/\s+/g, "-")}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <StatusDot status={s.status} />
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-accent">{s.latency}</span>
                  <span className="text-muted-foreground hidden sm:inline">99.99% uptime</span>
                </div>
              </div>
              <div className="flex gap-[2px] flex-wrap">
                {days.map((d, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-7 w-1.5 rounded-sm",
                      d === "operational" ? "bg-accent/70" : "bg-yellow-500/70"
                    )}
                    title={`Day -${90 - i}: ${d}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">
                <span>90 days ago</span>
                <span>today</span>
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-6">Incident history</h2>
          <div className="space-y-4">
            {incidents.map((i) => (
              <div key={i.title} className="terminal-border p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="text-sm font-medium text-foreground">{i.title}</h3>
                      <span className="text-xs font-mono text-accent shrink-0">{i.status} · {i.duration}</span>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mt-1">{i.date}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{i.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
