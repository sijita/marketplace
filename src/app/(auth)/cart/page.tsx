import { CartItems } from './components/carts-items';
import { getCartItems } from './actions/handle-cart';
import EmptyCart from './components/empty-cart';
import type { Cart } from '@/types/cart';
import OrderSummary from './components/order-summary';

export default async function ShoppingCartPage() {
  const cartItems = (await getCartItems()) as unknown as Cart[];

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartItems initialItems={cartItems} />
        </div>
        <OrderSummary cartItems={cartItems} />
      </div>
    </div>
  );
}
