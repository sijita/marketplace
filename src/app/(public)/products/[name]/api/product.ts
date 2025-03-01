'use server';
import { createClient } from '@/utils/supabase/server';

export async function getProduct(name: string) {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select(
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
      ),
      locations (
        id,
        address,
        municipalities (
          id,
          name,
          departments (
            id,
            name
          )
        )
      )
    `
    )
    .eq('name', name.replaceAll('-', ' '))
    .single();

  return product ?? null;
}

export async function isProductInCart(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('product_id', productId)
    .eq('user_id', user?.id)
    .maybeSingle();

  if (error) {
    console.error('Error checking if product is in cart:', error);
    return { exists: false, cartItem: null };
  }

  return {
    exists: !!data,
    cartItem: data,
  };
}
