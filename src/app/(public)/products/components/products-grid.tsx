'use client';
import type { Product } from '@/types/product';
import { ProductsFilters } from './products-filters';
import { ProductSort } from './products-sort';
import ProductCard from '@/components/product-card';
import type { Category } from '@/types/category';
import useProductsSort from '../hooks/use-products-sort';

export function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const { sortBy, filteredProducts, setPriceRange, setSortBy } =
    useProductsSort({ products });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <ProductsFilters
        onPriceRangeChange={setPriceRange}
        categories={categories}
      />
      <main className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-base text-muted-foreground">
            {filteredProducts.length} productos encontrados
          </p>
          <ProductSort onSort={setSortBy} sortBy={sortBy} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
