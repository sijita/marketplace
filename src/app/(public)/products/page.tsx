import { createClient } from '@/utils/supabase/server';
import { ProductGrid } from './components/products-grid';

export default async function Page() {
  const supabase = await createClient();

  // Fetch products from Supabase
  const { data: products } = await supabase.from('products').select(
    `
    *,
    categories:category_id (
      name,
      description
    ),
    reviews (
      *
    )
  `
  );

  const { data: categories } = await supabase.from('categories').select('*');

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Productos</h1>
      <ProductGrid products={products ?? []} categories={categories ?? []} />
    </div>
  );
}
