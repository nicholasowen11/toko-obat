'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductList from '@/components/ProductList';
import SearchBar from '@/components/SearchBar';
import { getProducts, Product } from '@/lib/storage';
import ProductListSkeleton from '@/components/ProductListSkeleton';
import { useProducts } from '@/hooks/useProducts';

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  const { products, setProducts, loading } = useProducts();

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set('search', query);
    else params.delete('search');
    router.push(`/dashboard/products?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) params.set('category', category);
    else params.delete('category');
    router.push(`/dashboard/products?${params.toString()}`);
  };

  return (
    <div>
      <Suspense fallback={<ProductListSkeleton />}>
        {loading ? (
          <ProductListSkeleton />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

            <div className="flex gap-4 mb-4">
              <SearchBar setSearchQuery={handleSearch} initialValue={searchQuery} />
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="p-2 border rounded cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                <option value="Obat-obatan">Obat-obatan</option>
                <option value="Vitamin & Suplemen">Vitamin & Suplemen</option>
              </select>
            </div>

            <ProductList products={filteredProducts} refreshProducts={() => setProducts(getProducts())} />
          </>
        )}
      </Suspense>
    </div>
  );
}
