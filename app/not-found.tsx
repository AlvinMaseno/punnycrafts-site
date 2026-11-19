import Link from "next/link";

export default function NotFound() {
  return (
    <main className="gutter">
      <div className="wrap">
        <div className="page-head" style={{ marginBlock: 60 }}>
          <h1>That page wandered off.</h1>
          <p>We could not find it. Try the shop instead.</p>
          <p><Link className="btn" href="/shop/">Shop all products</Link></p>
        </div>
      </div>
    </main>
  );
}
