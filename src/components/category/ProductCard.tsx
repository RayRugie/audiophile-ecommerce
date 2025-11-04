import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.categoryImage}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        {product.new && <span className={styles.newBadge}>NEW PRODUCT</span>}
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <Link href={`/product/${product.slug}`} className={styles.link}>
          SEE PRODUCT
        </Link>
      </div>
    </article>
  );
}

