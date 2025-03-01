'use client';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils';
import useAddToCart from '@/hooks/use-add-to-cart';

export default function RandomProduct({ product }: { product: Product }) {
  const { isLoading, handleAddToCart } = useAddToCart();

  return (
    <Link
      href="#"
      className="relative overflow-hidden rounded-xl hover:opacity-80"
    >
      <Image
        src={
          product?.images
            ? `https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${product?.images[0]}`
            : 'https://placehold.co/600x400'
        }
        alt={product?.name ?? 'Product image'}
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 p-1" />
      <div className="absolute bottom-0 flex flex-wrap gap-2 items-center justify-between p-5 w-full">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-semibold text-white drop-shadow-sm">
              {product?.name}
            </h3>
            <p className="text-sm text-gray-200 drop-shadow-sm">
              {product?.categories.name}
            </p>
          </div>
          <div className="w-full flex items-center justify-between gap-3 flex-wrap">
            <span className="font-semibold">
              {formatPrice(product?.price ?? 0)}
            </span>
            <Button
              className="rounded-full bg-[#1d1d1d] text-white"
              onClick={async (e) => {
                handleAddToCart(e, product?.id);
              }}
              disabled={isLoading}
            >
              {isLoading ? <span>Loading...</span> : <>Añadir al carrito</>}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
