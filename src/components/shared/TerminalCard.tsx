import { cn } from "@/lib/utils";

interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({ title, children, className }: TerminalCardProps) {
  return (
    <div className={cn("terminal-border overflow-hidden", className)}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
        </div>
        {title && <span className="text-xs font-mono text-muted-foreground ml-2">{title}</span>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
