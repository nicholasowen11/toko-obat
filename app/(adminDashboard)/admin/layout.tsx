"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Import usePathname
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const checkAuthStatus = async () => {
      const res = await fetch("/api/getUserId");
      const data = await res.json();

      if (!data.userId || data.role !== "admin") {
        // Redirect ke halaman login jika bukan admin
        router.push("/auth");
      } else {
        // setRole(data.role); // Set role jika sudah terautentikasi
        setIsAuthenticated(true);
      }
    };

    checkAuthStatus();
  }, [router]);

  if (!isAuthenticated) {
    // return; // Loading state saat mengecek status autentikasi
    return <div className="flex justify-center">Loading Page...</div>; // Loading state saat mengecek status autentikasi
  }

  // Only show Sidebar if the current path is '/admin'
  const showSidebar = pathname === '/admin'; // Check if the current page is '/admin'

  return (
    <div className="flex min-h-screen bg-gray-100">
      {showSidebar && <Sidebar />} {/* Show Sidebar only on /admin */}
      <main className="flex-1 p-6">{children}</main> {/* Konten halaman */}
    </div>
  );
}