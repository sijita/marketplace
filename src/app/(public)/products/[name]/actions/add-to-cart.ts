'use server';
import { createClient } from '@/utils/supabase/server';

export async function addToCart({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Debes iniciar sesión para añadir productos al carrito');
    }

    const { error } = await supabase.from('cart').insert({
      user_id: user.id,
      product_id: productId,
      quantity: quantity,
    });

    if (error) throw error;

    return {
      type: 'success',
      message: 'Producto añadido al carrito',
    };
  } catch (error) {
    return {
      type: 'error',
      message: 'Error al añadir al carrito',
      error: error,
    };
  }
}
