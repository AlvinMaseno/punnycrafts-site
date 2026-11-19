import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <div className="gutter">
      <div className="wrap">
        <footer className="footer">
          <div>
            <div className="logo"><span>Punny</span>Crafts</div>
            <div>{site.tagline}.<br />{site.phoneDisplay}</div>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop/">All products</Link></li>
              <li><Link href="/category/papergoods/">Papergoods</Link></li>
              <li><Link href="/category/drinkware/">Drinkware</Link></li>
              <li><Link href="/category/gift-packaging/">Gift packaging</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/custom/">Branding</Link></li>
              <li><Link href="/custom/">Bulk printing</Link></li>
              <li><Link href="/custom/">Design and ideation</Link></li>
              <li><Link href="/custom/">Storage and delivery</Link></li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">WhatsApp us</a></li>
              <li><Link href="/custom/">Wholesale quotes</Link></li>
            </ul>
          </div>
        </footer>
        <div className="copy">Copyright Punny Crafts Limited</div>
      </div>
    </div>
  );
}
