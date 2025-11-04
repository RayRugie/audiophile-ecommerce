# How to Add Products to Your Database

## Method 1: Using the Seed Script (Recommended for Initial Setup)

### Step 1: Edit the Seed Data
Open `convex/functions/seed.ts` and add your product data to the `sampleProducts` array.

### Step 2: Run the Seed Function

**Option A: Using Convex Dashboard**
1. Go to https://dashboard.convex.dev
2. Select your deployment
3. Go to the "Functions" tab
4. Find and click on `functions.seed.seedProducts`
5. Click "Run Function"
6. Click "Run" button

**Option B: Using Convex CLI** (if available)
```bash
npx convex run functions.seed.seedProducts
```

## Method 2: Add Products via Convex Dashboard

1. Go to https://dashboard.convex.dev
2. Select your deployment
3. Go to the "Data" tab
4. Click on "products" table
5. Click "Add Document"
6. Fill in all the fields matching your schema:

```json
{
  "id": "your-product-id",
  "name": "Product Name",
  "slug": "product-slug",
  "category": "headphones", // or "speakers" or "earphones"
  "categoryImage": {
    "mobile": "/images/category/mobile.jpg",
    "tablet": "/images/category/tablet.jpg",
    "desktop": "/images/category/desktop.jpg"
  },
  "new": true,
  "price": 2999,
  "description": "Product description here",
  "features": "Product features here",
  "includes": [
    { "quantity": 1, "item": "Item name" }
  ],
  "gallery": {
    "first": {
      "mobile": "/images/gallery/first-mobile.jpg",
      "tablet": "/images/gallery/first-tablet.jpg",
      "desktop": "/images/gallery/first-desktop.jpg"
    },
    "second": {
      "mobile": "/images/gallery/second-mobile.jpg",
      "tablet": "/images/gallery/second-tablet.jpg",
      "desktop": "/images/gallery/second-desktop.jpg"
    },
    "third": {
      "mobile": "/images/gallery/third-mobile.jpg",
      "tablet": "/images/gallery/third-tablet.jpg",
      "desktop": "/images/gallery/third-desktop.jpg"
    }
  },
  "others": []
}
```

## Method 3: Create Products from a Local JSON File

### Step 1: Create a products.json file
Create `data/products.json` with your products:

```json
[
  {
    "id": "product-1",
    "name": "Product Name",
    "slug": "product-slug",
    "category": "headphones",
    "categoryImage": {
      "mobile": "/images/path/mobile.jpg",
      "tablet": "/images/path/tablet.jpg",
      "desktop": "/images/path/desktop.jpg"
    },
    "new": true,
    "price": 2999,
    "description": "Description",
    "features": "Features",
    "includes": [
      { "quantity": 1, "item": "Item" }
    ],
    "gallery": {
      "first": {
        "mobile": "/images/gallery/1-mobile.jpg",
        "tablet": "/images/gallery/1-tablet.jpg",
        "desktop": "/images/gallery/1-desktop.jpg"
      },
      "second": {
        "mobile": "/images/gallery/2-mobile.jpg",
        "tablet": "/images/gallery/2-tablet.jpg",
        "desktop": "/images/gallery/2-desktop.jpg"
      },
      "third": {
        "mobile": "/images/gallery/3-mobile.jpg",
        "tablet": "/images/gallery/3-tablet.jpg",
        "desktop": "/images/gallery/3-desktop.jpg"
      }
    },
    "others": []
  }
]
```

### Step 2: Update the seed.ts file
Import and use your JSON file in `convex/functions/seed.ts`

## Quick Tips

- **Product IDs**: Use kebab-case (e.g., `xx99-mark-two-headphones`)
- **Slugs**: Should match your product IDs (used in URLs)
- **Images**: Place images in `public/images/` and reference them with paths starting with `/`
- **Price**: Store in cents (e.g., $29.99 = 2999)
- **Category**: Must be exactly `"headphones"`, `"speakers"`, or `"earphones"`

## Verify Products Are Added

1. Check the Convex Dashboard Data tab
2. Visit your category pages: `/category/headphones`, `/category/speakers`, etc.
3. Products should appear automatically!

## Need to Clear Products?

Run the `clearProducts` function from the Convex Dashboard to delete all products and start fresh.

