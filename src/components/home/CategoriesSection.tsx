import Link from 'next/link';
import Image from 'next/image';
import styles from './CategoriesSection.module.scss';

export default function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: 'HEADPHONES',
      image: '/images/home/headphoneSection.svg',
      link: '/category/headphones'
    },
    {
      id: 2,
      name: 'SPEAKERS',
      image: '/images/home/speakerSection.svg',
      link: '/category/speakers'
    },
    {
      id: 3,
      name: 'EARPHONES',
      image: '/images/home/earphonesSection.svg',
      link: '/category/earphones'
    }
  ];

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={220}
                  height={200}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.title}>{category.name}</h3>
              <Link href={category.link} className={styles.shopLink}>
                <span>SHOP</span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.322 1l5 5-5 5"
                    stroke="#D87D4A"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}