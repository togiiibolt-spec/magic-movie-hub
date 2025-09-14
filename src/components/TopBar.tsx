import { useState } from 'react';
import { Search, User, LogOut, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import profileIcon from '@/assets/profile-icon.png';

interface TopBarProps {
  onSearch: (query: string) => void;
}

export const TopBar = ({ onSearch }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const currentProfile = JSON.parse(localStorage.getItem('selectedProfile') || '{}');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Real-time search
    onSearch(value);
  };

  const handleSwitchProfile = () => {
    navigate('/profiles');
  };

  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem('selectedProfile');
    navigate('/auth');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold hidden md:block">Welcome back, {currentProfile.name || 'User'}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        {isSearchOpen ? (
          <form onSubmit={handleSearch} className="animate-scale-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies and series..."
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10 w-64 bg-card border-border focus:ring-2 focus:ring-primary"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false);
                }}
              />
            </div>
          </form>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0">
              <img 
                src={currentProfile.avatar_url || profileIcon} 
                alt="Profile" 
                className="h-8 w-8 rounded-full border border-border" 
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center space-x-2 p-2">
              <img 
                src={currentProfile.avatar_url || profileIcon} 
                alt="Profile" 
                className="h-8 w-8 rounded-full" 
              />
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{currentProfile.name || 'User'}</p>
                {currentProfile.is_main && (
                  <p className="text-xs text-muted-foreground">Main Profile</p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSwitchProfile}>
              <Users className="mr-2 h-4 w-4" />
              Switch Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};