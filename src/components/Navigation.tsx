
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, ChevronDown, Headphones, BookOpen, FileText, Mic, User, LogOut, Settings } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const isAuthenticated = true; // This would come from auth state in a real app

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav links */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-ielts-blue">
                IELTS<span className="text-ielts-green">Prep</span>
              </Link>
            </div>
            {!isMobile && (
              <div className="ml-6 flex items-center space-x-4">
                <NavLink to="/" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }>
                  Home
                </NavLink>

                {/* Tests Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`nav-link flex items-center ${
                      location.pathname.startsWith('/tests') ? 'active' : ''
                    }`}>
                      Tests <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/tests/listening" className="flex items-center gap-2">
                        <Headphones className="h-4 w-4 text-ielts-blue" />
                        Listening Tests
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tests/reading" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-ielts-green" />
                        Reading Tests
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tests/writing" className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-ielts-purple" />
                        Writing Tests
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tests/speaking" className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-orange-500" />
                        Speaking Tests
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <NavLink to="/about" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }>
                  About
                </NavLink>
                <NavLink to="/contact" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }>
                  Contact
                </NavLink>
              </div>
            )}
          </div>
          
          {/* Secondary nav items (right side) */}
          <div className="flex items-center">
            {!isMobile && isAuthenticated ? (
              <div className="flex items-center ml-4 relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <LogOut className="h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : !isMobile ? (
              <div className="flex items-center ml-4">
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button className="ml-2">Sign up</Button>
                </Link>
              </div>
            ) : null}
            
            {/* Mobile menu button */}
            {isMobile && (
              <div className="-mr-2 flex items-center">
                <button
                  onClick={toggleMenu}
                  className="btn-icon p-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
            
            {/* Tests Links */}
            <p className="px-3 py-2 text-base font-medium text-gray-700">Tests</p>
            <Link to="/tests/listening" className="mobile-nav-link ml-4 flex items-center" onClick={closeMenu}>
              <Headphones className="h-4 w-4 mr-2 text-ielts-blue" />
              Listening Tests
            </Link>
            <Link to="/tests/reading" className="mobile-nav-link ml-4 flex items-center" onClick={closeMenu}>
              <BookOpen className="h-4 w-4 mr-2 text-ielts-green" />
              Reading Tests
            </Link>
            <Link to="/tests/writing" className="mobile-nav-link ml-4 flex items-center" onClick={closeMenu}>
              <FileText className="h-4 w-4 mr-2 text-ielts-purple" />
              Writing Tests
            </Link>
            <Link to="/tests/speaking" className="mobile-nav-link ml-4 flex items-center" onClick={closeMenu}>
              <Mic className="h-4 w-4 mr-2 text-orange-500" />
              Speaking Tests
            </Link>
            
            <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>About</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
          </div>
          
          {/* Mobile Authentication Links */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">John Smith</div>
                    <div className="text-sm font-medium text-gray-500">john@example.com</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-4">
                  <Link to="/profile" className="mobile-nav-link" onClick={closeMenu}>
                    Profile
                  </Link>
                  <Link to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>
                    Dashboard
                  </Link>
                  <button className="mobile-nav-link w-full text-left">
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-4">
                <Link to="/login" className="mobile-nav-link" onClick={closeMenu}>
                  Log in
                </Link>
                <Link to="/signup" className="mobile-nav-link" onClick={closeMenu}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
