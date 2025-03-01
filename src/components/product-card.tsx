'use client';
import { Heart, Loader2, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { calculateAverageRating, formatPrice } from '@/utils';
import useAddToCart from '@/hooks/use-add-to-cart';

export default function ProductCard({ product }: { product: Product }) {
  const { isLoading, handleAddToCart } = useAddToCart();

  return (
    <Link
      href={`/products/${product.name.replaceAll(' ', '-')}`}
      className="group relative rounded-xl bg-white shadow overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 bg-[#efefef] rounded-full"
      >
        <Heart className="h-5 w-5" />
      </Button>
      <div className="aspect-square overflow-hidden rounded-lg p-5">
        <Image
          src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${
            product.images[Math.floor(Math.random() * product.images.length)]
          }`}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col gap-5 max-w-[70%] max-md:max-w-full">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm">{product?.reviews?.length}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                (
                {product?.reviews?.length > 0
                  ? calculateAverageRating(product.reviews)
                  : 0}{' '}
                reviews)
              </span>
            </div>
            <div>
              <h3 className="w-full font-semibold truncate">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.categories.name}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-3 flex-wrap">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          <div>
            <Button
              className="rounded-full bg-[#1d1d1d] text-white"
              onClick={async (e) => {
                handleAddToCart(e, product.id);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Añadir
                  <ShoppingCart className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
