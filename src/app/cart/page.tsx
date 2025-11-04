import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Audiophile',
  description: 'Review your cart items',
};

export default function CartPage() {
  return (
    <div>
      <h1>Your Cart</h1>
      {/* Cart content will go here */}
    </div>
  );
}

