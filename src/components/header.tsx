import Link from 'next/link';
import { Button } from './ui/button';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import toast from 'react-hot-toast';
import SignoutButton from './signout-button';

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <SignoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="rounded-lg">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
