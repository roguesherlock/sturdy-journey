import { useEffect, useState } from "react";
import { useSocket, useChannel } from "src/hooks";

export const useProductChannel = (productId: string | number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { socket } = useSocket(`//localhost:4000/socket`); // Optional, see Provider
  const { handleChannelEvent } = useChannel(`product:${productId}`, {
    socket: socket,
    onJoin: (params: Dict) => {
      // Use params set join/3 response
      console.log(params);
      if (params.reviews) {
        console.log("huh");
        setReviews(params.reviews ?? []);
      }
    },
  });

  useEffect(() => {
    handleChannelEvent("new_review", (response: Dict) => {
      console.log("handleChannelEvent", response);
      setReviews((prevReviews) => [...prevReviews, response?.data as Review]);
    });
  }, [handleChannelEvent]);

  return {
    reviews,
  };
};

export default { useProductChannel };
