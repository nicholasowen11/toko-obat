'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { getProductById, updateProduct } from '@/lib/storage';
import { notFound } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams(); // Ambil ID produk dari URL
  const [product, setProduct] = useState<any>(null);

  // Ambil data produk berdasarkan ID saat halaman pertama kali dimuat
  useEffect(() => {
    if (id) {
      const existingProduct = getProductById(id as string);
      if (existingProduct) {
        setProduct(existingProduct);
      } else {
        notFound(); // Jika produk tidak ditemukan, tampilkan halaman 404
      }
    }
  }, [id]);

  // Jika data produk belum dimuat, tampilkan loading
  if (!product) {
    return <p className="text-gray-500">Memuat data produk...</p>;
  }

  // Fungsi untuk menyimpan perubahan
  const handleSubmit = (updatedProduct: any) => {
    updateProduct(id as string, updatedProduct);
    router.push('/dashboard/products'); // Kembali ke daftar produk setelah berhasil edit
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
      <ProductForm onSubmit={handleSubmit} initialData={product} isEditing={true} />
    </main>
  );
}
