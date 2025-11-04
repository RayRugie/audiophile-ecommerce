import { mutation } from '../_generated/server';
import { v } from 'convex/values';

/**
 * Import products from a JSON array
 * This function accepts an array of products and inserts them into the database
 * 
 * Usage in Convex Dashboard:
 * Run this function with args like:
 * {
 *   "products": [
 *     {
 *       "id": "product-1",
 *       "name": "Product Name",
 *       ... (full product object)
 *     }
 *   ]
 * }
 */
export const importProducts = mutation({
  args: {
    products: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    let added = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const product of args.products) {
      const productAny = product as any;
      try {
        // Validate required fields
        if (!productAny.id || !productAny.name || !productAny.slug || !productAny.category) {
          errors.push(`Invalid product: missing required fields`);
          continue;
        }

        // Check if product already exists
        const existing = await ctx.db
          .query('products')
          .withIndex('by_slug', (q) => q.eq('slug', productAny.slug))
          .first();

        if (existing) {
          skipped++;
          continue;
        }

        // Transform features string into array format
        // Split by sentences (periods followed by space) and create objects
        const featuresText = typeof productAny.features === 'string' ? productAny.features : '';
        const sentences = featuresText.split(/\.\s+/).filter((s: string) => s.trim().length > 0);
        const featuresArray = sentences.length > 0
          ? [
              { text1: sentences[0] + (sentences[0].endsWith('.') ? '' : '.') },
              ...(sentences.length > 1 ? [{ text2: sentences.slice(1).join('. ') + '.' }] : []),
            ]
          : [{ text1: featuresText || '' }];

        // Transform categoryImage - use desktop if object, otherwise use string
        let categoryImage = '';
        if (typeof productAny.categoryImage === 'string') {
          categoryImage = productAny.categoryImage;
        } else if (productAny.categoryImage && typeof productAny.categoryImage === 'object') {
          categoryImage = productAny.categoryImage.desktop || productAny.categoryImage.tablet || productAny.categoryImage.mobile || '';
        }

        // Transform gallery - use desktop if object, otherwise use string
        const getGalleryImage = (galleryItem: any): string => {
          if (typeof galleryItem === 'string') {
            return galleryItem;
          }
          if (galleryItem && typeof galleryItem === 'object') {
            return galleryItem.desktop || galleryItem.tablet || galleryItem.mobile || '';
          }
          return '';
        };

        const gallery = {
          first: getGalleryImage(productAny.gallery?.first || ''),
          second: getGalleryImage(productAny.gallery?.second || ''),
          third: getGalleryImage(productAny.gallery?.third || ''),
        };

        // Prepare product data for insertion
        const productData = {
          id: productAny.id,
          name: productAny.name,
          slug: productAny.slug,
          category: productAny.category,
          categoryImage,
          new: productAny.new,
          price: productAny.price,
          description: productAny.description,
          features: featuresArray,
          includes: productAny.includes,
          gallery,
          others: productAny.others,
        };

        await ctx.db.insert('products', productData);
        added++;
      } catch (error) {
        errors.push(`Failed to add ${productAny.name || 'unknown'}: ${error}`);
      }
    }

    return {
      success: true,
      added,
      skipped,
      errors,
      total: args.products.length,
    };
  },
});

