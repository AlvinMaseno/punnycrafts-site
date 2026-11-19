# Order tracking

## The idea

Every order has one current status and a history of every status it has had, with the time and the staff member who changed it. The admin sees progress at a glance. The customer sees a simple version of the same progress.

## Two pipelines, because you sell two kinds of product

Your product guide separates ready-made items from made-to-order and custom items. Their journeys differ, so their statuses should too.

Ready-made (cards, magnets, bookmarks held in stock):

`New` > `Confirmed` > `Packed` > `Dispatched` > `Delivered`

Made-to-order and custom (drinkware, keyholders, personalised cards):

`New` > `Confirmed` > `Design approved` > `In production` > `Quality check` > `Packed` > `Dispatched` > `Delivered`

Side states for any order: `On hold` (waiting on the customer) and `Cancelled`.

## Payment is tracked separately

Payment status is its own field, not a step in the pipeline, because a customer can pay a deposit before production or pay on delivery.

`Unpaid` > `Deposit paid` > `Paid` (also `Refunded`)

Store the M-Pesa code against each payment.

## What the admin sees

- Orders board: one column per status, a card per order. Moving a card changes the status.
- Colour flags for orders that have sat in one status too long, for example In production for more than 3 days.
- On each order: items, customer, channel, payment status, delivery details, and the full history.
- Delivery details: delivery method (courier, rider, pickup), tracking or rider phone, expected date, and a delivered confirmation with the time. A photo of the parcel handed over can be attached.
- Dashboard tiles: orders waiting on you, ready to dispatch, dispatched but not yet delivered, delivered today.

## What the customer sees

Option A (start here): a tracking page at `/track`. The customer enters their order number and phone number and sees the progress bar and the latest update. Cheap to build and needs no sign-in.

Option B (later): a private link per order containing a long random token, sent in the confirmation message. No typing needed.

Never show another customer's data. The tracking lookup must require both the order number and the matching phone number, or the token.

## Telling the customer

Phase 3: each status change shows a ready-written WhatsApp message and a button that opens `wa.me` with the customer's number. Staff tap send. It is free and you already know this method.

Later: automatic messages through the WhatsApp Cloud API when the status changes. This costs per conversation and needs business verification, so add it only when volume justifies it.

## Rules the system enforces

- Stock is reserved when an order is logged and returned if it is cancelled.
- An order cannot jump to Delivered without passing Dispatched.
- Cancelling after Dispatched needs an admin and a reason.
- Every change is written to the history. History is never edited.
