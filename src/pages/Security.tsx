import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Shield, Lock, Eye, FileCheck, Server, Key } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const items = [
  { icon: Shield, title: "SOC 2 Type II", desc: "Independently audited controls for security, availability, and confidentiality. Annual recertification." },
  { icon: Lock, title: "End-to-End Encryption", desc: "TLS 1.3 for all data in transit. AES-256 encryption at rest. Zero plaintext storage of sensitive data." },
  { icon: Key, title: "API Key Scoping", desc: "Granular permissions per key. Restrict by chain, method, IP range, and rate limit. Rotate without downtime." },
  { icon: Eye, title: "Audit Logging", desc: "Immutable audit trail for every API call. Export to your SIEM. 90-day retention on all plans." },
  { icon: Server, title: "Infrastructure Isolation", desc: "Dedicated nodes for enterprise customers. No shared infrastructure. Custom SLA guarantees." },
  { icon: FileCheck, title: "Penetration Testing", desc: "Quarterly third-party penetration tests. Bug bounty program with responsible disclosure policy." },
];

export default function Security() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={"Security — Enterprise-Grade Web3 Infrastructure | Ramptium"} description={"SOC 2 Type II infrastructure, end-to-end encryption, key rotation, IP allowlisting, and full audit logging. Built for institutions and regulated environments."} keywords={"web3 security, blockchain infrastructure security, SOC 2 RPC provider, API key rotation"} />
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Security</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl">
              Security is infrastructure
            </motion.h1>
            <motion.p variants={fade} className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Ramptium is built with a zero-trust architecture. Every layer is designed for defense in depth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <motion.div key={item.title} variants={fade} className="terminal-border p-6 hover:border-primary/30 transition-colors">
                <item.icon className="h-5 w-5 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
