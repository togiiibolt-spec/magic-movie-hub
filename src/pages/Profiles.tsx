import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings, LogOut } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  avatar_url: string | null;
  is_main: boolean;
}

const avatarOptions = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4VYS_C8FB0OLSLQlN0NAWm6SEAmd4tXS4FMJPBCWg6OX6yf8DwqS9on4WRHoOFn_eMN0&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnNIQxwUp1qo5roxFB3EDmj6lh_WkYE_uIbg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmP5mo45Vhw0M9OM6fiXDdl9MRCedlCNZv4Q&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOZuTn-oUFcXhQZyvVswlx4HLDTclgdH5aKHMZA68Xhk12mX1BvX80ZVQrvQj6Nb48n0&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQetCoFfFfJrtCjSAcSKlCvO0sUM2EQMz5kiA&s',
  'https://rukminim2.flixcart.com/image/704/844/xif0q/poster/2/z/r/medium-baki-hanma-poster-12-x-18-premium-photo-paper-glossy-original-imagqjwwm5hahz4g.jpeg?q=90&crop=false',
];

export default function Profiles() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profiles",
        variant: "destructive",
      });
    } else {
      setProfiles(data || []);
    }
  };

  const createProfile = async () => {
    if (!newProfileName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a profile name",
        variant: "destructive",
      });
      return;
    }

    if (profiles.length >= 5) {
      toast({
        title: "Error",
        description: "Maximum 5 profiles allowed",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase
      .from('profiles')
      .insert({
        user_id: user!.id,
        name: newProfileName,
        avatar_url: selectedAvatar,
        is_main: profiles.length === 0
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile created successfully!",
      });
      setNewProfileName('');
      setSelectedAvatar(avatarOptions[0]);
      setIsCreateModalOpen(false);
      fetchProfiles();
    }
    setIsLoading(false);
  };

  const selectProfile = (profile: Profile) => {
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
    navigate('/');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Who's watching?</h1>
            <p className="text-muted-foreground">Choose a profile to continue</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              className="cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-lg"
              onClick={() => selectProfile(profile)}
            >
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold truncate">{profile.name}</h3>
                {profile.is_main && (
                  <p className="text-xs text-primary mt-1">Main Profile</p>
                )}
              </CardContent>
            </Card>
          ))}

          {profiles.length < 5 && (
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:scale-105 transition-transform duration-200 border-dashed border-2">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                    <Plus className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Add Profile</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Profile</DialogTitle>
                  <DialogDescription>
                    Add a new profile to your account (max 5 profiles)
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Profile name"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                  />
                  <div>
                    <p className="text-sm font-medium mb-3">Choose an avatar:</p>
                    <div className="grid grid-cols-6 gap-2">
                      {avatarOptions.map((avatar, index) => (
                        <Avatar
                          key={index}
                          className={`cursor-pointer border-2 ${
                            selectedAvatar === avatar ? 'border-primary' : 'border-transparent'
                          }`}
                          onClick={() => setSelectedAvatar(avatar)}
                        >
                          <AvatarImage src={avatar} />
                          <AvatarFallback>{index + 1}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  <Button onClick={createProfile} disabled={isLoading} className="w-full">
                    {isLoading ? 'Creating...' : 'Create Profile'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {profiles.length} of 5 profiles created
        </div>
      </div>
    </div>
  );
}
