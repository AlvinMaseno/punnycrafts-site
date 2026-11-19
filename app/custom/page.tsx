import type { Metadata } from "next";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Custom and bulk orders" };

const services = [
  { name: "Customisation", text: "Add a name, date or your own artwork. Greeting cards and postcards can be personalised from 1 piece for an extra KSh 200. Bookmarks, Sunny Rays and fridge magnets start at 10 pieces." },
  { name: "Branding your own items", text: "Bring your notebooks, T-shirts and more and we brand them. Starts at KSh 300, depending on the brief." },
  { name: "Bulk printing", text: "Promotional items in bulk such as business cards, flyers and brochures, with your design or ours." },
  { name: "Design, concept and ideation", text: "Share the brief and we charge for the scope of work. Rates start from KSh 5,000." },
  { name: "Sourcing", text: "We source items for you for a service fee that depends on the scope of work." },
  { name: "Gift wrapping and letter writing", text: "We wrap your gift and write the note." },
  { name: "Storage", text: "KSh 100, valid for 7 days." },
  { name: "Delivery", text: "Charged per our delivery fees." },
];

export default function Custom() {
  return (
    <main className="gutter">
      <div className="wrap">
        <div className="page-head">
          <h1>Custom and bulk orders</h1>
          <p>Tell us what you need and we will quote it. Wholesale and bulk rates come from our sales team.</p>
        </div>
        <div className="band" style={{ marginTop: 24 }}>
          <ul className="pricelist" style={{ gridColumn: "1 / -1" }}>
            {services.map((s) => (
              <li key={s.name} style={{ flexDirection: "column", gap: 2 }}>
                <b>{s.name}</b>
                <span style={{ color: "var(--muted)" }}>{s.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p style={{ marginTop: 24 }}>
          <a className="btn wa" href={whatsappLink("Hi Punny Crafts, I'd like a quote for a custom or bulk order.")} target="_blank" rel="noopener">Ask for a quote on WhatsApp</a>
        </p>
      </div>
    </main>
  );
}
