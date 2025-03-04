"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOut from "./SignOut";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-green-600 text-white min-h-screen p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
      <ul className="space-y-4 flex-1">
        <li>
          <Link
            href="/admin"
            className={`block px-4 py-2 rounded-lg ${pathname === "/admin" ? "bg-green-800 font-bold" : "hover:bg-green-700"}`}
          >
            Daftar Produk
          </Link>
        </li>
        <li>
          <Link
            href="/admin/addProduct"
            className={`block px-4 py-2 rounded-lg ${pathname === "/admin/addProduct" ? "bg-green-800 font-bold" : "hover:bg-green-700"}`}
          >
            Tambah Produk
          </Link>
        </li>
      </ul>
      <SignOut />
    </nav>
  );
};

export default Sidebar;
