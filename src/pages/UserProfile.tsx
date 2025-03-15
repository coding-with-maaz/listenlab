
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, GraduationCap, Globe, Phone, FileText, History, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  useUserProfile, 
  useUserStats, 
  useUserActivity, 
  useUpdateProfile, 
  useChangePassword,
  UserProfile as UserProfileType
} from '@/hooks/use-user-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock user data for development
const mockUserData: UserProfileType = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'user',
  profile: {
    phoneNumber: '+44 1234 567890',
    country: 'United Kingdom',
    targetBand: 7.5,
    nativeLanguage: 'Spanish',
    bio: 'Preparing for IELTS to pursue master\'s degree in Business Administration.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop'
  },
  createdAt: new Date().toISOString(),
  submittedListeningTests: [
    { 
      id: '1', 
      test: { id: 't1', testName: 'Academic Listening Test 1' },
      grade: 7.0, 
      status: 'graded', 
      submittedAt: '2023-04-15T10:30:00Z',
      gradedAt: '2023-04-16T14:20:00Z'
    },
    { 
      id: '2', 
      test: { id: 't2', testName: 'General Listening Test 1' },
      grade: 6.5, 
      status: 'graded', 
      submittedAt: '2023-04-10T09:15:00Z',
      gradedAt: '2023-04-11T16:45:00Z'
    }
  ],
  submittedReadingTests: [
    { 
      id: '3', 
      test: { id: 't3', testName: 'Academic Reading Test 1' },
      bandScore: 6.5, 
      status: 'graded', 
      submittedAt: '2023-04-05T11:20:00Z',
      gradedAt: '2023-04-06T15:30:00Z'
    }
  ],
  submittedWritingTests: [
    { 
      id: '4', 
      test: { id: 't4', testName: 'Academic Writing Test 1' },
      overallBandScore: 7.0, 
      status: 'graded', 
      submittedAt: '2023-04-01T14:00:00Z',
      gradedAt: '2023-04-03T10:15:00Z'
    }
  ]
};

export default function UserProfile() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  
  // Use the real API in production, fallback to mock data in development
  const { data: user, isLoading: isUserLoading } = useUserProfile();
  const { data: stats, isLoading: isStatsLoading } = useUserStats();
  const { data: activity, isLoading: isActivityLoading } = useUserActivity();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: {
      phoneNumber: '',
      country: '',
      targetBand: 0,
      nativeLanguage: '',
      bio: ''
    }
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Using the real data or mock data based on environment
  const userData = user || mockUserData;
  
  // Initialize form data when user data is loaded
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        profile: {
          phoneNumber: userData.profile.phoneNumber || '',
          country: userData.profile.country || '',
          targetBand: userData.profile.targetBand || 0,
          nativeLanguage: userData.profile.nativeLanguage || '',
          bio: userData.profile.bio || ''
        }
      });
    }
  }, [userData]);

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested fields (profile properties)
      const [parent, child] = name.split('.');
      setFormData(prev => ({ 
        ...prev, 
        [parent]: { 
          ...prev[parent as keyof typeof prev], 
          [child]: value 
        } 
      }));
    } else {
      // Handle top-level fields
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }
    
    changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });
    
    // Reset form and close dialog on success
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordOpen(false);
  };

  // Calculate statistics
  const calculateStats = () => {
    if (!userData) return { testsCompleted: 0, averageScore: 0 };
    
    const listeningTests = userData.submittedListeningTests || [];
    const readingTests = userData.submittedReadingTests || [];
    const writingTests = userData.submittedWritingTests || [];
    
    const totalTests = listeningTests.length + readingTests.length + writingTests.length;
    
    if (totalTests === 0) return { testsCompleted: 0, averageScore: 0 };
    
    const gradedListeningTests = listeningTests.filter(test => test.grade !== undefined);
    const gradedReadingTests = readingTests.filter(test => test.bandScore !== undefined);
    const gradedWritingTests = writingTests.filter(test => test.overallBandScore !== undefined);
    
    let totalScore = 0;
    let gradedTests = 0;
    
    if (gradedListeningTests.length > 0) {
      totalScore += gradedListeningTests.reduce((sum, test) => sum + (test.grade || 0), 0);
      gradedTests += gradedListeningTests.length;
    }
    
    if (gradedReadingTests.length > 0) {
      totalScore += gradedReadingTests.reduce((sum, test) => sum + (test.bandScore || 0), 0);
      gradedTests += gradedReadingTests.length;
    }
    
    if (gradedWritingTests.length > 0) {
      totalScore += gradedWritingTests.reduce((sum, test) => sum + (test.overallBandScore || 0), 0);
      gradedTests += gradedWritingTests.length;
    }
    
    const averageScore = gradedTests > 0 ? totalScore / gradedTests : 0;
    
    return {
      testsCompleted: totalTests,
      averageScore: averageScore
    };
  };

  const userStats = calculateStats();

  // Combine all test history for display
  const getTestHistory = () => {
    if (!userData) return [];
    
    const listeningTests = (userData.submittedListeningTests || []).map(test => ({
      id: test.id,
      type: 'Listening',
      testName: test.test.testName,
      score: test.grade,
      date: test.submittedAt,
      status: test.status
    }));
    
    const readingTests = (userData.submittedReadingTests || []).map(test => ({
      id: test.id,
      type: 'Reading',
      testName: test.test.testName,
      score: test.bandScore,
      date: test.submittedAt,
      status: test.status
    }));
    
    const writingTests = (userData.submittedWritingTests || []).map(test => ({
      id: test.id,
      type: 'Writing',
      testName: test.test.testName,
      score: test.overallBandScore,
      date: test.submittedAt,
      status: test.status
    }));
    
    return [...listeningTests, ...readingTests, ...writingTests]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const testHistory = getTestHistory();

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto mt-4" />
                  <Skeleton className="h-4 w-48 mx-auto mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column: User Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={userData.profile.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{userData.name}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
                {userData.profile.country && (
                  <div className="flex justify-center items-center mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{userData.profile.country}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {userData.profile.targetBand && (
                    <div>
                      <p className="text-muted-foreground">Target Band</p>
                      <p className="font-medium flex items-center mt-1">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {userData.profile.targetBand}
                      </p>
                    </div>
                  )}
                  {userData.profile.nativeLanguage && (
                    <div>
                      <p className="text-muted-foreground">Native Language</p>
                      <p className="font-medium flex items-center mt-1">
                        <Globe className="h-4 w-4 mr-1" />
                        {userData.profile.nativeLanguage}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Tests Completed</p>
                    <p className="font-medium">{userStats.testsCompleted}</p>
                  </div>
                  {userStats.averageScore > 0 && (
                    <div>
                      <p className="text-muted-foreground">Average Score</p>
                      <p className="font-medium">{userStats.averageScore.toFixed(1)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                {!isEditing && (
                  <>
                    <Button onClick={() => setIsEditing(true)} className="w-full">
                      Edit Profile
                    </Button>
                    <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Lock className="h-4 w-4 mr-2" /> Change Password
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <form onSubmit={handlePasswordSubmit}>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Enter your current password and a new password.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentPassword">Current Password</Label>
                              <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newPassword">New Password</Label>
                              <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                required
                                minLength={6}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm New Password</Label>
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setPasswordOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isChangingPassword}>
                              {isChangingPassword ? 'Saving...' : 'Save Changes'}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </CardFooter>
            </Card>

            {userData.profile.bio && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{userData.profile.bio}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Tabs and Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="mb-4">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </TabsTrigger>
                <TabsTrigger value="tests" className="flex items-center">
                  <History className="h-4 w-4 mr-2" />
                  Test History
                </TabsTrigger>
                <TabsTrigger value="results" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Results Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>
                          Make changes to your profile here. Click save when you're done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profile.phoneNumber">Phone Number</Label>
                            <Input 
                              id="profile.phoneNumber" 
                              name="profile.phoneNumber" 
                              value={formData.profile.phoneNumber} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profile.country">Country</Label>
                            <Input 
                              id="profile.country" 
                              name="profile.country" 
                              value={formData.profile.country} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profile.targetBand">Target Band Score</Label>
                            <Input 
                              id="profile.targetBand" 
                              name="profile.targetBand" 
                              type="number" 
                              min="0" 
                              max="9" 
                              step="0.5" 
                              value={formData.profile.targetBand.toString()} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profile.nativeLanguage">Native Language</Label>
                            <Input 
                              id="profile.nativeLanguage" 
                              name="profile.nativeLanguage" 
                              value={formData.profile.nativeLanguage} 
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profile.bio">Biography</Label>
                          <textarea 
                            id="profile.bio" 
                            name="profile.bio" 
                            value={formData.profile.bio} 
                            onChange={handleInputChange}
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </CardFooter>
                    </form>
                  ) : (
                    <>
                      <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                        <CardDescription>
                          View your detailed profile information.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <h3 className="font-medium">Full Name</h3>
                            <p className="text-muted-foreground">{userData.name}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-muted-foreground">{userData.email}</p>
                          </div>
                          {userData.profile.phoneNumber && (
                            <div>
                              <h3 className="font-medium">Phone Number</h3>
                              <p className="text-muted-foreground flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {userData.profile.phoneNumber}
                              </p>
                            </div>
                          )}
                          {userData.profile.country && (
                            <div>
                              <h3 className="font-medium">Country</h3>
                              <p className="text-muted-foreground flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {userData.profile.country}
                              </p>
                            </div>
                          )}
                          {userData.profile.targetBand && (
                            <div>
                              <h3 className="font-medium">Target Band Score</h3>
                              <p className="text-muted-foreground">{userData.profile.targetBand}</p>
                            </div>
                          )}
                          {userData.profile.nativeLanguage && (
                            <div>
                              <h3 className="font-medium">Native Language</h3>
                              <p className="text-muted-foreground">{userData.profile.nativeLanguage}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="tests">
                <Card>
                  <CardHeader>
                    <CardTitle>Test History</CardTitle>
                    <CardDescription>
                      View all the tests you've taken and your results.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testHistory.length > 0 ? (
                        testHistory.map(test => (
                          <div key={test.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{test.testName}</h3>
                                <p className="text-sm text-muted-foreground">
                                  <span className="capitalize">{test.type}</span> test - Completed on {new Date(test.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center">
                                {test.status === 'graded' ? (
                                  <div className="bg-primary/10 px-2 py-1 rounded-md">
                                    <span className="font-medium">Band {test.score?.toFixed(1)}</span>
                                  </div>
                                ) : (
                                  <div className="bg-yellow-100 px-2 py-1 rounded-md text-yellow-700">
                                    <span className="font-medium">Pending</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-8">
                          You haven't taken any tests yet.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results">
                <Card>
                  <CardHeader>
                    <CardTitle>Results Analysis</CardTitle>
                    <CardDescription>
                      Performance analysis and improvement suggestions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userStats.testsCompleted > 0 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="bg-primary/5 p-4 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Tests Completed</p>
                            <p className="text-3xl font-bold">{userStats.testsCompleted}</p>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Average Score</p>
                            <p className="text-3xl font-bold">{userStats.averageScore.toFixed(1)}</p>
                          </div>
                          
                          {userData.profile.targetBand && (
                            <div className="bg-primary/5 p-4 rounded-lg text-center">
                              <p className="text-sm text-muted-foreground">Gap to Target</p>
                              <p className="text-3xl font-bold">
                                {(userData.profile.targetBand - userStats.averageScore).toFixed(1)}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Improvement Suggestions</h3>
                          <p className="text-muted-foreground">
                            Based on your test performance, we recommend focusing on the following areas:
                          </p>
                          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                            <li>Practice more listening exercises with different accents</li>
                            <li>Work on expanding your academic vocabulary</li>
                            <li>Improve your reading speed with timed practice sessions</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Detailed analytics will be available here after more tests are completed.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
