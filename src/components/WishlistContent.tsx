import { useWishlist } from '@/contexts/WishlistContext';
import { ContentRow } from '@/components/ContentRow';
import { Content, Episode } from '@/data/data';

interface WishlistContentProps {
  onPlay: (content: Content, episode?: Episode) => void;
  onDetails: (content: Content) => void;
}

export const WishlistContent = ({ onPlay, onDetails }: WishlistContentProps) => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="px-6 py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Your list is empty</h2>
          <p className="text-muted-foreground">Add movies and shows to your list to watch them later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <ContentRow
        title="My List"
        content={wishlist}
        onPlay={onPlay}
        onDetails={onDetails}
      />
    </div>
  );
};