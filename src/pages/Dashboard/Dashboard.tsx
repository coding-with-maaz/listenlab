
import { BarChart, Users, CheckSquare, Headphones, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { dashboardStats, recentActivities, mockSubmissions } from '@/data/mockDashboardData';
import { format, parseISO } from 'date-fns';

export default function DashboardPage() {
  // Function to format date
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  };

  // Function to format time
  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  // Function to get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <CheckSquare className="h-4 w-4 text-blue-500" />;
      case 'grading':
        return <Award className="h-4 w-4 text-green-500" />;
      case 'test':
        return <Headphones className="h-4 w-4 text-purple-500" />;
      case 'user':
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout title="Dashboard Overview">
      <div className="grid gap-6 mb-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <Headphones className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalTests}</div>
              <p className="text-xs text-muted-foreground">
                IELTS listening tests available
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                Tests completed by users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.pendingGrading}</div>
              <p className="text-xs text-muted-foreground">
                Submissions awaiting assessment
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered users on the platform
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.averageScore}</div>
              <p className="text-xs text-muted-foreground">
                Overall IELTS band score average
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                Users who complete tests fully
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivities.map((activity) => (
                <div className="flex items-start" key={activity.id}>
                  <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                      {activity.target && <span className="font-medium">{activity.target}</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 text-sm font-medium">
                  <div>User</div>
                  <div>Test</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Grade</div>
                </div>
                <div className="divide-y divide-border rounded-md border-t">
                  {mockSubmissions.slice(0, 5).map((submission) => (
                    <div className="grid grid-cols-5 items-center p-4 text-sm" key={submission.id}>
                      <div>{submission.userName}</div>
                      <div className="truncate max-w-[200px]">{submission.testName}</div>
                      <div>{formatDate(submission.submittedAt)}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          submission.status === 'graded' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {submission.status === 'graded' ? 'Graded' : 'Pending'}
                        </span>
                      </div>
                      <div>{submission.grade ?? '-'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
