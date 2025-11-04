"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Order Confirmed | Audiophile',
  description: 'Your order has been confirmed',
};

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || undefined;
  const grandTotalParam = searchParams.get('grandTotal');
  const grandTotal = grandTotalParam ? Number(grandTotalParam) : undefined;

  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful order
    try {
      clearCart();
    } catch {}
  }, [clearCart]);

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
      <div style={{
        background: '#fff',
        borderRadius: 8,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        marginBottom: 24,
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Thank you for your order!</h1>
        <p style={{ color: '#6b7280', marginBottom: 16 }}>Your order has been confirmed and you will receive an email confirmation shortly.</p>
        {orderId && (
          <p style={{ fontWeight: 600, marginBottom: 8 }}>Order ID: {orderId}</p>
        )}
        {typeof grandTotal === 'number' && !Number.isNaN(grandTotal) && (
          <p style={{ color: '#111827' }}>Grand Total: ${grandTotal.toFixed(2)}</p>
        )}
      </div>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          background: '#D87D4A',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: 6,
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

