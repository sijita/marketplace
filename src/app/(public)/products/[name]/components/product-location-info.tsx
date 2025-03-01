'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, User } from 'lucide-react';
import type { Product } from '@/types/product';

export function ProductLocationInfo({ product }: { product: Product }) {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Ubicación y Vendedor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Ubicación del producto</p>
            <p className="text-muted-foreground">
              {product.locations?.address},{' '}
              {product.locations?.municipalities?.name},{' '}
              {product.locations?.municipalities?.departments?.name}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Información del vendedor</p>
            <p className="text-muted-foreground">Vendedor ID: {1234}</p>
            <p className="text-sm text-muted-foreground">
              Miembro desde: {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
