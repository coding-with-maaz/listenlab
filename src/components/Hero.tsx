
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, PlayCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div 
      className="hero-section min-h-[600px] flex items-center py-24 bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Master Your IELTS Journey
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Comprehensive practice tests and resources for all IELTS modules: Listening, Reading,
            Writing, and Speaking. Prepare with confidence for your exam.
          </p>
          
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search for IELTS practice tests..."
                className="bg-white/90 backdrop-blur-md pl-10 pr-16 py-6 rounded-full border-none shadow-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-1.5 top-1.5 rounded-full bg-primary hover:bg-primary/90 p-5">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tests/listening">
              <Button className="bg-ielts-blue hover:bg-ielts-blue/90 text-white py-2 px-6 font-medium rounded-md flex items-center gap-2">
                <PlayCircle className="h-5 w-5" />
                Start Test
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="outline" className="bg-transparent border-2 border-ielts-green text-white hover:bg-ielts-green/20 py-2 px-6 font-medium rounded-md flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Practice Mode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
