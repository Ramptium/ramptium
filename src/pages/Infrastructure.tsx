import { motion } from "framer-motion";
import { Layers, Zap, Globe, Lock, RefreshCw, Cpu } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const layers = [
  {
    icon: Globe,
    title: "Access Layer",
    desc: "Unified RPC endpoints for 40+ blockchains. WebSocket, HTTP, and gRPC protocols with automatic failover across geo-distributed nodes.",
    details: ["Multi-protocol support", "Geo-routing", "Auto-failover", "Rate limit management"],
  },
  {
    icon: Layers,
    title: "Routing Layer",
    desc: "Intelligent request routing with latency-aware load balancing. Requests are directed to the optimal node based on real-time health metrics.",
    details: ["Latency-aware routing", "Health-based selection", "Custom routing rules", "Priority queuing"],
  },
  {
    icon: Zap,
    title: "Execution Layer",
    desc: "Transaction execution engine with MEV protection, gas optimization, and smart nonce management for reliable on-chain operations.",
    details: ["MEV protection", "Gas optimization", "Nonce management", "Tx simulation"],
  },
  {
    icon: RefreshCw,
    title: "Liquidity Layer",
    desc: "Cross-chain liquidity aggregation across 200+ DEXs and bridges. Optimal pricing through multi-path routing algorithms.",
    details: ["200+ DEX sources", "Cross-chain bridges", "Split routing", "Slippage protection"],
  },
  {
    icon: Lock,
    title: "Security Layer",
    desc: "End-to-end encryption, request signing, IP allowlisting, and comprehensive audit logging for enterprise compliance requirements.",
    details: ["E2E encryption", "Request signing", "IP allowlisting", "Audit logging"],
  },
  {
    icon: Cpu,
    title: "Compute Layer",
    desc: "Serverless execution environment for custom indexing, event processing, and automated workflows triggered by on-chain events.",
    details: ["Event processing", "Custom indexing", "Webhooks", "Scheduled jobs"],
  },
];

export default function Infrastructure() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Architecture</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl">
              Six layers. One API.
            </motion.h1>
            <motion.p variants={fade} className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Ramptium's architecture is a vertically integrated stack designed for maximum reliability, minimal latency, and complete observability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-4">
            {layers.map((layer, i) => (
              <motion.div key={layer.title} variants={fade} className="terminal-border p-6 md:p-8 hover:border-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex items-start gap-4 md:w-1/3">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary shrink-0">
                      <layer.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Layer {String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-lg font-semibold text-foreground">{layer.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed md:w-1/3">{layer.desc}</p>
                  <div className="md:w-1/3">
                    <div className="flex flex-wrap gap-2">
                      {layer.details.map((d) => (
                        <span key={d} className="text-xs font-mono text-muted-foreground bg-secondary/50 border border-border/50 px-2.5 py-1 rounded">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
