
import { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSubmissions } from '@/data/mockDashboardData';
import { 
  Download, 
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Search
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';

export default function SubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter submissions based on the current filter
  const filteredSubmissions = mockSubmissions
    .filter(submission => {
      if (statusFilter === 'all') return true;
      return submission.status === statusFilter;
    })
    .filter(submission => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        submission.userName.toLowerCase().includes(query) || 
        submission.testName.toLowerCase().includes(query)
      );
    });
  
  return (
    <DashboardLayout title="Test Submissions">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Test Submissions</h2>
          <p className="text-sm text-muted-foreground">
            Review and grade submitted listening tests.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-4">
              <Button 
                variant={statusFilter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === 'pending' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button 
                variant={statusFilter === 'graded' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setStatusFilter('graded')}
              >
                Graded
              </Button>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 text-sm font-medium">
              <div>User</div>
              <div>Test</div>
              <div>Date</div>
              <div>Time Taken</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="divide-y divide-border rounded-md border-t">
              {filteredSubmissions.map((submission) => (
                <div className="grid grid-cols-6 items-center p-4 text-sm" key={submission.id}>
                  <div>{submission.userName}</div>
                  <div className="truncate max-w-[200px]">{submission.testName}</div>
                  <div>{format(parseISO(submission.submittedAt), 'MMM dd, yyyy')}</div>
                  <div>{submission.completionTime} min</div>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      submission.status === 'graded' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.status === 'graded' ? (
                        <><CheckCircle2 className="mr-1 h-3 w-3" /> Graded</>
                      ) : (
                        <><XCircle className="mr-1 h-3 w-3" /> Pending</>
                      )}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-3 w-3" /> View
                    </Button>
                    {submission.status === 'pending' && (
                      <Button size="sm">
                        Grade
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
