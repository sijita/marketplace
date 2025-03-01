'use client';
import { Button } from './ui/button';
import ProductCard from './product-card';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import useCategoriesStore from '@/store/categories';
import Link from 'next/link';

export default function PopularProducts({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const setSelectedCategories = useCategoriesStore(
    (state) => state.setCategories
  );

  return (
    <section className="flex flex-col gap-5">
      <div className="flex w-full justify-between items-center gap-5">
        <h2 className="text-2xl font-bold">Productos populares</h2>
        <div className="flex gap-2 overflow-x-auto max-sm:pb-2">
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="rounded-full"
              onClick={() => setSelectedCategories([category.name])}
              asChild
            >
              <Link href="/products">{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
