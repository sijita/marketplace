import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export default function RandomProduct() {
  return (
    <Link
      href="#"
      className="relative overflow-hidden rounded-xl hover:opacity-80"
    >
      <Image
        src="https://imagenes.elpais.com/resizer/v2/https%3A%2F%2Frt01.epimg.net%2Fretina%2Fimagenes%2F2020%2F11%2F09%2Finnovacion%2F1604942002_903423_1605034981_noticia_fotograma.jpg?auth=417dc8cd0f1d67a822b429ecbe6a736a82047b782d252fd50a4899f8117b524a&width=1960&height=1470&smart=true"
        alt="Cast Lights"
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 flex items-center justify-between p-5 w-full">
        <div>
          <h3 className="text-lg font-semibold">Xbox series X</h3>
          <p className="text-sm text-muted-foreground">Videojuegos</p>
        </div>
        <Button className="rounded-full bg-[#1d1d1d] text-white">
          Add to cart
          <span>$45.90</span>
        </Button>
      </div>
    </Link>
  );
}
