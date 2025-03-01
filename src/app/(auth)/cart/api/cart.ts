import { Cart } from '@/types/cart';
import { createClient } from '@/utils/supabase/server';

export async function getCartItems(): Promise<Cart[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: cart } = await supabase
    .from('cart')
    .select(
      `
        *,
        products (
          *
        )
      `
    )
    .eq('user_id', user.id);

  return cart ?? [];
}
