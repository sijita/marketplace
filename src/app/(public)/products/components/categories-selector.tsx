import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import type { Category } from '@/types/category';
import { ChevronDown } from 'lucide-react';

export default function CategoriesSelector({
  categories,
  selectedCategories,
  handleCategoryChange,
}: {
  categories: Category[];
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
}) {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-between">
          <Label className="text-lg font-semibold">Categorías</Label>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-5 bg-gray-50 rounded-xl mt-5 flex flex-col gap-2">
          {categories.map((category) => (
            <div key={category.id}>
              <Button
                variant={
                  selectedCategories.includes(category.name)
                    ? 'default'
                    : 'ghost'
                }
                className="w-full"
                onClick={() => handleCategoryChange(category.name)}
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
