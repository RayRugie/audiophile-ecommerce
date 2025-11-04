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
    products: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        slug: v.string(),
        category: v.string(),
        categoryImage: v.string(),
        new: v.boolean(),
        price: v.number(),
        description: v.string(),
        features: v.string(),
        includes: v.array(
          v.object({
            quantity: v.number(),
            item: v.string(),
          })
        ),
        gallery: v.object({
          first: v.string(),
          second: v.string(),
          third: v.string(),
        }),
        others: v.array(
          v.object({
            slug: v.string(),
            name: v.string(),
            image: v.string(),
          })
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    let added = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const product of args.products) {
      try {
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
      } catch (error) {
        errors.push(`Failed to add ${product.name}: ${error}`);
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

