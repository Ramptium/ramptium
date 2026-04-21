import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  className?: string;
  accent?: boolean;
  icon?: ReactNode;
}

export function MetricCard({ label, value, sub, className, accent, icon }: MetricCardProps) {
  return (
    <div className={cn("terminal-border card-hover p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.15em]">{label}</p>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <p className={cn("text-2xl md:text-3xl font-semibold tracking-tight tabular-nums", accent ? "text-gradient" : "text-foreground")}>
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground mt-1.5">{sub}</p>}
    </div>
  );
}
