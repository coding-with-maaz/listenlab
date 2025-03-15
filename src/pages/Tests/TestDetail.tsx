
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Headphones, Clock, FileText, ArrowLeft, Download, HelpCircle, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useApi } from '@/hooks/use-api';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Mock data - replace with API call in production
const mockTest = {
  id: '1',
  testName: 'Academic Listening Test 1',
  testType: 'academic',
  totalQuestions: 40,
  duration: 30,
  difficulty: 'Medium',
  sections: [
    { id: 's1', name: 'Section 1', questions: 10, description: 'A conversation between two people about everyday social needs' },
    { id: 's2', name: 'Section 2', questions: 10, description: 'A monologue about a general topic of interest' },
    { id: 's3', name: 'Section 3', questions: 10, description: 'A conversation between up to four people in an academic context' },
    { id: 's4', name: 'Section 4', questions: 10, description: 'A monologue on an academic subject' }
  ],
  instructions: 'You will hear a recording with 4 sections. For each section, you will have time to read the questions before you listen. After each section, you will have time to check your answers. Each recording will play ONCE only.',
  answerSheetPDF: '/sample-answer-sheet.pdf',
  createdAt: '2023-05-10T10:30:00Z',
};

export default function TestDetailPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { request } = useApi();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        // In a real app, uncomment this to fetch from API
        // const data = await request({ url: `/api/listening-tests/${id}` });
        // setTest(data);
        
        // For now, use mock data
        setTimeout(() => {
          setTest(mockTest);
          setLoading(false);
        }, 500);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load test details',
        });
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">Test Not Found</h2>
          <p className="mb-6 text-center">Sorry, we couldn't find the test you're looking for.</p>
          <Link to="/tests/listening">
            <Button>Back to Listening Tests</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const getTestTypeColor = (type) => {
    return type === 'academic' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/tests/listening" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Listening Tests
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
            <div className="px-6 py-5 border-b">
              <div className="flex flex-wrap items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold text-gray-900">{test.testName}</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTestTypeColor(test.testType)}`}>
                      {test.testType === 'academic' ? 'Academic' : 'General Training'}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-medium flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {test.duration} min
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Questions</p>
                    <p className="font-medium flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-1 text-gray-400" />
                      {test.totalQuestions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Instructions</h2>
                <div className="bg-gray-50 rounded-md p-4 text-sm border border-gray-200">
                  {test.instructions}
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Test Content</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {test.sections.map((section) => (
                    <Card key={section.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">{section.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {section.questions} questions
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-xs text-gray-600">
                        {section.description}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Resources</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <Download className="h-4 w-4 mr-2 text-gray-500" />
                        Answer Sheet
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-600">
                      Download the official answer sheet for this test
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="secondary" className="w-full">Download PDF</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-gray-500" />
                        Exam Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-600">
                      Review helpful strategies for the listening test
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="secondary" className="w-full">View Tips</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Button size="lg" className="w-full sm:w-auto">
                  <Headphones className="mr-2 h-5 w-5" />
                  Start Test
                </Button>
                
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Practice Mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
