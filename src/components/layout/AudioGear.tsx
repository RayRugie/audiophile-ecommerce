// AudioGear.tsx
import React from 'react';
import Image from 'next/image';
import styles from './AudioGear.module.scss';

export default function AudioGear() {
  return (
    <section className={styles.audioGear}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          BRINGING YOU THE <span className={styles.highlight}>BEST</span> AUDIO GEAR
        </h2>
        <p className={styles.description}>
          Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/headphones/xx99-mark-two-headphones/gallery-1-desktop.png"
          alt="Person wearing headphones"
          fill
          className={styles.image}
        />
      </div>
    </section>
  );
}