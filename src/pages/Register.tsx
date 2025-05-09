
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Register with Dharma</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our platform to access streamlined case processing and legal support.
              Choose the account type that best matches your role.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Public Registration</CardTitle>
                <CardDescription>
                  For citizens seeking legal assistance or case filing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    File and track cases
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Access case history and documents
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Connect with legal professionals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Receive case updates and notifications
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/public/register">Register as Public User</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Professional Registration</CardTitle>
                <CardDescription>
                  For police, lawyers, judges and administrators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Role-specific dashboards and tools
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Secure document management
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Case management and scheduling
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Collaboration with other professionals
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <p className="text-sm text-muted-foreground w-full text-center mb-2">
                  Select your professional role:
                </p>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button variant="outline" asChild>
                    <Link to="/police/login">Police</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/lawyer/login">Lawyer</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/judge/login">Judge</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/admin/login">Admin</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in here
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              By registering, you agree to our{" "}
              <Link to="/terms" className="text-muted-foreground underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-muted-foreground underline hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
