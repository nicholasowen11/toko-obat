'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Sidebar hanya muncul di halaman dashboard dan daftar produk
  const showSidebar = pathname === '/dashboard' || pathname === '/dashboard/products';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar hanya ditampilkan jika berada di halaman dashboard atau daftar produk */}
      {showSidebar && <Sidebar />}
      
      {/* Konten utama tetap responsif */}
      <main className={`p-6 w-full ${showSidebar ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
}
