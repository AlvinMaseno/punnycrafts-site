import { getCategory, type Product } from "@/lib/catalogue";

// Shows the product photo when one exists, otherwise a coloured tile carrying the product name.
// To add a photo: put the file in public/products/ and set `image` on the product in data/products.ts.
export default function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  const cat = getCategory(product.category);
  if (product.image) {
    return (
      <div className="art photo">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`art tone-${cat?.tone ?? "sand"}`} aria-hidden={large ? undefined : true}>
      <span className="kind">{cat?.name}</span>
      <span className="pun">{product.name}</span>
    </div>
  );
}
