
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Clock, FileText, Info, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useApi } from '@/hooks/use-api';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Mock data - replace with actual API call in production
const mockListeningTests = [
  {
    id: '1',
    testName: 'Academic Listening Test 1',
    testType: 'academic',
    totalQuestions: 40,
    duration: 30,
    difficulty: 'Medium',
    sections: ['section1', 'section2', 'section3', 'section4'],
    createdAt: '2023-05-10T10:30:00Z',
  },
  {
    id: '2',
    testName: 'General Training Listening Test 1',
    testType: 'general',
    totalQuestions: 40,
    duration: 30,
    difficulty: 'Easy',
    sections: ['section1', 'section2', 'section3', 'section4'],
    createdAt: '2023-05-15T14:20:00Z',
  },
  {
    id: '3',
    testName: 'Academic Listening Test 2',
    testType: 'academic',
    totalQuestions: 40,
    duration: 30,
    difficulty: 'Hard',
    sections: ['section1', 'section2', 'section3', 'section4'],
    createdAt: '2023-06-01T09:15:00Z',
  },
  {
    id: '4',
    testName: 'General Training Listening Test 2',
    testType: 'general',
    totalQuestions: 40,
    duration: 30,
    difficulty: 'Medium',
    sections: ['section1', 'section2', 'section3', 'section4'],
    createdAt: '2023-06-10T11:45:00Z',
  },
  {
    id: '5',
    testName: 'Academic Listening Test 3',
    testType: 'academic',
    totalQuestions: 40,
    duration: 30,
    difficulty: 'Easy',
    sections: ['section1', 'section2', 'section3', 'section4'],
    createdAt: '2023-06-20T13:30:00Z',
  },
  {
    id: '6',
    testName: 'General Training Listening Test 3',
    testType: 'general',
    totalQuestions: 40,
    duration: 30,
    difficulty: 'Hard',
    sections: ['section1', 'section2', 'section3', 'section4'],
    createdAt: '2023-07-05T10:00:00Z',
  }
];

export default function ListeningTestsPage() {
  const [filter, setFilter] = useState('all');
  const [tests, setTests] = useState(mockListeningTests);
  const { request, loading } = useApi();
  const { toast } = useToast();

  useEffect(() => {
    // In a real implementation, fetch tests from the API
    const fetchTests = async () => {
      try {
        // Uncomment for real API integration
        // const response = await request({ url: '/api/listening-tests', withAuth: true });
        // setTests(response);
        
        // For now, we'll use mock data
        setTests(mockListeningTests);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load listening tests',
        });
      }
    };

    fetchTests();
  }, []);

  // Filter tests based on selected tab
  const filteredTests = filter === 'all' 
    ? tests 
    : tests.filter(test => test.testType === filter);

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">IELTS Listening Tests</h1>
                <p className="mt-2 text-lg text-gray-600">
                  Practice your listening skills with our comprehensive collection of IELTS-style tests
                </p>
              </div>
              <div className="hidden sm:block">
                <Button className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Exam Guide</span>
                </Button>
              </div>
            </div>
          </header>
          
          <Tabs defaultValue="all" className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger 
                  value="all" 
                  onClick={() => setFilter('all')}
                >
                  All Tests
                </TabsTrigger>
                <TabsTrigger 
                  value="academic" 
                  onClick={() => setFilter('academic')}
                >
                  Academic
                </TabsTrigger>
                <TabsTrigger 
                  value="general" 
                  onClick={() => setFilter('general')}
                >
                  General Training
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="academic" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="general" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Test Card Component
function TestCard({ test }) {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTestTypeColor = (type) => {
    return type === 'academic' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700';
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-1.5 ${test.testType === 'academic' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-start space-x-3">
          <div className={`p-2 mt-0.5 rounded-full flex-shrink-0 ${getTestTypeColor(test.testType)}`}>
            <Headphones className="h-4 w-4" />
          </div>
          <div>
            <div className="truncate">{test.testName}</div>
            <p className="text-xs text-gray-500 font-normal mt-1 capitalize">{test.testType} Test</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{test.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span>{test.totalQuestions} questions</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(test.difficulty)}`}>
            {test.difficulty}
          </span>
          
          <Link to={`/tests/listening/${test.id}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-focus">
              <span>Start Test</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
