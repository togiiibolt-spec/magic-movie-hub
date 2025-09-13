import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Content } from '@/data/data';
import { useState, useRef } from 'react';

interface ContentRowProps {
  title: string;
  content: Content[];
  onPlay: (content: Content) => void;
  onDetails: (content: Content) => void;
}

export const ContentRow = ({ title, content, onPlay, onDetails }: ContentRowProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);

    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  const showLeftArrow = scrollPosition > 0;
  const showRightArrow = scrollContainerRef.current && 
    scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

  return (
    <div className="relative group mb-8">
      <h2 className="text-2xl font-bold mb-4 px-6 md:px-12 lg:px-16">{title}</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Content Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-16 pb-4"
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
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
    </div>
  );
};

interface ContentCardProps {
  content: Content;
  onPlay: (content: Content) => void;
  onDetails: (content: Content) => void;
}

const ContentCard = ({ content, onPlay, onDetails }: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-64 cursor-pointer group transition-smooth"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onDetails(content)}
    >
      <div className="relative overflow-hidden rounded-lg bg-card shadow-card">
        <img
          src={content.poster}
          alt={content.title}
          className="w-full h-96 object-cover transition-smooth group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPlay(content);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Play className="h-4 w-4 mr-1 fill-current" />
              Play
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                // Add to watchlist functionality
              }}
              className="bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-background/90 text-foreground px-2 py-1 rounded text-xs font-medium">
            {content.type === 'movie' ? 'Movie' : 'Series'}
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">{content.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{content.year}</span>
          <span>•</span>
          <span>{content.rating}</span>
          {content.type === 'movie' && (
            <>
              <span>•</span>
              <span>{(content as any).duration}</span>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
      </div>
    </div>
  );
};