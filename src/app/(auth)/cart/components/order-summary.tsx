import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Cart } from '@/types/cart';

export default function OrderSummary({ cartItems }: { cartItems: Cart[] }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.products?.price || 0) * item.quantity,
    0
  );

  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div>
      <Card className="shadow-none">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(subtotal)}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(total)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Pagar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
