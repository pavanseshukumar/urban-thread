import { products } from "@/src/data/products";
import EmptyState from "@/src/components/ui/EmptyState";
import ProductDetail from "./ProductDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main>
        <EmptyState
          icon="&#128683;"
          title="Product Not Found"
          description="The product you're looking for doesn't exist or may have been removed."
          actionLabel="Back to Shop"
          actionHref="/products"
        />
      </main>
    );
  }

  return <ProductDetail product={product} />;
}
