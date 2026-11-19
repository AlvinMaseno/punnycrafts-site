import Link from "next/link";
import { categories } from "@/lib/catalogue";
import { site, whatsappLink } from "@/lib/site";

export default function Header() {
  return (
    <>
      <div className="promo">Better than flowers: custom gifts from 1 piece. Cards, mugs, tumblers and more.</div>
      <div className="gutter">
        <div className="wrap">
          <header className="header">
            <Link className="logo" href="/" aria-label={`${site.name} home`}>
              <span>Punny</span>Crafts
            </Link>
            <form className="search" action="/shop/" method="get" role="search">
              <input name="q" type="search" placeholder="Search cards, mugs, magnets, hoodies..." aria-label="Search products" />
              <button type="submit">Search</button>
            </form>
            <a className="btn wa small" href={whatsappLink("Hi Punny Crafts, I'd like to place an order.")} target="_blank" rel="noopener">
              <span className="long">Order on </span>WhatsApp
            </a>
          </header>
          <nav className="catbar" aria-label="Categories">
            <ul>
              {categories.map((c) => (
                <li key={c.slug}><Link href={`/category/${c.slug}/`}>{c.name}</Link></li>
              ))}
              <li><Link href="/custom/">Custom &amp; Bulk</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
