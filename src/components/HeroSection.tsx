import { Play, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Content } from '@/data/data';

interface HeroSectionProps {
  content: Content;
  onPlay: (content: Content) => void;
  onDetails: (content: Content) => void;
}

export const HeroSection = ({ content, onPlay, onDetails }: HeroSectionProps) => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={content.backdrop}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {content.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="bg-muted px-2 py-1 rounded text-xs font-medium">
              {content.rating}
            </span>
            <span>{content.year}</span>
            <span>•</span>
            <span>{content.genre.join(', ')}</span>
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

          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-xl">
            {content.description}
          </p>

          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              onClick={() => onPlay(content)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-smooth hover:scale-105"
            >
              <Play className="h-6 w-6 mr-2 fill-current" />
              Play
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onDetails(content)}
              className="bg-secondary/80 hover:bg-secondary text-secondary-foreground px-8 py-3 text-lg font-semibold transition-smooth hover:scale-105"
            >
              <Info className="h-6 w-6 mr-2" />
              More Info
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50 px-4 py-3 transition-smooth hover:scale-105"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};