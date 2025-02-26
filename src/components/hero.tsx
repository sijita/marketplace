'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';

const slides = [
  {
    src: 'https://lacasadelplay.com.co/cdn/shop/files/WhatsAppImage2024-02-26at6.19.49PM.jpg?v=1716562140',
    alt: 'Interior design',
    title: 'Playstation 5',
    category: 'VideoJuegos',
  },
  {
    src: 'https://cronica.tech/wp-content/uploads/2023/01/playstationVR2.webp',
    alt: 'Gafas VR',
    title: 'Playstation VR2',
    category: 'VideoJuegos',
  },
  // Agrega más objetos de diapositivas aquí
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

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
        src={slides[currentSlide].src}
        alt={slides[currentSlide].alt}
        className="rounded-lg object-cover"
        priority
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 p-6" />
      <div className="absolute inset-x-5 bottom-5 p-5 flex flex-wrap items-center justify-between gap-5 rounded-xl bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-lg bg-zinc-100">
            <Image
              src={slides[currentSlide].src}
              alt="Chair icon"
              width={48}
              height={48}
              className="p-2"
            />
          </div>
          <div>
            <h3 className="font-semibold">{slides[currentSlide].title}</h3>
            <p className="text-sm text-muted-foreground">
              {slides[currentSlide].category}
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
