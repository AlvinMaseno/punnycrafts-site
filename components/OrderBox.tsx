"use client";

import { useState } from "react";
import type { Variant } from "@/lib/catalogue";
import { ksh, whatsappLink } from "@/lib/site";

interface Props {
  name: string;
  price?: number;
  variants?: Variant[];
  moq?: number;
  customise?: string;
}

// Phase 1 ordering: builds a WhatsApp message with the choice filled in.
// Replaced by a cart and M-Pesa checkout in phase 5.
export default function OrderBox({ name, price, variants, moq, customise }: Props) {
  const [vi, setVi] = useState(0);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const variant = variants && variants.length ? variants[vi] : undefined;
  const unit = variant ? variant.price : price;
  const total = unit !== undefined ? unit * Math.max(1, qty) : undefined;

  const text =
    `Hi Punny Crafts, I'd like to order:\n` +
    `${Math.max(1, qty)} x ${name}${variant ? ` (${variant.label})` : ""}` +
    (total !== undefined ? `\nEstimated total: ${ksh(total)}` : "") +
    (note.trim() ? `\nDetails: ${note.trim()}` : "");

  return (
    <div className="orderbox">
      {variants && variants.length > 1 && (
        <label>
          Option
          <select id="variant" value={vi} onChange={(e) => setVi(Number(e.target.value))}>
            {variants.map((v, i) => (
              <option key={v.label} value={i}>{v.label} — {ksh(v.price)}</option>
            ))}
          </select>
        </label>
      )}
      <div className="row">
        <label>
          Design or wording
          <input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Design name, name to print, colour" />
        </label>
        <label>
          Qty
          <input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))} />
        </label>
      </div>
      {moq && qty < moq && customise && <p className="hint">Custom orders of this product start at {moq} pieces.</p>}
      <div className="total"><span>Estimated total</span><span className="price">{total !== undefined ? ksh(total) : "Ask us"}</span></div>
      <a className="btn wa" href={whatsappLink(text)} target="_blank" rel="noopener">Order on WhatsApp</a>
      <p className="hint">Online checkout with M-Pesa is coming. For now we confirm your order, payment and delivery on WhatsApp.</p>
    </div>
  );
}
