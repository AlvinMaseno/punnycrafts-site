import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { categories, getCategory, productsIn } from "@/lib/catalogue";

type Params = { slug: string };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  return { title: c?.name ?? "Category", description: c?.blurb };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const list = productsIn(slug);
  return (
    <main className="gutter">
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / {cat.name}</div>
        <div className="page-head">
          <h1>{cat.name}</h1>
          <p>{cat.blurb}</p>
        </div>
        <div className="chips" aria-label="Categories">
          {categories.map((c) => (
            <Link key={c.slug} className="chip" href={`/category/${c.slug}/`} aria-current={c.slug === slug ? "page" : undefined}>{c.name}</Link>
          ))}
        </div>
        <div className="listing">
          <div className="grid">{list.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </div>
      </div>
    </main>
  );
}
