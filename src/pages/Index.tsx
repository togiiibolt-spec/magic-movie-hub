import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ContentRow } from '@/components/ContentRow';
import { VideoPlayer } from '@/components/VideoPlayer';
import { MovieModal } from '@/components/MovieModal';
import { SeriesModal } from '@/components/SeriesModal';
import { allContent, categories, Content, Movie, Series, Episode } from '@/data/data';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false);
  const [playingContent, setPlayingContent] = useState<Content | null>(null);

  // Featured content for hero section
  const featuredContent = allContent[0];

  // Filter content based on search and active tab
  const getFilteredContent = () => {
    let content = allContent;
    
    if (searchQuery) {
      content = content.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return [{ name: 'Search Results', content }];
    }

    switch (activeTab) {
      case 'movies':
        return [{ name: 'Movies', content: content.filter(item => item.type === 'movie') }];
      case 'series':
        return [{ name: 'Series', content: content.filter(item => item.type === 'series') }];
      case 'originals':
        return [{ name: 'Disney+ Originals', content: content.slice(0, 4) }];
      case 'watchlist':
        return [{ name: 'My Watchlist', content: [] }];
      default:
        return categories;
    }
  };

  const handlePlay = (content: Content, episode?: Episode) => {
    setPlayingContent(content);
    setIsVideoPlayerOpen(true);
    setIsMovieModalOpen(false);
    setIsSeriesModalOpen(false);
  };

  const handleContentDetails = (content: Content) => {
    setSelectedContent(content);
    if (content.type === 'movie') {
      setIsMovieModalOpen(true);
    } else {
      setIsSeriesModalOpen(true);
    }
  };

  const closeModals = () => {
    setIsMovieModalOpen(false);
    setIsSeriesModalOpen(false);
    setSelectedContent(null);
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false);
    setPlayingContent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSearch={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="pt-20">
        {/* Show hero only on home tab and when not searching */}
        {activeTab === 'home' && !searchQuery && (
          <HeroSection
            content={featuredContent}
            onPlay={handlePlay}
            onDetails={handleContentDetails}
          />
        )}

        {/* Content Rows */}
        <div className={`${activeTab === 'home' && !searchQuery ? 'mt-0' : 'mt-8'} space-y-8 pb-16`}>
          {getFilteredContent().map((category) => (
            <ContentRow
              key={category.name}
              title={category.name}
              content={category.content}
              onPlay={handlePlay}
              onDetails={handleContentDetails}
            />
          ))}
        </div>
      </main>

      {/* Modals */}
      {isVideoPlayerOpen && playingContent && (
        <VideoPlayer
          content={playingContent}
          onClose={closeVideoPlayer}
        />
      )}

      {isMovieModalOpen && selectedContent && selectedContent.type === 'movie' && (
        <MovieModal
          movie={selectedContent as Movie}
          onClose={closeModals}
          onPlay={handlePlay}
        />
      )}

      {isSeriesModalOpen && selectedContent && selectedContent.type === 'series' && (
        <SeriesModal
          series={selectedContent as Series}
          onClose={closeModals}
          onPlay={handlePlay}
        />
      )}
    </div>
  );
};

export default Index;
