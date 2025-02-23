'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { saveProduct, Product } from '@/lib/storage';

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = (newProduct: Omit<Product, 'id'>) => {
    const productWithId: Product = { ...newProduct, id: crypto.randomUUID() };
    saveProduct(productWithId);
    router.push('/dashboard/products');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
