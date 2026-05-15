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
  },

  {
    id: "bodywave-bundles",
    name: "Body Wave Bundles",
    category: "bundles",
    image: "images/bodywave-bundles.jpg",
    description: "Luxury body wave bundles in Grade 14A & RAW.",
    badge: "POPULAR",
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
  },

  {
    id: "waterwave-burgundy",
    name: "SSD Waterwave Burgundy Wig",
    category: "wave",
    image: "images/waterwave-burgundy.jpg",
    description: "Luxury burgundy waterwave wig with 250% density.",
    badge: "BURGUNDY",
    variants: {
      '16" - 13x6 HD': 110,
      '18" - 13x6 HD': 120,
      '20" - 13x6 HD': 135,
      '22" - 13x6 HD': 160,
      '24" - 13x6 HD': 175,
      '26" - 13x6 HD': 190,
      '28" - 13x6 HD': 205,
      '30" - 13x6 HD': 220
    }
  },

  {
    id: "waterwave-highlight",
    name: "SSD Waterwave Brown Highlight Wig",
    category: "highlight",
    image: "images/waterwave-highlight.jpg",
    description: "Luxury highlighted waterwave wig.",
    badge: "HIGHLIGHT",
    variants: {
      '16" - 13x6 HD': 110,
      '18" - 13x6 HD': 120,
      '20" - 13x6 HD': 135,
      '22" - 13x6 HD': 160,
      '24" - 13x6 HD': 175,
      '26" - 13x6 HD': 190,
      '28" - 13x6 HD': 205,
      '30" - 13x6 HD': 220
    }
  },

  {
    id: "blonde-highlight",
    name: "Blonde Highlight 250% Density Wig",
    category: "highlight",
    image: "images/blonde-highlight.jpg",
    description: "Luxury blonde highlight wig with 250% density.",
    badge: "BLONDE",
    variants: {
      '16" - 13x4 Lace': 115,
      '18" - 13x4 Lace': 130,
      '20" - 13x4 Lace': 150,
      '22" - 13x4 Lace': 175,
      '24" - 13x4 Lace': 210,
      '26" - 13x4 Lace': 250,
      '28" - 13x4 Lace': 275,
      '30" - 13x4 Lace': 350
    }
  },

  {
    id: "hd-lace-frontal",
    name: "HD Lace Frontals",
    category: "lace",
    image: "images/hd-lace.jpg",
    description: "Premium HD lace frontals in multiple sizes.",
    badge: "HD LACE",
    variants: {
      '14" - 13x6 HD': 55,
      '16" - 13x6 HD': 65,
      '18" - 13x6 HD': 75,
      '20" - 13x6 HD': 85,
      '22" - 13x6 HD': 100,

      '14" - 13x4 HD': 50,
      '16" - 13x4 HD': 60,
      '18" - 13x4 HD': 70,
      '20" - 13x4 HD': 80,
      '22" - 13x4 HD': 90
    }
  }
];

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
