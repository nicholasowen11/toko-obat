'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Seller</h1>
      <p className="text-gray-600">Lihat dan kelola produk Anda di halaman daftar produk di bawah ini.</p>
      <button
        onClick={() => router.push('/dashboard/products')}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Lihat daftar produk kamu yuk.
      </button>
    </div>
  );
}
