"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import styles from './Confirmation.module.scss';

export const metadata: Metadata = {
  title: 'Order Confirmed | Audiophile',
  description: 'Your order has been confirmed',
};

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || undefined;
  const grandTotalParam = searchParams.get('grandTotal');
  const grandTotalFromQuery = grandTotalParam ? Number(grandTotalParam) : undefined;

  const { cartItems, clearCart } = useCart();

  type Summary = {
    image: string;
    name: string;
    quantity: number;
    price: number;
    othersCount: number;
    grandTotal?: number;
  };

  const display = useMemo<Summary | null>(() => {
    if (!cartItems || cartItems.length === 0) return null;
    const first = cartItems[0];
    const others = Math.max(0, cartItems.length - 1);
    const total = grandTotalFromQuery ?? cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
    return {
      image: first.image,
      name: first.shortName || first.name,
      quantity: first.quantity,
      price: first.price,
      othersCount: others,
      grandTotal: total,
    };
  }, [cartItems, grandTotalFromQuery]);

  const clearedRef = useRef(false);
  useEffect(() => {
    if (display && !clearedRef.current) {
      clearedRef.current = true;
      try { clearCart(); } catch {}
    }
  }, [display, clearCart]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className={styles.title}>Thank you<br/>for your order</h1>
        <p className={styles.subtitle}>You will receive an email confirmation shortly.</p>
        {orderId && (
          <p className={styles.orderId}>Order ID: {orderId}</p>
        )}

        <div className={styles.summary}>
          <div className={styles.itemsPanel}>
            {display ? (
              <>
                <div className={styles.itemRow}>
                  <div className={styles.itemLeft}>
                    <Image src={display.image} alt={display.name} width={50} height={50} className={styles.thumb} />
                    <div className={styles.itemMeta}>
                      <span className={styles.itemName}>{display.name}</span>
                      <span className={styles.itemPrice}>{formatPrice(display.price)}</span>
                    </div>
                  </div>
                  <span className={styles.qty}>x{display.quantity}</span>
                </div>
                <div className={styles.divider} />
                {display.othersCount > 0 && (
                  <p className={styles.others}>and {display.othersCount} other item(s)</p>
                )}
              </>
            ) : (
              <p className={styles.empty}>Order summary unavailable</p>
            )}
          </div>
          <div className={styles.totalPanel}>
            <span className={styles.totalLabel}>GRAND TOTAL</span>
            <span className={styles.totalValue}>{formatPrice(display?.grandTotal ?? grandTotalFromQuery ?? 0)}</span>
          </div>
        </div>

        <Link href="/" className={styles.cta}>BACK TO HOME</Link>
      </div>
    </div>
  );
}

