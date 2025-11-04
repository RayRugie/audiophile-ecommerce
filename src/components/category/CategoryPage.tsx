import Header from '@/components/layout/Header';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import styles from './CategoryPage.module.scss';
import CategoriesSection from '../home/CategoriesSection';
import AudioGear from '../layout/AudioGear';
import Footer from '../layout/Footer';

interface CategoryPageProps {
  category: 'headphones' | 'speakers' | 'earphones';
  products: Product[];
}

export default function CategoryPage({ category, products }: CategoryPageProps) {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.title}>{categoryName}</h1>
          </div>
        </section>

        <section className={styles.products}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        <CategoriesSection />
        <AudioGear />
        <Footer />
      </main>
    </>
  );
}

