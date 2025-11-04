import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/product/ProductPage";
import { getProductBySlug } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Audiophile",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.name} | Audiophile`,
    description: product.description,
  };
}

export default async function ProductPageRoute({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
