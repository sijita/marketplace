import { Product } from '@/types/product';
import { calculateAverageRating } from '@/utils';
import { useState } from 'react';

export default function useProductsSort({ products }: { products: Product[] }) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.categories.name)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === 'priceLowToHigh') return a.price - b.price;
      if (sortBy === 'priceHighToLow') return b.price - a.price;
      if (sortBy === 'rating') {
        const aRating = calculateAverageRating(a.reviews);
        const bRating = calculateAverageRating(b.reviews);
        return bRating - aRating;
      }
      return 0;
    });

  return {
    priceRange,
    selectedCategories,
    sortBy,
    filteredProducts,
    setPriceRange,
    setSelectedCategories,
    setSortBy,
  };
}
