export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
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
  locations: {
    id: number;
    address: string;
    municipality_id: number;
    municipalities?: {
      id: number;
      name: string;
      department_id: number;
      departments?: {
        id: number;
        name: string;
      };
    };
  };
  seller_id: number;
  profiles: {
    id: number;
    name: string;
    location_id: number;
    locations: {
      id: number;
      address: string;
      municipality_id: number;
      municipalities?: {
        id: number;
        name: string;
        department_id: number;
        departments?: {
          id: number;
          name: string;
        };
      };
    };
    user_id: string;
    users: {
      id: number;
      email: string;
      full_name: string;
      avatar_url: string;
      created_at: string;
    };
  };
  created_at: string;
}
