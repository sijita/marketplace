export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  quantity: number;
  free_shipping: boolean;
  condition: string;
  categories: {
    id: number;
    name: string;
    description: string;
  };
  reviews: {
    id: number;
    rating: number;
    review_text: string;
    created_at: string;
    user_id: string;
  }[];
  category_id: number;
  location_id: number;
  creator_id: number;
  created_at: string;
}
