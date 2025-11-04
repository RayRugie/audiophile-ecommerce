import { v } from 'convex/values';
import { mutation } from '../_generated/server';

export const saveOrder = mutation({
  args: {
    orderId: v.string(),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    shippingAddress: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    paymentDetails: v.object({
      method: v.string(),
      eMoneyNumber: v.optional(v.string()),
      eMoneyPin: v.optional(v.string()),
    }),
    total: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.insert('orders', {
      orderId: args.orderId,
      items: args.items,
      shippingAddress: args.shippingAddress,
      paymentDetails: args.paymentDetails,
      total: args.total,
      shipping: args.shipping,
      vat: args.vat,
      grandTotal: args.grandTotal,
      createdAt: Date.now(),
    });

    return order;
  },
});

export const getOrderById = mutation({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('orders')
      .withIndex('by_order_id', (q) => q.eq('orderId', args.orderId))
      .first();
  },
});

export const getOrdersByEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('orders')
      .withIndex('by_email', (q) => q.eq('shippingAddress.email', args.email))
      .collect();
  },
});

