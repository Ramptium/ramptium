import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CodeBlock } from "@/components/shared/CodeBlock";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const sections = [
  {
    title: "Quick Start",
    code: `npm install @ramptium/sdk

import { Ramptium } from '@ramptium/sdk';

const client = new Ramptium({
  apiKey: 'YOUR_API_KEY',
});

// Get block number
const block = await client.eth.getBlockNumber();`,
    language: "typescript",
  },
  {
    title: "RPC Access",
    code: `// Direct JSON-RPC
curl https://rpc.ramptium.io/v1/YOUR_API_KEY \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

// Response
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1234567"
}`,
    language: "bash",
  },
  {
    title: "Liquidity Routing",
    code: `const quote = await client.liquidity.getQuote({
  chainId: 1,
  tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  amount: '1000000000',  // 1000 USDC
  slippage: 50,          // 0.5%
});

// Returns optimal route across DEXs
console.log(quote.routes);
console.log(quote.expectedOutput);
console.log(quote.priceImpact);`,
    language: "typescript",
  },
  {
    title: "WebSocket Streams",
    code: `const ws = client.ws.connect('ethereum');

// Subscribe to new blocks
ws.on('block', (block) => {
  console.log('New block:', block.number);
});

// Subscribe to pending transactions
ws.on('pendingTx', { 
  filter: { to: '0x...' } 
}, (tx) => {
  console.log('Pending:', tx.hash);
});`,
    language: "typescript",
  },
];

const endpoints = [
  { method: "GET", path: "/v1/chains", desc: "List supported networks" },
  { method: "POST", path: "/v1/rpc/{chainId}", desc: "JSON-RPC endpoint" },
  { method: "GET", path: "/v1/liquidity/quote", desc: "Get swap quote" },
  { method: "POST", path: "/v1/liquidity/execute", desc: "Execute swap" },
  { method: "GET", path: "/v1/tx/{hash}", desc: "Transaction status" },
  { method: "GET", path: "/v1/usage", desc: "API usage metrics" },
  { method: "POST", path: "/v1/webhooks", desc: "Register webhook" },
  { method: "GET", path: "/v1/status", desc: "Network health" },
];

export default function Developers() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={"Developers — SDK, API Reference & Quickstart | Ramptium"} description={"Type-safe SDKs for TypeScript, Python, Rust, and Go. REST, WebSocket, and gRPC endpoints. Generate API keys and integrate Ramptium in minutes."} keywords={"web3 API documentation, blockchain SDK, RPC API, developer docs, web3 quickstart"} />
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Developers</motion.p>
            <motion.h1 variants={fade} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Build on Ramptium
            </motion.h1>
            <motion.p variants={fade} className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Generate an API key, point your client at one endpoint, ship to every chain. SDKs, references, and examples below.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="pb-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-6">API Reference</h2>
          <div className="terminal-border overflow-hidden">
            <div className="divide-y divide-border">
              {endpoints.map((ep) => (
                <div key={ep.path} className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/30 transition-colors">
                  <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${ep.method === "GET" ? "text-accent bg-accent/10" : "text-primary bg-primary/10"}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-mono text-foreground">{ep.path}</code>
                  <span className="text-xs text-muted-foreground ml-auto hidden md:block">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="pb-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-8">Code Examples</h2>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                <CodeBlock code={s.code} language={s.language} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
