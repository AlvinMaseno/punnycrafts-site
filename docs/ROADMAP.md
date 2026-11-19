# Roadmap

Each phase ends with something you can use. Do not start the next phase until the current one has been tried with real data.

## Phase 1: Shop with real products (built)
- Static Next.js site with every product from the product guide, in 9 categories
- Homepage, category pages, product pages, search, and a custom and bulk page, built from the approved mockup
- Ordering through a WhatsApp message with the product, option and quantity filled in
- Ready to deploy to a free test address on Cloudflare Pages (see `DEPLOY.md`)
- The catalogue lives in `data/products.ts` and moves to the database in phase 2
- Product photos are added as they arrive (see `DEPLOY.md`)
- Done when: a stranger can browse every product on a phone and send you an order

## Phase 2: Database, sign-in and admin shell
- Supabase project created, catalogue imported from `data/products.ts`, shop reads from the database
- Staff sign-in, roles, protected `/admin`
- Empty admin layout with the Dashboard, Orders, Stock and Restocks tabs
- Done when: a non-admin account is refused on every admin page and admin API call

## Phase 3: Orders and tracking
- Log an order from Instagram, WhatsApp, TikTok, walk-in or phone
- Status pipeline, history with timestamps, delivery details
- Admin board and order page
- Customer tracking page
- See `ORDER_TRACKING.md`

## Phase 4: Stock and restocks
- Stock counts per product, adjusted automatically when orders are logged or cancelled
- Replenish level (default 3) with alerts
- Restock requests: Requested, Ordered, Received
- Stock movement history so every change has a reason

## Phase 5: Website checkout and M-Pesa
- Cart and checkout on the site
- STK push payment, order marked paid from the M-Pesa callback
- Delivery fee by area

## Phase 6: Move off Odoo
- Import Odoo data, run both sites in parallel, switch the domain, add redirects

## Later
Customer list and CRM, expenses and margins, supplier purchase orders, reports. See `ADMIN_FEATURES.md`.
