export interface Product {
    id: string;
    name: string;
    category: 'Obat-obatan' | 'Vitamin & Suplemen';
    description: string;
    price: number;
    stock: number;
    image?: string;
}

export function getProducts(): Product[] {
    if (typeof window === 'undefined') return []; // Hindari error di SSR
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

export function getProductById(id: string): Product | undefined {
    return getProducts().find((product) => product.id === id);
}

export function saveProduct(product: Product) {
    if (typeof window === 'undefined') return;
    const products = getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Produk berhasil disimpan ke localStorage:', products); // Debugging
}

export function updateProduct(id: string, updatedProduct: Omit<Product, 'id'>): void {
    const products = getProducts().map((product) =>
        product.id === id ? { ...product, ...updatedProduct, id } : product // Pastikan ID tetap sama
    );
    localStorage.setItem('products', JSON.stringify(products));
}


export function deleteProduct(id: string): void {
    const products = getProducts().filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
}  