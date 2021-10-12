import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getAllProducts } from "src/lib/api";
import Layout from "src/components/Layout";
import AddProductForm from "src/components/AddProductForm";
import { useRouter } from "next/router";

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto py-12 space-y-6">
        <div className="flex items-center justify-end">
          <AddProductForm onSuccess={refreshData} />
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {products.map((product) => (
            <li
              key={product.id}
              className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600"
            >
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${product.id}`}>
                    <a className="block focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-1">
                <p className="line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products: Product[] = await getAllProducts();
  return {
    props: {
      products,
    },
  };
};
