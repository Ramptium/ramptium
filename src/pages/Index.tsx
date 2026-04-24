import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, Activity, BarChart3, Code2, Gauge, KeyRound, Network, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { StatusDot } from "@/components/shared/StatusDot";

const apiExample = `curl -X POST https://ramptium.com/api/rpc/ethereum \\
  -H "Authorization: Bearer rpt_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'`;

const features = [
  {
    icon: Network,
    title: "Routing Engine",
    desc: "Route JSON-RPC traffic across endpoint pools with bounded failover, timeout protection, and adaptive provider selection.",
  },
  {
    icon: BarChart3,
    title: "Usage Tracking",
    desc: "Capture request events, latency, retry count, billable units, and daily/monthly aggregates from the same source of truth.",
  },
  {
    icon: KeyRound,
    title: "Developer Platform",
    desc: "Manage project API keys, logs, usage, and operational visibility from one control plane built for production teams.",
  },
];

const trustSignals = ["Adaptive routing", "Request-level logs", "Usage aggregates", "API key auth"];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Ramptium — Unified Web3 Routing"
        description="Infrastructure-grade RPC routing for blockchain applications. Unified API access, adaptive failover, request logs, usage tracking, and developer control plane."
        keywords="web3 infrastructure, rpc routing, blockchain api, ethereum rpc, developer api platform"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ramptium",
          url: "https://ramptium.com",
          description: "Unified Web3 routing and developer infrastructure for blockchain applications.",
          logo: "https://ramptium.com/favicon.png",
        }}
      />
      <Navbar />

      <main>
        <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="absolute left-[-20%] top-16 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute right-[-12%] top-40 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-border/70" />
          </div>

          <div className="container relative">
            <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-16 items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-mono text-muted-foreground shadow-sm">
                  <StatusDot status="operational" />
                  Infrastructure layer · 7-chain routing ready
                </div>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-[-0.045em] leading-[0.98] text-foreground">
                  Unified Web3 Routing.
                  <br />
                  <span className="text-gradient">Built for scale.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-8 text-muted-foreground">
                  Ramptium is the infrastructure layer for blockchain applications: unified RPC access, adaptive routing, lower latency, higher reliability, and usage-based developer control.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <Link to="/dashboard" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                      Open dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/developers" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-6 border-border/80 hover:border-primary/50">
                      View docs
                    </Button>
                  </Link>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
                  Free to start. API-key based. Live request tracking from the first call.
                </p>
              </div>

              <div className="w-full min-w-0">
                <div className="terminal-border bg-card/80 p-4 sm:p-5 shadow-2xl shadow-primary/5">
                  <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">POST /api/rpc/ethereum</span>
                  </div>
                  <CodeBlock code={apiExample} language="bash" />
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="rounded-lg border border-border bg-secondary/50 p-3">
                      <p className="text-muted-foreground">Auth</p>
                      <p className="mt-1 text-foreground">Bearer API key</p>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-3">
                      <p className="text-muted-foreground">Telemetry</p>
                      <p className="mt-1 text-foreground">request_events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-gradient-surface">
          <div className="container py-7">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-20 lg:py-28">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Control plane</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Infrastructure primitives, not marketing claims.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="terminal-border card-hover p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border/70 bg-card/30">
          <div className="container grid gap-8 py-20 lg:grid-cols-4 lg:py-24">
            {[
              { label: "Supported chains", value: "7" },
              { label: "Gateway path", value: "/api/rpc" },
              { label: "Routing attempts", value: "Logged" },
              { label: "Billing state", value: "Meter-ready" },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border bg-background/70 p-5">
                <p className="text-3xl font-bold tracking-tight text-foreground">{metric.value}</p>
                <p className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container py-20 lg:py-28">
          <div className="rounded-2xl border border-border bg-gradient-surface p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Start routing</p>
                <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
                  Ready to build on infrastructure that holds?
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Open the control plane, create an API key, and send your first request through Ramptium’s routing layer.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Open dashboard
                  </Button>
                </Link>
                <Link to="/developers">
                  <Button size="lg" variant="outline" className="w-full">
                    Read docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
