"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { getProductById, updateProduct } from "@/app/(adminDashboard)/actions";
import ProductForm from "../../components/ProductForm";
import { Product } from "@/types"; // Impor tipe Product dari types.ts

export default function EditProduct() {
    const adminId = useSession(); // Ambil adminId dari session
    const { id } = useParams(); // Ambil productId dari URL params
    const router = useRouter();
    const [productData, setProductData] = useState<Product | null>(null); // Gunakan Product | null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!id) return;

                const product: Product = await getProductById(id as string);
                if (!product) {
                    router.push("/admin"); // Redirect jika produk tidak ditemukan
                    return;
                }
                setProductData(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (adminId) {
            fetchProduct();
        }
    }, [adminId, id, router]);

    const onSubmit = async (data: Product) => {
        try {
            if (!adminId) return;
            await updateProduct(id as string, { ...data, createdBy: adminId });
            router.push("/admin"); // Redirect setelah berhasil edit
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (!adminId) {
        return <div>Loading...</div>; // Tampilkan loading jika adminId belum ada
    }

    if (loading) {
        return <div>Loading product data...</div>;
    }

    if (!productData) {
        return <div>Produk tidak ditemukan</div>;
    }

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
        <ProductForm productData={productData} onSubmit={onSubmit} adminId={adminId} />
      </div>
    );
}