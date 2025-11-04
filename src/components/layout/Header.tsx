'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartButton from './CartButton';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            {/* Mobile Menu Button */}
            <button 
              className={styles.hamburger}
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Logo */}
            <Link href="/" className={styles.logo} onClick={closeMenu}>
              <Image 
                src="/images/home/audiophile.svg" 
                alt="audiophile"
                width={143}
                height={25}
                priority
              />
            </Link>

            {/* Navigation */}
            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
              <ul className={styles.navList}>
                <li>
                  <Link href="/" className={styles.navLink} onClick={closeMenu}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="/category/headphones" className={styles.navLink} onClick={closeMenu}>
                    HEADPHONES
                  </Link>
                </li>
                <li>
                  <Link href="/category/speakers" className={styles.navLink} onClick={closeMenu}>
                    SPEAKERS
                  </Link>
                </li>
                <li>
                  <Link href="/category/earphones" className={styles.navLink} onClick={closeMenu}>
                    EARPHONES
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Cart */}
            <CartButton />
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMenu}
        />
      )}
    </>
  );
}