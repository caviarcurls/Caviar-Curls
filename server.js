require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const SITE_URL = (process.env.SITE_URL || '').trim();
const STRIPE_SECRET_KEY = (process.env.STRIPE_SECRET_KEY || '').trim();
const STRIPE_PUBLISHABLE_KEY = (process.env.STRIPE_PUBLISHABLE_KEY || '').trim();

const PUBLIC_DIR = __dirname;

if (!SITE_URL) {
  console.warn('Missing SITE_URL. Set it in your environment before deploying.');
}

if (!STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY. Checkout will fail until it is set.');
}

const stripe = STRIPE_SECRET_KEY ? Stripe(STRIPE_SECRET_KEY) : null;

app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

app.get('/', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get(['/success', '/success.html'], (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'success.html'));
});

app.get(['/cancel', '/cancel.html'], (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'cancel.html'));
});

app.get('/config', (_req, res) => {
  res.json({
    stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
    siteUrl: SITE_URL
  });
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: 'Stripe is not configured yet. Add your Stripe keys in the environment before launching.'
      });
    }

    if (!SITE_URL) {
      return res.status(500).json({
        error: 'SITE_URL is not configured yet. Add your public site URL before launching.'
      });
    }

    const items = Array.isArray(req.body.items) ? req.body.items : [];

    if (!items.length) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    const line_items = items.map((item) => {
      const amount = Math.round(Number(item.price) * 100);

      if (!item.name || !Number.isFinite(amount) || amount <= 0) {
        throw new Error('Invalid cart item detected.');
      }

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name
          },
          unit_amount: amount
        },
        quantity: 1
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true
      },
      shipping_address_collection: {
  allowed_countries: [
    // 🇬🇧 UK
    'GB',

    // 🌍 Europe
    'FR','DE','IT','ES','NL','BE','IE','SE','NO','DK',

    // 🌎 North America
    'US','CA',

    // 🌏 Others
    'AE','SA','AU','NZ',

    // 🌍 Africa (key markets)
    'NG', // Nigeria
    'GH', // Ghana
    'ZA', // South Africa
    'KE', // Kenya
    'UG', // Uganda
    'TZ', // Tanzania
    'ZW', // Zimbabwe
    'ZM', // Zambia
    'BW', // Botswana
    'CM', // Cameroon
    'CI', // Ivory Coast
    'SN', // Senegal
    'RW', // Rwanda
    'MA', // Morocco
    'EG'  // Egypt
  ]
},
      customer_creation: 'always',
      line_items,
      shipping_options: [
  // 🇬🇧 UK Shipping
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: {
        amount: 600, // £6.00
        currency: 'gbp'
      },
      display_name: 'UK Delivery',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 3 },
        maximum: { unit: 'business_day', value: 7 }
      }
    }
  },

  // 🌍 International Shipping
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: {
        amount: 2800, // £28.00
        currency: 'gbp'
      },
      display_name: 'International Delivery',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 5 },
        maximum: { unit: 'business_day', value: 10 }
      }
    }
  }
],
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cancel`,
      metadata: {
        store: 'Caviar Curls'
      }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    res.status(500).json({
      error: error.message || 'Failed to create checkout session.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
