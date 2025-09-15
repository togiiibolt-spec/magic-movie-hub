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
    <div className="px-4 sm:px-6 py-6 sm:py-8 animate-slide-up">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">{title}</h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('left')}
          className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/80 hover:bg-background/95 backdrop-blur-sm border border-border/50 hover:border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover-lift hidden sm:flex"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('right')}
          className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/80 hover:bg-background/95 backdrop-blur-sm border border-border/50 hover:border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover-lift hidden sm:flex"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        {/* Content Container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-36 sm:w-48 cursor-pointer group/item animate-fade-in hover-lift"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onDetails(item)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-card group-hover/item:border-primary/50 transition-all duration-500 hover-glow">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-48 sm:h-72 object-cover transition-transform duration-500 group-hover/item:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlay(item, item.type === 'series' ? (item as Series).episodes?.[0] : undefined);
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-8 sm:h-10 sm:w-10 p-0 hover-scale"
                    >
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleWishlistToggle(item, e)}
                      className="bg-background/50 border-border hover:bg-background/80 backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10 p-0 hover-scale"
                    >
                      {isInWishlist(item.id) ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      ) : (
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDetails(item);
                      }}
                      className="bg-background/50 border-border hover:bg-background/80 backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10 p-0 hover-scale"
                    >
                      <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-background/95 text-foreground px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-border/50">
                    {item.type === 'movie' ? 'Movie' : 'Series'}
                  </span>
                </div>
              </div>

              {/* Content Info */}
              <div className="mt-3 space-y-1">
                <h3 className="font-medium text-xs sm:text-sm leading-tight line-clamp-2 text-foreground">{item.title}</h3>
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