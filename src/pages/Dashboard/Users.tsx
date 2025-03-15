
import { useState } from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/data/mockDashboardData';
import { 
  User, 
  Users,
  Search,
  MoreHorizontal,
  Shield
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter users based on the current filter
  const filteredUsers = mockUsers
    .filter(user => {
      if (roleFilter === 'all') return true;
      return user.role === roleFilter;
    })
    .filter(user => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
      );
    });
  
  return (
    <DashboardLayout title="User Management">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">User Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor all users on the platform.
          </p>
        </div>
        <Button>
          <User className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-4">
              <Button 
                variant={roleFilter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setRoleFilter('all')}
              >
                All Users
              </Button>
              <Button 
                variant={roleFilter === 'admin' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setRoleFilter('admin')}
              >
                Admins
              </Button>
              <Button 
                variant={roleFilter === 'user' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setRoleFilter('user')}
              >
                Regular Users
              </Button>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium flex items-center gap-1">
                    {user.role === 'admin' ? (
                      <>
                        <Shield className="h-3 w-3 text-amber-500" />
                        <span className="capitalize">Administrator</span>
                      </>
                    ) : (
                      <>
                        <Users className="h-3 w-3 text-blue-500" />
                        <span className="capitalize">Student</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="font-medium">{format(parseISO(user.joinedAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Tests</span>
                  <span className="font-medium">{user.testsCompleted}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Avg. Score</span>
                  <span className="font-medium">{user.averageScore > 0 ? user.averageScore : '-'}</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
                {user.role !== 'admin' && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Make Admin
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
