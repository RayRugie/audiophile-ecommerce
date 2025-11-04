# Audiophile E-commerce Setup Guide

## ✅ Setup Complete

All code is properly configured. Follow these steps to get your site running:

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Convex account (free at https://convex.dev)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

1. Sign up at https://convex.dev
2. Run Convex setup:
   ```bash
   npx convex dev
   ```
3. This will:
   - Create a new Convex project
   - Generate required files
   - Open browser for authentication
   - Add `NEXT_PUBLIC_CONVEX_URL` to `.env.local`

### 3. Seed Products

After Convex is set up, seed your database:

1. Go to https://dashboard.convex.dev
2. Select your deployment
3. Navigate to **Functions** tab
4. Find `functions.seed.seedProducts`
5. Click **Run Function** → **Run**
6. Wait for success message: `{"success": true, "added": 1, ...}`

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
audiophile-ecommerce/
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── product/[slug]/    # Dynamic product pages
│   │   ├── category/[slug]/   # Dynamic category pages
│   │   └── ...
│   ├── components/             # React components
│   │   ├── product/           # Product components
│   │   ├── category/          # Category components
│   │   ├── layout/            # Header, Footer
│   │   └── ...
│   ├── lib/                   # Utilities & helpers
│   │   ├── products.ts        # Product queries
│   │   ├── convex-server.ts   # Convex HTTP client
│   │   └── ...
│   ├── styles/                # Global SCSS
│   └── types/                 # TypeScript types
├── convex/                    # Convex backend
│   ├── schema.ts              # Database schema
│   └── functions/             # Convex functions
│       ├── products.ts        # Product queries
│       ├── orders.ts          # Order mutations
│       └── seed.ts            # Seed function
└── public/                    # Static assets

```

## Environment Variables

Your `.env.local` should have:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

Generated automatically by `npx convex dev`

## Available Routes

- `/` - Home page
- `/product/[slug]` - Product detail page
- `/category/headphones` - Headphones category
- `/category/speakers` - Speakers category
- `/category/earphones` - Earphones category
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/confirmation` - Order confirmation

## API Structure

### Convex Functions

- **Queries** (read-only):
  - `functions.products.getAllProducts` - Get all products
  - `functions.products.getProductBySlug` - Get product by slug
  - `functions.products.getProductsByCategory` - Get products by category

- **Mutations** (read-write):
  - `functions.seed.seedProducts` - Seed products database
  - `functions.orders.saveOrder` - Save new order

## Troubleshooting

### Products not showing?

1. **Check Convex is running**: `npx convex dev` should be running
2. **Verify seed ran**: Check Convex Dashboard → Data → products table
3. **Check environment**: Verify `NEXT_PUBLIC_CONVEX_URL` in `.env.local`
4. **Restart dev server**: `npm run dev`

### 404 on product pages?

- Make sure product exists in Convex database
- Check slug matches exactly (case-sensitive)
- Verify Convex queries are working

### Database empty?

Run the seed function again:
1. Convex Dashboard → Functions
2. Run `seedProducts`
3. Should show `"added": 1`

## Development

### Adding New Products

Edit `convex/functions/seed.ts` and add to `sampleProducts` array, then run seed function.

### Modifying Schema

Edit `convex/schema.ts` - Convex will automatically sync changes when `npx convex dev` is running.

### Styling

- Global styles: `src/styles/`
- SCSS variables: `src/styles/_variables.scss`
- Mixins: `src/styles/_mixins.scss`

## Production Deployment

1. Deploy to Vercel (recommended):
   ```bash
   vercel
   ```

2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CONVEX_URL`

3. Your Convex deployment is already production-ready!

## Need Help?

- Check Convex docs: https://docs.convex.dev
- Next.js docs: https://nextjs.org/docs
- Check this project's `README.md` for more info

## Current Features

✅ Dynamic product pages  
✅ Category pages  
✅ Convex database integration  
✅ Server-side rendering (Next.js 16)  
✅ TypeScript support  
✅ SCSS styling  
✅ Responsive design  
✅ Image optimization  

## Next Steps

- [ ] Add cart functionality
- [ ] Implement checkout flow
- [ ] Add payment integration
- [ ] Add product search
- [ ] Add filters and sorting
- [ ] Add user authentication
- [ ] Add product reviews

