import type { Product } from './product';

export interface Cart {
  id: number;
  quantity: number;
  products: Product;
}
