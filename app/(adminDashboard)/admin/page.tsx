"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
const ProductList = React.lazy(() => import('@/app/(adminDashboard)/components/ProductList'));
// import ProductList from "@/app/(adminDashboard)/components/ProductList";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

export default function AdminPage() {
  const [adminId, setAdminId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/getUserId");
        const data = await res.json();

        if (!res.ok || data.role !== "admin") {
          router.push("/auth"); // Redirect to login if not admin
          return;
        }

        setAdminId(data.userId); // Set the adminId if authenticated as admin
      } catch (error) {
        console.error("Error fetching userId:", error);
        router.push("/auth"); // Redirect if there's an error in fetching userId
      } finally {
        setLoading(false); // Set loading to false once the check is complete
      }
    };

    fetchUserId();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  if (!adminId) {
    return <div>Redirecting...</div>; // In case adminId is still null, we handle redirection
  }

  return (
    <div>
      {/* Part of the page will be pre-rendered immediately */}
      <h1 className="text-xl font-bold mb-4">Welcome to Admin Page</h1>

      {/* The ProductList will be streamed, and Skeleton will show until it's ready */}
      <Suspense fallback={<Skeleton />}>
        <ProductList adminId={adminId} />
      </Suspense>
    </div>
  );
}