'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getCartItems() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: cartItems } = await supabase
    .from('cart')
    .select(
      `
      id,
      quantity,
      products (
        *
      )
    `
    )
    .eq('user_id', user.id);

  return cartItems ?? [];
}

export async function updateCartItemQuantity(cartId: number, quantity: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', cartId);

  if (error) throw new Error(error.message);

  revalidatePath('/cart');
}

export async function removeCartItem(cartId: number) {
  const supabase = await createClient();

  const { error } = await supabase.from('cart').delete().eq('id', cartId);

  if (error) throw new Error(error.message);

  revalidatePath('/cart');
}
