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
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-lg">
      <div className="flex items-center space-x-4 animate-slide-in">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold hidden sm:block text-foreground">Welcome back, {currentProfile.name || 'User'}</h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search */}
        {isSearchOpen ? (
          <form onSubmit={handleSearch} className="animate-scale-in">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search movies, series, music..."
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10 w-48 sm:w-64 bg-card/50 border-border/50 focus:bg-card focus:border-primary/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
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
            className="text-muted-foreground hover:text-foreground hover-scale"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 hover-scale relative overflow-hidden">
              <img 
                src={currentProfile.avatar_url || profileIcon} 
                alt="Profile" 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all duration-300" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/50">
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