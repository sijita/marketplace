import { createClient } from '@/utils/supabase/server';
import type { Product } from '@/types/product';
import { cookies } from 'next/headers';

export async function getProducts(): Promise<Product[]> {
  const cookieStore = await cookies();
  const userCity = cookieStore.get('userCity')?.value;

  const supabase = await createClient();

  console.log(userCity?.split(' ')[2]);

  let query = supabase.from('products').select(
    `
      *,
      categories (
        *
      ),
      reviews (
       *
      ),
      locations!inner (
        *,
        municipalities!inner (
          name
        )
      )
    `
  );

  if (userCity) {
    query = query.eq('locations.municipalities.name', userCity?.split(' ')[2]);
  }

  const { data: products } = await query;

  return products ?? [];
}
