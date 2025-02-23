import Link from 'next/link';
import { Product, deleteProduct } from '@/lib/storage';
import Image from 'next/image';

interface ProductListProps {
  products: Product[];
  refreshProducts: () => void; // Tambahkan fungsi refresh
}

export default function ProductList({ products, refreshProducts }: ProductListProps) {
  const handleDelete = (id: string) => {
    if (confirm('Apakah anda yakin ingin menghapus produk ini?')) {
      deleteProduct(id);
      refreshProducts(); // Perbarui produk setelah menghapus
    }
  };

  if (!products || products.length === 0) {
    return <div className="text-gray-500">Kamu belum menjual apa-apa nih.</div>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Foto</th>
          <th className="p-2 border">Nama</th>
          <th className="p-2 border">Harga</th>
          <th className="p-2 border">Stok</th>
          <th className="p-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50">
            <td className="p-2 border">
              <Link href={`/dashboard/products/${product.id}/edit`}>
                <Image
                  src={product.image || '/placeholder.png'} // ✅ Gambar default jika tidak ada
                  alt={product.name}
                  width={64} // ✅ Sesuaikan ukuran gambar
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </Link>
            </td>
            <td className="p-2 border max-w-[200px] truncate">
              <Link href={`/dashboard/products/${product.id}/edit`} className="text-blue-500 md:font-[650]">
                {product.name.length > 29 ? `${product.name.slice(0, 29)}...` : product.name}
              </Link>
            </td>
            <td className="p-2 border">Rp {product.price}</td>
            <td className="p-2 border">{product.stock > 0 ? product.stock : <span className="text-red-500 font-bold">Habis!</span>}</td>
            <td className="p-2 border">
              <button className="text-red-500 hover:underline" onClick={() => handleDelete(product.id)}>
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
