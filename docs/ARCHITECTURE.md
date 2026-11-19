# Architecture (proposed)

## Goal

One website. Customers see the shop at `/`. Staff sign in and reach `/admin`. Nobody without an admin role can load an admin page or read admin data.

## Recommended stack

| Layer | Choice | Why |
| --- | --- | --- |
| Web app | Next.js (React) | Shop pages are built ahead of time as plain HTML, which helps search ranking and speed on mobile data. One project holds shop and admin. Fits your React and JavaScript strength |
| Database and login | Supabase (Postgres, Auth, Storage) | Free tier, real Postgres, built-in sign-in, product image storage, and row-level security so admin data is protected in the database itself |
| Hosting | Cloudflare Pages free plan | Free, unlimited bandwidth for static sites, deploys from GitHub, custom domain supported. Vercel's free plan is non-commercial only, so it is not used |
| Payments | M-Pesa Daraja STK push, added in phase 5 | Customer pays from their phone, order is marked paid automatically |
| Customer messages | WhatsApp click-to-chat (`wa.me`) first, WhatsApp Cloud API later | Free to start, and you have already used this approach |

Alternative if you prefer your own backend: FastAPI + PostgreSQL (as in your rental API) with a React front end. It gives full control but means you also build login, roles, file storage and hosting yourself. Phase 1 was built on Next.js, so choosing this alternative now means redoing the front end.

## Access control

- Every user has a `role`: `customer`, `staff`, `admin`.
- `/admin/*` pages check the role on the server before rendering. Hiding a menu link is never the protection.
- The database enforces the same rule. Tables like `orders`, `stock_movements` and `restocks` allow reads and writes only to `staff` and `admin`. Products are readable by everyone but writable only by staff and admin.
- Admin accounts are created by you directly in the database. There is no public sign-up path to a staff role.
- Turn on two-step sign-in for admin accounts.
- Supabase's free plan pauses a project after about a week with little database activity. Fine for testing. Before real customers, upgrade or keep the project active with a small scheduled check.
- Phase 1 is a static export, so server-side role checks arrive with the admin in phase 2. The database rules above remain the real protection.

## Folder layout

```
punnycrafts-site/
  app/
    (shop)/            public pages: home, category, product, cart, checkout, track
    admin/             dashboard, orders, stock, restocks, products, customers, reports
    api/               webhooks (M-Pesa callback), server actions
  components/
  lib/                 database client, stock rules, order status rules
  supabase/
    migrations/        SQL files for every table change
    seed/              products imported from the product guide
  docs/
  prototypes/
```

## Moving off Odoo

1. Export products, categories, customers and past orders from Odoo to CSV.
2. Import into the new database (phase 6).
3. Run both sites side by side for a few weeks.
4. Point the domain at the new site and redirect old Odoo URLs such as `/shop/category/...`.
5. Keep the Odoo export for your accounting records.
