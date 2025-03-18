import { Headphones, BookOpen, FileText, Mic } from 'lucide-react';
import Navigation from '../components/Navbar';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import TestsSection from '../components/TestsSection';
import FeatureSection from '../components/FeatureSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';
import FaqSection from '../components/FaqSection';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-0">
        <Hero />
        
        <StatsSection />
        
        <TestsSection 
          title="Listening Tests" 
          icon={<Headphones className="h-6 w-6 text-ielts-blue" />} 
          testType="listening"
        />
        
        <FeatureSection />
        
        <div className="bg-gray-50 py-16">
          <TestsSection 
            title="Reading Tests" 
            icon={<BookOpen className="h-6 w-6 text-ielts-green" />} 
            testType="reading"
          />
        </div>
        
        <TestimonialsSection />
        
        <div className="bg-gray-50 py-16">
          <TestsSection 
            title="Writing Tests" 
            icon={<FileText className="h-6 w-6 text-ielts-purple" />} 
            testType="writing"
          />
        </div>
        
        <CtaSection />
        
        <TestsSection 
          title="Speaking Tests" 
          icon={<Mic className="h-6 w-6 text-orange-500" />} 
          testType="speaking"
        />
        
        <FaqSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
