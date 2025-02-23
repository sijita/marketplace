'use client';
import type React from 'react';
import { useState } from 'react';
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

export default function SellForm() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <form className="flex flex-col gap-10">
      <div className="grid gap-6">
        <div className="w-full flex items-start gap-10">
          <div className="grid gap-3">
            <Label>Imagenes</Label>
            <div className="flex flex-wrap gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
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
              <label className="flex items-center justify-center h-[7.5rem] w-[7.5rem] border-2 border-dashed rounded cursor-pointer hover:border-primary">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Plus className="h-6 w-6" />
              </label>
            </div>
          </div>
          <div className="w-1/2 grid gap-5">
            <div className="grid gap-3">
              <Label htmlFor="productName">Nombre del producto</Label>
              <Input id="productName" placeholder="Producto x" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Categoría</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full grid gap-3">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describa el producto"
              rows={5}
            />
          </div>
          <div className="grid gap-3 justify-center">
            <Label>Condición</Label>
            <RadioGroup defaultValue="new">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">Nuevo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="used" id="used" />
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
              type="number"
              placeholder="$0.00"
              min="0"
              step="0.01"
            />
          </div>
          <div className="w-full grid gap-3">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input id="quantity" type="number" placeholder="1" min="1" />
          </div>
        </div>
        <div className="grid gap-4">
          <h3 className="text-sm font-semibold">Ubicación</h3>
          <div className="flex items-center gap-5">
            <div className="w-1/2 grid gap-2">
              <Label htmlFor="department">Departamento</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="antioquia">Antioquia</SelectItem>
                  <SelectItem value="cundinamarca">Cundinamarca</SelectItem>
                  <SelectItem value="valle">Valle del Cauca</SelectItem>
                  <SelectItem value="atlantico">Atlántico</SelectItem>
                  {/* Añadir más departamentos según sea necesario */}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2 grid gap-2">
              <Label htmlFor="city">Ciudad</Label>
              <Select>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medellin">Medellín</SelectItem>
                  <SelectItem value="bogota">Bogotá</SelectItem>
                  <SelectItem value="cali">Cali</SelectItem>
                  <SelectItem value="barranquilla">Barranquilla</SelectItem>
                  {/* Añadir más ciudades según sea necesario */}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full grid gap-2">
              <Label htmlFor="neighborhood">Dirección</Label>
              <Input id="neighborhood" placeholder="Barrio, dirección, etc." />
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <Label>Opción de entrega</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="freeShipping" />
            <Label htmlFor="freeShipping">Gratis</Label>
          </div>
        </div>
      </div>
      <Button className="w-full" type="submit">
        Publicar
      </Button>
    </form>
  );
}
