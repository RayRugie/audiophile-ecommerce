# Convex Setup Guide

## Step 1: Install Convex CLI (if not already installed)

```bash
npm install -g convex
```

## Step 2: Initialize Convex

```bash
npx convex dev
```

This will:
- Create a `convex.json` file
- Generate the `convex/_generated` folder
- Ask you to sign up/login to Convex
- Create a deployment URL

## Step 3: Set Environment Variables

After running `npx convex dev`, copy the deployment URL and add it to your `.env.local` file:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud
```

## Step 4: Add Sample Product Data

You can add products to Convex in two ways:

### Option A: Using Convex Dashboard
1. Go to https://dashboard.convex.dev
2. Navigate to your deployment
3. Go to "Data" tab
4. Click on "products" table
5. Add products manually using the UI

### Option B: Using a Seed Script

Create `convex/seed.ts`:

```typescript
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const seedProducts = mutation({
  handler: async (ctx) => {
    const products = [
      {
        id: 'xx99-mark-two-headphones',
        name: 'XX99 Mark II Headphones',
        slug: 'xx99-mark-two-headphones',
        category: 'headphones',
        categoryImage: {
          mobile: '/images/headphones/xx99-mark-two-headphones/mobile.jpg',
          tablet: '/images/headphones/xx99-mark-two-headphones/tablet.jpg',
          desktop: '/images/headphones/xx99-mark-two-headphones/desktop.jpg',
        },
        new: true,
        price: 2999,
        description: 'The new XX99 Mark II headphones is the pinnacle of pristine audio.',
        features: 'Featuring a genuine leather head strap and premium earcups...',
        includes: [
          { quantity: 1, item: 'Headphone unit' },
          { quantity: 2, item: 'Replacement earcups' },
          { quantity: 1, item: 'User manual' },
          { quantity: 1, item: '3.5mm 5m audio cable' },
        ],
        gallery: {
          first: {
            mobile: '/images/products/xx99-mark-two-headphones/gallery-1-mobile.jpg',
            tablet: '/images/products/xx99-mark-two-headphones/gallery-1-tablet.jpg',
            desktop: '/images/products/xx99-mark-two-headphones/gallery-1-desktop.jpg',
          },
          second: {
            mobile: '/images/products/xx99-mark-two-headphones/gallery-2-mobile.jpg',
            tablet: '/images/products/xx99-mark-two-headphones/gallery-2-tablet.jpg',
            desktop: '/images/products/xx99-mark-two-headphones/gallery-2-desktop.jpg',
          },
          third: {
            mobile: '/images/products/xx99-mark-two-headphones/gallery-3-mobile.jpg',
            tablet: '/images/products/xx99-mark-two-headphones/gallery-3-tablet.jpg',
            desktop: '/images/products/xx99-mark-two-headphones/gallery-3-desktop.jpg',
          },
        },
        others: [],
      },
      // Add more products...
    ];

    for (const product of products) {
      await ctx.db.insert('products', product);
    }

    return { success: true, count: products.length };
  },
});
```

Then run in Convex dashboard Functions tab, or add a button in your admin panel.

## Step 5: Verify Connection

1. Make sure `npx convex dev` is running in a terminal
2. Check that `convex/_generated/api.ts` exists
3. Restart your Next.js dev server: `npm run dev`
4. Visit `/category/headphones` - it should now fetch data from Convex

## Troubleshooting

### Error: "Cannot find module '../../convex/_generated/api'"
- Run `npx convex dev` first to generate the API files
- Make sure Convex is running in the background

### Error: "Missing NEXT_PUBLIC_CONVEX_URL"
- Add the URL to `.env.local`
- Restart your dev server after adding it

### Products not showing?
- Check Convex dashboard to see if products exist
- Check browser console for errors
- Verify your schema matches the Product type in `src/types/index.d.ts`

