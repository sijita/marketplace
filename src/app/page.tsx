import Footer from '@/components/footer';
import Hero from '@/components/hero';
import PopularCategories from '@/components/popular-categories';
import PopularProducts from '@/components/popular-products';
import RandomProduct from '@/components/random-product';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 flex flex-col gap-16">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] h-96">
        <Hero />
        <RandomProduct />
      </div>
      <PopularProducts />
      <PopularCategories />
      <Footer />
    </main>
  );
}
