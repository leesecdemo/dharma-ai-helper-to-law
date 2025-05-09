
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AuthLayout } from "@/components/auth-layout";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle, Briefcase } from "lucide-react";
import { simulateAuth } from "@/utils/authUtils";

const LawyerLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    barNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    setTimeout(() => {
      const { isAuthenticated } = simulateAuth(formData, "lawyer");
      
      if (isAuthenticated) {
        toast({
          title: "Login successful",
          description: "Welcome to the Lawyer Portal.",
        });
        navigate("/lawyer/dashboard");
      } else {
        setError("Invalid bar council number or password");
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Lawyer Login" 
      description="Access your legal practice dashboard"
      userType="Legal Professional"
    >
      <Card className="border-2 border-primary/20">
        <div className="flex justify-center pt-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="barNumber">Bar Council Number</Label>
              <Input
                id="barNumber"
                name="barNumber"
                placeholder="Enter your bar council registration number"
                value={formData.barNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/lawyer/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 text-xs text-muted-foreground">
              <p>Use demo credentials:</p>
              <p>Bar Number: <strong>LW5678</strong>, Password: <strong>lawyer123</strong></p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              For registration or verification, please contact the Bar Council administrator.
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default LawyerLogin;
