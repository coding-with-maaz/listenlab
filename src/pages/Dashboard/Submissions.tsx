import { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Search,
  Loader2
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { useGetAllSubmissionsQuery, useGradeSubmissionMutation } from '@/store/api/listeningTestsApi';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SubmissionsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const { data: submissions = [], isLoading } = useGetAllSubmissionsQuery();
  const [gradeSubmission, { isLoading: isGrading }] = useGradeSubmissionMutation();
  
  // Filter submissions based on the current filter
  const filteredSubmissions = submissions
    .filter(submission => {
      if (statusFilter === 'all') return true;
      return submission.status === statusFilter;
    })
    .filter(submission => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        (submission.user?.name?.toLowerCase() || '').includes(query) || 
        (submission.test?.title?.toLowerCase() || '').includes(query)
      );
    });

  const handleGrade = async () => {
    if (!selectedSubmission || !grade || !feedback) return;

    try {
      await gradeSubmission({
        submissionId: selectedSubmission,
        grade: parseFloat(grade),
        feedback
      }).unwrap();

      toast({
        title: "Success",
        description: "Submission graded successfully",
      });

      // Reset form
      setSelectedSubmission(null);
      setGrade('');
      setFeedback('');
    } catch (error) {
      console.error('Grading error:', error);
      toast({
        title: "Error",
        description: "Failed to grade submission. Please try again.",
        variant: "destructive",
      });
    }
  };
  
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
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
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
                  <div className="grid grid-cols-6 items-center p-4 text-sm" key={submission._id}>
                    <div>{submission.user?.name || 'Unknown User'}</div>
                    <div className="truncate max-w-[200px]">{submission.test?.title || 'Unknown Test'}</div>
                    <div>{format(parseISO(submission.submittedAt), 'MMM dd, yyyy')}</div>
                    <div>N/A</div>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/submissions/${submission._id}`)}
                      >
                        <Eye className="mr-1 h-3 w-3" /> View
                      </Button>
                      {submission.status === 'pending' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              onClick={() => setSelectedSubmission(submission._id)}
                            >
                              Grade
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Grade Submission</DialogTitle>
                              <DialogDescription>
                                Provide a grade and feedback for this submission.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="grade">Grade (0-100)</Label>
                                <Input
                                  id="grade"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={grade}
                                  onChange={(e) => setGrade(e.target.value)}
                                  placeholder="Enter grade"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="feedback">Feedback</Label>
                                <Textarea
                                  id="feedback"
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  placeholder="Enter feedback"
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                onClick={handleGrade}
                                disabled={isGrading || !grade || !feedback}
                              >
                                {isGrading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Grading...
                                  </>
                                ) : (
                                  'Submit Grade'
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
