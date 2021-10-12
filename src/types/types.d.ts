interface Dict {
  [key: string]: any;
}

interface Review {
  id: string | number;
  description: string;
  rating: number;
  product_id: string | number;
}

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  reviews?: Review[];
}
