import type { Metadata } from "next";
import ShopBrowser from "@/components/ShopBrowser";

export const metadata: Metadata = { title: "All products" };

export default function Shop() {
  return (
    <main className="gutter">
      <div className="wrap">
        <div className="page-head">
          <h1>All products</h1>
          <p>Search by product or by design wording.</p>
        </div>
        <ShopBrowser />
      </div>
    </main>
  );
}
