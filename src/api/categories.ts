import { createClient } from '@/utils/supabase/server';
import type { Category } from '@/types/category';

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('categories')
    .select(
      `
      *,
      products (
        *
      )
    `
    )
    .limit(6);

  return categories ?? [];
}
