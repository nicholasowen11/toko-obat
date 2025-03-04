"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product, categories } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/supabase/storage"; // Pastikan ini adalah path yang benar

export default function ProductForm({
  productData,
  onSubmit,
  adminId,
  isEditMode,
}: {
  productData?: Product;
  onSubmit: (data: Product, adminId: string, productId?: string) => void;
  adminId: string;
  isEditMode?: boolean;
}) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(productData?.imageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: productData
      ? { ...productData, imageUrl: productData.imageUrl || "" }
      : {
          name: "",
          category: categories[0],
          description: "",
          price: 0,
          stock: 0,
          imageUrl: "", // Default ke string kosong
        },
  });

  // Handle image change and update the imageUrl field
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Membuat preview gambar sementara
      setPreviewImage(imageUrl); // Menyimpan URL untuk preview
      setImageFile(file); // Menyimpan file untuk upload
    }
  };

  const router = useRouter();

  const handleFormSubmit: SubmitHandler<Product> = async (data) => {
    try {
      // Validasi jika gambar belum diupload atau imageUrl kosong
      if (!imageFile) {
        throw new Error("Gambar produk wajib dipilih.");
      }

      // Validasi ekstensi file yang diupload
      const fileExt = imageFile.name.split(".").pop();
      const validExtensions = ["jpeg", "jpg", "png", "webp"];
      if (!fileExt || !validExtensions.includes(fileExt.toLowerCase())) {
        throw new Error("Ekstensi file tidak valid. Gunakan gambar dengan ekstensi jpeg, jpg, png, atau webp.");
      }

      // Upload gambar ke Supabase dan dapatkan URL gambar
      const uploadedImageUrl = await uploadImage(imageFile, "products"); // Sesuaikan folder di Supabase
      data.imageUrl = uploadedImageUrl; // Set URL gambar ke data produk

      await onSubmit(data, adminId, productData?.id); // Panggil onSubmit untuk menambahkan produk
      console.log("Product added successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error);
        alert("Failed to add product: " + error.message); // Menampilkan pesan error
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Informasi Produk Card */}
      <div className="card p-6 mb-4 w-1/2 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Informasi Produk</h2>
        <div>
          <Label htmlFor="name" className="font-semibold">
            Nama Produk
          </Label>
          <input
            type="text"
            {...register("name", {
              required: "Nama produk wajib diisi",
              minLength: { value: 25, message: "Nama produk harus terdiri dari minimal 25 karakter" },
              maxLength: { value: 255, message: "Nama produk maksimal 255 karakter" },
            })}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mt-4">
          <Label htmlFor="category" className="font-semibold">
            Kategori Produk
          </Label>
          <select
            {...register("category")}
            className="border p-2 rounded w-full cursor-pointer"
            disabled={isEditMode}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Detail Produk Card */}
      <div className="card p-6 w-1/2 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Detail Produk</h2>
        <div>
          <Label htmlFor="description" className="font-semibold">
            Deskripsi Produk
          </Label>
          <textarea
            {...register("description", {
              required: "Deskripsi produk wajib diisi",
              minLength: { value: 260, message: "Deskripsi produk harus terdiri dari minimal 260 karakter" },
              maxLength: { value: 5000, message: "Deskripsi produk maksimal 5000 karakter" },
            })}
            className="border p-2 rounded w-full"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mt-4">
          <Label htmlFor="price" className="font-semibold">
            Harga
          </Label>
          <input
            type="number"
            {...register("price", { required: "Harga produk wajib diisi", min: { value: 1, message: "Harga minimal adalah 1" } })}
            className="border p-2 rounded w-full"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div className="mt-4">
          <Label htmlFor="stock" className="font-semibold">
            Stok
          </Label>
          <input
            type="number"
            {...register("stock", { required: "Stok produk wajib diisi", min: { value: 1, message: "Stok minimal adalah 1" } })}
            className="border p-2 rounded w-full"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>

        {/* Gambar Produk */}
        <div className="mt-4">
          <Label htmlFor="imageUrl" className="font-semibold">
            Upload Gambar Produk
          </Label>
          <input
            type="file"
            accept="image/*"
            {...register("imageUrl", {
              required: "Gambar produk wajib dipilih",
            })}
            className="border p-2 rounded w-full"
            onChange={handleImageChange}
          />
          {previewImage && typeof previewImage === "string" && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Gambar Saat Ini:</p>
              <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover border rounded" />
            </div>
          )}
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <Button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Simpan
        </Button>
        <Button type="button" onClick={() => router.push("/admin")} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
          Batal
        </Button>
      </div>
    </form>
  );
}