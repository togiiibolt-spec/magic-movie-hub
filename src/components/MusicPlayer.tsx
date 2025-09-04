import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration_seconds: number;
  audio_url: string;
  cover_image?: string;
}

interface MusicPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  currentTime,
  onSeek,
}) => {
  const [volume, setVolume] = useState([70]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');

  if (!song) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = song.duration_seconds > 0 ? (currentTime / song.duration_seconds) * 100 : 0;

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
              {song.cover_image ? (
                <img 
                  src={song.cover_image} 
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">♪</span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-medium truncate">{song.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsShuffle(!isShuffle)}
                className={isShuffle ? 'text-primary' : ''}
              >
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onPrevious}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onPlayPause}
                className="h-8 w-8 rounded-full"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onNext}>
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
                className={repeatMode !== 'off' ? 'text-primary' : ''}
              >
                <Repeat className="h-4 w-4" />
                {repeatMode === 'one' && <span className="text-xs absolute -top-1 -right-1">1</span>}
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
              <div className="flex-1 relative">
                <Slider
                  value={[progressPercentage]}
                  onValueChange={(value) => onSeek((value[0] / 100) * song.duration_seconds)}
                  max={100}
                  step={0.1}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-xs text-muted-foreground">{formatTime(song.duration_seconds)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};