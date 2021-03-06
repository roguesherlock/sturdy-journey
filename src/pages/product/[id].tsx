import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getProduct } from "src/lib/api";
import Layout from "src/components/Layout";
import { StarIcon } from "@heroicons/react/solid";
import { classNames } from "src/lib/utils";
import AddReviewForm from "src/components/AddReviewForm/AddReviewForm";
import Reviews from "src/components/Reviews";
import { useEffect, useState } from "react";

const Home: NextPage<{ product: Product }> = ({ product }) => {
  const [averageRating, setAverateRating] = useState<number>(0);

  const getRating = (reviews: Review[]) => {
    const rating = Number(
      reviews!.reduce((acc, cur) => acc + cur.rating, 0) / reviews!.length
    );
    return Number.isNaN(rating) ? 0 : rating;
  };

  useEffect(() => {
    setAverateRating(getRating(product.reviews!));
  }, [setAverateRating, product.reviews]);

  const onNewReview = (_review: Review, reviews: Review[]) => {
    console.log("onNewReview", _review, reviews);
    setAverateRating(getRating(reviews!));
  };

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto py-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <div className="flex items-center justify-between text-xl">
            <div>
              <h2 className="sr-only">Reviews</h2>
              <div className="flex gap-2 items-center">
                <p className="text-gray-900 font-medium text-3xl">
                  {averageRating.toPrecision(2)}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={classNames(
                        i >= Math.ceil(Number(averageRating))
                          ? "text-gray-200"
                          : "text-yellow-400",
                        " h-8 w-8"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <AddReviewForm product={product} />
            </div>
          </div>
        </div>
        <div className="border border-t border-gray-200 mt-8"></div>
        <div className="mt-8">
          <Reviews product={product} onNewReview={onNewReview} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product: Product = await getProduct(context.params?.id as string);
  return {
    props: {
      product,
    },
  };
};
