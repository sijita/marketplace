import React from 'react';
import { Button } from './ui/button';
import ProductCard from './product-card';
import { Product } from '@/types/product';

export default function PopularProducts({ products }: { products: Product[] }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex w-full justify-between items-center gap-5">
        <h2 className="text-2xl font-bold">Productos populares</h2>
        <div className="flex gap-2 overflow-x-auto max-sm:pb-2">
          {[
            'Clothes and shoes',
            'Electronics',
            'Sports goods',
            "Children's goods",
            'Beauty',
            'Furniture',
          ].map((category) => (
            <Button key={category} variant="outline" className="rounded-full">
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            category={product.categories.name}
            price={product.price}
            image={
              product.images[Math.floor(Math.random() * product.images.length)]
            }
            rating={
              product?.reviews?.length > 0
                ? product?.reviews?.reduce(
                    (acc, review) => acc + review.rating,
                    0
                  ) / product?.reviews?.length
                : 0
            }
            reviews={product?.reviews?.length}
          />
        ))}
      </div>
    </section>
  );
}
