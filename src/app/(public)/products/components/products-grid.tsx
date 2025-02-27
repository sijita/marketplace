'use client';
import { Product } from '@/types/product';
import { ProductsFilters } from './products-filters';
import { ProductSort } from './products-sort';
import ProductCard from '@/components/product-card';
import { Categories } from '@/types/categories';
import useProductsSort from '../hooks/use-products-sort';

export function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: Categories[];
}) {
  const {
    sortBy,
    filteredProducts,
    setPriceRange,
    setSelectedCategories,
    setSortBy,
  } = useProductsSort({ products });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <ProductsFilters
        onPriceRangeChange={setPriceRange}
        onCategoriesChange={setSelectedCategories}
        categories={categories}
      />
      <main className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-base text-muted-foreground">
            {filteredProducts.length} products found
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
