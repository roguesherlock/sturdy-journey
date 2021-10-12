import Review from "src/components/Review";

import { useProductChannel } from "src/hooks";

type Props = {
  product: Product;
  onNewReview: (review: Review, reviews: Review[]) => void;
};

export const Reviews = ({ product, onNewReview }: Props) => {
  if (typeof window === "undefined") return null;
  const { reviews } = useProductChannel(product.id, { onUpdate: onNewReview });
  return (
    <div className="px-4 py-5 sm:p-0">
      <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
      <dl className="space-y-4 mt-6">
        {reviews!.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </dl>
    </div>
  );
};
export default Reviews;
