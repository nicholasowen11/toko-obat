export interface Product {
  id: string;
  name: string;
  category: string; // Menggunakan string agar fleksibel dengan `categories`
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdBy: string; // ID Admin yang menambahkan produk
}

export const categories = [
"Obat-obatan",
"Vitamin & Suplemen",
];

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number; // Untuk validasi stok
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
}

export const orderStatus = [
  "pending",
  "paid", 
  "shipped", 
  "completed"
]