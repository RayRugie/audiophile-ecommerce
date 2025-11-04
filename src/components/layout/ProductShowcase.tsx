// ProductShowcase.tsx
import React from 'react';
import Image from 'next/image';
import styles from './ProductShowcase.module.scss';

interface Product {
  id: string;
  name: string;
  description?: string;
  image: string;
  bgColor: string;
  layout: 'left' | 'right';
}

const products: Product[] = [
  {
    id: '1',
    name: 'ZX9 SPEAKER',
    description: 'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
    image: '/images/speakers/ZX9-SPEAKER/image.png',
    bgColor: '#d87d4a',
    layout: 'left'
  },
  {
    id: '2',
    name: 'ZX7 SPEAKER',
    image: '/images/speakers/ZX7-SPEAKER/image-speaker-zx7.jpg',
    bgColor: '#f1f1f1',
    layout: 'left'
  },
  {
    id: '3',
    name: 'YX1 EARPHONES',
    image: '/images/earphones/yx1-earphones/image-earphones-yx1.jpg',
    bgColor: '#f1f1f1',
    layout: 'right'
  }
];

export default function ProductShowcase() {
  return (
    <div className={styles.showcase}>
      {products.map((product, index) => {
        if (index === 2) {
          // Special layout for card 3
          return (
            <div key={product.id} className={`${styles.card} ${styles.card3}`}>
              <div className={styles.imageCard}>
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.contentCard} style={{ backgroundColor: product.bgColor }}>
                <h2 className={styles.title}>{product.name}</h2>
                <button className={styles.button}>SEE PRODUCT</button>
              </div>
            </div>
          );
        }
        
        return (
          <div
            key={product.id}
            className={`${styles.card} ${styles[`card${index + 1}`]} ${styles[product.layout]}`}
            style={{ backgroundColor: product.bgColor }}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{product.name}</h2>
              {product.description && (
                <p className={styles.description}>{product.description}</p>
              )}
              <button className={styles.button}>SEE PRODUCT</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}