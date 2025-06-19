
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CardCompare</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/cards" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/cards') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              All Cards
            </Link>
            <Link 
              to="/compare" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/compare') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Compare
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/blog') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Blog
            </Link>
          </div>

          <Button asChild className="hidden md:block">
            <Link to="/cards">Find Your Card</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
