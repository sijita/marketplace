import type { Product } from '@/types/product';
import { useState } from 'react';

export default function useHandleCarousel({
  products,
}: {
  products: Product[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = products.length;

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  return {
    currentSlide,
    totalSlides,
    handlePrevSlide,
    handleNextSlide,
  };
}
