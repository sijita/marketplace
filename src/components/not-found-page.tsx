import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types/product';
import ProductCard from './product-card';

export default function NotFoundPage({
  popularProducts,
}: {
  popularProducts: Product[];
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center flex flex-col gap-10">
      <div className="max-w-md mx-auto mb-12">
        <ShoppingBag className="mx-auto h-24 w-24 text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Oops! Esta página no existe</h1>
        <p className="text-xl text-muted-foreground mb-8">
          La página que estás buscando no existe o ha sido eliminada.
        </p>
        <Button asChild size="lg" className="w-full">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold">Otros productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
