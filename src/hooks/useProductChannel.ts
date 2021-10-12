import { useEffect, useState } from "react";
import { useSocket, useChannel } from "src/hooks";

export const useProductChannel = (
  productId: string | number,
  { onUpdate }: { onUpdate: (review: Review, reviews: Review[]) => void }
) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { socket } = useSocket(`//localhost:4000/socket`); // Optional, see Provider
  const { handleChannelEvent } = useChannel(`product:${productId}`, {
    socket: socket,
    onJoin: (params: Dict) => {
      // Use params set join/3 response
      if (params.reviews) {
        setReviews(params.reviews ?? []);
      }
    },
  });

  useEffect(() => {
    handleChannelEvent("new_review", (response: Dict) => {
      console.log("handleChannelEvent", response);
      setReviews((prevReviews) => {
        const reviews = [...prevReviews, response?.data as Review];
        onUpdate(response?.data as Review, reviews);
        return reviews;
      });
    });
  }, [handleChannelEvent]);

  return {
    reviews,
  };
};

export default { useProductChannel };
