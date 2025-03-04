"use client";

import { useCart } from "../(user)/context/CartContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty. <Link href="/">Go shopping!</Link></p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                    className="w-16 border p-1 rounded"
                  />
                </TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => removeFromCart(item.productId)} className="bg-red-500 text-white">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {cart.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Link href="/checkout">
            <Button className="bg-green-500 text-white">Proceed to Checkout</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
