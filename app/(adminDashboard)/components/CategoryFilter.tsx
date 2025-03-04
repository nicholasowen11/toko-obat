import { useState } from "react";

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category); // Pass selected category to parent component
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border p-2 rounded-md"
      >
        <option value="">Semua Kategori</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;