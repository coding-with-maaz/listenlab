
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
                  <path d="M8 7h6"></path>
                  <path d="M8 11h8"></path>
                  <path d="M8 15h6"></path>
                </svg>
              </div>
              <span className="font-display font-bold text-xl">ListenLab</span>
            </Link>
            
            <nav className="ml-10 hidden md:flex items-center space-x-1">
              <Link to="/" className="nav-link active">Home</Link>
              <Link to="/tests" className="nav-link">Practice Tests</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/about" className="nav-link">About</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`relative ${searchOpen ? 'w-64' : 'w-10'} transition-all duration-300`}>
              {searchOpen ? (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="btn-icon"
                >
                  <Search className="h-4 w-4 text-gray-600" />
                </button>
              )}
              
              {searchOpen && (
                <Input
                  type="search"
                  placeholder="Search tests..."
                  className="search-input pl-10 pr-4 py-2 w-full"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              )}
            </div>

            <div className="ml-3 relative">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Account</span>
                </Button>
                
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
