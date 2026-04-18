import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { StatusDot } from "@/components/shared/StatusDot";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

const chains = [
  { name: "Ethereum", type: "L1", nodes: 42, latency: "12ms", uptime: "99.99%" },
  { name: "Polygon", type: "L1", nodes: 28, latency: "8ms", uptime: "99.99%" },
  { name: "Arbitrum", type: "L2", nodes: 24, latency: "6ms", uptime: "100%" },
  { name: "Base", type: "L2", nodes: 22, latency: "7ms", uptime: "99.98%" },
  { name: "Optimism", type: "L2", nodes: 20, latency: "5ms", uptime: "100%" },
  { name: "Solana", type: "L1", nodes: 18, latency: "4ms", uptime: "99.97%" },
  { name: "Avalanche", type: "L1", nodes: 16, latency: "9ms", uptime: "99.99%" },
  { name: "BNB Chain", type: "L1", nodes: 16, latency: "11ms", uptime: "99.98%" },
  { name: "zkSync Era", type: "L2", nodes: 14, latency: "7ms", uptime: "99.97%" },
  { name: "Linea", type: "L2", nodes: 12, latency: "8ms", uptime: "99.96%" },
  { name: "Scroll", type: "L2", nodes: 10, latency: "9ms", uptime: "99.95%" },
  { name: "Polygon zkEVM", type: "L2", nodes: 10, latency: "10ms", uptime: "99.95%" },
];

const regions = [
  { name: "North America", nodes: 78, pct: 100 },
  { name: "Europe", nodes: 64, pct: 82 },
  { name: "Asia-Pacific", nodes: 52, pct: 67 },
  { name: "South America", nodes: 18, pct: 23 },
  { name: "Middle East", nodes: 12, pct: 15 },
  { name: "Africa", nodes: 8, pct: 10 },
];

export default function Network() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={"Network — Supported Chains & Global Edge Coverage | Ramptium"}
        description={"40+ networks, 200+ edge nodes, 6 continents. Inspect Ramptium's multi-chain coverage, regional latency, and node distribution."}
        keywords={"multi-chain RPC, blockchain node coverage, web3 edge network, global RPC nodes"}
      />
      <Navbar />

      <section className="pt-32 pb-12">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Network</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
              200+ edge nodes. 40+ chains. One endpoint.
            </motion.h1>
            <motion.p variants={fade} className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Geographically distributed infrastructure with sub-12ms p50 latency worldwide. Every chain, every region, automatically routed.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard label="Networks" value="40+" sub="L1 & L2" />
            <MetricCard label="Edge Nodes" value="232" sub="6 continents" accent />
            <MetricCard label="Regions" value="14" sub="Active POPs" />
            <MetricCard label="p50 Latency" value="<12ms" sub="Global" accent />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <TerminalCard title="supported-chains" bodyClassName="p-0">
            <div className="hidden md:grid grid-cols-[1.4fr_0.6fr_0.8fr_0.8fr_0.8fr] gap-4 px-5 py-3 border-b border-border bg-secondary/30 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <span>Network</span>
              <span>Type</span>
              <span>Nodes</span>
              <span>Latency</span>
              <span className="text-right">Uptime</span>
            </div>
            <div className="divide-y divide-border max-h-[520px] overflow-y-auto">
              {chains.map((c) => (
                <div key={c.name} className="px-5 py-3 hover:bg-secondary/20 transition-colors">
                  <div className="hidden md:grid grid-cols-[1.4fr_0.6fr_0.8fr_0.8fr_0.8fr] gap-4 items-center">
                    <div className="flex items-center gap-2.5">
                      <StatusDot status="operational" />
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{c.type}</span>
                    <span className="text-sm font-mono text-foreground">{c.nodes}</span>
                    <span className="text-sm font-mono text-accent">{c.latency}</span>
                    <span className="text-sm font-mono text-foreground text-right">{c.uptime}</span>
                  </div>
                  <div className="md:hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><StatusDot status="operational" /><span className="text-sm font-medium text-foreground">{c.name}</span></div>
                      <span className="text-xs font-mono text-muted-foreground">{c.type}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs font-mono">
                      <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Nodes</p><p className="text-foreground">{c.nodes}</p></div>
                      <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Latency</p><p className="text-accent">{c.latency}</p></div>
                      <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Uptime</p><p className="text-foreground">{c.uptime}</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TerminalCard>

          <TerminalCard title="regional-coverage">
            <div className="space-y-4">
              {regions.map((r) => (
                <div key={r.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-foreground">{r.name}</span>
                    <span className="text-muted-foreground">{r.nodes} nodes</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border text-xs font-mono text-muted-foreground">
              Auto-routing selects the lowest-latency POP for each request. Failover is region-aware.
            </div>
          </TerminalCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
