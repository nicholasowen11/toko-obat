'use client';

import { useEffect, useState } from 'react';
import DashboardStats from '@/components/DashboardStats';
import { getProducts } from '@/lib/storage';
import { Product } from '@/lib/storage';

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setProducts(getProducts());
  }, []);

  if (!isClient) {
    return <p className="text-gray-500">Memuat data...</p>;
  }

  const totalProducts = products.length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Selamat datang di toko Anda!</h1>

      {/* Statistik Produk */}
      <DashboardStats totalProducts={totalProducts} />
    </div>
  );
}
