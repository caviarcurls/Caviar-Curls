# CAVIAR CURLS — FULL LUXURY SHOP UPGRADE

This upgrade keeps your elegant nude luxury aesthetic while making your wig shop feel premium and modern like the inspiration brand.

This includes:

* Luxury mobile product grid
* Dynamic products from your Excel stock
* Premium product cards
* Better mobile spacing
* Modern shopping experience
* Cleaner add-to-cart system
* Better variants system
* Better image presentation
* More luxury ecommerce styling

---

# IMPORTANT

You do NOT need coding knowledge.

For each file:

1. Open the old file
2. Press CTRL + A (or CMD + A on Mac)
3. Delete everything
4. Paste the new full code
5. Save

That is all.

---

# STEP 1 — REPLACE YOUR `wigs.html` COMPLETELY

Replace ONLY this section:

```html
<div class="collections-grid shop-grid">
```

all the way until:

```html
</div>
```

with THIS:

```html
<div class="collections-grid shop-grid"></div>
```

Your products will now automatically load from JavaScript.

---

# STEP 2 — REPLACE YOUR ENTIRE `script.js` COMPLETELY

DELETE EVERYTHING in your current `script.js`

Paste this FULL file:

```javascript
// =========================
// CAVIAR CURLS LUXURY SHOP
// =========================

const wigs = [
  {
    id: "straight-cambodian",
    name: "Straight Cambodian Virgin Wig",
    category: "straight",
    image: "images/Straight Cambodian Virgin hair.jpg",
    description: "Luxury HD lace wig with silky straight finish.",
    badge: "BESTSELLER",
    variants: {
      '16"': 100,
      '18"': 115,
      '20"': 130,
      '22"': 155,
      '24"': 170,
      '26"': 185,
      '28"': 200,
      '30"': 215
    }
  },

  {
    id: "bodywave-cambodian",
    name: "Body Wave Cambodian Virgin Wig",
    category: "wave",
    image: "images/Body wave Cambodian virgin hair.jpg",
    description: "Soft luxury body wave wig with HD lace.",
    badge: "LUXURY",
    variants: {
      '16"': 100,
      '18"': 115,
      '20"': 130,
      '22"': 155,
      '24"': 170,
      '26"': 185,
      '28"': 200,
      '30"': 215
    }
  },

  {
    id: "deepwave-cambodian",
    name: "Deep Wave Cambodian Virgin Wig",
    category: "wave",
    image: "images/Deep wave Cambodian virgin hair.jpg",
    description: "Defined luxury curls with HD lace finish.",
    badge: "TRENDING",
    variants: {
      '16"': 110,
      '18"': 120,
      '20"': 135,
      '22"': 160,
      '24"': 175,
      '26"': 190,
      '28"': 205,
      '30"': 220
    }
  },

  {
    id: "loosewave-cambodian",
    name: "Loose Wave Cambodian Virgin Wig",
    category: "wave",
    image: "images/Loose wave Cambodian virgin hair.jpg",
    description: "Luxury loose wave texture with elegant volume.",
    badge: "HOT",
    variants: {
      '16"': 110,
      '18"': 120,
      '20"': 135,
      '22"': 160,
      '24"': 175,
      '26"': 190,
      '28"': 205,
      '30"': 220
    }
  },

  {
    id: "raw-vietnamese",
    name: "Vietnamese RAW SDD Wig",
    category: "raw",
    image: "images/Straight Vietnamese Raw SDD hair 1.jpg",
    description: "Premium RAW Vietnamese luxury wig.",
    badge: "RAW HAIR",
    variants: {
      '20" - 13x4 HD': 125,
      '22" - 13x4 HD': 135,
      '24" - 13x4 HD': 160,
      '26" - 13x4 HD': 190,
      '28" - 13x4 HD': 220,
      '30" - 13x4 HD': 245,
      '32" - 13x4 HD': 285,

      '20" - 5x5 HD': 105,
      '22" - 5x5 HD': 120,
      '24" - 5x5 HD': 145,
      '26" - 5x5 HD': 170,
      '28" - 5x5 HD': 200,
      '30" - 5x5 HD': 225,
      '32" - 5x5 HD': 260
    }
  },

  {
    id: "straight-bundles",
    name: "Straight Bundles",
    category: "bundles",
    image: "images/straight-bundles.jpg",
    description: "Luxury straight bundles in Grade 14A & RAW.",
    badge: "NEW",
    variants: {
      '14" - Grade 14A': 38,
      '16" - Grade 14A': 46,
      '18" - Grade 14A': 56,
      '20" - Grade 14A': 65,
      '22" - Grade 14A': 75,
      '24" - Grade 14A': 84,
      '26" - Grade 14A': 90,
      '28" - Grade 14A': 100,
      '30" - Grade 14A': 110,
      '32" - Grade 14A': 120,

      '14" - RAW Hair': 45,
      '16" - RAW Hair': 50,
      '18" - RAW Hair': 60,
      '20" - RAW Hair': 70,
      '22" - RAW Hair': 80,
      '24" - RAW Hair': 90,
      '26" - RAW Hair': 100,
      '28" - RAW Hair': 110,
      '30" - RAW Hair': 120,
      '32" - RAW Hair': 130
    }
  }
];

// CART

let cart = JSON.parse(localStorage.getItem("caviarCart")) || [];

function saveCart() {
  localStorage.setItem("caviarCart", JSON.stringify(cart));
}

function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your bag is empty.</p>`;
  }

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");

    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>${item.variant}</p>
        <strong>£${item.price}</strong>
      </div>

      <button onclick="removeFromCart(${index})">×</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `£${total.toFixed(2)}`;
  cartCount.textContent = cart.length;

  saveCart();
}

function addToCart(productId, variant, price) {
  const product = wigs.find(w => w.id === productId);

  cart.push({
    name: product.name,
    variant,
    price
  });

  updateCartUI();

  alert("Added to bag.");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// PRODUCTS

function renderProducts(filter = "all") {
  const container = document.querySelector(".shop-grid");

  if (!container) return;

  container.innerHTML = "";

  const filtered = filter === "all"
    ? wigs
    : wigs.filter(w => w.category.includes(filter));

  filtered.forEach(product => {

    const firstVariant = Object.entries(product.variants)[0];

    const article = document.createElement("article");

    article.classList.add("luxury-product-card");

    article.innerHTML = `

      <div class="luxury-image-wrap">
        <img src="${product.image}" alt="${product.name}">
        <span class="luxury-badge">${product.badge}</span>
      </div>

      <div class="luxury-product-content">

        <h3>${product.name}</h3>

        <p class="luxury-description">
          ${product.description}
        </p>

        <div class="luxury-price-row">
          <span class="luxury-price">From £${firstVariant[1]}</span>
        </div>

        <select class="luxury-select">
          ${Object.entries(product.variants)
            .map(([variant, price]) => `
              <option value="${variant}" data-price="${price}">
                ${variant} — £${price}
              </option>
            `)
            .join("")}
        </select>

        <button class="luxury-cart-btn">
          Add to Bag
        </button>

      </div>

    `;

    const select = article.querySelector(".luxury-select");
    const priceText = article.querySelector(".luxury-price");

    select.addEventListener("change", () => {
      const option = select.options[select.selectedIndex];
      priceText.textContent = `From £${option.dataset.price}`;
    });

    article.querySelector(".luxury-cart-btn")
      .addEventListener("click", () => {

        const option = select.options[select.selectedIndex];

        addToCart(
          product.id,
          option.value,
          Number(option.dataset.price)
        );
      });

    container.appendChild(article);
  });
}

// FILTERS

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      buttons.forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      renderProducts(button.dataset.filter);
    });
  });
}

// CART

function setupCart() {

  const cartToggle = document.querySelector(".cart-toggle");
  const cartPanel = document.getElementById("cartPanel");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const closeCart = document.getElementById("closeCart");

  if (!cartToggle) return;

  cartToggle.addEventListener("click", () => {
    cartPanel.classList.add("open");
    cartBackdrop.classList.add("show");
  });

  function closePanel() {
    cartPanel.classList.remove("open");
    cartBackdrop.classList.remove("show");
  }

  closeCart.addEventListener("click", closePanel);
  cartBackdrop.addEventListener("click", closePanel);
}

// MOBILE MENU

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("siteNav");

  if (!menuToggle) return;

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupFilters();
  setupCart();
  setupMobileMenu();
  updateCartUI();
});
```

---

# STEP 3 — UPDATE YOUR `style.css`

Paste ALL of this at the VERY BOTTOM of your current CSS file.

```css
/* =========================
   LUXURY MOBILE SHOP
========================= */

.shop-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 30px;
}

.luxury-product-card {
  background: #f5eee8;
  border-radius: 22px;
  overflow: hidden;
  transition: 0.3s ease;
  position: relative;
}

.luxury-product-card:hover {
  transform: translateY(-4px);
}

.luxury-image-wrap {
  position: relative;
  overflow: hidden;
}

.luxury-image-wrap img {
  width: 100%;
  aspect-ratio: 1 / 1.3;
  object-fit: cover;
  display: block;
}

.luxury-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255,255,255,0.9);
  color: #6f4e37;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 10px;
  letter-spacing: 1px;
  font-weight: 600;
}

.luxury-product-content {
  padding: 14px;
}

.luxury-product-content h3 {
  font-size: 18px;
  line-height: 1.3;
  color: #6f4e37;
  margin-bottom: 8px;
}

.luxury-description {
  font-size: 13px;
  line-height: 1.5;
  color: #8b7355;
  margin-bottom: 12px;
}

.luxury-price-row {
  margin-bottom: 14px;
}

.luxury-price {
  font-size: 18px;
  font-weight: 700;
  color: #6f4e37;
}

.luxury-select {
  width: 100%;
  border: 1px solid #d9c5b2;
  background: white;
  border-radius: 14px;
  padding: 12px;
  font-size: 13px;
  margin-bottom: 12px;
  color: #6f4e37;
}

.luxury-cart-btn {
  width: 100%;
  background: #6f4e37;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 13px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s ease;
}

.luxury-cart-btn:hover {
  opacity: 0.9;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.cart-item button {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #6f4e37;
}

@media (max-width: 768px) {

  .shop-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .luxury-product-content h3 {
    font-size: 16px;
  }

  .luxury-description {
    font-size: 12px;
  }

  .luxury-price {
    font-size: 16px;
  }

}
