'use client';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { sellAction } from '@/app/(auth)/sell/actions/sell';
import useSellFunctions from '@/app/(auth)/sell/hooks/use-sell-functions';
import useSubmitAction from '@/hooks/use-submit-action';
import SubmitButton from '@/components/submit-button';

export default function SellForm({
  departments,
  municipalities,
  categories,
}: {
  departments: {
    id: number;
    name: string;
  }[];
  municipalities: {
    id: number;
    name: string;
    department_id: number;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const {
    images,
    setImages,
    handleImageUpload,
    removeImage,
    filteredMunicipalities,
    selectedDepartment,
    setSelectedDepartment,
  } = useSellFunctions({ municipalities });
  const { submitAction } = useSubmitAction();

  return (
    <form
      action={async (formData) => {
        setImages([]);
        setSelectedDepartment('');

        await submitAction(sellAction, formData, '/');
      }}
      className="flex flex-col gap-10"
    >
      <div className="w-full flex max-lg:flex-col items-start gap-10">
        <div
          className={`grid gap-3 ${
            images.length > 0 ? 'lg:w-1/2' : 'w-[20rem]'
          }`}
        >
          <Label>Imagenes</Label>
          <div
            className={`flex overflow-auto gap-5 ${images.length > 0 && 'p-5'}`}
          >
            <label className="flex items-center justify-center h-[7.5rem] w-[7.5rem] border-2 border-dashed rounded cursor-pointer hover:border-primary flex-shrink-0">
              <input
                name="images"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                multiple
                required
              />
              <Plus className="h-6 w-6" />
            </label>
            {images.map((img, index) => (
              <div
                key={index}
                className="relative shadow rounded-lg flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="h-[7.5rem] w-[7.5rem] object-cover rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full grid gap-5">
          <div className="grid gap-3">
            <Label htmlFor="productName">Nombre del producto</Label>
            <Input
              id="productName"
              name="productName"
              placeholder="Producto x"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="category">Categoría</Label>
            <Select name="category" required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full grid gap-3">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describa el producto"
            rows={5}
            required
          />
        </div>
        <div className="grid gap-3 justify-center">
          <Label>Condición</Label>
          <RadioGroup name="condition" defaultValue="" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nuevo" id="new" />
              <Label htmlFor="new">Nuevo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="usado" id="used" />
              <Label htmlFor="used">Usado</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="w-full flex items-center gap-5">
        <div className="w-full grid gap-3">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="$0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="w-full grid gap-3">
          <Label htmlFor="quantity">Cantidad</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="1"
            min="1"
            required
          />
        </div>
      </div>
      <div className="grid gap-4">
        <h3 className="text-sm font-semibold">Ubicación</h3>
        <div className="flex items-center gap-5">
          <div className="w-1/2 grid gap-2">
            <Label htmlFor="department">Departamento</Label>
            <Select
              name="department"
              onValueChange={(value) => setSelectedDepartment(value)}
              value={selectedDepartment ?? undefined}
              required
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem
                    key={department.id}
                    value={department.id.toString()}
                  >
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2 grid gap-2">
            <Label htmlFor="city">Ciudad</Label>
            <Select name="city" required>
              <SelectTrigger id="city">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {filteredMunicipalities.map((municipality) => (
                  <SelectItem
                    key={municipality.id}
                    value={municipality.id.toString()}
                  >
                    {municipality.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full grid gap-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              placeholder="Barrio, dirección, etc."
              required
            />
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        <Label>Opción de entrega</Label>
        <div className="flex items-center space-x-2">
          <Checkbox name="freeShipping" id="freeShipping" />
          <Label htmlFor="freeShipping">Gratis</Label>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
