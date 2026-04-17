import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe, Shield, Layers, Activity, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TerminalCard } from "@/components/shared/TerminalCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { StatusDot } from "@/components/shared/StatusDot";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const networks = [
  { name: "Ethereum", status: "operational" as const, latency: "12ms" },
  { name: "Polygon", status: "operational" as const, latency: "8ms" },
  { name: "Arbitrum", status: "operational" as const, latency: "6ms" },
  { name: "Solana", status: "operational" as const, latency: "4ms" },
  { name: "Base", status: "operational" as const, latency: "7ms" },
  { name: "Avalanche", status: "operational" as const, latency: "9ms" },
];

const features = [
  { icon: Layers, title: "Multi-Chain RPC", desc: "Unified endpoint routing to 40+ networks with automatic failover and load balancing." },
  { icon: Zap, title: "Liquidity Engine", desc: "Aggregate liquidity across DEXs and bridges for optimal execution pricing." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II compliant infrastructure with end-to-end encryption." },
  { icon: Activity, title: "Real-Time Analytics", desc: "Comprehensive observability with sub-second latency metrics and alerts." },
  { icon: Globe, title: "Global Edge Network", desc: "200+ edge nodes across 6 continents for minimal latency worldwide." },
  { icon: Code, title: "Developer SDK", desc: "Type-safe SDKs for TypeScript, Python, Rust, and Go with full API coverage." },
];

const sampleCode = `import { Ramptium } from '@ramptium/sdk';

const client = new Ramptium({
  apiKey: process.env.RAMPTIUM_API_KEY,
  network: 'ethereum',
});

// Route liquidity across DEXs
const quote = await client.liquidity.getQuote({
  tokenIn: 'USDC',
  tokenOut: 'ETH',
  amount: '10000',
  slippage: 0.5,
});

const tx = await client.execute(quote);
console.log(\`Executed: \${tx.hash}\`);`;

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={"Ramptium — Web3 Infrastructure: Liquidity, Access & Execution"} description={"The infrastructure layer for Web3. Multi-chain RPC access, liquidity routing, and transaction execution with 99.99% uptime across 40+ networks."} keywords={"web3 infrastructure, blockchain API, RPC provider, crypto liquidity routing, multi-chain access"} jsonLd={{"@context":"https://schema.org","@type":"Organization","name":"Ramptium","url":"https://ramptium.lovable.app","description":"Web3 infrastructure layer for liquidity routing, blockchain access, and execution.","logo":"https://ramptium.lovable.app/favicon.png"}} />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="container relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={fade} className="flex items-center gap-2 mb-6">
              <StatusDot status="operational" />
              <span className="text-xs font-mono text-muted-foreground">All systems operational</span>
            </motion.div>
            <motion.h1 variants={fade} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
              The Infrastructure Layer for{" "}
              <span className="text-gradient">Web3</span>
            </motion.h1>
            <motion.p variants={fade} className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Enterprise-grade liquidity routing, blockchain access, and transaction execution. 
              One API for every chain, every protocol, every trade.
            </motion.p>
            <motion.div variants={fade} className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                  Start Building <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  Read the Docs
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="border-y border-border bg-card/50">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard label="Uptime" value="99.99%" sub="Last 90 days" />
            <MetricCard label="Requests / Day" value="2.4B" sub="Across all chains" accent />
            <MetricCard label="Networks" value="40+" sub="L1 & L2 supported" />
            <MetricCard label="Avg Latency" value="<12ms" sub="Global p50" accent />
          </div>
        </div>
      </section>

      {/* Network Status */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                One endpoint.<br />Every network.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                Ramptium abstracts multi-chain complexity into a single, reliable API. 
                Automatic failover, intelligent routing, and real-time network health—built in.
              </p>
              <TerminalCard title="network-status" className="mt-8">
                <div className="space-y-3">
                  {networks.map((n) => (
                    <div key={n.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <StatusDot status={n.status} />
                        <span className="text-sm font-mono text-foreground">{n.name}</span>
                      </div>
                      <span className="text-xs font-mono text-accent">{n.latency}</span>
                    </div>
                  ))}
                </div>
              </TerminalCard>
            </div>
            <CodeBlock code={sampleCode} language="typescript" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Built for Production</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Every component designed for reliability at scale. From routing to execution, Ramptium handles the infrastructure so you can focus on product.
            </p>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <motion.div key={f.title} variants={fade} className="terminal-border p-6 hover:border-primary/30 transition-colors group">
                <f.icon className="h-5 w-5 text-primary mb-4 group-hover:text-accent transition-colors" />
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Ready to build?</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Get your API key in seconds. Free tier includes 100M requests/month.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
