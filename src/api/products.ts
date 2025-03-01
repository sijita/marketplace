import { createClient } from '@/utils/supabase/server';
import type { Product } from '@/types/product';

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select(
      `
    *,
    categories (
      name,
      description
    ),
    reviews (
      *
    )
  `
    )
    .limit(10);

  return products ?? [];
}
