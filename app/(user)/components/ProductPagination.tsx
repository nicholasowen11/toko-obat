"use client";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 border rounded-md ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        Prev
      </button>

      <span className="px-4 py-2 border rounded-md">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 border rounded-md ${
          currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}