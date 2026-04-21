import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Activity,
  Gauge,
  CreditCard,
  GitBranch,
  UserPlus,
  KeyRound,
  Plug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { StatusDot } from "@/components/shared/StatusDot";
import { HeroNetwork } from "@/components/HeroNetwork";
import { GlowOrbs } from "@/components/landing/GlowOrbs";
import { AnimatedNumber } from "@/components/landing/AnimatedNumber";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const chains = [
  { name: "Ethereum", endpoint: "rpc.ramptium.com/ethereum" },
  { name: "Polygon", endpoint: "rpc.ramptium.com/polygon" },
  { name: "Arbitrum", endpoint: "rpc.ramptium.com/arbitrum" },
  { name: "Optimism", endpoint: "rpc.ramptium.com/optimism" },
  { name: "Base", endpoint: "rpc.ramptium.com/base" },
  { name: "BSC", endpoint: "rpc.ramptium.com/bsc" },
  { name: "XRP", endpoint: "rpc.ramptium.com/xrp" },
];

const features = [
  {
    icon: Layers,
    title: "Multi-Chain RPC Routing",
    desc: "Single API key. Every chain. Intelligent endpoint selection with automatic fallback ensures zero downtime.",
    accent: "primary" as const,
  },
  {
    icon: ShieldCheck,
    title: "SHA-256 Hashed API Keys",
    desc: "Your keys are never stored in plaintext. Enterprise-grade security baked into every layer of the stack.",
    accent: "accent" as const,
  },
  {
    icon: Activity,
    title: "Real-Time Usage Tracking",
    desc: "Monitor every request, latency, and error in real time. Full observability from day one.",
    accent: "highlight" as const,
  },
  {
    icon: Gauge,
    title: "Atomic Rate Limiting",
    desc: "Plan-based limits enforced at the database level. No race conditions. No overages slipping through.",
    accent: "primary" as const,
  },
  {
    icon: CreditCard,
    title: "Transparent Billing",
    desc: "Upgrade, downgrade, or cancel instantly. Pricing synced in real time to your account. No surprises.",
    accent: "accent" as const,
  },
  {
    icon: GitBranch,
    title: "Fallback & Redundancy",
    desc: "Every chain has a primary and fallback endpoint. Your requests never hit a dead end.",
    accent: "highlight" as const,
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    desc: "Sign up free. No credit card required.",
  },
  {
    icon: KeyRound,
    title: "Generate your API key",
    desc: "Secure, hashed, ready instantly.",
  },
  {
    icon: Plug,
    title: "Connect your chain",
    desc: "Drop in your endpoint. Start building.",
  },
];

const sampleCode = `// Connect to Ethereum mainnet
const response = await fetch(
  'https://app.ramptium.com/functions/v1/rpc-router',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'rtm_your_api_key',
    },
    body: JSON.stringify({
      chain: 'ethereum',
      method: 'eth_blockNumber',
      params: [],
    }),
  }
);

const { result } = await response.json();
console.log('Latest block:', result);`;

const accentMap = {
  primary: "text-primary",
  accent: "text-accent",
  highlight: "text-highlight",
} as const;

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={"Ramptium — The Infrastructure Layer for Web3"}
        description={"Enterprise-grade RPC access across Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, and XRP. Built for developers who demand reliability, speed, and transparency at scale."}
        keywords={"web3 infrastructure, blockchain API, RPC provider, crypto developer platform, ethereum rpc, polygon rpc"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ramptium",
          url: "https://ramptium.com",
          description: "The infrastructure layer for Web3. Multi-chain RPC access for production builders.",
          logo: "https://ramptium.com/favicon.png",
          parentOrganization: { "@type": "Organization", name: "Netlium", url: "https://netlium.co" },
        }}
      />
      <Navbar />

      {/* ============== HERO ============== */}
      <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
        <GlowOrbs />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <HeroNetwork className="absolute inset-0 w-full h-full opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

        <div className="container relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fade} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass">
              <StatusDot status="operational" />
              <span className="text-xs font-mono text-muted-foreground">All systems operational</span>
            </motion.div>

            <motion.h1
              variants={fade}
              className="mt-8 text-5xl md:text-7xl lg:text-[88px] font-bold tracking-[-0.03em] leading-[1.02] text-foreground"
            >
              The Infrastructure Layer
              <br />
              for <span className="text-gradient">Web3</span>
            </motion.h1>

            <motion.p
              variants={fade}
              className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Enterprise-grade RPC access across every major blockchain. Built for developers
              who demand reliability, speed, and transparency at scale.
            </motion.p>

            <motion.div variants={fade} className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/signup">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary h-12 px-6 text-base">
                  Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/developers">
                <Button size="lg" variant="outline" className="h-12 px-6 text-base border-border/80 hover:border-primary/50 hover:bg-secondary/40">
                  View Documentation
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fade} className="mt-16">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">
                Trusted by developers building on
              </p>
              <div className="mt-5 flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
                {chains.map((c) => (
                  <span
                    key={c.name}
                    className="text-sm font-mono text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============== METRICS ============== */}
      <section className="border-y border-border/60 bg-gradient-surface relative">
        <div className="container py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {[
              { value: 99.99, suffix: "%", decimals: 2, label: "Uptime", sub: "Enterprise SLA" },
              { value: 50, prefix: "<", suffix: "ms", label: "Global Latency", sub: "p50 worldwide" },
              { value: 7, label: "Chains", sub: "Production networks" },
              { value: 1, suffix: "B+", label: "Monthly Requests", sub: "Capacity" },
            ].map((m) => (
              <div key={m.label} className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  <AnimatedNumber
                    value={m.value}
                    prefix={m.prefix ?? ""}
                    suffix={m.suffix ?? ""}
                    decimals={m.decimals ?? 0}
                  />
                </div>
                <p className="mt-2 text-sm text-foreground">{m.label}</p>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="py-24 md:py-32 relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-mono text-primary uppercase tracking-[0.2em]">How it works</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              From signup to first request
              <br />
              in <span className="text-gradient">60 seconds</span>
            </h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6">
            {/* connecting line (desktop) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)) 20%, hsl(var(--border)) 80%, transparent)" }}
            />
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center md:text-left"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card relative z-10 mb-5">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  Step {i + 1}
                </p>
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section className="py-24 md:py-32 border-t border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-mono text-primary uppercase tracking-[0.2em]">Platform</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Infrastructure built for production
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Not a side project. Not a prototype. A serious platform for serious builders.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fade}
                className="group relative terminal-border card-hover p-6 overflow-hidden"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary border border-border mb-5">
                  <f.icon className={`h-5 w-5 ${accentMap[f.accent]}`} />
                </div>
                <h3 className="font-semibold text-foreground text-[17px]">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============== CHAINS ============== */}
      <section className="py-24 md:py-32 border-t border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-mono text-primary uppercase tracking-[0.2em]">Networks</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Every chain. <span className="text-gradient">One endpoint.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {chains.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="terminal-border card-hover p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-foreground font-medium">{c.name}</span>
                  <div className="flex items-center gap-1.5">
                    <StatusDot status="operational" />
                    <span className="text-[10px] font-mono text-success uppercase tracking-wider">Operational</span>
                  </div>
                </div>
                <code className="text-xs font-mono text-muted-foreground block truncate">
                  {c.endpoint}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CODE SNIPPET ============== */}
      <section className="py-24 md:py-32 border-t border-border/60 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-[0.2em]">Integration</p>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.05]">
                Three lines to connect <span className="text-gradient">any chain</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                One header. One endpoint. One JSON body. Every chain Ramptium supports
                speaks the same protocol — your code stays clean.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                    Get an API Key <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/developers">
                  <Button size="lg" variant="outline" className="border-border/80">
                    Read the Docs
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <CodeBlock code={sampleCode} language="typescript" />
            </div>
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="py-24 md:py-32 border-t border-border/60 relative overflow-hidden">
        <GlowOrbs />
        <div className="container relative text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            Ready to build on <span className="text-gradient">reliable infrastructure?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Start free. Scale when you need to. No surprises.
          </p>
          <div className="mt-10">
            <Link to="/signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary h-14 px-8 text-base">
                Get Your Free API Key <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
