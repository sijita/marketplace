'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/types/category';
import useCategoriesStore from '@/store/categories';

export default function PopularCategories({
  categories,
}: {
  categories: Category[];
}) {
  const setSelectedCategories = useCategoriesStore(
    (state) => state.setCategories
  );

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Categorias populares</h2>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full gap-4 grid-cols-4 grid-rows-2 max-sm:grid-cols-1">
          {categories
            .filter((category) => category.products.length > 0)
            .map((category, index) => (
              <Link
                key={index}
                href="/products"
                className={`${
                  index === 0 || index === 5 ? 'col-span-2' : 'col-span-1'
                } max-sm:col-span-1 row-span-1 rounded-lg flex items-center justify-center relative h-56 hover:opacity-80 p-5 overflow-hidden`}
                onClick={() => setSelectedCategories([category.name])}
              >
                <Image
                  src={`https://vjxnxxhyjyzouvajgxuy.supabase.co/storage/v1/object/public/products_images/${category.products[0].images[0]}`}
                  alt={category.name}
                  objectFit="cover"
                  className="rounded-lg"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 p-6" />
                <span className="text-black font-semibold absolute top-3 left-3 p-1 max-w-[calc(100%-24px)] truncate">
                  {category.name}
                </span>
                <span className="text-black absolute bottom-3 right-3 p-1 max-w-[calc(100%-24px)] truncate text-right">
                  {category.description}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
