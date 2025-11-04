import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Order Confirmed | Audiophile',
  description: 'Your order has been confirmed',
};

export default function ConfirmationPage() {
  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been confirmed and you will receive an email confirmation shortly.</p>
      <Link href="/">Back to Home</Link>
      {/* Order details will go here */}
    </div>
  );
}

