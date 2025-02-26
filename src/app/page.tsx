import Footer from '@/components/footer';
import Hero from '@/components/hero';
import PopularCategories from '@/components/popular-categories';
import PopularProducts from '@/components/popular-products';
import RandomProduct from '@/components/random-product';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select(
      `
    *,
    categories:category_id (
      name,
      description
    )
  `
    )
    .limit(10);

  const { data: categories } = await supabase
    .from('categories')
    .select(
      `
      *,
      products (
        *
      )
    `
    )
    .limit(6);

  const randomIndex = Math.floor(Math.random() * (products?.length ?? 0));

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col gap-16">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] lg:h-96">
        <Hero products={products ?? []} />
        <RandomProduct product={products?.[randomIndex]} />
      </div>
      <PopularProducts products={products ?? []} />
      <PopularCategories categories={categories ?? []} />
      <Footer />
    </main>
  );
}
