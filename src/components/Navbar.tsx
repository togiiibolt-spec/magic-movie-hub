import { useState } from 'react';
import { Search, Home, Film, Tv, Star, Plus, User, Music, Bookmark, LogOut, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import fire5Logo from '@/assets/fire5-logo-red.png';
import cloudflareIcon from '@/assets/cloudflare-logo.png';
import profileIcon from '@/assets/profile-icon.png';

interface NavbarProps {
  onSearch: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar = ({ onSearch, activeTab, onTabChange }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const currentProfile = JSON.parse(localStorage.getItem('selectedProfile') || '{}');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'watchlist', icon: Bookmark, label: 'Watchlist' },
    { id: 'originals', icon: Star, label: 'Originals' },
    { id: 'movies', icon: Film, label: 'Movies' },
    { id: 'series', icon: Tv, label: 'Series' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Cloudflare Info */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <img 
              src={fire5Logo} 
              alt="FIRE5" 
              className="h-8 w-auto" 
            />
            <div className="hidden lg:flex items-center space-x-2 text-xs text-muted-foreground bg-card/50 px-3 py-1 rounded-full border border-border">
              <img src={cloudflareIcon} alt="Cloudflare" className="h-4 w-auto" />
              <span>Ultra-fast streaming with Cloudflare VPN</span>
            </div>
          </div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  if (item.id === 'search') {
                    setIsSearchOpen(!isSearchOpen);
                  } else {
                    onTabChange(item.id);
                    setIsSearchOpen(false);
                  }
                }}
                className="flex items-center space-x-2 text-sm font-medium transition-smooth hover:scale-105"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="animate-scale-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search movies and series..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-card border-border focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
            </form>
          )}

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0">
                <img 
                  src={currentProfile.avatar_url || profileIcon} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full" 
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
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-6 pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {navItems.slice(0, 5).map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                if (item.id === 'search') {
                  setIsSearchOpen(!isSearchOpen);
                } else {
                  onTabChange(item.id);
                  setIsSearchOpen(false);
                }
              }}
              className="flex items-center space-x-1 text-xs whitespace-nowrap"
            >
              <item.icon className="h-3 w-3" />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};