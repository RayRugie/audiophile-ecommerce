import type { Metadata } from "next";
import { CartProvider } from '@/context/CartContext';
import "./globals.scss";

export const metadata: Metadata = {
  title: "Audiophile - Premium Audio Equipment",
  description: "Shop the finest premium audio equipment for true audio enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
