
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">D</span>
            </div>
            <span className="font-bold text-xl">Dharma</span>
          </Link>
          <p className="mt-4 text-muted-foreground">
            Accelerating justice through technology. Our platform bridges the gap between citizens, 
            legal professionals, and law enforcement to streamline case processing in India.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/register" className="text-muted-foreground hover:text-foreground transition-colors">Register</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">User Types</h3>
          <ul className="space-y-2">
            <li><Link to="/public/register" className="text-muted-foreground hover:text-foreground transition-colors">Public</Link></li>
            <li><Link to="/police/login" className="text-muted-foreground hover:text-foreground transition-colors">Police</Link></li>
            <li><Link to="/lawyer/login" className="text-muted-foreground hover:text-foreground transition-colors">Lawyers</Link></li>
            <li><Link to="/judge/login" className="text-muted-foreground hover:text-foreground transition-colors">Judges</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dharma. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
