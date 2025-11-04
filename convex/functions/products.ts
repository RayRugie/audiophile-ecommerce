import { v } from 'convex/values';
import { query } from '../_generated/server';

export const getAllProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query('products').collect();
  },
});

export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first();
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .withIndex('by_category', (q) => q.eq('category', args.category))
      .collect();
  },
});

