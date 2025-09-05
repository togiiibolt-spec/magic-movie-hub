import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, MoreHorizontal, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { music, Music as MusicType } from '@/data/data';

const musicGenres = ['All', 'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B', 'Indie'];

const playlists = [
  { id: 'liked', name: 'Liked Songs', count: 47, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { id: 'recent', name: 'Recently Played', count: 23, cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop' },
  { id: 'discover', name: 'Discover Weekly', count: 30, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { id: 'top50', name: 'Top 50 Global', count: 50, cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop' },
  { id: 'chill', name: 'Chill Vibes', count: 64, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { id: 'workout', name: 'Workout Mix', count: 38, cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop' },
];

const topArtists = [
  { name: 'The Weeknd', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face', followers: '89.2M' },
  { name: 'Ed Sheeran', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop&crop=face', followers: '67.8M' },
  { name: 'Ariana Grande', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face', followers: '78.4M' },
  { name: 'Drake', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop&crop=face', followers: '95.1M' },
  { name: 'Billie Eilish', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face', followers: '56.7M' },
];

export default function Music() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [currentTrack, setCurrentTrack] = useState<MusicType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState([70]);

  const filteredMusic = music.filter(track => 
    (selectedGenre === 'All' || track.genre === selectedGenre) &&
    (track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     track.artist.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePlayTrack = (track: MusicType) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pb-24">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-primary/20 via-background to-background">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Music</h1>
            
            {/* Search Bar */}
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search songs, artists, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Genre Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {musicGenres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className="rounded-full"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Quick Access */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.slice(0, 6).map((playlist) => (
                <Card key={playlist.id} className="group cursor-pointer hover:bg-accent/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={playlist.cover}
                        alt={playlist.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{playlist.name}</h3>
                        <p className="text-sm text-muted-foreground">{playlist.count} songs</p>
                      </div>
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary rounded-full w-12 h-12"
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Top Artists */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Top Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topArtists.map((artist) => (
                <Card key={artist.name} className="group cursor-pointer hover:bg-accent/50 transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-4">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary rounded-full w-10 h-10"
                      >
                        <Play className="h-3 w-3 fill-current" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-sm">{artist.name}</h3>
                    <p className="text-xs text-muted-foreground">{artist.followers} followers</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Songs List */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {selectedGenre === 'All' ? 'All Songs' : `${selectedGenre} Songs`}
            </h2>
            <div className="space-y-2">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-muted-foreground border-b">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-3">Album</div>
                <div className="col-span-2">Genre</div>
                <div className="col-span-1"><Clock className="h-4 w-4" /></div>
              </div>

              {/* Track Rows */}
              {filteredMusic.map((track, index) => (
                <div
                  key={track.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-accent/50 rounded-lg group cursor-pointer"
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="col-span-1 text-sm text-muted-foreground group-hover:hidden">
                    {index + 1}
                  </div>
                  <div className="col-span-1 hidden group-hover:block">
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                      <Play className="h-3 w-3 fill-current" />
                    </Button>
                  </div>
                  
                  <div className="col-span-5 flex items-center space-x-3">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-3 text-sm text-muted-foreground flex items-center">
                    {track.album}
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <Badge variant="outline" className="text-xs">
                      {track.genre}
                    </Badge>
                  </div>
                  
                  <div className="col-span-1 text-sm text-muted-foreground flex items-center justify-between">
                    <span>{track.duration}</span>
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Player */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="max-w-7xl mx-auto">
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs text-muted-foreground w-10">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={(value) => setCurrentTime(value[0])}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-10">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              {/* Track Info */}
              <div className="flex items-center space-x-3 flex-1">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{currentTrack.title}</p>
                  <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* Player Controls */}
              <div className="flex items-center space-x-4">
                <Button size="sm" variant="ghost">
                  <Shuffle className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 fill-current" />
                  )}
                </Button>
                <Button size="sm" variant="ghost">
                  <SkipForward className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-2 flex-1 justify-end">
                <Button size="sm" variant="ghost">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}