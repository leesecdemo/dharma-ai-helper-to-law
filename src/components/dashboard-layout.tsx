
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Home, Folder, FileText, Calendar, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useToast } from "@/components/ui/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'public' | 'police' | 'lawyer' | 'judge' | 'admin';
  userName?: string;
}

export function DashboardLayout({ children, userType, userName = "User" }: DashboardLayoutProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    navigate("/login");
  };

  // Define sidebar links based on user type
  const sidebarLinks = {
    public: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/public/dashboard" },
      { icon: <FileText className="h-5 w-5" />, label: "My Cases", href: "/public/cases" },
      { icon: <Calendar className="h-5 w-5" />, label: "Hearings", href: "/public/hearings" },
      { icon: <Users className="h-5 w-5" />, label: "My Lawyers", href: "/public/lawyers" }
    ],
    police: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/police/dashboard" },
      { icon: <FileText className="h-5 w-5" />, label: "Case Management", href: "/police/cases" },
      { icon: <Folder className="h-5 w-5" />, label: "Evidence Tracking", href: "/police/evidence" },
      { icon: <Users className="h-5 w-5" />, label: "Suspects/Witnesses", href: "/police/persons" }
    ],
    lawyer: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/lawyer/dashboard" },
      { icon: <FileText className="h-5 w-5" />, label: "Active Cases", href: "/lawyer/cases" },
      { icon: <Calendar className="h-5 w-5" />, label: "Court Schedule", href: "/lawyer/schedule" },
      { icon: <Users className="h-5 w-5" />, label: "Clients", href: "/lawyer/clients" }
    ],
    judge: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/judge/dashboard" },
      { icon: <FileText className="h-5 w-5" />, label: "Court Cases", href: "/judge/cases" },
      { icon: <Calendar className="h-5 w-5" />, label: "Hearings", href: "/judge/hearings" },
      { icon: <Folder className="h-5 w-5" />, label: "Case Archives", href: "/judge/archives" }
    ],
    admin: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/admin/dashboard" },
      { icon: <Users className="h-5 w-5" />, label: "Users", href: "/admin/users" },
      { icon: <FileText className="h-5 w-5" />, label: "Case Overview", href: "/admin/cases" },
      { icon: <Settings className="h-5 w-5" />, label: "System Settings", href: "/admin/settings" }
    ]
  };

  const links = sidebarLinks[userType];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex h-full w-64 flex-col bg-sidebar border-r">
        <div className="flex items-center h-16 px-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">D</span>
            </div>
            <span className="font-bold text-xl">Dharma</span>
          </Link>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            <p className="px-2 text-xs font-semibold text-muted-foreground mb-2 uppercase">
              {userType} Portal
            </p>
            <nav className="space-y-1">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent group"
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Mobile navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b bg-background z-30 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground">D</span>
          </div>
          <span className="font-bold text-xl">Dharma</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="hidden md:flex h-16 border-b bg-background items-center justify-between px-6">
          <h1 className="text-xl font-semibold">{userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="font-medium">Welcome, {userName}</div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        
        {/* Mobile bottom tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t bg-background flex items-center justify-around">
          {links.slice(0, 4).map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="flex flex-col items-center justify-center h-full w-1/4 py-1"
            >
              {link.icon}
              <span className="text-xs mt-1">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-20 md:pb-8 bg-background/95">
          {children}
        </main>
      </div>
    </div>
  );
}
