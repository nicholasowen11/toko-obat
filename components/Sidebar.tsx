"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/products", label: "Daftar Produk" },
    { href: "/dashboard/products/create", label: "Tambah Produk" },
    // { href: "/dashboard/orders", label: "Pesanan" },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg">
      {/* Header Sidebar */}
      <Link href="/" className="flex items-center justify-center h-16 bg-blue-600 font-bold text-lg md:no-underline">
        Toko Magic 888
      </Link>

      {/* Menu Navigasi */}
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-lg transition-all text-sm font-medium ${
              pathname === item.href
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Spacer agar tombol logout ada di bawah */}
      <div className="flex-grow"></div>

      {/* Tombol Logout */}
      <form className="p-4">
        <Link href="../">
            <button className="w-full px-4 py-2 rounded-lg bg-gray-700 hover:bg-red-600 transition-all text-sm">
                Keluar
            </button>
        </Link>
      </form>
    </div>
  );
}
