import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  orders: defineTable({
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
    createdAt: v.number(),
  })
    .index('by_order_id', ['orderId'])
    .index('by_email', ['shippingAddress.email']),

  products: defineTable({
    id: v.string(),
    name: v.string(),
    slug: v.string(),
    category: v.string(), // 'headphones' | 'speakers' | 'earphones'
    categoryImage: v.string(),
    new: v.boolean(),
    price: v.number(),
    description: v.string(),
    features: v.array(
      v.object({
        text1: v.optional(v.string()),
        text2: v.optional(v.string()),
      })
    ),
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
    .index('by_category', ['category'])
    .index('by_slug', ['slug']),
});

