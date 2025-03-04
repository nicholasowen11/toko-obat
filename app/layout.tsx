// import { CartProvider } from "./(user)/context/CartContext";
import '@/styles/global.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <CartProvider> */}
          {children}
        {/* </CartProvider> */}
      </body>
    </html>
  );
}