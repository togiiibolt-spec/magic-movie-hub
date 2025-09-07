import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ContentRow } from "@/components/ContentRow";
import { VideoPlayer } from "@/components/VideoPlayer";
import { MovieModal } from "@/components/MovieModal";
import { SeriesModal } from "@/components/SeriesModal";
import { categories, movies, series, allContent } from "@/data/data";
import type { Movie, Series, Content, Episode } from "@/data/data";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>(undefined);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      const selectedProfile = localStorage.getItem('selectedProfile');
      if (!selectedProfile) {
        navigate('/profiles');
      }
    }
  }, [user, loading, navigate]);

  const handlePlay = (content: Content, episode?: Episode) => {
    // Track watch history
    trackWatchHistory(content, episode);
    
    setSelectedContent(content);
    setSelectedEpisode(episode);
    setIsVideoPlayerOpen(true);
    setIsMovieModalOpen(false);
    setIsSeriesModalOpen(false);
  };

  const handleDetails = (content: Content) => {
    setSelectedContent(content);
    if (content.type === "movie") {
      setIsMovieModalOpen(true);
    } else {
      setIsSeriesModalOpen(true);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setActiveTab("search");
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'music') {
      navigate('/music');
      return;
    }
    setActiveTab(tab);
  };

  const trackWatchHistory = async (content: Content, episode?: Episode) => {
    const selectedProfile = localStorage.getItem('selectedProfile');
    if (!selectedProfile) return;

    const profile = JSON.parse(selectedProfile);
    
    // Convert duration string to seconds for movies
    let durationInSeconds = 0;
    if (content.type === 'movie') {
      const durationMatch = (content as Movie).duration.match(/(\d+)h\s*(\d+)m/);
      if (durationMatch) {
        const hours = parseInt(durationMatch[1]) || 0;
        const minutes = parseInt(durationMatch[2]) || 0;
        durationInSeconds = (hours * 60 + minutes) * 60;
      }
    } else if (episode) {
      const durationMatch = episode.duration.match(/(\d+)m/);
      if (durationMatch) {
        durationInSeconds = parseInt(durationMatch[1]) * 60;
      }
    }
    
    const { error } = await supabase
      .from('watch_history')
      .upsert({
        profile_id: profile.id,
        content_id: content.id,
        content_type: content.type,
        episode_id: episode?.id,
        season_number: episode?.seasonNumber,
        episode_number: episode?.episodeNumber,
        total_duration_seconds: durationInSeconds,
        last_watched_at: new Date().toISOString()
      }, {
        onConflict: 'profile_id,content_id,content_type,episode_id'
      });

    if (error) {
      console.error('Failed to track watch history:', error);
    }
  };

  const filteredContent = searchQuery
    ? allContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const renderContent = () => {
    if (activeTab === "search" && searchQuery) {
      if (filteredContent.length === 0) {
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">No results found</h2>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        );
      }
      return (
        <ContentRow
          title="Search Results"
          content={filteredContent}
          onPlay={handlePlay}
          onDetails={handleDetails}
        />
      );
    }

    if (activeTab === "movies") {
      return (
        <ContentRow
          title="Movies"
          content={movies}
          onPlay={handlePlay}
          onDetails={handleDetails}
        />
      );
    }

    if (activeTab === "series") {
      return (
        <ContentRow
          title="Series"
          content={series}
          onPlay={handlePlay}
          onDetails={handleDetails}
        />
      );
    }

    // Default home view
    return (
      <>
        <HeroSection 
          content={movies[0]}
          onPlay={handlePlay}
          onDetails={handleDetails}
        />
        {categories.map((category) => (
          <ContentRow
            key={category.name}
            title={category.name}
            content={category.content}
            onPlay={handlePlay}
            onDetails={handleDetails}
          />
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onSearch={handleSearch}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="pt-20">
        {renderContent()}
      </main>

      {/* Video Player Modal */}
      {isVideoPlayerOpen && selectedContent && (
        <VideoPlayer
          content={selectedContent}
          episode={selectedEpisode}
          onClose={() => {
            setIsVideoPlayerOpen(false);
            setSelectedEpisode(undefined);
          }}
        />
      )}

      {/* Movie Modal */}
      {isMovieModalOpen && selectedContent && selectedContent.type === "movie" && (
        <MovieModal
          movie={selectedContent as Movie}
          onClose={() => setIsMovieModalOpen(false)}
          onPlay={handlePlay}
        />
      )}

      {/* Series Modal */}
      {isSeriesModalOpen && selectedContent && selectedContent.type === "series" && (
        <SeriesModal
          series={selectedContent as Series}
          onClose={() => setIsSeriesModalOpen(false)}
          onPlay={handlePlay}
        />
      )}
    </div>
  );
}