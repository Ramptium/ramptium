import { useState } from "react";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const plans = [
  {
    name: "Developer",
    price: "Free",
    desc: "For builders getting started",
    features: ["100M requests/month", "10 chains", "Community support", "Basic analytics", "Standard RPC"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$299",
    period: "/mo",
    desc: "For production applications",
    features: ["1B requests/month", "40+ chains", "Priority support", "Advanced analytics", "Enhanced RPC + WebSocket", "Liquidity routing", "Webhook delivery"],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For institutional requirements",
    features: ["Unlimited requests", "All chains + custom", "Dedicated support", "Full observability", "Dedicated nodes", "Custom SLA (99.99%)", "SOC 2 report access", "Infrastructure isolation"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={"Pricing — Usage-Based Web3 Infrastructure | Ramptium"} description={"Transparent, usage-based pricing for Web3 infrastructure. Free tier with 100M requests/month. Growth and Enterprise tiers for production workloads."} keywords={"web3 infrastructure pricing, blockchain API pricing, RPC provider pricing"} />
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Pricing</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Scale without surprises
            </motion.h1>
            <motion.p variants={fade} className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Transparent pricing. No hidden fees. Free tier for builders.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fade}
                className={cn(
                  "terminal-border p-6 flex flex-col",
                  plan.highlighted && "border-primary/50 glow-primary"
                )}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard">
                  <Button
                    className={cn(
                      "w-full",
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    )}
                  >
                    {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
