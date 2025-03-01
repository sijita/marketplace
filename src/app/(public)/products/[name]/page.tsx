import { ProductImages } from './components/product-images';
import { ProductInfo } from './components/product-info';
import NotFoundPage from '@/components/not-found-page';
import ProductCard from '@/components/product-card';
import { getProducts } from '@/app/(public)/products/api/products';
import { getProduct } from './api/product';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = await params;

  const product = await getProduct(name);
  const products = await getProducts();

  if (!product) {
    return <NotFoundPage popularProducts={products} />;
  }

  return (
    <div className="container mx-auto p-10 flex flex-col gap-14">
      <div className="grid lg:grid-cols-2 gap-10">
        <ProductImages images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold">Otros productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
