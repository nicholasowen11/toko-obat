"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Memeriksa status autentikasi dan peran pengguna
  useEffect(() => {
    const checkAuthStatus = async () => {
      const res = await fetch("/api/getUserId");
      const data = await res.json();

      if (!data.userId) {
        // Jika tidak ada userId (belum login), arahkan ke /auth
        router.push("/auth");
      } else {
        // Jika sudah login, set status autentikasi
        setIsAuthenticated(true);
      }
    };

    checkAuthStatus();
  }, [router]);

  const showSidebar = pathname === "/products"; // Sidebar hanya muncul di "/products"

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Loading state jika status autentikasi sedang diperiksa
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {showSidebar && <Sidebar />}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}