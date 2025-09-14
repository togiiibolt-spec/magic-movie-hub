import { Home, Search, Film, Tv, Star, Plus, Music, Bookmark, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import fire5Logo from '@/assets/fire5-logo-red.png';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'watchlist', icon: Bookmark, label: 'My List' },
    { id: 'movies', icon: Film, label: 'Movies' },
    { id: 'series', icon: Tv, label: 'TV Shows' },
    { id: 'originals', icon: Star, label: 'Originals' },
    { id: 'music', icon: Music, label: 'Music' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-[60] md:hidden bg-background/80 backdrop-blur-sm"
      >
        {isCollapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-background/95 backdrop-blur-md border-r border-border z-50
        transition-transform duration-300 ease-in-out
        ${isCollapsed ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:z-auto
        w-64
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <img 
              src={fire5Logo} 
              alt="FIRE5" 
              className="h-8 w-auto" 
            />
            <span className="text-xl font-bold text-primary">FIRE5</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                onClick={() => {
                  onTabChange(item.id);
                  setIsCollapsed(false);
                }}
                className={`
                  w-full justify-start h-12 text-left font-medium
                  ${activeTab === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="pt-6 space-y-2 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5 mr-3" />
              Account
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
};