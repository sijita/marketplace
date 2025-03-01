import useCategoriesStore from '@/store/categories';
import { useState, useEffect } from 'react';

export default function useProductsFilters({
  onPriceRangeChange,
}: {
  onPriceRangeChange: (range: number[]) => void;
}) {
  const selectedCategories = useCategoriesStore((state) => state.categories);
  const setSelectedCategories = useCategoriesStore(
    (state) => state.setCategories
  );
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  useEffect(() => {
    onPriceRangeChange([0, 1000000]);
  }, [onPriceRangeChange]);

  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
  };

  return {
    priceRange,
    selectedCategories,
    handlePriceRangeChange,
    handleCategoryChange,
  };
}
