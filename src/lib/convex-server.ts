import { ConvexHttpClient } from 'convex/browser';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Create a Convex HTTP client for server-side queries
// If URL is not provided, queries will fail gracefully
export const convexHttp = convexUrl ? new ConvexHttpClient(convexUrl) : null;

