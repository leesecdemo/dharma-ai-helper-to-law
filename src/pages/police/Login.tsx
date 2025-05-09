
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
import { AlertCircle, Shield } from "lucide-react";
import { simulateAuth } from "@/utils/authUtils";

const PoliceLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    badgeNumber: "",
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
      const { isAuthenticated } = simulateAuth(formData, "police");
      
      if (isAuthenticated) {
        toast({
          title: "Login successful",
          description: "Welcome to the Police Portal.",
        });
        navigate("/police/dashboard");
      } else {
        setError("Invalid badge number or password");
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
      title="Police Login" 
      description="Access the law enforcement portal"
      userType="Police Officer"
    >
      <Card className="border-2 border-primary/20">
        <div className="flex justify-center pt-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="badgeNumber">Badge Number</Label>
              <Input
                id="badgeNumber"
                name="badgeNumber"
                placeholder="Enter your badge number"
                value={formData.badgeNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/police/forgot-password"
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
              <p>Badge Number: <strong>PL1234</strong>, Password: <strong>police123</strong></p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              For registration or access issues, please contact your department administrator.
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default PoliceLogin;
