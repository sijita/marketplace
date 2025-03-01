'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Star,
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Loader2,
} from 'lucide-react';
import type { Product } from '@/types/product';
import { ProductDetails } from './product-detail';
import { Badge } from '@/components/ui/badge';
import { calculateAverageRating, formatPrice } from '@/utils';
import useAddToCart from '@/hooks/use-add-to-cart';

export function ProductInfo({ product }: { product: Product }) {
  const { isLoading, quantity, setQuantity, handleAddToCart } = useAddToCart();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between w-full flex-wrap">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-lg truncate max-w-[70%]">
              {product.categories.name}
            </p>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div>
                <Badge className="uppercase" variant="outline">
                  {product.condition}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i <
                    Math.floor(
                      product.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / product.reviews.length
                    )
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product?.reviews?.length > 0
                ? calculateAverageRating(product.reviews)
                : 0}{' '}
              ({product.reviews.length} reviews)
            </span>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{product.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
        <Badge
          className="flex items-center gap-2 font-semibold py-2"
          variant="secondary"
        >
          <Truck className="h-5 w-5" />
          {product.free_shipping ? 'Envio gratis' : 'Envio a acordar'}
        </Badge>
      </div>
      <div className="flex space-x-4">
        <div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number.parseInt(e.target.value) || 1)
              }
              className="w-20 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity === product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          className="flex-1 flex items-center gap-3"
          onClick={async (e) => {
            handleAddToCart(e, product.id);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Añadir <ShoppingCart className="h-4 w-4" />
            </>
          )}
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      <ProductDetails product={product} />
    </div>
  );
}
