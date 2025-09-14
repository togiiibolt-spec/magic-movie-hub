import React, { createContext, useContext, useState, useEffect } from 'react';
import { Content } from '@/data/data';

interface WishlistContextType {
  wishlist: Content[];
  addToWishlist: (content: Content) => void;
  removeFromWishlist: (contentId: string) => void;
  isInWishlist: (contentId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Content[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to load wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (content: Content) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === content.id)) {
        return prev; // Already in wishlist
      }
      return [...prev, content];
    });
  };

  const removeFromWishlist = (contentId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== contentId));
  };

  const isInWishlist = (contentId: string) => {
    return wishlist.some(item => item.id === contentId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};