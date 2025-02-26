'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import { Product } from '@/types/product';

export default function Hero({ products }: { products: Product[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = products.length;

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl max-lg:h-[500px]">
      <Image
        src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${products[currentSlide].images[0]}`}
        alt={products[currentSlide].name}
        className="rounded-lg object-cover"
        priority
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 p-6" />
      <div className="absolute inset-x-5 bottom-5 p-5 flex flex-wrap items-center justify-between gap-5 rounded-xl bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-lg bg-zinc-100">
            <Image
              src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${products[currentSlide].images[0]}`}
              alt={products[currentSlide].name}
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="font-semibold">{products[currentSlide].name}</h3>
            <p className="text-sm text-muted-foreground">
              {products[currentSlide].categories.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 max-sm:mx-auto">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/80"
            onClick={handlePrevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="rounded-full bg-white/80 px-3 py-1 text-sm">
            {currentSlide + 1} / {totalSlides}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/80"
            onClick={handleNextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
