import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/ramptium-logo.png";

const navItems = [
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Network", href: "/network" },
  { label: "Developers", href: "/developers" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Investors", href: "/for-investors" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Ramptium home">
          <img src={logo} alt="Ramptium" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-foreground">Ramptium</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                location.pathname === item.href
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Sign in
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get API Key
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/status" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md">Status</Link>
            <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md">Sign in</Link>
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full mt-2">Get API Key</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
