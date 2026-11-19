"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { allProducts, categories } from "@/lib/catalogue";

// Search and category filter for the all-products page. Runs in the browser, so the page itself stays static.
export default function ShopBrowser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get("q") ?? "");
    setCat(params.get("c") ?? "all");
  }, []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!term) return true;
      const hay = [p.name, p.blurb ?? "", ...(p.designs ?? [])].join(" ").toLowerCase();
      return hay.includes(term);
    });
  }, [q, cat]);

  return (
    <>
      <form className="search" role="search" onSubmit={(e) => e.preventDefault()} style={{ marginTop: 18, maxWidth: 520 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search products and designs" aria-label="Search products and designs" />
        <button type="submit">Search</button>
      </form>
      <div className="chips" role="group" aria-label="Filter by category">
        <button type="button" className={`chip${cat === "all" ? " on" : ""}`} onClick={() => setCat("all")}>All</button>
        {categories.map((c) => (
          <button type="button" key={c.slug} className={`chip${cat === c.slug ? " on" : ""}`} onClick={() => setCat(c.slug)}>{c.name}</button>
        ))}
      </div>
      <div className="listing">
        {list.length ? (
          <div className="grid">{list.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        ) : (
          <div className="empty">No products match. Try a shorter word, or ask us on WhatsApp.</div>
        )}
      </div>
      <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 16 }}>{list.length} product{list.length === 1 ? "" : "s"}</p>
    </>
  );
}
