require("dotenv").config();

const path = require("path");
const fs = require("fs");
const vm = require("vm");
const express = require("express");
const Stripe = require("stripe");

const app = express();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.SITE_URL || "https://caviarcurls.london";
const port = process.env.PORT || 3000;

if (!stripeSecretKey) {
  console.warn("Missing STRIPE_SECRET_KEY. Add it to your hosting environment before taking payments.");
}

const stripe = stripeSecretKey ? Stripe(stripeSecretKey) : null;
const productsFile = path.join(__dirname, "updated-caviar-files", "products.js");

function loadProducts() {
  const source = fs.readFileSync(productsFile, "utf8");
  const productOnlySource = source.slice(0, source.indexOf("const params"));
  return vm.runInNewContext(`${productOnlySource}\nproducts;`, {});
}

const products = loadProducts();

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "updated-caviar-files")));

function cleanMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return Math.round(amount * 100);
}

function cleanQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity < 1) return 1;
  return Math.min(Math.floor(quantity), 20);
}

function priceFromCatalog(item) {
  const productKey = item.key || Object.keys(products).find((key) => {
    return products[key].title === item.title || products[key].title === item.name;
  });
  const product = products[productKey];
  if (!product) return null;

  const selectedType = String(item.type || "");
  const selectedLength = String(item.length || "").replace(/"/g, "");
  const priceTable = product.prices[selectedType];
  if (!priceTable || typeof priceTable[selectedLength] === "undefined") return null;

  const isBundleProduct = productKey.includes("bundles");
  if (isBundleProduct && product.prices["1 Bundle"]) {
    const bundleCount = Number((selectedType.match(/\d+/) || ["1"])[0]);
    const singleBundlePrice = Number(product.prices["1 Bundle"][selectedLength]);
    return singleBundlePrice * bundleCount;
  }

  return Number(priceTable[selectedLength]);
}

function shippingFromAllowedOptions(value) {
  const amount = Number(value);
  const allowed = [5.99, 11.99, 38.99];
  return allowed.includes(amount) ? amount : 5.99;
}

app.post("/create-checkout-session", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured yet." });
    }

    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const shipping = req.body.shipping || {};
    const shippingAmount = cleanMoney(shippingFromAllowedOptions(shipping.price));

    const lineItems = items
      .map((item) => {
        const title = String(item.title || item.name || "Caviar Curls Item").slice(0, 120);
        const type = item.type ? `Type: ${String(item.type).slice(0, 80)}` : "";
        const length = item.length ? `Length: ${String(item.length).replace(/"/g, "")}"` : "";
        const catalogPrice = priceFromCatalog(item);
        const unitAmount = cleanMoney(catalogPrice);

        if (!unitAmount) return null;

        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: title,
              description: [type, length].filter(Boolean).join(" | ")
            },
            unit_amount: unitAmount
          },
          quantity: cleanQuantity(item.quantity)
        };
      })
      .filter(Boolean);

    if (!lineItems.length) {
      return res.status(400).json({ error: "Your cart is empty." });
    }

    if (shippingAmount) {
      lineItems.push({
        price_data: {
          currency: "gbp",
          product_data: {
            name: shipping.name || "Shipping"
          },
          unit_amount: shippingAmount
        },
        quantity: 1
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout.html`,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: [
          "GB", "US", "CA", "FR", "DE", "NL", "BE", "IE", "ES", "IT", "SE", "CH",
          "NO", "DK", "AU", "NZ", "AE", "SA", "QA", "KW", "NG", "ZA"
        ]
      }
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({ error: "Unable to start checkout." });
  }
});

app.listen(port, () => {
  console.log(`Caviar Curls checkout server running on http://localhost:${port}`);
});
