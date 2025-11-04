# Database Reseed Required

## Issue

Your database has products with the old schema where `features` is a string, but your code now expects `features` to be an object with `text1` and `text2` properties.

## Solution: Clear and Reseed

You need to clear your products table and reseed with the new schema.

### Quick Fix (Recommended)

1. Go to **Convex Dashboard** → https://dashboard.convex.dev
2. Navigate to **Functions** tab
3. Find `functions.seed.reseedProducts` ⭐ NEW
4. Click **Run Function** → **Run**
5. Wait for success message: `{"success": true, "deleted": X, "added": 1, ...}`

This does both steps in one go!

### Manual Method (Alternative)

If you prefer to do it manually:

**Step 1: Clear Products**
1. Go to **Functions** tab
2. Find `functions.seed.clearProducts`
3. Click **Run Function** → **Run**
4. Wait for success: `{"success": true, "deleted": X}`

**Step 2: Reseed Products**
1. In the same **Functions** tab
2. Find `functions.seed.seedProducts`
3. Click **Run Function** → **Run**
4. Wait for success: `{"success": true, "added": 1, ...}`

### Step 3: Verify

1. Go to **Data** tab
2. Click on **products** table
3. You should see your product(s)
4. Expand a product to verify `features` has `text1` and `text2` fields

### Alternative: Manual Deletion

If the clear function doesn't work:

1. Go to **Data** tab → **products** table
2. Select all products
3. Click the trash icon or delete button
4. Confirm deletion
5. Then run the seed function

## Why This Happened

The schema was updated from:
```typescript
features: string
```

To:
```typescript
features: {
  text1: string;
  text2: string;
}
```

Existing database records don't match the new schema, causing validation errors.

## After Reseeding

Your product page should now work correctly at:
- `/product/xx99-mark-two-headphones`

## Prevention

If you need to change the schema in the future:
1. Always update both `convex/schema.ts` AND your TypeScript types
2. Clear existing data before deploying schema changes
3. Reseed with the new data structure

