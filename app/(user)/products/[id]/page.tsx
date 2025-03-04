"use client";

import { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "../../context/CartContext"; // Pastikan CartContext sudah ada

export default function ProductItem({ products }: { products: Product }) {
  const { addToCart } = useCart(); // Gunakan fungsi addToCart dari CartContext
  const imageUrl = products.imageUrl || "/path/to/default-image.png";

  return (
    <Card className="bg-slate-200 text-mx-2">
      <CardHeader>
        <Image
          className="object-fill h-48 w-96"
          src={imageUrl}
          height={300}
          width={500}
          alt={products.name}
        />
      </CardHeader>
      <CardContent>
        <div className="bg-slate-400 p-2 mx-2 text-center rounded-md">
          <CardTitle className="flex items-center text-lg">
            {products.name}
          </CardTitle>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <CardDescription>{products.description.slice(0, 120)}</CardDescription>
        <div className="flex justify-between w-full">
          <Link href={`/products/${products.id}`}>
            <Button className="bg-slate-400">Read More</Button>
          </Link>
          <Button 
            className="bg-blue-500 text-white"
            onClick={() => addToCart(products)}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}