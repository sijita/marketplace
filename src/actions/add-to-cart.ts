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

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      throw new Error('Producto no encontrado');
    }

    const { data: cartItem } = await supabase
      .from('cart')
      .select('quantity')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single();

    const totalQuantity = (cartItem?.quantity || 0) + quantity;

    if (totalQuantity > product.stock) {
      return {
        type: 'error',
        message: 'No hay suficientes unidades disponibles',
      };
    }

    if (cartItem) {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: totalQuantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
    } else {
      const { error } = await supabase.from('cart').insert({
        user_id: user.id,
        product_id: productId,
        quantity: quantity,
      });

      if (error) throw error;
    }

    return {
      type: 'success',
      message: 'Producto añadido al carrito',
    };
  } catch (error) {
    console.error(error);
    return {
      type: 'error',
      message: 'Error al añadir al carrito',
      error: error,
    };
  }
}
