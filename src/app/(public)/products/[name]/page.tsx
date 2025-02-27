import { createClient } from '@/utils/supabase/server';
import { ProductImages } from './components/product-images';
import { ProductInfo } from './components/product-info';
import NotFoundPage from '@/components/not-found-page';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = await params;
  console.log(name);
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select(
      `
      *,
      categories (
        id,
        name,
        description
      ),
      reviews (
        id,
        rating,
        review_text,
        created_at,
        user_id
      )
    `
    )
    .eq('name', name.replaceAll('-', ' '))
    .single();

  if (!product) {
    const { data: products } = await supabase.from('products').select(
      `
        *,
        categories (
         *
        ),
        reviews (
         *
        )
      `
    );

    return <NotFoundPage popularProducts={products ?? []} />;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <ProductImages images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
