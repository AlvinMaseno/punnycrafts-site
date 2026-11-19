# Punny Crafts site

One codebase for the public shop and the admin back office, replacing the Odoo website.

## Status

Phase 1 is built: the public shop runs as a static Next.js site. Admin, database and orders come in later phases. The two files in `prototypes/` are design references only.

Run it: `npm install` then `npm run dev`. Deploy it: see `docs/DEPLOY.md`.

| File | What it is |
| --- | --- |
| `prototypes/storefront-mockup.html` | Approved homepage layout (Redbubble-style structure, Punny Crafts branding) |
| `prototypes/admin-prototype.html` | Working admin prototype: log orders, stock, replenish at 3, restocks. Runs on a Claude-hosted database, so it is a reference for screens and logic, not code to deploy |

## Docs, read in this order

0. `docs/DEPLOY.md` free hosting and how to publish
0. `docs/DATA_NOTES.md` gaps in the product guide that need a decision
1. `docs/ARCHITECTURE.md` stack, access control, folder layout
2. `docs/ROADMAP.md` build phases, one at a time
3. `docs/ORDER_TRACKING.md` how order progress works for staff and customers
4. `docs/DATA_MODEL.md` draft database tables
5. `docs/ADMIN_FEATURES.md` feature ideas ranked by value

## Working rule

Finish one phase, test it with real products and a real order, then start the next.
