"use client";

import { useSession } from "@/hooks/useSession";
import { addProduct } from "@/app/(adminDashboard)/actions";
import ProductForm from "../../components/ProductForm";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const adminId = useSession(); // Get adminId from the session
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      if (adminId) {
        await addProduct(data, adminId); // Pass the adminId
        router.push('/admin'); // Redirect to the admin dashboard after adding product
      } else {
        console.error("Admin session is missing");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!adminId) {
    return <div>Loading...</div>; // Show loading until adminId is fetched
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>
      <ProductForm onSubmit={onSubmit} adminId={adminId} />
    </div>
  );
}