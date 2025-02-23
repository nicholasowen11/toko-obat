import { useState, ChangeEvent } from 'react';
import { Product } from '@/lib/storage';

export function useProductForm(initialData?: Product) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: initialData?.name || '',
    category: initialData?.category || 'Obat-obatan',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    image: initialData?.image || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ✅ Sekarang menangani input, select, dan textarea
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (formData.name.length < 25 || formData.name.length > 255) {
      newErrors.name = 'Nama produk harus antara 25-255 karakter.';
    }
    if (!formData.category) {
      newErrors.category = 'Kategori harus dipilih.';
    }
    if (formData.description.length < 260 || formData.description.length > 5000) {
      newErrors.description = 'Deskripsi harus antara 260-5000 karakter.';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Harga harus lebih dari 0.';
    }
    if (formData.stock < 0) {
      newErrors.stock = 'Stok tidak boleh negatif.';
    }
    if (!formData.image) {
      newErrors.image = 'Foto produk wajib diunggah.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    handleImageUpload,
    removeImage,
    validateForm,
    setErrors,
  };
}
