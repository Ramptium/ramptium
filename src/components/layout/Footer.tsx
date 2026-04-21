import { Link } from "react-router-dom";
import { Github, Twitter, MessageCircle } from "lucide-react";
import { StatusDot } from "@/components/shared/StatusDot";
import logo from "@/assets/ramptium-logo.png";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/infrastructure" },
      { label: "Pricing", href: "/pricing" },
      { label: "Network", href: "/network" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/developers" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Security", href: "/security" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "For Investors", href: "/for-investors" },
      { label: "FAQ", href: "/faq" },
      { label: "Sign in", href: "/login" },
      { label: "Start free", href: "/signup" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-gradient-surface">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Ramptium" width={28} height={28} className="h-7 w-7" />
              <span className="text-[15px] font-semibold text-foreground">Ramptium</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise Web3 infrastructure for the builders who ship.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://twitter.com/ramptium"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/ramptium"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://discord.gg/ramptium"
                aria-label="Discord"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className="mt-5 text-xs font-mono text-muted-foreground/70">
              A{" "}
              <a href="https://netlium.co" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Netlium
              </a>{" "}
              portfolio company.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-[0.18em] mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ramptium. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">Privacy</span>
            <span className="text-xs text-muted-foreground">Terms</span>
            <span className="text-xs text-muted-foreground">SLA</span>
            <Link to="/status" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <StatusDot status="operational" />
              <span className="font-mono">Operational</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
