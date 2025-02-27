import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ChevronDown } from 'lucide-react';

export default function PriceRangeSlider({
  priceRange,
  handlePriceRangeChange,
}: {
  priceRange: number[];
  handlePriceRangeChange: (range: number[]) => void;
}) {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-between">
          <Label className="text-lg font-semibold">Rango de precio</Label>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-5 bg-gray-50 rounded-xl mt-5">
        <div className="flex flex-col gap-4">
          <Label htmlFor="priceRange" className="text-sm font-medium block">
            Rango de precio: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            id="priceRange"
            min={0}
            max={1000000}
            step={50000}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="w-full"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
