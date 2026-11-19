import Link from "next/link";
import { fulfilmentLabel, hasPriceRange, lowestPrice, type Product } from "@/lib/catalogue";
import { ksh } from "@/lib/site";
import ProductArt from "./ProductArt";

export default function ProductCard({ product }: { product: Product }) {
  const low = lowestPrice(product);
  return (
    <Link className="card" href={`/product/${product.slug}/`}>
      <ProductArt product={product} />
      <div className="name">{product.name}</div>
      <div className="meta">
        <span className="tag">{fulfilmentLabel(product.fulfilment)}</span>
        <span className="price">{low === undefined ? "Ask us" : (hasPriceRange(product) ? "From " : "") + ksh(low)}</span>
      </div>
    </Link>
  );
}
