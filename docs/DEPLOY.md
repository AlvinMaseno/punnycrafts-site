# Deploying the test site (free)

## Host: Cloudflare Pages, free plan

Why this one:
- Vercel's free (Hobby) plan allows non-commercial use only, and its rules count showing products for sale as commercial. A shop, even a test shop, does not belong there.
- Netlify's free plan works, but now runs on a monthly credit pool and pauses the site when the credits run out.
- Cloudflare Pages free has unlimited bandwidth for static sites, 500 builds a month, and a free `*.pages.dev` address. Sources I checked say commercial use is allowed. Read Cloudflare's own terms once before you take real orders.

The site is a static export, so there is no server to run. Pages that need a server (admin, orders, M-Pesa callback) arrive in later phases and will use Supabase.

## Run it on your computer first (Windows)

Install Node.js 22 from nodejs.org, then in the project folder:

```
npm install
npm run dev
```

Open http://localhost:3000.

## Option A: deploy from GitHub (recommended, updates on every push)

1. Create a private repository on GitHub and push this folder to it. Keep it private: `docs/` and `prototypes/` hold internal notes.
2. In the Cloudflare dashboard open Workers & Pages, choose Create, then Pages, then Connect to Git, and pick the repository.
3. Set:
   - Framework preset: Next.js (Static HTML Export), or None
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable: `NODE_VERSION` = `22`
4. Save and deploy. You get an address like `punnycrafts.pages.dev`.

Menu names in Cloudflare change from time to time. If a label differs, look for "Pages" and "Connect to Git".

## Option B: upload from your computer (no GitHub)

```
npm install
npm run build
npx wrangler login
npx wrangler pages deploy out --project-name punnycrafts
```

## When you buy the domain

In the Pages project, open Custom domains and add it. If the domain is bought elsewhere, Cloudflare shows the DNS records to add. Then set `url` in `lib/site.ts`.

## Adding product photos

1. Put the file in `public/products/`, for example `public/products/greeting-cards.jpg`.
2. In `data/products.ts`, add `image: "/products/greeting-cards.jpg"` to that product.
3. Commit and push, or build and upload again.

Square photos, around 1000 px wide, JPG or WebP, keep pages fast on mobile data.
