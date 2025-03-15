
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogOut, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from '@/hooks/use-mobile';

export function Navigation() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
            
            {/* Desktop Navigation */}
            <nav className="ml-10 hidden md:flex items-center space-x-1">
              <Link to="/" className="nav-link active">Home</Link>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 px-3">Tests</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-1 gap-3 p-4 w-[220px]">
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/tests/listening" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Listening Tests</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Practice IELTS listening skills
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/tests/reading" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Reading Tests</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Improve your reading comprehension
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/tests/writing" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Writing Tests</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Practice essay and letter writing
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/tests/speaking" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Speaking Tests</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Prepare for the speaking interview
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/about" className="nav-link">About</Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="mobile-nav-link">Home</Link>
            
            <div className="py-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  <span>Tests</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/tests/listening">Listening Tests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/tests/reading">Reading Tests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/tests/writing">Writing Tests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/tests/speaking">Speaking Tests</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Link to="/dashboard" className="mobile-nav-link">Dashboard</Link>
            <Link to="/about" className="mobile-nav-link">About</Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">User Account</div>
                <div className="text-sm font-medium text-gray-500">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;
