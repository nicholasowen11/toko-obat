import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Call the parent function to pass the search term
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchTerm}
        onChange={handleChange}
        className="border p-2 rounded-md w-64"
      />
    </div>
  );
};

export default SearchBar;