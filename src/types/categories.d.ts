import { Product } from './product';

export interface Categories {
  id: number;
  name: string;
  description: string;
  products: Product[];
  created_at: string;
}
