'use client';

import { useRouter } from 'next/navigation';
import { useProductForm } from '@/hooks/useProductForm';
import { Product, saveProduct, updateProduct } from '@/lib/storage'; // ✅ Pastikan updateProduct diimport

interface ProductFormProps {
  onSubmit: (data: Omit<Product, 'id'>) => void;
  initialData?: Product;
  isEditing?: boolean;
}

export default function ProductForm({ onSubmit, initialData, isEditing }: ProductFormProps) {
  const router = useRouter();
  const { formData, errors, handleChange, handleImageUpload, removeImage, validateForm, setErrors } =
    useProductForm(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newProduct: Product = {
        id: isEditing ? initialData!.id : crypto.randomUUID(), // ✅ Gunakan ID lama jika edit
        ...formData,
      };

      if (isEditing) {
        updateProduct(newProduct.id, newProduct); // ✅ Update produk jika sedang edit
      } else {
        saveProduct(newProduct); // ✅ Simpan produk baru jika sedang buat produk
      }

      router.push('/dashboard/products');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">{isEditing ? 'Edit Produk' : 'Tambah Produk'}</h2>

        <form onSubmit={handleSubmit}>
          {/* INFORMASI PRODUK */}
          <div className="border p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Informasi Produk</h3>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Nama Produk</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Produk"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Kategori</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Pilih Kategori</option>
                <option value="Obat-obatan">Obat-obatan</option>
                <option value="Vitamin & Suplemen">Vitamin & Suplemen</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
          </div>

          {/* DETAIL PRODUK */}
          <div className="border p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Detail Produk</h3>

            {/* DESKRIPSI PRODUK ✅ Tetap Ada */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan Deskripsi Produk"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={5}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* UPLOAD FOTO PRODUK */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Foto Produk</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-gray-300 rounded-lg" />
              {formData.image && (
                <div className="mt-4 flex items-center">
                  <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-lg" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="ml-4 bg-red-500 text-white text-xs px-3 py-2 rounded shadow hover:bg-red-600 transition-all"
                  >
                    Hapus
                  </button>
                </div>
              )}
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">Harga Satuan</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Masukkan Harga"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Masukkan Stok"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4">
            <button type="button" className="border border-gray-400 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => router.back()}>
              Batal
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
