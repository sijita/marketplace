import { useState, useEffect } from 'react';

export default function useProductsFilters({
  onPriceRangeChange,
  onCategoriesChange,
}: {
  onPriceRangeChange: (range: number[]) => void;
  onCategoriesChange: (categories: string[]) => void;
}) {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    onPriceRangeChange([0, 1000000]);
    onCategoriesChange([]);
  }, [onPriceRangeChange, onCategoriesChange]);

  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    onCategoriesChange(newCategories);
  };

  return {
    priceRange,
    selectedCategories,
    handlePriceRangeChange,
    handleCategoryChange,
  };
}
