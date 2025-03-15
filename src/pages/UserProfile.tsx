
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApi } from '@/hooks/use-api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, GraduationCap, Globe, Phone, FileText, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock user data - would be replaced with actual API call in production
const mockUserData = {
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
  stats: {
    testsCompleted: 12,
    averageScore: 6.8,
    lastTestDate: '2023-04-15',
    testHistory: [
      { id: '1', type: 'Listening', score: 7.0, date: '2023-04-15' },
      { id: '2', type: 'Reading', score: 6.5, date: '2023-04-10' },
      { id: '3', type: 'Writing', score: 6.5, date: '2023-04-05' },
      { id: '4', type: 'Speaking', score: 7.0, date: '2023-04-01' }
    ]
  }
};

export default function UserProfile() {
  const [user, setUser] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.profile.phoneNumber,
    country: user.profile.country,
    targetBand: user.profile.targetBand,
    nativeLanguage: user.profile.nativeLanguage,
    bio: user.profile.bio
  });
  
  const { toast } = useToast();
  const { request, loading } = useApi();
  const { id } = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call the API to update user data
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    
    // Update local state with form data
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      profile: {
        ...prev.profile,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        targetBand: formData.targetBand as number,
        nativeLanguage: formData.nativeLanguage,
        bio: formData.bio
      }
    }));
    
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
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
                  <AvatarImage src={user.profile.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="flex justify-center items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.profile.country}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Target Band</p>
                    <p className="font-medium flex items-center mt-1">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {user.profile.targetBand}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Native Language</p>
                    <p className="font-medium flex items-center mt-1">
                      <Globe className="h-4 w-4 mr-1" />
                      {user.profile.nativeLanguage}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tests Completed</p>
                    <p className="font-medium">{user.stats.testsCompleted}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Average Score</p>
                    <p className="font-medium">{user.stats.averageScore.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="w-full">
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{user.profile.bio}</p>
              </CardContent>
            </Card>
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
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input 
                              id="phoneNumber" 
                              name="phoneNumber" 
                              value={formData.phoneNumber} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input 
                              id="country" 
                              name="country" 
                              value={formData.country} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="targetBand">Target Band Score</Label>
                            <Input 
                              id="targetBand" 
                              name="targetBand" 
                              type="number" 
                              min="0" 
                              max="9" 
                              step="0.5" 
                              value={formData.targetBand.toString()} 
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nativeLanguage">Native Language</Label>
                            <Input 
                              id="nativeLanguage" 
                              name="nativeLanguage" 
                              value={formData.nativeLanguage} 
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Biography</Label>
                          <textarea 
                            id="bio" 
                            name="bio" 
                            value={formData.bio} 
                            onChange={handleInputChange}
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                          Save Changes
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
                            <p className="text-muted-foreground">{user.name}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-muted-foreground">{user.email}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Phone Number</h3>
                            <p className="text-muted-foreground flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {user.profile.phoneNumber}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium">Country</h3>
                            <p className="text-muted-foreground flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {user.profile.country}
                            </p>
                          </div>
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
                      {user.stats.testHistory.map(test => (
                        <div key={test.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{test.type} Test</h3>
                              <p className="text-sm text-muted-foreground">
                                Completed on {new Date(test.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="bg-primary/10 px-2 py-1 rounded-md">
                              <span className="font-medium">Band {test.score.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
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
                    <p className="text-muted-foreground text-center py-8">
                      Detailed analytics will be available here after more tests are completed.
                    </p>
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
