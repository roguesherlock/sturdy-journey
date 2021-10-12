import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getProduct } from "src/lib/api";
import Layout from "src/components/Layout";
import { StarIcon } from "@heroicons/react/solid";
import { classNames } from "src/lib/utils";
import Review from "src/components/Review";
import AddReviewForm from "src/components/AddReviewForm";
import { useRouter } from "next/router";

const Home: NextPage<{ product: Product }> = ({ product }) => {
  const averageRating = Number(
    product.reviews!.reduce((acc, cur) => acc + cur.rating, 0) /
      product.reviews!.length
  ).toPrecision(2);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
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
                  {averageRating}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={classNames(
                        i >= Number(averageRating)
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
              <AddReviewForm product={product} onSuccess={refreshData} />
            </div>
          </div>
        </div>
        <div className="border border-t border-gray-200 mt-8"></div>
        <div className="mt-8">
          <div className="px-4 py-5 sm:p-0">
            <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
            <dl className="space-y-4 mt-6">
              {product.reviews!.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            </dl>
          </div>
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
