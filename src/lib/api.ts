import { setHttpAgentOptions } from "next/dist/server/config";

type fetchAPI = (
  r: string,
  {
    method,
    data,
  }: { method: "GET" | "POST" | "PUT" | "DELETE"; data?: Record<any, any> }
) => Promise<any>;

const fetchAPI: fetchAPI = async (
  resource,
  { method, data } = { method: "GET", data: {} }
) => {
  const options: Record<any, any> = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method !== "GET") {
    options.body = JSON.stringify({
      data,
    });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${resource}`,
    options
  );

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
};

export const getAllProducts = async () => {
  const data = await fetchAPI("products", { method: "GET" });
  return data ?? [];
};

export const getProduct = async (id: string) => {
  const data = await fetchAPI(`product/${id}`, { method: "GET" });
  return data ?? null;
};

export const getAllReviews = async () => {
  const data = await fetchAPI("reviews", { method: "GET" });
  return data ?? [];
};
