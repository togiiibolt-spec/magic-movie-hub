import { X, Play, Star, Calendar, Clock, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/data/data';
import { useWishlist } from '@/contexts/WishlistContext';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
}

export const MovieModal = ({ movie, onClose, onPlay }: MovieModalProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(movie.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-card rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Backdrop Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative -mt-32 z-10 px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-48 h-72 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{movie.rating}</span>
                  </div>
                  <span>{movie.year}</span>
                  <span>{movie.duration}</span>
                  <Badge variant="outline">{movie.genre[0]}</Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  size="lg"
                  onClick={() => onPlay(movie)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
                >
                  <Play className="h-5 w-5 mr-2 fill-current" />
                  Play Movie
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className="px-6 py-3"
                >
                  {inWishlist ? <Check className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                  {inWishlist ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {movie.description}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Release Year
                  </h4>
                  <p className="text-muted-foreground">{movie.year}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Duration
                  </h4>
                  <p className="text-muted-foreground">{movie.duration}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Rating
                  </h4>
                  <p className="text-muted-foreground">{movie.rating}</p>
                </div>
              </div>

              {/* Genres */}
              <div>
                <h4 className="font-semibold mb-3">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};