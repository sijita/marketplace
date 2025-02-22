import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: 'Clothes and shoes',
    image: 'https://picsum.photos/seed/picsum/400/500',
    items: 10,
  },
  {
    title: 'Electronics',
    image: 'https://picsum.photos/seed/picsum/400/500',
    items: 10,
  },
  {
    title: 'Sports goods',
    image: 'https://picsum.photos/seed/picsum/400/500',
    items: 10,
  },
  {
    title: "Children's goods",
    image: 'https://picsum.photos/seed/picsum/400/500',
    items: 10,
  },
  {
    title: 'Beauty',
    image: 'https://picsum.photos/seed/picsum/400/500',
    items: 10,
  },
  {
    title: 'Furniture',
    image: 'https://picsum.photos/seed/picsum/400/500',
    items: 10,
  },
];

export default function PopularCategories() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Categorias populares</h2>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full gap-4 grid-cols-4 grid-rows-2 max-sm:grid-cols-1">
          {categories.map((category, index) => (
            <Link
              key={index}
              href="#"
              className={`${
                index === 0 || index === 5 ? 'col-span-2' : 'col-span-1'
              } max-sm:col-span-1 row-span-1 rounded-lg flex items-center justify-center relative h-56 hover:opacity-80`}
            >
              <Image
                src={category.image}
                alt={category.title}
                objectFit="cover"
                className="rounded-lg"
                fill
              />
              <span className="text-white font-bold absolute top-2 left-2">
                {category.title}
              </span>
              <span className="text-white absolute bottom-2 right-2">
                {category.items} items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
