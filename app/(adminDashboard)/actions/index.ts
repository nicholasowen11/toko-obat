'use server';

import createSupabaseServerClient from "@/lib/supabase/server";
import { Product } from "@/types";

export async function signOut() {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if(error) {
        console.error("Error signing out:", error);
        throw new Error("Failed to sign out");
    }
}

export async function addProduct(product: Omit<Product, "id" | "createdBy">, adminId: string) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from("products").insert({
        ...product,
        createdBy: adminId, // Gunakan adminId dari session
    });

    if (error) {
        console.error("Error adding product:", error);
        throw new Error("Failed to add product");
    }

    return { success: true };
}

export async function updateProduct(productId: string, updatedData: Partial<Product>) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from("products")
        .update(updatedData)
        .eq("id", productId);

    if (error) {
        console.error("Error updating product:", error);
        throw new Error("Failed to update product");
    }

    return { success: true };
}

export async function deleteProduct(productId: string) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product");
    }

    return { success: true };
}

export async function getProducts(adminId: string, searchTerm: string = "", category: string = "") {
    const supabase = await createSupabaseServerClient();

    let query = supabase
        .from("products")
        .select("*")
        .eq("createdBy", adminId) // Filter products by adminId
        .order("created_at", { ascending: false });

    // Apply search filter if searchTerm is provided
    if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`); // Pencarian berdasarkan nama produk
    }

    // Apply category filter if category is provided
    if (category) {
        query = query.eq("category", category); // Filter berdasarkan kategori
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }

    return data;
}

export async function getProductById(productId: string) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error("Failed to fetch product");
    }

    return data;
}