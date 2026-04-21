import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
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
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2H21l-6.522 7.45L22 22h-6.81l-4.74-6.16L4.86 22H2l7.04-8.05L2 2h6.92l4.32 5.7L18.244 2Zm-1.19 18h1.73L7.06 4H5.21l11.844 16Z"/>
                </svg>
              </a>
              <a
                href="https://github.com/ramptium"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z"/>
                </svg>
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
