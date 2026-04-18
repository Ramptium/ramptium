import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { DashboardSidebar } from "./DashboardSidebar";
import { StatusDot } from "@/components/shared/StatusDot";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function DashboardLayout({ eyebrow = "Console", title, description, children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">{eyebrow}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{title}</h1>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
            <div className="flex items-center gap-3 px-3 py-2 terminal-border">
              <StatusDot status="operational" label="All systems operational" />
            </div>
          </div>
          <div className="grid lg:grid-cols-[200px_1fr] gap-8">
            <DashboardSidebar />
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
