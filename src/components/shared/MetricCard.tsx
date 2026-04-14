import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  className?: string;
  accent?: boolean;
}

export function MetricCard({ label, value, sub, className, accent }: MetricCardProps) {
  return (
    <div className={cn("terminal-border p-5", className)}>
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      <p className={cn("text-2xl md:text-3xl font-semibold tracking-tight", accent ? "text-accent" : "text-foreground")}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}
