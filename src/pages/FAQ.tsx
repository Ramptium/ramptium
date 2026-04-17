import { useState } from "react";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.05 } } };

const faqs = [
  { q: "What is Ramptium?", a: "Ramptium is a Web3 infrastructure platform that provides unified blockchain access, liquidity routing, and transaction execution through a single API. Think of it as the infrastructure layer that connects your application to every blockchain network." },
  { q: "How does the RPC routing work?", a: "Ramptium maintains a global network of nodes across 40+ chains. When your request comes in, our routing layer selects the optimal node based on latency, load, and health metrics. If a node fails, requests are automatically rerouted with zero downtime." },
  { q: "What chains are supported?", a: "We support 40+ networks including Ethereum, Polygon, Arbitrum, Optimism, Base, Solana, Avalanche, BSC, and more. Enterprise customers can request custom chain integrations." },
  { q: "How does liquidity routing reduce slippage?", a: "Our engine splits orders across multiple DEXs and routes through optimal paths. By aggregating liquidity from 200+ sources and using multi-path routing algorithms, we can reduce slippage by up to 40% compared to single-source execution." },
  { q: "Is there a free tier?", a: "Yes. The Developer plan includes 100M requests per month, access to 10 chains, and standard RPC endpoints — completely free, no credit card required." },
  { q: "What's the uptime SLA?", a: "Growth plans include a 99.9% uptime SLA. Enterprise plans include a 99.99% SLA with financial credits for any downtime. Our actual uptime over the last 12 months is 99.997%." },
  { q: "How do I authenticate?", a: "Every request is authenticated via an API key passed in the request header or URL path. Keys can be scoped by chain, method, IP range, and rate limit. Key rotation is supported without downtime." },
  { q: "Do you support WebSockets?", a: "Yes. WebSocket connections are available on Growth and Enterprise plans. Subscribe to new blocks, pending transactions, contract events, and custom filters with real-time delivery." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("terminal-border transition-colors", open && "border-primary/30")}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground pr-4">{q}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200", open && "rotate-180 text-primary")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={"FAQ — Common Questions | Ramptium"} description={"Answers about Ramptium: how it differs from traditional RPC providers, security model, scalability, supported chains, and pricing."} keywords={"ramptium FAQ, web3 infrastructure questions, RPC provider comparison"} />
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">FAQ</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
