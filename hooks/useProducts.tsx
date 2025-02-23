import { useState, useEffect } from "react";
import { getProducts, Product } from "@/lib/storage";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(getProducts());
      setLoading(false);
    }, 1500);
  }, []);

  return { products, setProducts, loading };
}
