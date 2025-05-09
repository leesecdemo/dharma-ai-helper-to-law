
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Dharma</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              Our mission is to transform India's legal system through technology, 
              making justice more accessible, efficient, and transparent for all citizens.
            </p>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg mb-4">
                  Dharma envisions a future where India's legal system operates with unprecedented efficiency,
                  transparency, and accessibility. We believe technology can bridge the gaps that currently 
                  cause case delays, administrative bottlenecks, and frustration for all stakeholders.
                </p>
                <p className="text-lg mb-4">
                  By connecting citizens, police, lawyers, and judges on a unified digital platform,
                  we aim to reduce the time, effort, and resources required for case processing while
                  maintaining the highest standards of legal procedure and justice.
                </p>
              </div>
              <div className="bg-muted rounded-lg overflow-hidden aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1470&auto=format&fit=crop" 
                  alt="Symbol of justice" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">The Problems We're Solving</h2>
            
            <div className="space-y-8">
              <div className="bg-background rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Case Backlogs</h3>
                <p className="text-lg">
                  India's courts face a significant backlog of cases, with millions pending across various levels.
                  Dharma helps reduce administrative overhead, optimize scheduling, and streamline case flow.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Procedural Inefficiencies</h3>
                <p className="text-lg">
                  Manual paperwork, physical file movement, and communication gaps create unnecessary delays.
                  Our digital platform enables real-time updates, document sharing, and instant notifications.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Access to Justice</h3>
                <p className="text-lg">
                  Many citizens find the legal system intimidating and inaccessible. Dharma provides
                  user-friendly interfaces, guidance, and transparency to help people navigate the
                  complexities of legal proceedings.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Resource Constraints</h3>
                <p className="text-lg">
                  Limited staff, infrastructure, and technology hamper the justice system's efficiency.
                  Our platform optimizes resource allocation and reduces the administrative burden on
                  all stakeholders.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-8">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16">
              Dharma brings together experts in technology, law, and public administration
              to create a solution that addresses the real needs of India's legal ecosystem.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Placeholder for team members */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-muted mb-4 overflow-hidden">
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/40">D</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Team Member {i}</h3>
                  <p className="text-muted-foreground">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
