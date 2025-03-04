"use client";

import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/app/(adminDashboard)/actions";
import { Product, categories } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter"; // Import CategoryFilter
import { useDebounce } from "use-debounce"; // Import useDebounce

const ProductList = ({ adminId }: { adminId: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [category, setCategory] = useState<string>(""); // State for selected category
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Delay 500ms after typing
  const [debouncedCategory] = useDebounce(category, 500); // Delay 500ms after category change
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts(adminId, debouncedSearchTerm, debouncedCategory); // Pass both searchTerm and category
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    if (adminId) {
      fetchData();
    } else {
      console.log("Admin ID is missing or invalid");
    }
  }, [adminId, debouncedSearchTerm, debouncedCategory]); // Re-run when adminId, debouncedSearchTerm or debouncedCategory changes

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const getImageSrc = (imageUrl?: string | File): string => {
    if (typeof imageUrl === "string") {
      return imageUrl;
    }
    // Fallback to a default image if imageUrl is undefined or a File
    return "@/styles/default-image.png"; // Use your default image path here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Daftar Produk</h2>

      {/* Search Bar and Category Filter */}
      <div className="flex justify-between mb-4">
        <SearchBar onSearch={setSearchTerm} />
        <CategoryFilter
          onCategoryChange={setCategory}
          categories={categories} // Add more categories if needed
        />
      </div>

      {/* Table rendering after data is loaded */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Gambar</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Stok</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border p-2">
                  <img
                    src={getImageSrc(product.imageUrl)}
                    alt={product.name}
                    className="w-16 h-16 object-cover mx-auto"
                    loading="lazy" // Lazy load images
                  />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">Rp {product.price.toLocaleString()}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2 flex flex-col justify-center gap-2 whitespace-nowrap">
                  <Link
                    href={`/admin/${product.id}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mb-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 mb-2"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border p-4 text-center text-gray-500">Tidak ada produk.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;