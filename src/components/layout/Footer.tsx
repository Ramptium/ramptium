import { Link } from "react-router-dom";
import logo from "@/assets/ramptium-logo.png";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Infrastructure", href: "/infrastructure", external: false },
      { label: "Network", href: "/network", external: false },
      { label: "Use Cases", href: "/use-cases", external: false },
      { label: "Pricing", href: "/pricing", external: false },
      { label: "Security", href: "/security", external: false },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/developers", external: false },
      { label: "API Reference", href: "/developers", external: false },
      { label: "Status", href: "/status", external: false },
      { label: "Dashboard", href: "/dashboard", external: false },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "For Investors", href: "/for-investors", external: false },
      { label: "FAQ", href: "/faq", external: false },
      { label: "Sign in", href: "/login", external: false },
      { label: "Netlium ↗", href: "https://netlium.co", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Ramptium" width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-semibold text-foreground">Ramptium</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise-grade Web3 infrastructure for liquidity routing, blockchain access, and execution.
            </p>
            <p className="mt-4 text-xs font-mono text-muted-foreground/70">
              A <a href="https://netlium.co" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Netlium</a> portfolio company.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Ramptium. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Privacy</span>
            <span className="text-xs text-muted-foreground">Terms</span>
            <span className="text-xs text-muted-foreground">SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
