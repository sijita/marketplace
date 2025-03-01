'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProductSort({
  onSort,
  sortBy,
}: {
  onSort: (value: string) => void;
  sortBy: string;
}) {
  return (
    <Select value={sortBy} onValueChange={onSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Destacados</SelectItem>
        <SelectItem value="priceLowToHigh">Precio: Bajo a Alto</SelectItem>
        <SelectItem value="priceHighToLow">Precio: Alto a Bajo</SelectItem>
        <SelectItem value="rating">Mejores calificaciones</SelectItem>
      </SelectContent>
    </Select>
  );
}
