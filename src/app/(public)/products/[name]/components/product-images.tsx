'use client';
import { useState } from 'react';
import Image from 'next/image';

export function ProductImages({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="grid grid-cols-[100px_1fr] max-md:flex max-md:flex-col-reverse gap-4">
      <div className="grid grid-cols-4 gap-4 md:flex md:flex-col md:max-h-[500px] md:overflow-y-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={`shadow relative aspect-square overflow-hidden rounded-md cursor-pointer ${
              img === mainImage ? 'border border-primary' : ''
            }`}
            onClick={() => setMainImage(img)}
          >
            <Image
              src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${img}`}
              alt={`${productName} - Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-center"
            />
          </div>
        ))}
      </div>
      <div className="relative aspect-square overflow-hidden rounded-xl shadow">
        <Image
          src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${mainImage}`}
          alt={productName}
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-center"
        />
      </div>
    </div>
  );
}
