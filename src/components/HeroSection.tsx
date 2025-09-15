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
    <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={content.backdrop}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-end h-full px-4 sm:px-6 md:px-12 lg:px-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6 animate-float-in">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-foreground">
            {content.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-primary/30">
              {content.rating}
            </span>
            <span>{content.year}</span>
            <span className="hidden sm:inline">•</span>
            <span className="line-clamp-1">{content.genre.join(', ')}</span>
            {content.type === 'movie' && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">{(content as any).duration}</span>
              </>
            )}
            {content.type === 'series' && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">{(content as any).seasons} Season{(content as any).seasons > 1 ? 's' : ''}</span>
              </>
            )}
          </div>

          <p className="text-sm sm:text-lg md:text-xl text-foreground/90 leading-relaxed max-w-md lg:max-w-xl line-clamp-2 sm:line-clamp-3">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Button
              size="lg"
              onClick={() => onPlay(content)}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold hover-glow"
            >
              <Play className="h-4 w-4 sm:h-6 sm:w-6 mr-2 fill-current" />
              Play
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onDetails(content)}
              className="w-full sm:w-auto bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50 hover:border-border text-foreground px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold hover-lift"
            >
              <Info className="h-4 w-4 sm:h-6 sm:w-6 mr-2" />
              More Info
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="hidden sm:flex bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50 hover:border-border px-4 py-3 hover-scale"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};