
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockTests } from '@/data/mockDashboardData';
import { 
  Headphones, 
  Plus, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Copy,
  Clock,
  FileText
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function ListeningTestsPage() {
  const [filter, setFilter] = useState('all');
  
  // Filter tests based on the current filter
  const filteredTests = filter === 'all' 
    ? mockTests 
    : mockTests.filter(test => test.testType === filter);
  
  return (
    <DashboardLayout title="Listening Tests">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Listening Tests</h2>
          <p className="text-sm text-muted-foreground">
            Manage all IELTS listening tests available on the platform.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Test
        </Button>
      </div>
      
      <div className="mb-6 flex items-center space-x-4">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Tests
        </Button>
        <Button 
          variant={filter === 'academic' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('academic')}
        >
          Academic
        </Button>
        <Button 
          variant={filter === 'general' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('general')}
        >
          General
        </Button>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTests.map((test) => (
          <Card key={test.id} className="overflow-hidden">
            <div className={`h-1 ${test.testType === 'academic' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium flex gap-2 items-center">
                <div className={`p-1.5 rounded-full ${test.testType === 'academic' ? 'bg-blue-100 text-blue-500' : 'bg-green-100 text-green-500'}`}>
                  <Headphones className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="truncate max-w-[200px]">{test.testName}</span>
                  <span className="text-xs text-muted-foreground capitalize">{test.testType}</span>
                </div>
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Questions</span>
                  <span className="font-medium flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    {test.totalQuestions}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {test.duration} min
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Sections</span>
                  <span className="font-medium">{test.sectionsCount}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{format(parseISO(test.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs ${
                  test.status === 'active' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-amber-600 bg-amber-50'
                  } px-2 py-1 rounded-full font-medium`}>
                  {test.status === 'active' ? 'Active' : 'Draft'}
                </span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
