
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Settings } from "lucide-react";

const AdminLogin = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome to the Admin Portal.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Administrator Login" 
      description="Access system administration tools"
      userType="System Administrator"
    >
      <Card className="border-2 border-primary/20">
        <div className="flex justify-center pt-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Settings className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="adminId">Administrator ID</Label>
              <Input
                id="adminId"
                name="adminId"
                placeholder="Enter your administrator ID"
                value={formData.adminId}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/admin/forgot-password"
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
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            
            <div className="text-xs text-center text-muted-foreground space-y-1">
              <p className="font-medium text-destructive">Restricted Access</p>
              <p>
                This portal is for authorized administrators only. Unauthorized access attempts will be logged and reported.
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default AdminLogin;
