# Data model (draft)

PostgreSQL. This is a first draft to agree on before any code. Names can change.

```sql
-- people
create table profiles (
  id uuid primary key references auth.users,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer','staff','admin'))
);

-- catalogue
create table categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  parent_id int references categories(id)
);

create table products (
  id serial primary key,
  sku text unique not null,                 -- e.g. FMK03, GCB01 from the product guide
  name text not null,
  category_id int references categories(id),
  price_kes int not null,
  fulfilment text not null check (fulfilment in ('ready_made','made_to_order','custom')),
  track_stock boolean not null default true,
  stock int not null default 0,
  replenish_level int not null default 3,
  moq int default 1,                        -- minimum order quantity, e.g. 10 for bookmarks
  image_path text,
  active boolean not null default true
);

-- orders
create table customers (
  id serial primary key,
  name text not null,
  phone text,
  instagram text,
  notes text
);

create table orders (
  id serial primary key,
  number text unique not null,              -- PC-0001
  customer_id int references customers(id),
  channel text not null,                    -- instagram, whatsapp, tiktok, facebook, walk_in, phone, website
  status text not null default 'New',
  payment_status text not null default 'Unpaid',
  total_kes int not null,
  delivery_method text,                     -- courier, rider, pickup
  delivery_address text,
  delivery_ref text,                        -- tracking number or rider phone
  expected_date date,
  delivered_at timestamptz,
  public_token text unique,                 -- for the private tracking link
  note text,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table order_items (
  id serial primary key,
  order_id int references orders(id) on delete cascade,
  product_id int references products(id),
  name text not null,                       -- copied at time of sale
  qty int not null,
  unit_price_kes int not null,
  custom_details text                       -- name to print, uploaded design reference
);

create table order_events (                 -- the history; insert only
  id serial primary key,
  order_id int references orders(id) on delete cascade,
  status text not null,
  note text,
  by_user uuid references profiles(id),
  at timestamptz default now()
);

create table payments (
  id serial primary key,
  order_id int references orders(id),
  amount_kes int not null,
  method text,                              -- mpesa, cash, bank
  reference text,                           -- M-Pesa code
  paid_at timestamptz default now()
);

-- stock
create table stock_movements (              -- every change has a reason; insert only
  id serial primary key,
  product_id int references products(id),
  change int not null,                      -- negative for sales
  reason text not null,                     -- order, cancel, restock, correction, damage
  order_id int references orders(id),
  restock_id int,
  by_user uuid references profiles(id),
  at timestamptz default now()
);

create table restocks (
  id serial primary key,
  product_id int references products(id),
  qty int not null,
  status text not null default 'Requested', -- Requested, Ordered, Received, Cancelled
  supplier text,
  note text,
  requested_at timestamptz default now(),
  ordered_at timestamptz,
  received_at timestamptz,
  received_qty int
);
```

## Notes

- `products.stock` is the running total. `stock_movements` is the audit trail that explains it. Update both in one database transaction so they never disagree.
- Row-level security: `orders`, `order_items`, `order_events`, `payments`, `stock_movements`, `restocks`, `customers` are readable and writable only where `profiles.role in ('staff','admin')`. `products` and `categories` are public to read.
- Designs (GCB01 and so on) can become a `designs` table later if you want per-design stock. Start per product.
