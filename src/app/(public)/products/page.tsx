import { ProductGrid } from './components/products-grid';
import { getProducts } from './api/products';
import { getCategories } from './api/categories';
import ProductsLocation from './components/products-location';

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-10">
      <div className="w-full flex items-center justify-between gap-5">
        <h1 className="text-3xl font-bold">Productos</h1>
        <ProductsLocation />
      </div>
      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
