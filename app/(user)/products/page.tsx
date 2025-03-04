"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const res = await fetch("/api/getUserId");
      const data = await res.json();

      if (!data.userId || data.role !== "user") {
        router.push("/auth"); // Redirect ke halaman auth jika role tidak sesuai
      } else {
        setRole(data.role); // Set role jika autentikasi berhasil
        setIsAuthenticated(true);
      }
    };

    fetchUserRole();
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Welcome in User Page</h1>
      {/* Tampilkan konten produk jika sudah terautentikasi */}
    </div>
  );
}