"use client";
import { categories } from "@/types";

interface ProductFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function ProductFilter({
  selectedCategory,
  onSelectCategory,
}: ProductFilterProps) {
  return (
    <div className="mb-4 flex justify-start mt-10 lg:px-10 px-5">
      <select
        value={selectedCategory || ""}
        onChange={(e) => onSelectCategory(e.target.value || null)}
        className="border p-2 rounded-md"
      >
        <option value="">Semua Kategori</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}