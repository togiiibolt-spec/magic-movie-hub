import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Play, Pause, Search, Music as MusicIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration_seconds: number;
  audio_url: string;
  cover_image?: string;
  genre?: string;
  year?: number;
}

export default function Music() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (user) {
      fetchSongs();
    }
  }, [user]);

  useEffect(() => {
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [searchQuery, songs]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  const fetchSongs = async () => {
    const { data, error } = await supabase
      .from('music')
      .select('*')
      .order('title');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch music",
        variant: "destructive",
      });
    } else {
      setSongs(data || []);
    }
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.audio_url;
      audioRef.current.play().catch(console.error);
    }
    
    // Track listening history
    trackListeningHistory(song);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = filteredSongs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    playSong(filteredSongs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const currentIndex = filteredSongs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? filteredSongs.length - 1 : currentIndex - 1;
    playSong(filteredSongs[prevIndex]);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const trackListeningHistory = async (song: Song) => {
    const selectedProfile = localStorage.getItem('selectedProfile');
    if (!selectedProfile) return;

    const profile = JSON.parse(selectedProfile);
    
    const { error } = await supabase
      .from('watch_history')
      .upsert({
        profile_id: profile.id,
        content_id: song.id,
        content_type: 'music',
        total_duration_seconds: song.duration_seconds,
        last_watched_at: new Date().toISOString()
      }, {
        onConflict: 'profile_id,content_id,content_type'
      });

    if (error) {
      console.error('Failed to track listening history:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <audio ref={audioRef} />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MusicIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Music Library</h1>
          </div>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSongs.map((song) => (
            <Card 
              key={song.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow group"
              onClick={() => playSong(song)}
            >
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg overflow-hidden">
                    {song.cover_image ? (
                      <img 
                        src={song.cover_image} 
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MusicIcon className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentSong?.id === song.id) {
                        togglePlayPause();
                      } else {
                        playSong(song);
                      }
                    }}
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold truncate mb-1">{song.title}</h3>
                  <p className="text-sm text-muted-foreground truncate mb-1">{song.artist}</p>
                  {song.album && (
                    <p className="text-xs text-muted-foreground truncate mb-2">{song.album}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{song.genre}</span>
                    <span>{formatTime(song.duration_seconds)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSongs.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <MusicIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No songs found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      <MusicPlayer
        song={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={playNext}
        onPrevious={playPrevious}
        currentTime={currentTime}
        onSeek={seekTo}
      />
    </div>
  );
}