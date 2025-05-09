
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, Shield, Gavel, Book, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-24 border-b">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Accelerating Justice Through Technology
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-10 text-muted-foreground animate-fade-in">
              Dharma streamlines case processing in India by connecting citizens, legal professionals, and law enforcement on a single platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/register">
                <Button size="lg" className="gap-2 px-6">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Dharma Helps</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform addresses key challenges in the Indian legal system.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">For Citizens</h3>
                  <p className="text-muted-foreground">
                    Easy case filing, status tracking, and reduced paperwork for faster resolution.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">For Police</h3>
                  <p className="text-muted-foreground">
                    Streamlined case management, evidence collection, and coordination with courts.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Gavel className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">For Lawyers</h3>
                  <p className="text-muted-foreground">
                    Case organization, client communication, and court schedule management.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">For Judges</h3>
                  <p className="text-muted-foreground">
                    Digital case files, scheduling tools, and reduced administrative burden.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">40%</p>
                <p className="text-lg text-muted-foreground">Reduction in Case Processing Time</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">60%</p>
                <p className="text-lg text-muted-foreground">Less Paperwork</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">75%</p>
                <p className="text-lg text-muted-foreground">Better Information Access</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">30%</p>
                <p className="text-lg text-muted-foreground">Fewer Postponements</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="bg-dharma-dark-blue rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-75cbe993bad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] opacity-10"></div>
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Dharma Today</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Be part of India's legal transformation. Create an account based on your role and start experiencing efficient case processing.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/public/register">
                    <Button size="lg" className="w-full sm:w-auto">Create Public Account</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">Professional Login</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
