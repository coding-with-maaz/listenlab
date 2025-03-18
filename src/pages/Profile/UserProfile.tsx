import React from "react";
import { useGetUserQuery } from "@/store/api/userApi";
import { useGetUserSubmissionsQuery } from "@/store/api/listeningTestsApi";
import { useGetUserReadingSubmissionsQuery } from "@/store/api/readingTestsApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, GraduationCap, Clock, Calendar, CheckCircle } from "lucide-react";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMMM d, yyyy') : 'N/A';
};

export default function UserProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: user, isLoading: userLoading, error: userError } = useGetUserQuery();
  const { 
    data: submissions = [], 
    isLoading: submissionsLoading, 
    error: submissionsError,
    refetch: refetchSubmissions
  } = useGetUserSubmissionsQuery();

  // Fetch reading submissions
  const { 
    data: readingSubmissions = [], 
    isLoading: readingSubmissionsLoading, 
    error: readingSubmissionsError 
  } = useGetUserReadingSubmissionsQuery();

  React.useEffect(() => {
    console.log('Current submissions:', submissions);
    console.log('Current reading submissions:', readingSubmissions);
    
    if (userError) {
      toast({
        title: "Error loading profile",
        description: "Failed to load user profile. Please try again.",
        variant: "destructive",
      });
    }
    if (submissionsError) {
      console.error('Submissions error:', submissionsError);
      toast({
        title: "Error loading submissions",
        description: "Failed to load test submissions. Please try again.",
        variant: "destructive",
      });
    }
    if (readingSubmissionsError) {
      console.error('Reading submissions error:', readingSubmissionsError);
      toast({
        title: "Error loading reading submissions",
        description: "Failed to load reading test submissions. Please try again.",
        variant: "destructive",
      });
    }
  }, [userError, submissionsError, readingSubmissionsError, submissions, readingSubmissions, toast]);

  if (userLoading || submissionsLoading || readingSubmissionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your personal information and account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="text-lg capitalize">{user?.role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Member Since</label>
              <p className="text-lg">{formatDate(user?.createdAt)}</p>
            </div>
            {user?.profile && (
              <>
                {user.profile.country && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Country</label>
                    <p className="text-lg">{user.profile.country}</p>
                  </div>
                )}
                {user.profile.nativeLanguage && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Native Language</label>
                    <p className="text-lg">{user.profile.nativeLanguage}</p>
                  </div>
                )}
                {user.profile.targetBand && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Target Band Score</label>
                    <p className="text-lg">{user.profile.targetBand}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submitted Tests */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Submitted Tests</h2>
          {submissionsError && (
            <Button 
              variant="outline" 
              onClick={() => refetchSubmissions()}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4" />
              Retry Loading
            </Button>
          )}
        </div>
        
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                <GraduationCap className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">You haven't taken any tests yet.</p>
                <Button className="mt-4" variant="outline" onClick={() => navigate('/tests')}>
                  Browse Available Tests
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((submission) => {
              console.log('Rendering submission:', submission);
              return (
                <Card key={submission._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-2">{submission.test?.title || 'Untitled Test'}</CardTitle>
                        <CardDescription>
                          Type: <span className="capitalize">{submission.test?.type || 'N/A'}</span>
                        </CardDescription>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        submission.status === 'graded' 
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}>
                        {submission.status === 'graded' ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>Graded</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Submitted:</span>
                        </div>
                        <span className="font-medium">
                          {formatDate(submission.submittedAt)}
                        </span>
                      </div>

                      {submission.status === 'graded' && (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span>Grade:</span>
                            <span className="font-bold text-lg">
                              {submission.grade ?? 'N/A'}
                            </span>
                          </div>
                          {submission.feedback && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-2">Feedback:</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                {submission.feedback}
                              </p>
                            </div>
                          )}
                        </>
                      )}

                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => navigate(`/submissions/${submission._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Reading Submissions */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Submitted Reading Tests</h2>
          {readingSubmissionsError && (
            <Button 
              variant="outline" 
              onClick={() => refetchSubmissions()}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4" />
              Retry Loading
            </Button>
          )}
        </div>
        
        {readingSubmissions.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                <GraduationCap className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">You haven't submitted any reading tests yet.</p>
                <Button className="mt-4" variant="outline" onClick={() => navigate('/tests/reading')}>
                  Browse Available Reading Tests
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {readingSubmissions.map((submission) => {
              console.log('Rendering reading submission:', submission);
              return (
                <Card key={submission._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-2">{submission.test?.testName || 'Untitled Reading Test'}</CardTitle>
                        <CardDescription>
                          Type: <span className="capitalize">{submission.test?.testType || 'N/A'}</span>
                        </CardDescription>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        submission.status === 'graded' 
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}>
                        {submission.status === 'graded' ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>Graded</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Submitted:</span>
                        </div>
                        <span className="font-medium">
                          {formatDate(submission.submittedAt)}
                        </span>
                      </div>

                      {submission.status === 'graded' && (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span>Grade:</span>
                            <span className="font-bold text-lg">
                              {submission.grade ?? 'N/A'}
                            </span>
                          </div>
                          {submission.feedback && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-2">Feedback:</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                {submission.feedback}
                              </p>
                            </div>
                          )}
                        </>
                      )}

                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => navigate(`/submissions/${submission._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
