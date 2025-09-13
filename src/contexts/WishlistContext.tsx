import React, { createContext, useContext, useState, useEffect } from 'react';
import { Content } from '@/data/data';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlist: Content[];
  addToWishlist: (content: Content) => void;
  removeFromWishlist: (contentId: string) => void;
  isInWishlist: (contentId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Content[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (content: Content) => {
    if (isInWishlist(content.id)) {
      toast({
        title: "Already in Wishlist",
        description: `${content.title} is already in your wishlist.`,
        variant: "default",
      });
      return;
    }

    setWishlist(prev => [...prev, content]);
    toast({
      title: "Added to Wishlist",
      description: `${content.title} has been added to your wishlist.`,
    });
  };

  const removeFromWishlist = (contentId: string) => {
    const content = wishlist.find(item => item.id === contentId);
    setWishlist(prev => prev.filter(item => item.id !== contentId));
    
    if (content) {
      toast({
        title: "Removed from Wishlist",
        description: `${content.title} has been removed from your wishlist.`,
      });
    }
  };

  const isInWishlist = (contentId: string) => {
    return wishlist.some(item => item.id === contentId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};