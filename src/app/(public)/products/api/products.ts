import { createClient } from '@/utils/supabase/server';
import type { Product } from '@/types/product';

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data: products } = await supabase.from('products').select(
    `
      *,
      categories (
        id,
        name,
        description
      ),
      reviews (
        id,
        rating,
        review_text,
        created_at,
        user_id
      )
    `
  );

  return products ?? [];
}
