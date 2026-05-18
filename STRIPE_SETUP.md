# Caviar Curls Stripe Checkout Setup

This version uses Stripe Checkout Sessions so the customer total matches the cart.

## Files Needed

- `server.js`
- `package.json`
- `.env.example`
- `updated-caviar-files/`

## Setup

1. Install the server packages:

```bash
npm install
```

2. Create a `.env` file from `.env.example`.

3. Add your live Stripe secret key:

```bash
STRIPE_SECRET_KEY=sk_live_your_real_secret_key
SITE_URL=https://caviarcurls.london
PORT=3000
```

4. Start the site:

```bash
npm start
```

## Important

Do not put your Stripe secret key inside `checkout.html`, `script.js`, or any public website file.

The checkout button sends the cart to `/create-checkout-session`, and the server creates the secure Stripe checkout page.
