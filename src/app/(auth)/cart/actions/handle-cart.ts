'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

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
