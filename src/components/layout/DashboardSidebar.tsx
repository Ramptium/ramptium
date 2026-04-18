import { NavLink } from "react-router-dom";
import { Activity, Key, BarChart3, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Overview", icon: Activity, end: true },
  { to: "/dashboard/api-keys", label: "API Keys", icon: Key },
  { to: "/dashboard/usage", label: "Usage", icon: BarChart3 },
  { to: "/dashboard/logs", label: "Logs", icon: FileText },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap shrink-0",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )
            }
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
