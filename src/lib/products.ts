import { Product } from "@/types";
import { convexHttp } from "./convex-server";

/**
 * Get products by category from Convex
 */
export async function getProductsByCategory(
  category: "headphones" | "speakers" | "earphones"
): Promise<Product[]> {
  try {
    if (!convexHttp) {
      console.warn(
        "Convex HTTP client not initialized. Check NEXT_PUBLIC_CONVEX_URL environment variable."
      );
      return [];
    }

    const { api } = await import("../../convex/_generated/api");

    const products = await convexHttp.query(
      api.functions.products.getProductsByCategory,
      { category }
    );
    return products as Product[];
  } catch (error) {
    console.warn("Convex not initialized or error fetching products:", error);
    return [];
  }
}

/**
 * Get all products from Convex
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    if (!convexHttp) {
      console.warn(
        "Convex HTTP client not initialized. Check NEXT_PUBLIC_CONVEX_URL environment variable."
      );
      return [];
    }

    const { api } = await import("../../convex/_generated/api");

    const products = await convexHttp.query(
      api.functions.products.getAllProducts
    );
    
    return products as Product[];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

/**
 * Get product by slug from Convex
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    if (!convexHttp) {
      console.warn(
        "Convex HTTP client not initialized. Check NEXT_PUBLIC_CONVEX_URL environment variable."
      );
      return null;
    }

    const { api } = await import("../../convex/_generated/api");

    const product = await convexHttp.query(
      api.functions.products.getProductBySlug,
      { slug }
    );
    
    return product as Product | null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
