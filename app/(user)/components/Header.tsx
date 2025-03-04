"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";

export default function Header() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Store
        </Link>

        {/* Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/products" className="text-gray-700 hover:text-blue-500">
            Products
          </Link>
          <Link href="/cart">
            <Button className="relative bg-yellow-500 text-white px-4 py-2 rounded-lg shadow">
              🛒 Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
            Login
          </Button>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-3">
          <Link href="/products" className="block text-gray-700 hover:text-blue-500">
            Products
          </Link>
          <Link href="/cart">
            <Button className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg shadow">
              🛒 Cart
              {cart.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          SignOut
        </div>
      )}
    </header>
  );
}
