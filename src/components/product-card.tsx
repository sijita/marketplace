import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductCard({
  title,
  category,
  price,
  image,
}: {
  title: string;
  category: string;
  price: number;
  image: string;
}) {
  return (
    <Link href="#" className="group relative rounded-xl bg-[#efefef]">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 bg-[#efefef] rounded-full"
      >
        <Heart className="h-5 w-5" />
      </Button>
      <div className="aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${image}`}
          alt={title}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105 rounded-t-xl"
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col">
          <span className="font-semibold">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price)}
          </span>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col max-w-[70%]">
              <h3 className="w-full font-semibold truncate">{title}</h3>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
            <Button className="rounded-full bg-[#1d1d1d] text-white">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
