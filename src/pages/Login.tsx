
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AlertCircle } from "lucide-react";
import { simulateAuth } from "@/utils/authUtils";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Check login with default credentials
    setTimeout(() => {
      const { isAuthenticated } = simulateAuth({ email, password }, "public");
      
      if (isAuthenticated) {
        console.log("Login successful with:", { email });
        navigate("/public/dashboard");
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Log in to Dharma</h1>
            <p className="text-muted-foreground">
              Welcome back! Please select your role and enter your credentials.
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Login</CardTitle>
                  <CardDescription>
                    Log in to your professional account based on your role.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Link to="/police/login" className="w-full">
                      <Button variant="outline" className="w-full">Police Login</Button>
                    </Link>
                    <Link to="/lawyer/login" className="w-full">
                      <Button variant="outline" className="w-full">Lawyer Login</Button>
                    </Link>
                    <Link to="/judge/login" className="w-full">
                      <Button variant="outline" className="w-full">Judge Login</Button>
                    </Link>
                    <Link to="/admin/login" className="w-full">
                      <Button variant="outline" className="w-full">Admin Login</Button>
                    </Link>
                  </div>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-sm text-muted-foreground">Or continue with email</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                    
                    {error && (
                      <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      <p>Use demo credentials:</p>
                      <p>Email: <strong>user@dharma.com</strong>, Password: <strong>password123</strong></p>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                      Register here
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register a New Account</CardTitle>
                  <CardDescription>
                    Create a new account based on your role in the legal system.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/public/register" className="block w-full">
                    <Button className="w-full">Register as Public User</Button>
                  </Link>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-sm text-muted-foreground">Professional Registration</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-center text-muted-foreground">
                    Professional registration requires verification.
                    Please contact your organization admin or our support team.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" asChild>
                      <Link to="/contact">Contact Support</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/about">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
