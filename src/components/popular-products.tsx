import React from 'react';
import { Button } from './ui/button';
import ProductCard from './product-card';

const popularProducts = [
  {
    title: 'Macbook Air 13 256Gb',
    brand: 'Apple',
    price: 935.9,
    image:
      'https://mac-center.com/cdn/shop/files/IMG-12444355_864767db-2fa9-4fae-bd3e-9d878c63376c_533x.jpg?v=1723749600',
  },
  {
    title: 'Buds 4 Lite Black',
    brand: 'Xiaomi',
    price: 41.25,
    originalPrice: 55.9,
    image:
      'https://f.fcdn.app/imgs/e407ed/www.zonatecno.com.uy/zoteuy/952e/original/catalogo/103717_103717_1/1920-1200/auriculares-bluetooth-xiaomi-redmi-buds-4-lite-tws-black-auriculares-bluetooth-xiaomi-redmi-buds-4-lite-tws-black.jpg',
  },
  {
    title: 'PlayStation 5 Pro 825GB',
    brand: 'Sony',
    price: 684.6,
    image:
      'https://cosonyb2c.vtexassets.com/arquivos/ids/360392/711719595700_001.jpg?v=638645914784400000',
  },
  {
    title: 'Galaxy Watch 6 40mm',
    brand: 'Samsung',
    price: 168.5,
    image:
      'https://vivelaera.com/wp-content/uploads/2023/07/SM-R950NZKALTA_43WISESMALL_1.jpg',
  },
];

export default function PopularProducts() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex w-full justify-between items-center gap-5">
        <h2 className="text-2xl font-bold">Productos populares</h2>
        <div className="flex gap-2 overflow-x-auto">
          {[
            'Clothes and shoes',
            'Electronics',
            'Sports goods',
            "Children's goods",
            'Beauty',
            'Furniture',
          ].map((category) => (
            <Button key={category} variant="outline" className="rounded-full">
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popularProducts.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            brand={product.brand}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}
