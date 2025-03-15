
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, PieChart, LineChart, Calendar } from 'lucide-react';

export default function ReportsPage() {
  return (
    <DashboardLayout title="Analytics & Reports">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Analytics & Reports</h2>
          <p className="text-sm text-muted-foreground">
            View detailed analytics and generate reports on test performance.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Reports
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Submissions by Test Type</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-t pt-4">
            <div className="text-center">
              <PieChart className="h-16 w-16 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-muted-foreground mb-4">Distribution of academic vs general test submissions</p>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-t pt-4">
            <div className="text-center">
              <LineChart className="h-16 w-16 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-muted-foreground mb-4">New user registrations over time</p>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Score Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-t pt-4">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-muted-foreground mb-4">Distribution of user scores across all tests</p>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-96 flex items-center justify-center border-t pt-4">
            <div className="text-center">
              <Calendar className="h-24 w-24 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-muted-foreground mb-4">
                Monthly breakdown of tests completed, new users, and average scores
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Select a specific date range to filter the data
              </p>
              <Button>Generate Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
