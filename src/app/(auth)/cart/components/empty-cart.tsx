import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="flex items-center justify-center container mx-auto px-4 py-16 min-h-screen">
      <div className="text-center">
        <ShoppingCart className="mx-auto h-24 w-24 mb-6 text-primary" />
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-xl text-muted-foreground mb-8">
          ¡No te preocupes! Puedes seguir explorando nuestros productos.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Ir a comprar</Link>
        </Button>
      </div>
    </div>
  );
}
