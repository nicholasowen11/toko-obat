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

export default function ProductItem({ products }: { products: Product }) {
  return (
    <Card className="bg-slate-200 text-mx-2">
      <CardHeader>
        <img
          className="object-fill h-48 w-96"
          src={products.imageUrl}
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
      <CardFooter>
        <div className="flex flex-col gap-4">
          <CardDescription>{products.description.slice(0, 120)}</CardDescription>
          <Link href={`/products/${products.id}`}>
            <Button className="bg-slate-400">Read More</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}