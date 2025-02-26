import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { Product } from '@/types/product';

export default function RandomProduct({ product }: { product: Product }) {
  return (
    <Link
      href="#"
      className="relative overflow-hidden rounded-xl hover:opacity-80"
    >
      <Image
        src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${product.images[0]}`}
        alt={product.name}
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 p-1" />
      <div className="absolute bottom-0 flex flex-wrap gap-2 items-center justify-between p-5 w-full">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-semibold text-white drop-shadow-sm">
              {product.name}
            </h3>
            <p className="text-sm text-gray-200 drop-shadow-sm">
              {product.categories.name}
            </p>
          </div>
          <div className="w-full flex items-center justify-between gap-3 flex-wrap">
            <span className="font-semibold">
              {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
            <Button className="rounded-full bg-[#1d1d1d] text-white">
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
