import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPage from '@/components/category/CategoryPage';
import { CATEGORIES } from '@/lib/constants';
import { getProductsByCategory } from '@/lib/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return {
    title: `${categoryName} | Audiophile`,
    description: `Browse our premium ${slug} collection`,
  };
}

// In Next.js 16, params is a Promise, so we need to await it
export default async function CategoryPageRoute({ params }: Props) {
  const { slug } = await params;
  
  // Validate category slug
  const validCategories = Object.values(CATEGORIES);
  if (!validCategories.includes(slug as typeof CATEGORIES[keyof typeof CATEGORIES])) {
    notFound();
  }

  const category = slug as 'headphones' | 'speakers' | 'earphones';
  
  // Fetch products for the category
  const products = await getProductsByCategory(category);

  return <CategoryPage category={category} products={products} />;
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  return Object.values(CATEGORIES).map((slug) => ({
    slug,
  }));
}
