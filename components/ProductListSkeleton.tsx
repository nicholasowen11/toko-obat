export default function ProductListSkeleton() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

      {/* Search & Filter Skeleton */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2 h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-1/4 h-10 bg-gray-300 animate-pulse rounded"></div>
      </div>

      {/* Table Skeleton */}
      <div className="border border-gray-300 rounded-lg">
        <div className="bg-gray-200 p-3 flex">
          <div className="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
          <div className="w-1/3 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
        </div>
        
        {/* Skeleton Rows */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center border-b border-gray-300 p-3">
            <div className="w-16 h-16 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-1/3 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
            <div className="w-20 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
            <div className="w-20 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
            <div className="w-20 h-6 bg-gray-300 animate-pulse ml-4 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
