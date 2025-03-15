
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-5">
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
            <p className="text-gray-500 text-sm mb-6">
              Helping students achieve their target IELTS band scores with comprehensive practice tests and resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Test Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tests/listening" className="text-gray-500 hover:text-primary transition-colors">
                  Listening Tests
                </Link>
              </li>
              <li>
                <Link to="/tests/reading" className="text-gray-500 hover:text-primary transition-colors">
                  Reading Tests
                </Link>
              </li>
              <li>
                <Link to="/tests/writing" className="text-gray-500 hover:text-primary transition-colors">
                  Writing Tests
                </Link>
              </li>
              <li>
                <Link to="/tests/speaking" className="text-gray-500 hover:text-primary transition-colors">
                  Speaking Tests
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tips" className="text-gray-500 hover:text-primary transition-colors">
                  Study Tips
                </Link>
              </li>
              <li>
                <Link to="/vocabulary" className="text-gray-500 hover:text-primary transition-colors">
                  Vocabulary Builder
                </Link>
              </li>
              <li>
                <Link to="/grammar" className="text-gray-500 hover:text-primary transition-colors">
                  Grammar Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-500 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-500 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-500 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} ListenLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
