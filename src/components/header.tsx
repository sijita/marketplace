import Link from 'next/link';
import { Button } from './ui/button';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="flex items-center space-x-6">
          <Link href="#" className="text-sm font-medium">
            Inicio
          </Link>
          <Link href="#" className="text-sm font-medium">
            Productos
          </Link>
          <Link href="#" className="text-sm font-medium">
            Soporte
          </Link>
        </nav>
        <Link href="/" className="text-xl font-bold">
          Marketplace
        </Link>
        <div className="flex items-center space-x-4">
          <Button className="rounded-lg" variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="rounded-lg" variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button className="rounded-lg" variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button className="rounded-lg" variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
