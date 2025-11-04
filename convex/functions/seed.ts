import { mutation } from '../_generated/server';

// Sample product data - replace with your actual product data
const sampleProducts = [
  {
    id: 'xx99-mark-two-headphones',
    name: 'XX99 Mark II Headphones',
    slug: 'xx99-mark-two-headphones',
    category: 'headphones',
    categoryImage: '/images/headphones/xx99-mark-two-headphones/image.png',
    new: true,
    price: 2999,
    description: 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
    features: [
        { text1: 'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.' },

        { text2: 'The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.' },
    ],
    includes: [
      { quantity: 1, item: 'Headphone unit' },
      { quantity: 2, item: 'Replacement earcups' },
      { quantity: 1, item: 'User manual' },
      { quantity: 1, item: '3.5mm 5m audio cable' },
      { quantity: 1, item: 'Travel bag' },
    ],
    gallery: {
      first: '/images/headphones/xx99-mark-two-headphones/gallery-1-desktop.png',
      second: '/images/headphones/xx99-mark-two-headphones/gallery-2-desktop.png',
      third: '/images/headphones/xx99-mark-two-headphones/gallery-3-desktop.png',
    },
    others: [],
  },
  {
    id: 'xx99-mark-one-headphones',
    name: 'XX99 Mark I Headphones',
    slug: 'xx99-mark-one-headphones',
    category: 'headphones',
    categoryImage: '/images/headphones/xx99-mark-one-headphones/image.png',
    new: false,
    price: 1750,
    description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.',
    features: [
      {
        text1: 'As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.',
        text2: 'From the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is included with a balanced gold connector.'
      }
    ],
    includes: [
      { quantity: 1, item: 'Headphone unit' },
      { quantity: 2, item: 'Replacement earcups' },
      { quantity: 1, item: 'User manual' },
      { quantity: 1, item: '3.5mm 5m audio cable' },
    ],
    gallery: {
      first: '/images/headphones/xx99-mark-one-headphones/gallery-1-desktop.jpg',
      second: '/images/headphones/xx99-mark-one-headphones/gallery-2-desktop.jpg',
      third: '/images/headphones/xx99-mark-one-headphones/gallery-3-desktop.png',
    },
    others: [],
  },
  {
    id: 'xx59-headphones',
    name: 'XX59 Headphones',
    slug: 'xx59-headphones',
    category: 'headphones',
    categoryImage: '/images/headphones/xx59-headphones/image.jpg',
    new: false,
    price: 899,
    description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is brilliant for any use when you want to take your premium audio with you.',
    features: [
      {
        text1: 'These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.',
        text2: 'More than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.'
      }
    ],
    includes: [
      { quantity: 1, item: 'Headphone unit' },
      { quantity: 2, item: 'Replacement earcups' },
      { quantity: 1, item: 'User manual' },
      { quantity: 1, item: '3.5mm 5m audio cable' },
    ],
    gallery: {
      first: '/images/headphones/xx59-headphones/gallery-1-desktop.jpg',
      second: '/images/headphones/xx59-headphones/gallery-2-desktop.jpg',
      third: '/images/headphones/xx59-headphones/gallery-3-desktop.jpg',
    },
    others: [],
  },
  // Earphones
  {
    id: 'yx1-earphones',
    name: 'XY1 Wireless Earphones',
    slug: 'yx1-earphones',
    category: 'earphones',
    categoryImage: '/images/earphones/yx1-earphones/image.jpg',
    new: false,
    price: 599,
    description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
    features: [
      {
        text1: 'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.',
        text2: 'The YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.',
      }
    ],
    includes: [
      { quantity: 2, item: 'Earphone unit' },
      { quantity: 6, item: 'Multi-size Earplugs' },
      { quantity: 1, item: 'User manual' },
      { quantity: 1, item: 'USB-C Charging Cable' },
      { quantity: 1, item: 'Travel Pouch' },
    ],
    gallery: {
      first: '/images/earphones/yx1-earphones/gallery-1-desktop.jpg',
      second: '/images/earphones/yx1-earphones/gallery-2-desktop.jpg',
      third: '/images/earphones/yx1-earphones/gallery-3-desktop.jpg',
    },
    others: [],
  },
  // Speakers
  {
    id: 'zx9-speaker',
    name: 'ZX9 Speaker',
    slug: 'zx9-speaker',
    category: 'speakers',
    categoryImage: '/images/speakers/ZX9-SPEAKER/image-product.jpg',
    new: true,
    price: 4500,
    description: 'Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.',
    features: [
      {
        text1: 'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).',
        text2: 'Discover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.',
      }
    ],
    includes: [
      { quantity: 2, item: 'Speaker unit' },
      { quantity: 2, item: 'Speaker Cloth Panel' },
      { quantity: 1, item: 'User manual' },
      { quantity: 1, item: '3.5mm 10m Audio Cable' },
      { quantity: 1, item: '10m Optical Cable' },
    ],
    gallery: {
      first: '/images/speakers/ZX9-SPEAKER/gallery-1-desktop.jpg',
      second: '/images/speakers/ZX9-SPEAKER/gallery-2-desktop.jpg',
      third: '/images/speakers/ZX9-SPEAKER/gallery-3-desktop.jpg',
    },
    others: [],
  },
  {
    id: 'zx7-speaker',
    name: 'ZX7 Speaker',
    slug: 'zx7-speaker',
    category: 'speakers',
    categoryImage: '/images/speakers/ZX7-SPEAKER/image-product.jpg',
    new: true,
    price: 3500,
    description: 'Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
    features: [
      {
        text1: 'Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.',
        text2: 'The ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.',
      }
    ],
    includes: [
      { quantity: 2, item: 'Speaker unit' },
      { quantity: 2, item: 'Speaker Cloth Panel' },
      { quantity: 1, item: 'User manual' },
      { quantity: 1, item: '3.5mm 7.5m Audio Cable' },
      { quantity: 1, item: '7.5m Optical Cable' },
    ],
    gallery: {
      first: '/images/speakers/ZX7-SPEAKER/gallery-1-desktop.jpg',
      second: '/images/speakers/ZX7-SPEAKER/gallery-2-desktop.jpg',
      third: '/images/speakers/ZX7-SPEAKER/gallery-3-desktop.jpg',
    },
    others: [],
  },
];

/**
 * Seed products into the database
 * Run this function once to populate your database with sample products
 */
export const seedProducts = mutation({
  handler: async (ctx) => {
    let added = 0;
    let skipped = 0;

    for (const product of sampleProducts) {
      // Check if product already exists
      const existing = await ctx.db
        .query('products')
        .withIndex('by_slug', (q) => q.eq('slug', product.slug))
        .first();

      if (existing) {
        skipped++;
        continue;
      }

      await ctx.db.insert('products', product);
      added++;
    }

    return {
      success: true,
      added,
      skipped,
      total: sampleProducts.length,
    };
  },
});

/**
 * Clear all products from the database
 * Use with caution!
 */
export const clearProducts = mutation({
  handler: async (ctx) => {
    const products = await ctx.db.query('products').collect();
    
    for (const product of products) {
      await ctx.db.delete(product._id);
    }

    return {
      success: true,
      deleted: products.length,
    };
  },
});

/**
 * Clear and reseed products with new schema
 * Use this when you've updated the schema
 */
export const reseedProducts = mutation({
  handler: async (ctx) => {
    // First clear all products
    const products = await ctx.db.query('products').collect();
    for (const product of products) {
      await ctx.db.delete(product._id);
    }

    // Then seed with new data
    let added = 0;
    let skipped = 0;

    for (const product of sampleProducts) {
      const existing = await ctx.db
        .query('products')
        .withIndex('by_slug', (q) => q.eq('slug', product.slug))
        .first();

      if (existing) {
        skipped++;
        continue;
      }

      await ctx.db.insert('products', product);
      added++;
    }

    return {
      success: true,
      deleted: products.length,
      added,
      skipped,
      total: sampleProducts.length,
    };
  },
});

