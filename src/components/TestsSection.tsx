
import { Link } from 'react-router-dom';
import { Headphones, BookOpen, FileText, Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock test data
const mockTests = [
  {
    id: 1,
    title: 'Academic Listening Test 1',
    type: 'listening',
    questionsCount: 40,
    duration: 30,
    difficulty: 'Medium',
    icon: Headphones,
    color: 'bg-ielts-blue',
  },
  {
    id: 2,
    title: 'General Reading Test 2',
    type: 'reading',
    questionsCount: 40,
    duration: 60,
    difficulty: 'Hard',
    icon: BookOpen,
    color: 'bg-ielts-green',
  },
  {
    id: 3,
    title: 'Academic Writing Task 1',
    type: 'writing',
    questionsCount: 2,
    duration: 60,
    difficulty: 'Medium',
    icon: FileText,
    color: 'bg-ielts-purple',
  },
  {
    id: 4,
    title: 'Speaking Practice - Part 2',
    type: 'speaking',
    questionsCount: 3,
    duration: 15,
    difficulty: 'Easy',
    icon: Mic,
    color: 'bg-orange-500',
  },
];

interface TestsSectionProps {
  title: string;
  icon: React.ReactNode;
  testType: string;
}

export function TestsSection({ title, icon, testType }: TestsSectionProps) {
  // Filter tests by type if needed
  const tests = testType ? mockTests.filter(test => test.type === testType) : mockTests;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Link to={`/tests/${testType}`} className="flex items-center text-primary font-medium hover:underline">
          <span>View all tests</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tests.map((test, index) => (
          <div 
            key={test.id} 
            className="test-card animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`module-icon ${test.color} mb-4`}>
              <test.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{test.duration} min</span>
              </div>
              <div>•</div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{test.questionsCount} Questions</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {test.difficulty}
              </span>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5">
                Start Test
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestsSection;
