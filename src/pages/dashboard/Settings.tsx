import { SEO } from "@/components/SEO";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TerminalCard } from "@/components/shared/TerminalCard";

export default function DashboardSettings() {
  return (
    <>
      <SEO title={"Settings — Console | Ramptium"} description={"Manage workspace, billing, and team for your Ramptium account."} />
      <DashboardLayout title="Settings" description="Workspace, billing, and team." eyebrow="Console / Settings">
        <div className="grid lg:grid-cols-2 gap-6">
          <TerminalCard title="workspace">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Organization</Label>
                <Input id="org" defaultValue="Ramptium Labs" className="bg-secondary/30 border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Billing email</Label>
                <Input id="email" type="email" defaultValue="billing@ramptium.com" className="bg-secondary/30 border-border" />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save changes</Button>
            </div>
          </TerminalCard>

          <TerminalCard title="billing">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Current plan</p>
                <p className="text-lg font-semibold text-foreground mt-1">Pro · $499/mo</p>
                <p className="text-xs text-muted-foreground mt-1">1B requests included · overage at $0.40 / 1M</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Payment method</p>
                <p className="text-sm font-mono text-foreground mt-1">VISA ···· 4242</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Update payment</Button>
                <Button variant="outline" size="sm">Download invoices</Button>
              </div>
            </div>
          </TerminalCard>

          <TerminalCard title="team">
            <div className="space-y-3">
              {[
                { name: "Alex Kim", email: "alex@ramptium.com", role: "Owner" },
                { name: "Maya Patel", email: "maya@ramptium.com", role: "Admin" },
                { name: "Jordan Lee", email: "jordan@ramptium.com", role: "Developer" },
              ].map((m) => (
                <div key={m.email} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-foreground">{m.name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{m.email}</p>
                  </div>
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">{m.role}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">Invite teammate</Button>
            </div>
          </TerminalCard>

          <TerminalCard title="danger-zone">
            <p className="text-sm text-muted-foreground">
              Permanently delete your workspace and revoke all API keys. This action cannot be undone.
            </p>
            <Button variant="outline" size="sm" className="mt-4 border-destructive/40 text-destructive hover:bg-destructive/10">
              Delete workspace
            </Button>
          </TerminalCard>
        </div>
      </DashboardLayout>
    </>
  );
}
