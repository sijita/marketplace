'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Heart,
  MapPinned,
  Menu,
  Search,
  ShoppingCart,
  User as UserIcon,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignoutButton from './signout-button';
import { useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function Header({ user }: { user: User | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button className="rounded-lg" variant="ghost" size="icon">
            <MapPinned className="h-5 w-5" />
          </Button>
          <Link href="/" className="text-xl font-bold ml-4">
            Marketplace
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium">
            Inicio
          </Link>
          <Link href="/products" className="text-sm font-medium">
            Comprar
          </Link>
          <Link href="/sell" className="text-sm font-medium">
            Vender
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
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
                  <UserIcon className="h-5 w-5" />
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
                <UserIcon className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <Button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-center hover:bg-slate-100"
            >
              Inicio
            </Link>
            <Link
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-center hover:bg-slate-100"
            >
              Comprar
            </Link>
            <Link
              href="/sell"
              className="block px-3 py-2 rounded-md text-base font-medium text-center hover:bg-slate-100"
            >
              Vender
            </Link>
            <div className="flex items-center justify-center space-x-4 px-3 py-2">
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
                      <UserIcon className="h-5 w-5" />
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
                    <UserIcon className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
