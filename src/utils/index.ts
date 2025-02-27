import { Product } from '@/types/product';

export const calculateAverageRating = (reviews: Product['reviews']) => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};
