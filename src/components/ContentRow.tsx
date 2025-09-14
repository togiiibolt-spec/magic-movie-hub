import { useState, useRef } from 'react';
import { Play, Info, Plus, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Content, Movie, Series, Episode } from '@/data/data';
import { useWishlist } from '@/contexts/WishlistContext';

interface ContentRowProps {
  title: string;
  content: Content[];
  onPlay: (content: Content, episode?: Episode) => void;
  onDetails: (content: Content) => void;
}

export const ContentRow = ({ title, content, onPlay, onDetails }: ContentRowProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleWishlistToggle = (content: Content, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(content.id)) {
      removeFromWishlist(content.id);
    } else {
      addToWishlist(content);
    }
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity h-full rounded-none"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity h-full rounded-none"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Content Container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 cursor-pointer group/item"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onDetails(item)}
            >
              <div className="relative overflow-hidden rounded-lg bg-card shadow-card group-hover/item:scale-105 transition-all duration-300">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />
                
                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex items-end p-4">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlay(item, item.type === 'series' ? (item as Series).episodes?.[0] : undefined);
                      }}
                      className="bg-white text-black hover:bg-white/90 h-8 w-8 p-0"
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleWishlistToggle(item, e)}
                      className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      {isInWishlist(item.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDetails(item);
                      }}
                      className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-background/90 text-foreground px-2 py-1 rounded text-xs font-medium">
                    {item.type === 'movie' ? 'Movie' : 'Series'}
                  </span>
                </div>
              </div>

              {/* Content Info */}
              <div className="mt-2 space-y-1">
                <h3 className="font-medium text-sm leading-tight line-clamp-2">{item.title}</h3>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span>{item.year}</span>
                  <span>•</span>
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};