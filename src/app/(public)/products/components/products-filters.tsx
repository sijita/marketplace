'use client';
import useProductsFilters from '../hooks/use-products-filters';
import { Categories } from '@/types/categories';
import CategoriesSelector from './categories-selector';
import PriceRangeSlider from './price-range-slider';
import { Separator } from '@/components/ui/separator';

export function ProductsFilters({
  onPriceRangeChange,
  onCategoriesChange,
  categories,
}: {
  onPriceRangeChange: (range: number[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  categories: Categories[];
}) {
  const {
    priceRange,
    selectedCategories,
    handlePriceRangeChange,
    handleCategoryChange,
  } = useProductsFilters({
    onPriceRangeChange,
    onCategoriesChange,
  });

  return (
    <aside className="w-full lg:w-1/4 space-y-6 shadow rounded-xl p-5">
      <div className="flex flex-col gap-2">
        <PriceRangeSlider
          priceRange={priceRange}
          handlePriceRangeChange={handlePriceRangeChange}
        />
        <Separator className="my-4" />
        <CategoriesSelector
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </aside>
  );
}
