import { X, Play, Plus, Calendar, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/data/data';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
}

export const MovieModal = ({ movie, onClose, onPlay }: MovieModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-scale-in">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-card rounded-xl shadow-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with backdrop */}
          <div className="relative h-80 overflow-hidden rounded-t-xl">
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Movie info overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  {movie.rating}
                </Badge>
                <span className="text-white/90 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {movie.year}
                </span>
                <span className="text-white/90 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {movie.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Action buttons */}
            <div className="flex items-center space-x-4">
              <Button
                size="lg"
                onClick={() => onPlay(movie)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                Play Movie
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to Watchlist
              </Button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {movie.description}
              </p>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  Release Year
                </h4>
                <p className="text-lg">{movie.year}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  Duration
                </h4>
                <p className="text-lg">{movie.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  Rating
                </h4>
                <p className="text-lg">{movie.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};