
export default function SearchBar({ setSearchQuery, initialValue }: { setSearchQuery: (query: string) => void, initialValue: string }) {
    return (
      <input
        type="text"
        placeholder="Cari produk..."
        value={initialValue} // Supaya input tetap sesuai dengan URL
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full"
      />
    );
  }
  