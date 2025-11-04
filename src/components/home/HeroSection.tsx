import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Content */}
          <div className={styles.textContent}>
            <p className={styles.newProduct}>NEW PRODUCT</p>
            
            <h1 className={styles.title}>
              XX99 MARK II
              <br />
              HEADPHONES
            </h1>
            
            <p className={styles.description}>
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            
            <Link href="/product/xx99-mark-two-headphones" className={styles.cta}>
              SEE PRODUCT
            </Link>
          </div>
          
          {/* Right Content - Headphones Image */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image 
                src="/images/home/Bitmap.png" 
                alt="XX99 Mark II Headphones"
                width={600}
                height={600}
                priority
                className={styles.headphones}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background pattern overlay */}
      <div className={styles.bgPattern} />
    </section>
  );
}
