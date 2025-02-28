import { Product } from './product';

export interface Category {
  id: number;
  name: string;
  description: string;
  products: Product[];
  created_at: string;
}
