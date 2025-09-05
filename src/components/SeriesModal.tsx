import { useState } from 'react';
import { X, Play, Plus, Calendar, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Series, Episode } from '@/data/data';

interface SeriesModalProps {
  series: Series;
  onClose: () => void;
  onPlay: (series: Series, episode?: Episode) => void;
}

export const SeriesModal = ({ series, onClose, onPlay }: SeriesModalProps) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  
  // Group episodes by season
  const episodesBySeason = series.episodes.reduce((acc, episode) => {
    if (!acc[episode.seasonNumber]) {
      acc[episode.seasonNumber] = [];
    }
    acc[episode.seasonNumber].push(episode);
    return acc;
  }, {} as Record<number, Episode[]>);
  
  const seasonEpisodes = episodesBySeason[selectedSeason] || [];
  const availableSeasons = [...new Set(series.episodes.map(ep => ep.seasonNumber))].sort();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-scale-in">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-card rounded-xl shadow-modal max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with backdrop */}
          <div className="relative h-80 overflow-hidden rounded-t-xl">
            <img
              src={series.backdrop}
              alt={series.title}
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

            {/* Series info overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-2">{series.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  {series.rating}
                </Badge>
                <span className="text-white/90 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {series.year}
                </span>
                <span className="text-white/90 flex items-center">
                  <Tv className="h-4 w-4 mr-1" />
                  {series.seasons} Season{series.seasons > 1 ? 's' : ''}
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
                onClick={() => onPlay(series, series.episodes[0])}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                Play Series
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
                {series.description}
              </p>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {series.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Episodes */}
            <div>
              <Tabs value={selectedSeason.toString()} onValueChange={(value) => setSelectedSeason(parseInt(value))}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Episodes</h3>
                  <TabsList>
                    {availableSeasons.map((season) => (
                      <TabsTrigger key={season} value={season.toString()}>
                        Season {season}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {availableSeasons.map((season) => (
                  <TabsContent key={season} value={season.toString()}>
                    <div className="space-y-4">
                      {(episodesBySeason[season] || []).map((episode) => (
                        <EpisodeCard
                          key={episode.id}
                          episode={episode}
                          onPlay={() => onPlay(series, episode)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EpisodeCardProps {
  episode: Episode;
  onPlay: () => void;
}

const EpisodeCard = ({ episode, onPlay }: EpisodeCardProps) => {
  return (
    <div className="flex space-x-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth cursor-pointer group">
      <div className="relative flex-shrink-0 w-32 h-20 overflow-hidden rounded-md">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            onClick={onPlay}
            className="bg-primary hover:bg-primary/90"
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-lg line-clamp-1">
            {episode.episodeNumber}. {episode.title}
          </h4>
          <span className="text-sm text-muted-foreground ml-2">
            {episode.duration}
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {episode.description}
        </p>
      </div>
    </div>
  );
};