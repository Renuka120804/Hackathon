import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3,
  Users,
  Settings,
  Shield,
  AlertTriangle,
  Brain,
  Search,
  Bell,
  User,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    name: "Dashboard",
    icon: BarChart3,
    href: "#",
    active: true
  },
  {
    name: "Entity Management", 
    icon: Users,
    href: "#",
    active: false
  },
  {
    name: "Risk Rules Engine",
    icon: Shield,
    href: "#",
    active: false
  },
  {
    name: "Configuration",
    icon: Settings,
    href: "#",
    active: false
  },
  {
    name: "Alerts & Threats",
    icon: AlertTriangle,
    href: "#",
    active: false
  },
  {
    name: "AI Insights",
    icon: Brain,
    href: "#",
    active: false
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background dark">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar transform transition-transform duration-200 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">PredictaShield</h1>
              <p className="text-xs text-muted-foreground">Admin Console</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-left",
                  item.active 
                    ? "bg-primary text-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.name}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
              <div>
                <h2 className="text-xl font-semibold">Security Dashboard</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-online rounded-full"></div>
                  <span className="text-sm text-muted-foreground">System Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search entities, alerts..."
                  className="w-64 pl-9 bg-background/50"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive">
                  3
                </Badge>
              </Button>

              {/* Status */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-status-online rounded-full"></div>
                <span className="text-sm hidden md:inline">Online</span>
              </div>

              {/* User menu */}
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">AD</span>
                </div>
                <span className="text-sm hidden md:inline">Admin</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}