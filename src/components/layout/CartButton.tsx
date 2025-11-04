'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';
import styles from './Header.module.scss';

export default function CartButton() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((v) => !v);

  return (
    <>
      <button
        className={styles.cartButton}
        aria-label="Shopping cart"
        onClick={toggleCart}
      >
        <Image
          src="/images/home/shoppingCart.svg"
          alt="Cart"
          width={23}
          height={20}
        />
        {totalItems > 0 && (
          <span className={styles.cartCount} suppressHydrationWarning>
            {totalItems}
          </span>
        )}
      </button>

      <CartModal isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}


