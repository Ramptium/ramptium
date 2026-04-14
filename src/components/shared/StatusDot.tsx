import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "operational" | "degraded" | "down";
  label?: string;
}

export function StatusDot({ status, label }: StatusDotProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          status === "operational" && "bg-accent animate-pulse-glow",
          status === "degraded" && "bg-yellow-500",
          status === "down" && "bg-destructive"
        )}
      />
      {label && <span className="text-xs font-mono text-muted-foreground">{label}</span>}
    </div>
  );
}
