
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  userType?: string;
  showBackLink?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  description, 
  userType, 
  showBackLink = true 
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/80 backdrop-blur-md py-3">
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-xs">D</span>
            </div>
            <span className="font-bold">Dharma</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            {userType && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2">
                {userType}
              </div>
            )}
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          
          {children}
          
          {showBackLink && (
            <div className="mt-8 text-center">
              <Button variant="link" asChild>
                <Link to="/login">Back to main login</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dharma. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
