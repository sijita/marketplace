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
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
        <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
        <SelectItem value="rating">Top Rated</SelectItem>
      </SelectContent>
    </Select>
  );
}
