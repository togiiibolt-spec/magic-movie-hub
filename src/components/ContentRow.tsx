import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content } from '@/data/data';
import { useWishlist } from '@/contexts/WishlistContext';

interface ContentRowProps {
  title: string;
  content: Content[];
  onPlay: (content: Content) => void;
  onDetails: (content: Content) => void;
}

export const ContentRow = ({ title, content, onPlay, onDetails }: ContentRowProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="group relative mb-8">
      <h2 className="text-2xl font-bold mb-4 px-6 md:px-12 lg:px-16">{title}</h2>
      
      {/* Left Arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Right Arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content Row */}
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-16 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            onPlay={onPlay}
            onDetails={onDetails}
          />
        ))}
      </div>
    </div>
  );
};

interface ContentCardProps {
  content: Content;
  onPlay: (content: Content) => void;
  onDetails: (content: Content) => void;
}

const ContentCard = ({ content, onPlay, onDetails }: ContentCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(content.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(content.id);
    } else {
      addToWishlist(content);
    }
  };

  return (
    <div 
      className="group relative min-w-[280px] max-w-[280px] cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => onDetails(content)}
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={content.poster}
          alt={content.title}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button and Add to Watchlist */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(content);
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth hover:scale-105"
          >
            <Play className="h-4 w-4 mr-1 fill-current" />
            Play
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWishlistToggle}
            className="bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50"
          >
            {inWishlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        {/* Content Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/80 text-foreground text-xs">
            {content.type === 'movie' ? 'Movie' : 'Series'}
          </Badge>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/80 rounded-full px-2 py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{content.rating}</span>
        </div>
      </div>

      {/* Content Info */}
      <div className="px-1">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{content.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <span>{content.year}</span>
          <span>•</span>
          <span>{content.genre[0]}</span>
          {content.type === 'movie' && (
            <>
              <span>•</span>
              <span>{(content as any).duration}</span>
            </>
          )}
          {content.type === 'series' && (
            <>
              <span>•</span>
              <span>{(content as any).seasons} Season{(content as any).seasons > 1 ? 's' : ''}</span>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
      </div>
    </div>
  );
};