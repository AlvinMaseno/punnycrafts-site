import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import OrderBox from "@/components/OrderBox";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { allProducts, fulfilmentLabel, getCategory, getProduct, productsIn } from "@/lib/catalogue";
import { ksh } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p?.name ?? "Product", description: p?.blurb };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category);
  const more = productsIn(p.category).filter((x) => x.slug !== p.slug).slice(0, 4);
  const prices = p.variants?.map((v) => v.price) ?? (p.price !== undefined ? [p.price] : []);
  const low = prices.length ? Math.min(...prices) : undefined;
  const high = prices.length ? Math.max(...prices) : undefined;

  return (
    <main className="gutter">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link> / <Link href={`/category/${p.category}/`}>{cat?.name}</Link> / {p.name}
        </div>
        <div className="pdp">
          <ProductArt product={p} large />
          <div>
            <h1>{p.name}</h1>
            {p.blurb && <p className="lead">{p.blurb}</p>}
            <div className="bigprice">
              {low === undefined ? "Ask us for a price" : low === high ? ksh(low) : `${ksh(low)} to ${ksh(high!)}`}
            </div>
            <dl className="facts">
              <dt>Type</dt><dd>{fulfilmentLabel(p.fulfilment)}</dd>
              {p.size && (<><dt>Size</dt><dd>{p.size}</dd></>)}
              {p.colours && (<><dt>Colours</dt><dd>{p.colours.join(", ")}</dd></>)}
              {p.moq && (<><dt>Custom minimum</dt><dd>{p.moq} pieces</dd></>)}
              {p.customise && (<><dt>Personalise</dt><dd>{p.customise}</dd></>)}
            </dl>
            <OrderBox name={p.name} price={p.price} variants={p.variants} moq={p.moq} customise={p.customise} />
          </div>
        </div>

        {(p.designs || p.designGroups) && (
          <section className="designs">
            <h2>{p.designs ? `Designs (${p.designs.length})` : "Occasions"}</h2>
            <ul className="designlist">
              {p.designs?.map((d) => <li key={d}>{d}</li>)}
              {p.designGroups?.map((g) => <li key={g.label}>{g.label}<small>{g.count} designs</small></li>)}
            </ul>
          </section>
        )}

        {more.length > 0 && (
          <section className="block">
            <div className="sec-head"><h2>More in {cat?.name}</h2><Link href={`/category/${p.category}/`}>View all</Link></div>
            <div className="grid">{more.map((m) => <ProductCard key={m.slug} product={m} />)}</div>
          </section>
        )}
      </div>
    </main>
  );
}
