import { X, Play, Star, Calendar, Users, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Series } from '@/data/data';
import { useWishlist } from '@/contexts/WishlistContext';

interface SeriesModalProps {
  series: Series;
  onClose: () => void;
  onPlay: (series: Series) => void;
}

export const SeriesModal = ({ series, onClose, onPlay }: SeriesModalProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(series.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(series.id);
    } else {
      addToWishlist(series);
    }
  };

  const firstEpisode = series.episodes?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl mx-4 bg-card rounded-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
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
            src={series.backdrop}
            alt={series.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative -mt-32 z-10 px-8 pb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={series.poster}
                alt={series.title}
                className="w-48 h-72 object-cover rounded-lg shadow-lg mx-auto lg:mx-0"
              />
            </div>

            {/* Series Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{series.title}</h1>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{series.rating}</span>
                  </div>
                  <span>{series.year}</span>
                  <span>{series.seasons} Season{series.seasons > 1 ? 's' : ''}</span>
                  <Badge variant="outline">{series.genre[0]}</Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  size="lg"
                  onClick={() => onPlay(series)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
                >
                  <Play className="h-5 w-5 mr-2 fill-current" />
                  Play Series
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
                  {series.description}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Release Year
                  </h4>
                  <p className="text-muted-foreground">{series.year}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Seasons
                  </h4>
                  <p className="text-muted-foreground">{series.seasons}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Rating
                  </h4>
                  <p className="text-muted-foreground">{series.rating}</p>
                </div>
              </div>

              {/* Genres */}
              <div>
                <h4 className="font-semibold mb-3">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {series.genre.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Episodes List */}
          {series.episodes && series.episodes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-6">Episodes</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {series.episodes.map((episode, index) => (
                  <div
                    key={episode.id}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-card/50 hover:bg-card/70 transition-colors cursor-pointer"
                    onClick={() => onPlay(series)}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-32 h-18 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-lg">{episode.title}</h4>
                        <span className="text-sm text-muted-foreground">{episode.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Season {episode.seasonNumber}, Episode {episode.episodeNumber}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {episode.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};