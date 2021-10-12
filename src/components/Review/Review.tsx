import { StarIcon } from "@heroicons/react/solid";
import { classNames } from "src/lib/utils";
type Props = {
  review: Review;
};

export const Review = ({ review }: Props) => {
  return (
    <>
      <div className="flex items-center gap-5">
        <dt className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={classNames(
                      i >= Number(review.rating)
                        ? "text-gray-200"
                        : "text-yellow-400",
                      " h-8 w-8"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-900 font-bold">
            {review.rating}
            <span className="sr-only"> out of 5 stars</span>
          </p>
        </dt>
        <dd className="flex gap-2 text-gray-500">{review.description}</dd>
      </div>
    </>
  );
};

export default Review;
