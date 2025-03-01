import Footer from '@/components/footer';
import Hero from '@/components/hero';
import PopularCategories from '@/components/popular-categories';
import PopularProducts from '@/components/popular-products';
import RandomProduct from '@/components/random-product';
import { getProducts } from '@/api/products';
import { getCategories } from '@/api/categories';

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  const randomIndex = Math.floor(Math.random() * (products?.length ?? 0));

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col gap-16">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] lg:h-96">
        <Hero products={products} />
        <RandomProduct product={products?.[randomIndex]} />
      </div>
      <PopularProducts products={products} categories={categories} />
      <PopularCategories  categories={categories} />
      <Footer />
    </main>
  );
}
