import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Layers, Network, Building2, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetricCard } from "@/components/shared/MetricCard";
import { TerminalCard } from "@/components/shared/TerminalCard";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const thesis = [
  {
    icon: Layers,
    title: "Picks & shovels",
    body: "Ramptium does not speculate on assets. We sell metered access to the underlying network — the same model that built AWS into a $90B business.",
  },
  {
    icon: Network,
    title: "Demand is structural",
    body: "Every wallet, exchange, AI agent, and protocol needs reliable multi-chain infrastructure. Demand grows with on-chain activity, not token prices.",
  },
  {
    icon: TrendingUp,
    title: "Compounding economics",
    body: "Usage-based revenue with high gross margins. Each new chain we add increases endpoint utility for every existing customer.",
  },
];

export default function ForInvestors() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={"For Investors — Web3 Infrastructure Investment Thesis | Ramptium"}
        description={"Ramptium is the picks-and-shovels infrastructure layer for Web3. Usage-based revenue, structural demand, institutional capital backing via Netlium."}
        keywords={"web3 infrastructure investment, blockchain infrastructure thesis, crypto picks and shovels, Netlium Ramptium"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ramptium",
          url: "https://ramptium.com",
          parentOrganization: {
            "@type": "Organization",
            name: "Netlium",
            url: "https://netlium.co",
          },
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">For Investors</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              The infrastructure layer of <span className="text-gradient">on-chain finance</span>.
            </motion.h1>
            <motion.p variants={fade} className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Ramptium operates the routing, access, and execution rails that protocols, wallets, and institutions depend on. We are the metered backbone — not the asset.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-border bg-card/50">
        <div className="container py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Annualized Requests" value="876B" sub="Run-rate" accent />
          <MetricCard label="Networks Served" value="40+" sub="L1 & L2" />
          <MetricCard label="Enterprise Customers" value="180+" sub="Protocols & funds" accent />
          <MetricCard label="Gross Margin" value=">85%" sub="Infrastructure SaaS" />
        </div>
      </section>

      {/* Thesis */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-2xl">
            Why infrastructure wins long-term.
          </h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-4 mt-10">
            {thesis.map((t) => (
              <motion.div key={t.title} variants={fade} className="terminal-border p-6 hover:border-primary/30 transition-colors">
                <t.icon className="h-5 w-5 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Revenue model */}
      <section className="py-20 border-t border-border">
        <div className="container grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">A clean, metered revenue model.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Three revenue streams, all denominated in fiat, all priced per unit of work performed. No token, no speculation, no off-balance-sheet exposure.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><span className="text-primary font-mono">01</span><span><strong className="text-foreground">RPC & data access</strong> — billed per request and per compute unit.</span></li>
              <li className="flex gap-3"><span className="text-primary font-mono">02</span><span><strong className="text-foreground">Liquidity routing</strong> — basis-point fee on routed notional.</span></li>
              <li className="flex gap-3"><span className="text-primary font-mono">03</span><span><strong className="text-foreground">Execution & settlement</strong> — flat fee per executed transaction.</span></li>
            </ul>
          </div>
          <TerminalCard title="revenue-mix-2026">
            <div className="space-y-5 font-mono text-sm">
              <div>
                <div className="flex justify-between mb-1.5"><span className="text-muted-foreground">Access (RPC + data)</span><span className="text-foreground">62%</span></div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: "62%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5"><span className="text-muted-foreground">Liquidity routing</span><span className="text-foreground">26%</span></div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-accent" style={{ width: "26%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5"><span className="text-muted-foreground">Execution & settlement</span><span className="text-foreground">12%</span></div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: "12%" }} /></div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
              All figures illustrative of current revenue mix. Audited financials available under NDA.
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* Netlium */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="terminal-border p-8 md:p-12">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-4 w-4 text-accent" />
              <span className="text-xs font-mono text-accent uppercase tracking-widest">Powered by institutional capital intelligence</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-2xl">
              Ramptium executes infrastructure. <br className="hidden md:block" />Netlium allocates the capital behind it.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-3xl">
              Ramptium operates the access and routing layer of Web3. Our parent platform, <strong className="text-foreground">Netlium</strong>, manages the institutional capital that funds the network's expansion — node deployment, regional buildout, and liquidity inventory.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
              The result: an infrastructure operator with a permanent capital partner aligned around long-duration, cash-flowing assets.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="https://netlium.co" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Visit Netlium <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/security">
                <Button variant="outline">Review security posture</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Speak with the team.</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Investor materials, financials, and customer references available under NDA.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a href="mailto:investors@ramptium.com">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                Request investor pack <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link to="/infrastructure">
              <Button size="lg" variant="outline">See the infrastructure</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
