import { motion } from "framer-motion";
import { Building2, Wallet, BarChart3, Code } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const cases = [
  {
    icon: Building2,
    title: "Institutions & Funds",
    desc: "Execute large trades with minimal slippage across fragmented liquidity. Ramptium splits orders across DEXs and routes through optimal paths for best execution.",
    metrics: ["Up to 40% slippage reduction", "Sub-second execution", "Full audit trail"],
  },
  {
    icon: Code,
    title: "DApp Developers",
    desc: "Replace 12 different RPC providers with one reliable endpoint. Automatic failover, WebSocket support, and chain-agnostic APIs let you ship faster.",
    metrics: ["Single SDK, 40+ chains", "99.99% uptime SLA", "Built-in caching"],
  },
  {
    icon: Wallet,
    title: "Wallet Providers",
    desc: "Power wallet infrastructure with reliable transaction submission, gas estimation, and token balance aggregation across every supported network.",
    metrics: ["Real-time gas estimates", "Multi-chain balances", "TX status tracking"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Indexing",
    desc: "Stream on-chain data in real-time via WebSocket subscriptions. Custom filters, event decoding, and webhook delivery for your indexing pipeline.",
    metrics: ["Real-time event streams", "Custom filters", "Webhook delivery"],
  },
];

export default function UseCases() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Use Cases</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl">
              Built for every layer of the stack
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-6">
            {cases.map((c) => (
              <motion.div key={c.title} variants={fade} className="terminal-border p-6 md:p-8 hover:border-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-3 mb-3">
                      <c.icon className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">{c.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="md:w-2/3 flex flex-wrap gap-3 items-start">
                    {c.metrics.map((m) => (
                      <span key={m} className="text-xs font-mono text-accent bg-accent/10 px-3 py-1.5 rounded-md">{m}</span>
                    ))}
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
