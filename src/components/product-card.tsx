import { Heart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductCard({
  title,
  brand,
  price,
  originalPrice,
  image,
}: {
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
}) {
  return (
    <Link href="#" className="group relative rounded-xl bg-[#efefef]">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10"
      >
        <Heart className="h-5 w-5" />
      </Button>
      <div className="aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{brand}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
