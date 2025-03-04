import { Product } from "@/types";
import ProductItem from "./ProductItem";
import React from "react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ProductList({ products }: { products: any }) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 ">
      {products.map((product: Product) => {
        return (
          <div key={product.id}>
            <ProductItem products={product} />
          </div>
        );
      })}
    </div>
  );
}