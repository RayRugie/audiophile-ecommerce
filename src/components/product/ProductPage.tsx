'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import styles from './ProductPage.module.scss';
import CategoriesSection from '../home/CategoriesSection';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      shortName: product.name,
      price: product.price,
      quantity,
      image: product.categoryImage,
    });
  };
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            Go Back
          </Link>

          <section className={styles.productSection}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.categoryImage}
                alt={product.name}
                fill
                className={styles.productImage}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className={styles.productInfo}>
              {product.new && (
                <span className={styles.newBadge}>NEW PRODUCT</span>
              )}
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>{formatPrice(product.price)}</p>

              <div className={styles.actions}>
                <div className={styles.quantity}>
                  <button 
                    className={styles.quantityBtn}
                    onClick={handleDecreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button 
                    className={styles.quantityBtn}
                    onClick={handleIncreaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button 
                  className={styles.addToCartBtn}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </section>

          <section className={styles.featuresSection}>
            <div className={styles.features}>
              <h2 className={styles.sectionTitle}>FEATURES</h2>
              <div className={styles.featuresText}>
                {product.features.map((feature, index) => (
                  <p key={index} className={styles.featureParagraph}>
                    {feature.text1 || feature.text2}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.includes}>
              <h2 className={styles.sectionTitle}>IN THE BOX</h2>
              <ul className={styles.includesList}>
                {product.includes.map((item, index) => (
                  <li key={index}>
                    <span className={styles.includesQuantity}>
                      {item.quantity}x
                    </span>
                    <span className={styles.includesItem}>
                      {item.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.gallerySection}>
            <div className={styles.galleryImage}>
              <Image
                src={product.gallery.first}
                alt={`${product.name} gallery image 1`}
                fill
                className={styles.galleryImg}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src={product.gallery.second}
                alt={`${product.name} gallery image 2`}
                fill
                className={styles.galleryImg}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src={product.gallery.third}
                alt={`${product.name} gallery image 3`}
                fill
                className={styles.galleryImg}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </section>
        </div>
        <CategoriesSection />
      </main>
    </>
  );
}

