'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  removeCartItem,
  updateCartItemQuantity,
} from '@/app/(auth)/cart/actions/handle-cart';
import type { Product } from '@/types/product';
import toast from 'react-hot-toast';

export function CartItems({
  initialItems,
}: {
  initialItems: {
    id: number;
    quantity: number;
    products: Product;
  }[];
}) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {initialItems.map((item) => (
        <Card key={item.id} className="mb-4 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24">
                <Image
                  src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${item.products.images[0]}`}
                  alt={item.products.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.products.name}</h3>
                <p className="text-muted-foreground">
                  ${item.products.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () =>
                    toast.promise(
                      updateCartItemQuantity(item.id, item.quantity - 1),
                      {
                        loading: 'Actualizando...',
                        success: 'Se actualizó el cantidad correctamente',
                        error: 'Error al actualizar la cantidad',
                      }
                    )
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={async (e) =>
                    toast.promise(
                      updateCartItemQuantity(
                        item.id,
                        parseInt(e.target.value) || 1
                      ),
                      {
                        loading: 'Actualizando...',
                        success: 'Se actualizó el cantidad correctamente',
                        error: 'Error al actualizar la cantidad',
                      }
                    )
                  }
                  className="w-16 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () =>
                    toast.promise(
                      updateCartItemQuantity(item.id, item.quantity + 1),
                      {
                        loading: 'Actualizando...',
                        success: 'Se actualizó el cantidad correctamente',
                        error: 'Error al actualizar la cantidad',
                      }
                    )
                  }
                  disabled={item.quantity === item.products.quantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => await removeCartItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}
