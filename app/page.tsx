import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories, lowestPrice, productsIn } from "@/lib/catalogue";
import { whatsappLink } from "@/lib/site";

export default function Home() {
  const featured = allProducts.filter((p) => p.featured).slice(0, 8);
  const cheap = allProducts
    .filter((p) => !["gift-packaging", "home-decor"].includes(p.category))
    .filter((p) => {
      const l = lowestPrice(p);
      return l !== undefined && l < 1000;
    })
    .slice(0, 8);

  return (
    <main className="gutter">
      <div className="wrap">
        <div className="hero">
          <div className="hero-copy">
            <div className="eyebrow">Kenyan wordplay, made real</div>
            <h1>Puns you can hold, gift and show off.</h1>
            <p>Greeting cards, mugs, tumblers, magnets and hoodies that say it the way we say it. Pick a design or send us your own.</p>
            <Link className="btn" href="/shop/">Shop all products</Link>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art tone-ink"><span className="kind">Fridge magnet</span><span className="pun">Siku njema huonekana pesa ikiingia</span></div>
            <div className="art tone-coral"><span className="kind">Greeting card</span><span className="pun">You matatu me</span></div>
            <div className="art tone-sky"><span className="kind">Ceramic mug</span><span className="pun">Hii kikombe si ya wageni</span></div>
            <div className="art tone-green"><span className="kind">Bookmark</span><span className="pun">Nimekumark!</span></div>
          </div>
        </div>

        <section className="block">
          <div className="sec-head"><h2>Shop by category</h2><Link href="/shop/">View all</Link></div>
          <div className="cats">
            {categories.map((c) => (
              <Link key={c.slug} className="cat" href={`/category/${c.slug}/`}>
                <div className={`art tone-${c.tone}`}>
                  <span className="kind">{productsIn(c.slug).length} products</span>
                  <span className="pun">{c.name}</span>
                </div>
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="block">
          <div className="sec-head"><h2>Best sellers</h2><Link href="/shop/">View all</Link></div>
          <div className="grid">{featured.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </section>

        <section className="block">
          <div className="band">
            <div>
              <h2>Your name, your photo, your design.</h2>
              <p>Personalise a card, mug, keyholder or pin from a single piece. Bookmarks, Sunny Rays and fridge magnets start at 10. Ask our sales team for bulk and wholesale rates.</p>
              <a className="btn" href={whatsappLink("Hi Punny Crafts, I'd like a custom order.")} target="_blank" rel="noopener">Start a custom order</a>
            </div>
            <ul className="pricelist" aria-label="Customisation prices">
              <li><span>Personalise a greeting card</span><b>+ KSh 200</b></li>
              <li><span>Branding on your own item</span><b>from KSh 300</b></li>
              <li><span>Design, concept and ideation</span><b>from KSh 5,000</b></li>
              <li><span>Storage (7 days)</span><b>KSh 100</b></li>
            </ul>
          </div>
        </section>

        <section className="block">
          <div className="sec-head"><h2>Gifts under KSh 1,000</h2><Link href="/shop/">View all</Link></div>
          <div className="grid">{cheap.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </section>

        <section className="block">
          <div className="trust">
            <div><b>Custom from 1 piece</b><span>Cards, mugs, pins, keyholders and more.</span></div>
            <div><b>Bulk and wholesale</b><span>Quotes from our sales team.</span></div>
            <div><b>Gift wrapping and letters</b><span>We wrap it and write the note.</span></div>
            <div><b>Delivery</b><span>Charged per our delivery fees.</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}
