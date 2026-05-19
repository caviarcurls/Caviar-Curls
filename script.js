// LUXURY HEADER + PRODUCT SEARCH
const caviarProductSearch = [
  { key: 'straightwig', title: 'Straight Cambodian Wig', type: '13x4 HD Lace Frontal Wig', image: 'images/straightwig-1.jpg', tags: 'straight cambodian wig black sleek hd lace' },
  { key: 'bodywavewig', title: 'Body Wave Cambodian Wig', type: '13x4 HD Lace Frontal Wig', image: 'images/bodywavewig-1.jpg', tags: 'body wave cambodian wig' },
  { key: 'deepwavewig', title: 'Deep Wave Cambodian Wig', type: '13x4 HD Lace Frontal Wig', image: 'images/deepwavewig-1.jpg', tags: 'deep wave cambodian wig curly' },
  { key: 'loosewavewig', title: 'Loose Wave Cambodian Wig', type: '13x4 HD Lace Frontal Wig', image: 'images/loosewavewig-1.jpg', tags: 'loose wave cambodian wig' },
  { key: 'waterwavewig', title: 'Water Wave Cambodian Wig', type: '13x4 HD Lace Frontal Wig', image: 'images/waterwavewig-1.jpg', tags: 'water wave cambodian wig' },
  { key: 'rawvietnamese', title: 'RAW Vietnamese Wig', type: 'RAW Vietnamese Hair', image: 'images/rawvietnamese-1.jpg', tags: 'raw vietnamese wig straight' },
  { key: 'ssdbrownbodywave', title: 'SSD Brown Body Wave Wig', type: 'Luxury Colored Wig', image: 'images/ssdbrownbodywave-1.jpg', tags: 'ssd brown body wave wig chocolate' },
  { key: 'ssdbalayagebodywave', title: 'SSD Balayage Body Wave Wig', type: 'Luxury Colored Wig', image: 'images/ssdbalayagebodywave-1.jpg', tags: 'ssd balayage body wave wig highlight' },
  { key: 'ssdwaterwaveburgundy', title: 'SSD Waterwave Burgundy Wig', type: 'Luxury Colored Wig', image: 'images/ssdwaterwaveburgundy-1.jpg', tags: 'ssd waterwave burgundy red wig' },
  { key: 'ssdwaterwavebrownhighlight', title: 'SSD Waterwave Brown Highlight Wig', type: 'Luxury Highlight Wig', image: 'images/ssdwaterwavebrownhighlight-1.jpg', tags: 'ssd waterwave brown highlight wig' },
  { key: 'blondehighlight', title: 'Blonde Highlight Wig', type: 'Luxury Blonde Highlight Wig', image: 'images/blondehighlight-1.jpg', tags: 'blonde highlight wig' },
  { key: 'bobburgundy', title: 'Vietnamese Burgundy Bobs', type: 'Luxury Bob Wig', image: 'images/bobburgundy-1.jpg', tags: 'vietnamese burgundy bob red' },
  { key: 'bobbrown', title: 'Vietnamese Brown Bobs', type: 'Luxury Bob Wig', image: 'images/bobbrown-1.jpg', tags: 'vietnamese brown bob' },
  { key: 'bobblack', title: 'Vietnamese Black Bobs', type: 'Luxury Bob Wig', image: 'images/bobblack-1.jpg', tags: 'vietnamese black bob' },
  { key: 'bobblonde', title: 'Vietnamese Blonde Bobs', type: 'Luxury Blonde Bob Wig', image: 'images/bobblonde-1.jpg', tags: 'vietnamese blonde bob' },
  { key: 'straightbundles', title: 'Straight Bundles 14A', type: 'Luxury Cambodian Bundles', image: 'images/straightbundles-1.jpg', tags: 'straight bundles cambodian 14a' },
  { key: 'rawstraightbundles', title: 'RAW Straight Bundles', type: 'Luxury RAW Bundles', image: 'images/rawstraightbundles-1.jpg', tags: 'raw straight bundles' },
  { key: 'bodywavebundles', title: 'Body Wave Bundles 14A', type: 'Luxury Cambodian Bundles', image: 'images/bodywavebundles-1.jpg', tags: 'body wave bundles cambodian 14a' },
  { key: 'rawbodywavebundles', title: 'RAW Body Wave Bundles', type: 'Luxury RAW Bundles', image: 'images/rawbodywavebundles-1.jpg', tags: 'raw body wave bundles' },
  { key: 'hd13x6frontal', title: '13x6 HD Frontal', type: 'HD Lace Frontal', image: 'images/hd13x6frontal-1.jpg', tags: '13x6 frontal hd lace' },
  { key: 'hd13x4frontal', title: '13x4 HD Frontal', type: 'HD Lace Frontal', image: 'images/hd13x4frontal-1.jpg', tags: '13x4 frontal hd lace' }
];

function setupLuxuryHeaderSearch() {
  const headerInner = document.querySelector('.shop-header-inner');
  if (!headerInner || headerInner.dataset.enhanced === 'true') return;
  headerInner.dataset.enhanced = 'true';

  const shopIcons = headerInner.querySelector('.shop-icons');
  if (shopIcons) {
    const searchButton = document.createElement('button');
    searchButton.type = 'button';
    searchButton.className = 'header-icon search-toggle';
    searchButton.setAttribute('aria-label', 'Search products');
    searchButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7"></circle>
        <path d="m16.5 16.5 4 4"></path>
      </svg>
    `;
    shopIcons.prepend(searchButton);

    const cartLink = shopIcons.querySelector('a[href="cart.html"]');
    if (cartLink) {
      cartLink.classList.add('header-icon');
      cartLink.setAttribute('aria-label', 'Cart');
      cartLink.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8h12l1 12H5L6 8Z"></path>
          <path d="M9 8a3 3 0 0 1 6 0"></path>
        </svg>
      `;
    }

    searchButton.addEventListener('click', openProductSearch);
  }

  buildProductSearchPanel();
}

function buildProductSearchPanel() {
  if (document.getElementById('productSearchPanel')) return;

  const panel = document.createElement('div');
  panel.className = 'search-panel';
  panel.id = 'productSearchPanel';
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <div class="search-backdrop" data-search-close></div>
    <div class="search-sheet" role="dialog" aria-modal="true" aria-label="Product search">
      <div class="search-head">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m16.5 16.5 4 4"></path>
        </svg>
        <input id="productSearchInput" type="search" placeholder="Search wigs, bobs, bundles..." autocomplete="off">
        <button class="search-close" type="button" data-search-close aria-label="Close search">×</button>
      </div>
      <div class="search-results" id="productSearchResults"></div>
    </div>
  `;

  document.body.appendChild(panel);

  const input = panel.querySelector('#productSearchInput');
  input.addEventListener('input', () => renderProductSearch(input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const firstResult = panel.querySelector('.search-result');
      if (firstResult) {
        event.preventDefault();
        window.location.href = firstResult.getAttribute('href');
      }
    }
    if (event.key === 'Escape') closeProductSearch();
  });

  panel.querySelectorAll('[data-search-close]').forEach((item) => {
    item.addEventListener('click', closeProductSearch);
  });
}

function productSearchUrl(product) {
  return `product.html?product=${encodeURIComponent(product.key)}`;
}

function renderProductSearch(query = '') {
  const results = document.getElementById('productSearchResults');
  if (!results) return;

  const cleanedQuery = query.trim().toLowerCase();
  const matches = caviarProductSearch
    .filter((product) => {
      if (!cleanedQuery) return true;
      return `${product.title} ${product.type} ${product.tags}`.toLowerCase().includes(cleanedQuery);
    })
    .slice(0, 8);

  if (!matches.length) {
    results.innerHTML = '<div class="search-empty">No products found. Try “bob”, “deep wave”, “frontal”, or “bundles”.</div>';
    return;
  }

  results.innerHTML = matches.map((product) => `
    <a class="search-result" href="${productSearchUrl(product)}">
      <img src="${product.image}" alt="${product.title}">
      <div>
        <strong>${product.title}</strong>
        <span>${product.type}</span>
      </div>
    </a>
  `).join('');
}

function openProductSearch() {
  const panel = document.getElementById('productSearchPanel');
  const input = document.getElementById('productSearchInput');
  if (!panel || !input) return;

  document.body.classList.add('search-open');
  panel.setAttribute('aria-hidden', 'false');
  renderProductSearch(input.value);
  setTimeout(() => input.focus(), 50);
}

function closeProductSearch() {
  const panel = document.getElementById('productSearchPanel');
  document.body.classList.remove('search-open');
  if (panel) panel.setAttribute('aria-hidden', 'true');
}

setupLuxuryHeaderSearch();

// CUSTOMER PRODUCT RATINGS
const caviarRatingsKey = 'caviarProductRatings';

function getCaviarProductKeyFromUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return url.searchParams.get('product') || '';
  } catch (error) {
    return '';
  }
}

function readCaviarRatings() {
  try {
    const stored = JSON.parse(localStorage.getItem(caviarRatingsKey) || '{}');
    return stored && typeof stored === 'object' ? stored : {};
  } catch (error) {
    return {};
  }
}

function saveCaviarRatings(ratings) {
  localStorage.setItem(caviarRatingsKey, JSON.stringify(ratings));
}

function ratingStarsFromAverage(average) {
  const rounded = Math.max(1, Math.min(5, Math.round(average)));
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

function ratingSummaryHtml(productKey) {
  const ratings = readCaviarRatings();
  const productRatings = Array.isArray(ratings[productKey]) ? ratings[productKey] : [];

  if (!productRatings.length) {
    return '<span class="rating-empty">No ratings yet</span>';
  }

  const average = productRatings.reduce((sum, review) => sum + Number(review.rating || 0), 0) / productRatings.length;
  const countLabel = productRatings.length === 1 ? '1 customer rating' : `${productRatings.length} customer ratings`;

  return `<span class="rating-stars">${ratingStarsFromAverage(average)}</span> <span>${average.toFixed(1)} / 5 (${countLabel})</span>`;
}

function renderCaviarRatings() {
  document.querySelectorAll('.product-rating, .stars').forEach((ratingEl) => {
    const cardLink = ratingEl.closest('a[href*="product.html?product="]');
    const productKey = cardLink ? getCaviarProductKeyFromUrl(cardLink.getAttribute('href')) : '';
    if (productKey) ratingEl.innerHTML = ratingSummaryHtml(productKey);
  });

  const productRatingEl = document.querySelector('.product-stars');
  const currentProductKey = getCaviarProductKeyFromUrl(window.location.href);
  if (productRatingEl && currentProductKey) {
    productRatingEl.innerHTML = ratingSummaryHtml(currentProductKey);
  }
}

function setupCaviarProductReviewForm() {
  const form = document.getElementById('productReviewForm');
  if (!form) return;

  const productKey = getCaviarProductKeyFromUrl(window.location.href);
  const message = document.getElementById('productReviewMessage');

  if (!productKey) {
    form.style.display = 'none';
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const rating = Number(form.elements.rating?.value || 0);
    const name = String(form.elements.name?.value || '').trim();

    if (!rating || rating < 1 || rating > 5) {
      if (message) message.innerText = 'Please choose a star rating first.';
      return;
    }

    const ratings = readCaviarRatings();
    const nextReview = {
      rating,
      name: name || 'Customer',
      date: new Date().toISOString()
    };

    ratings[productKey] = Array.isArray(ratings[productKey]) ? ratings[productKey] : [];
    ratings[productKey].push(nextReview);
    saveCaviarRatings(ratings);

    form.reset();
    renderCaviarRatings();
    if (message) message.innerText = 'Thank you. Your product rating has been added.';
  });
}

renderCaviarRatings();
setupCaviarProductReviewForm();

// SMOOTH SCROLL FOR SAME-PAGE LINKS
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      }
    }
  });
});

// FORM SUBMISSION
const signupForm = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');

if (signupForm && formMessage) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const email = emailInput ? emailInput.value.trim() : '';
    const fullName = [firstNameInput?.value.trim(), lastNameInput?.value.trim()].filter(Boolean).join(' ');

    const subject = encodeURIComponent('Newsletter signup request');
    const body = encodeURIComponent(
      `Hello Caviar Curls,%0D%0A%0D%0APlease add ${fullName || 'me'} to the newsletter list.%0D%0AEmail: ${email || 'Not provided'}%0D%0A%0D%0AThank you.`
    );

    formMessage.innerHTML = `Thank you. Please <a href="mailto:caviarcurls@gmail.com?subject=${subject}&body=${body}">tap here to confirm your signup by email</a>.`;
    signupForm.reset();
  });
}

document.querySelectorAll('.footer-signup').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = form.querySelector('input[type="email"]')?.value.trim() || '';
    const subject = encodeURIComponent('Newsletter signup request');
    const body = encodeURIComponent(
      `Hello Caviar Curls,%0D%0A%0D%0APlease add me to the newsletter list.%0D%0AEmail: ${email || 'Not provided'}%0D%0A%0D%0AThank you.`
    );

    window.location.href = `mailto:caviarcurls@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
});

// SCROLL REVEAL
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

// HOVER ANIMATION HOOKS
document.querySelectorAll('.btn, .site-nav a').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('hovered');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('hovered');
  });
});

// PARALLAX HERO
const heroSection = document.querySelector('.hero, .shop-hero');

window.addEventListener('scroll', () => {
  if (!heroSection || window.innerWidth <= 760) return;
  const scrollY = window.scrollY;
  heroSection.style.backgroundPosition = `center ${scrollY * 0.35}px`;
});

// CART
const cartToggle = document.querySelector('.cart-toggle');
const cartPanel = document.getElementById('cartPanel');
const cartBackdrop = document.getElementById('cartBackdrop');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutBtn = document.getElementById('checkoutBtn');

let cart = JSON.parse(localStorage.getItem('caviarCart')) || [];
let modalCartProduct = null;
let stripePublishableKey = '';

async function loadStoreConfig() {
  try {
    const response = await fetch('/config', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    stripePublishableKey = data.stripePublishableKey || '';
  } catch (error) {
    console.warn('Store config could not be loaded.', error);
  }
}

loadStoreConfig();

function saveCart() {
  localStorage.setItem('caviarCart', JSON.stringify(cart));
}

function formatPrice(value) {
  return `£${Number(value).toFixed(2)}`;
}

function openCart() {
  if (!cartPanel || !cartBackdrop) return;
  cartPanel.classList.add('open');
  cartBackdrop.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCartPanel() {
  if (!cartPanel || !cartBackdrop) return;
  cartPanel.classList.remove('open');
  cartBackdrop.classList.remove('show');
  document.body.style.overflow = '';
}

function addToCart(name, price) {
  cart.push({
    name,
    price: Number(price)
  });
  renderCart();
  openCart();
}

function renderCart() {
  if (!cartCount || !cartItems || !cartTotal) return;

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
    cartTotal.textContent = '£0.00';
    saveCart();
    return;
  }

  let total = 0;
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    total += Number(item.price);

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-price">${formatPrice(item.price)}</div>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(itemEl);
  });

  cartTotal.textContent = formatPrice(total);
  saveCart();

  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      cart.splice(index, 1);
      renderCart();
    });
  });
}

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    addToCart(name, price);
  });
});

if (cartToggle) cartToggle.addEventListener('click', openCart);
if (closeCart) closeCart.addEventListener('click', closeCartPanel);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartPanel);

// STRIPE CHECKOUT
async function startStripeCheckout() {
  if (!Array.isArray(cart) || cart.length === 0) {
    alert('Your bag is empty.');
    return;
  }

  if (!window.Stripe) {
    alert('Stripe could not load. Please refresh the page.');
    return;
  }

  if (!stripePublishableKey) {
    alert('Checkout is not configured yet. Add your live Stripe publishable key before launching.');
    return;
  }

  try {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: cart
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unable to start checkout.');
    }

    const stripe = Stripe(stripePublishableKey);

    const result = await stripe.redirectToCheckout({
      sessionId: data.id
    });

    if (result.error) {
      alert(result.error.message || 'Unable to redirect to checkout.');
    }
  } catch (error) {
    console.error('Stripe checkout error:', error);
    alert(error.message || 'Checkout failed. Please try again.');
  }
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', startStripeCheckout);
}

// SHOP FILTERS
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    productCards.forEach((card) => {
      const category = card.dataset.category || '';
      const matches = filter === 'all' || category.includes(filter);
      card.style.display = matches ? '' : 'none';
    });
  });
});

// QUICK VIEW MODAL
const productModal = document.getElementById("productModal");
const productModalBackdrop = document.getElementById("productModalBackdrop");
const productModalClose = document.getElementById("productModalClose");
const quickViewButtons = document.querySelectorAll(".quick-view-btn");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalNote = document.getElementById("modalNote");
const modalThumbs = document.getElementById("modalThumbs");
const modalPrevImage = document.getElementById("modalPrevImage");
const modalNextImage = document.getElementById("modalNextImage");
const modalAddToCart = document.getElementById("modalAddToCart");
const modalImageWrap = document.querySelector(".product-modal-image-wrap");
let modalGalleryImages = [];
let modalGalleryIndex = 0;
let modalTouchStartX = 0;
let modalTouchStartY = 0;
let modalTouchActive = false;
let modalZoomed = false;

function resetModalZoom() {
  if (!modalImage) return;
  modalZoomed = false;
  modalImage.classList.remove("zoomed");
  modalImage.style.transformOrigin = "center center";
}

function updateModalGallery() {
  if (!modalImage || !modalGalleryImages.length) return;

  const currentImage = modalGalleryImages[modalGalleryIndex] || modalGalleryImages[0];
  modalImage.src = currentImage;
  resetModalZoom();

  if (modalThumbs) {
    [...modalThumbs.children].forEach((thumb, index) => {
      thumb.classList.toggle("active", index === modalGalleryIndex);
    });
  }

  if (modalPrevImage) {
    modalPrevImage.style.display = modalGalleryImages.length > 1 ? "inline-flex" : "none";
  }

  if (modalNextImage) {
    modalNextImage.style.display = modalGalleryImages.length > 1 ? "inline-flex" : "none";
  }
}

function buildModalThumbs(images, productName) {
  if (!modalThumbs) return;
  modalThumbs.innerHTML = "";

  images.forEach((imageSrc, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `modal-thumb${index === 0 ? " active" : ""}`;
    button.setAttribute("aria-label", `${productName} image ${index + 1}`);

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = `${productName} image ${index + 1}`;
    button.appendChild(img);

    button.addEventListener("click", () => {
      modalGalleryIndex = index;
      updateModalGallery();
    });

    modalThumbs.appendChild(button);
  });
}

function openProductModal(product) {
  if (!productModal || !modalName || !modalPrice || !modalDesc || !modalImage) return;

  const images = Array.isArray(product.images) && product.images.length ? product.images : [product.image];
  modalGalleryImages = images.filter(Boolean);
  modalGalleryIndex = 0;

  modalName.textContent = product.name || "Product";
  modalPrice.textContent = product.displayPrice || `£${product.price || 0}`;
  modalDesc.textContent = product.desc || "";
  modalImage.alt = product.name || "Product preview";

  if (modalNote) {
    modalNote.textContent = product.note || (modalGalleryImages.length > 1
      ? "Swipe left or right to explore the gallery, then tap the image for a closer luxury zoom."
      : "Tap the image for a closer luxury zoom and inspect the texture, finish, and premium detail."
    );
  }

  buildModalThumbs(modalGalleryImages, product.name || "Product");
  updateModalGallery();

  modalCartProduct = {
    name: product.name,
    price: Number(product.price) || 0
  };

  productModal.classList.add("show");
  productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

quickViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProductModal({
      name: button.dataset.name,
      price: Number(String(button.dataset.price).replace(/[^0-9.]/g, "")) || 0,
      displayPrice: button.dataset.price,
      desc: button.dataset.desc,
      image: button.dataset.image,
      images: (button.dataset.images || "").split(",").map((item) => item.trim()).filter(Boolean),
      note: button.dataset.note
    });
  });
});

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove("show");
  productModal.setAttribute("aria-hidden", "true");
  resetModalZoom();
  document.body.style.overflow = "";
}

if (productModalBackdrop) {
  productModalBackdrop.addEventListener("click", closeProductModal);
}

if (productModalClose) {
  productModalClose.addEventListener("click", closeProductModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProductModal();
    closeCartPanel();
  }

  if (productModal && productModal.classList.contains("show") && modalGalleryImages.length > 1) {
    if (e.key === "ArrowLeft") {
      modalGalleryIndex = (modalGalleryIndex - 1 + modalGalleryImages.length) % modalGalleryImages.length;
      updateModalGallery();
    }

    if (e.key === "ArrowRight") {
      modalGalleryIndex = (modalGalleryIndex + 1) % modalGalleryImages.length;
      updateModalGallery();
    }
  }
});

if (modalPrevImage) {
  modalPrevImage.addEventListener("click", () => {
    if (!modalGalleryImages.length) return;
    modalGalleryIndex = (modalGalleryIndex - 1 + modalGalleryImages.length) % modalGalleryImages.length;
    updateModalGallery();
  });
}

if (modalNextImage) {
  modalNextImage.addEventListener("click", () => {
    if (!modalGalleryImages.length) return;
    modalGalleryIndex = (modalGalleryIndex + 1) % modalGalleryImages.length;
    updateModalGallery();
  });
}

if (modalAddToCart) {
  modalAddToCart.addEventListener("click", () => {
    if (!modalCartProduct) return;
    addToCart(modalCartProduct.name, modalCartProduct.price);
    closeProductModal();
  });
}

// BUNDLE PRICING FROM YOUR SPREADSHEET
document.addEventListener("DOMContentLoaded", function () {
  const bundlePrices = {
    straight: {
      grade14A: {
        '14"': 38,
        '16"': 46,
        '18"': 56,
        '20"': 65,
        '22"': 75,
        '24"': 84,
        '26"': 90,
        '28"': 100,
        '30"': 110,
        '32"': 120
      },
      rawHair: {
        '14"': 45,
        '16"': 50,
        '18"': 60,
        '20"': 70,
        '22"': 80,
        '24"': 90,
        '26"': 100,
        '28"': 110,
        '30"': 120,
        '32"': 130
      }
    },
    bodyWave: {
      grade14A: {
        '14"': 38,
        '16"': 46,
        '18"': 56,
        '20"': 65,
        '22"': 75,
        '24"': 84,
        '26"': 90,
        '28"': 100,
        '30"': 110,
        '32"': 120
      },
      rawHair: {
        '14"': 45,
        '16"': 50,
        '18"': 60,
        '20"': 70,
        '22"': 80,
        '24"': 90,
        '26"': 100,
        '28"': 110,
        '30"': 120,
        '32"': 130
      }
    }
  };

  function formatBundleHairType(value) {
    if (value === "grade14A") return "Grade 14A";
    if (value === "rawHair") return "Raw Hair";
    return value;
  }

  function setupBundleCard(config) {
    const hairTypeSelect = document.getElementById(config.hairTypeId);
    const lengthSelect = document.getElementById(config.lengthId);
    const priceEl = document.getElementById(config.priceId);
    const quickViewBtn = document.getElementById(config.quickViewId);
    const addToCartBtn = document.getElementById(config.addToCartId);

    if (!hairTypeSelect || !lengthSelect || !priceEl || !quickViewBtn || !addToCartBtn) {
      return;
    }

    function fillLengthOptions() {
      const prices = bundlePrices[config.texture][hairTypeSelect.value];
      lengthSelect.innerHTML = "";

      Object.keys(prices).forEach((inch) => {
        const option = document.createElement("option");
        option.value = inch;
        option.textContent = `${inch} - £${prices[inch]}`;
        lengthSelect.appendChild(option);
      });
    }

    function getCurrentBundleData() {
      const hairType = hairTypeSelect.value;
      const length = lengthSelect.value;
      const price = bundlePrices[config.texture][hairType][length];

      return {
        name: `${config.label} Bundle - ${formatBundleHairType(hairType)} / ${length}`,
        price: Number(price),
        displayPrice: `£${price}`,
        image: config.image,
        desc: `Texture: ${config.label}. Hair type: ${formatBundleHairType(hairType)}. Length: ${length}.`,
        note: 'A refined bundle finish designed for polished, everyday luxury.',
        images: [config.image]
      };
    }

    function updatePrice() {
      const current = getCurrentBundleData();
      priceEl.textContent = current.displayPrice;
    }

    fillLengthOptions();
    updatePrice();

    hairTypeSelect.addEventListener("change", function () {
      fillLengthOptions();
      updatePrice();
    });

    lengthSelect.addEventListener("change", updatePrice);

    addToCartBtn.addEventListener("click", function () {
      const current = getCurrentBundleData();
      addToCart(current.name, current.price);
    });

    quickViewBtn.addEventListener("click", function () {
      const current = getCurrentBundleData();

      openProductModal(current);
    });
  }

  setupBundleCard({
    texture: "straight",
    label: "Straight",
    image: "images/bundle-single.jpg",
    hairTypeId: "straightBundleHairType",
    lengthId: "straightBundleLength",
    priceId: "straightBundlePrice",
    quickViewId: "straightBundleQuickViewBtn",
    addToCartId: "straightBundleAddToCartBtn"
  });

  setupBundleCard({
    texture: "bodyWave",
    label: "Body Wave",
    image: "images/bundle-bodywave.jpg",
    hairTypeId: "bodyWaveBundleHairType",
    lengthId: "bodyWaveBundleLength",
    priceId: "bodyWaveBundlePrice",
    quickViewId: "bodyWaveBundleQuickViewBtn",
    addToCartId: "bodyWaveBundleAddToCartBtn"
  });

  renderCart();
});
// WIG PRICING FROM SPREADSHEET
document.addEventListener("DOMContentLoaded", function () {
  const cambodianStraightPrices = {
    '16"': 100,
    '18"': 115,
    '20"': 130,
    '22"': 155,
    '24"': 170,
    '26"': 185,
    '28"': 200,
    '30"': 215
  };

  const cambodianBodyWavePrices = {
    '16"': 100,
    '18"': 115,
    '20"': 130,
    '22"': 155,
    '24"': 170,
    '26"': 185,
    '28"': 200,
    '30"': 215
  };

  const cambodianLooseWavePrices = {
    '16"': 110,
    '18"': 120,
    '20"': 135,
    '22"': 160,
    '24"': 175,
    '26"': 190,
    '28"': 205,
    '30"': 220
  };

  const cambodianDeepWavePrices = {
    '16"': 110,
    '18"': 120,
    '20"': 135,
    '22"': 160,
    '24"': 175,
    '26"': 190,
    '28"': 205,
    '30"': 220
  };

  const vietnameseStraightPrices = {
    '13x4hd': {
      '20"': 125,
      '22"': 135,
      '24"': 160,
      '26"': 190,
      '28"': 220,
      '30"': 245,
      '32"': 285,
      '34"': 330
    },
    '5x5hd': {
      '20"': 105,
      '22"': 120,
      '24"': 145,
      '26"': 170,
      '28"': 200,
      '30"': 225,
      '32"': 260,
      '34"': 300
    },
    '2x6hd': {
      '20"': 100,
      '22"': 115,
      '24"': 140,
      '26"': 165,
      '28"': 195,
      '30"': 220,
      '32"': 255,
      '34"': 295
    }
  };

  function setupSingleOptionWig(config) {
    const lengthSelect = document.getElementById(config.lengthId);
    const priceEl = document.getElementById(config.priceId);
    const quickViewBtn = document.getElementById(config.quickViewId);
    const addToCartBtn = document.getElementById(config.addToCartId);

    if (!lengthSelect || !priceEl || !quickViewBtn || !addToCartBtn) return;

    function fillLengths() {
      lengthSelect.innerHTML = "";
      Object.keys(config.priceMap).forEach((length) => {
        const option = document.createElement("option");
        option.value = length;
        option.textContent = `${length} - £${config.priceMap[length]}`;
        lengthSelect.appendChild(option);
      });
    }

    function getCurrentData() {
      const length = lengthSelect.value;
      const price = config.priceMap[length];

      return {
        name: `${config.name} / ${length}`,
        price: price,
        displayPrice: `£${price}`,
        image: config.image,
        desc: `${config.description} Length: ${length}.`,
        note: 'Premium density and lace work for a full, soft luxury finish.',
        images: [config.image]
      };
    }

    function updatePrice() {
      const current = getCurrentData();
      priceEl.textContent = current.displayPrice;
    }

    fillLengths();
    updatePrice();

    lengthSelect.addEventListener("change", updatePrice);

    addToCartBtn.addEventListener("click", function () {
      const current = getCurrentData();
      addToCart(current.name, current.price);
    });

    quickViewBtn.addEventListener("click", function () {
      const current = getCurrentData();

      openProductModal(current);
    });
  }

  function formatWigType(value) {
    const labels = {
      "13x4hd": "13x4 HD",
      "5x5hd": "5x5 HD",
      "2x6hd": "2x6 HD"
    };
    return labels[value] || value;
  }

  function setupVietnameseGalleryWig() {
    const typeSelect = document.getElementById("vietnameseStraightType");
    const lengthSelect = document.getElementById("vietnameseStraightLength");
    const priceEl = document.getElementById("vietnameseStraightPrice");
    const quickViewBtn = document.getElementById("vietnameseStraightQuickView");
    const addToCartBtn = document.getElementById("vietnameseStraightAddToCart");
    const mainImage = document.getElementById("vietnameseGalleryMain");
    const thumbs = document.querySelectorAll(".gallery-thumb");

    if (!typeSelect || !lengthSelect || !priceEl || !quickViewBtn || !addToCartBtn) return;

    function fillLengths() {
      const selectedType = typeSelect.value;
      const prices = vietnameseStraightPrices[selectedType];
      lengthSelect.innerHTML = "";

      Object.keys(prices).forEach((length) => {
        const option = document.createElement("option");
        option.value = length;
        option.textContent = `${length} - £${prices[length]}`;
        lengthSelect.appendChild(option);
      });
    }

    function getCurrentData() {
      const selectedType = typeSelect.value;
      const selectedLength = lengthSelect.value;
      const price = vietnameseStraightPrices[selectedType][selectedLength];
      const currentImage = mainImage ? mainImage.getAttribute("src") : "images/Straight Vietnamese Raw SDD hair 1.jpg";

      return {
        name: `Straight Vietnamese RAW SDD Wig - ${formatWigType(selectedType)} / ${selectedLength}`,
        price: price,
        displayPrice: `£${price}`,
        image: currentImage,
        desc: `Luxury straight Vietnamese raw hair wig. Wig type: ${formatWigType(selectedType)}. Length: ${selectedLength}.`,
        note: 'Explore both gallery images to view the sleek finish from every angle.',
        images: ['images/Straight Vietnamese Raw SDD hair 1.jpg', 'images/Straight Vietnamese Raw SDD hair 2.jpg']
      };
    }

    function updatePrice() {
      const current = getCurrentData();
      priceEl.textContent = current.displayPrice;
    }

    fillLengths();
    updatePrice();

    typeSelect.addEventListener("change", function () {
      fillLengths();
      updatePrice();
    });

    lengthSelect.addEventListener("change", updatePrice);

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        thumbs.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        if (mainImage) {
          mainImage.src = this.dataset.target;
        }
      });
    });

    addToCartBtn.addEventListener("click", function () {
      const current = getCurrentData();
      addToCart(current.name, current.price);
    });

    quickViewBtn.addEventListener("click", function () {
      const current = getCurrentData();

      openProductModal(current);
    });
  }

  setupSingleOptionWig({
    lengthId: "straightCambodianLength",
    priceId: "straightCambodianPrice",
    quickViewId: "straightCambodianQuickView",
    addToCartId: "straightCambodianAddToCart",
    name: "Straight Cambodian Virgin Wig",
    description: "13x4 HD lace frontal wig with 250% density.",
    image: "images/Straight Cambodian Virgin hair.jpg",
    priceMap: cambodianStraightPrices
  });

  setupSingleOptionWig({
    lengthId: "bodyWaveCambodianLength",
    priceId: "bodyWaveCambodianPrice",
    quickViewId: "bodyWaveCambodianQuickView",
    addToCartId: "bodyWaveCambodianAddToCart",
    name: "Body Wave Cambodian Virgin Wig",
    description: "13x4 HD lace frontal wig with 250% density.",
    image: "images/Body wave Cambodian virgin hair.jpg",
    priceMap: cambodianBodyWavePrices
  });

  setupSingleOptionWig({
    lengthId: "looseWaveCambodianLength",
    priceId: "looseWaveCambodianPrice",
    quickViewId: "looseWaveCambodianQuickView",
    addToCartId: "looseWaveCambodianAddToCart",
    name: "Loose Wave Cambodian Virgin Wig",
    description: "13x4 HD lace frontal wig with 250% density.",
    image: "images/Loose wave Cambodian virgin hair.jpg",
    priceMap: cambodianLooseWavePrices
  });

  setupSingleOptionWig({
    lengthId: "deepWaveCambodianLength",
    priceId: "deepWaveCambodianPrice",
    quickViewId: "deepWaveCambodianQuickView",
    addToCartId: "deepWaveCambodianAddToCart",
    name: "Deep Wave Cambodian Virgin Wig",
    description: "13x4 HD lace frontal wig with 250% density.",
    image: "images/Deep wave Cambodian virgin hair.jpg",
    priceMap: cambodianDeepWavePrices
  });

  setupVietnameseGalleryWig();
});

if (modalImageWrap && modalImage) {
  modalImageWrap.addEventListener("click", (event) => {
    const rect = modalImage.getBoundingClientRect();
    const originX = ((event.clientX - rect.left) / rect.width) * 100;
    const originY = ((event.clientY - rect.top) / rect.height) * 100;

    modalZoomed = !modalZoomed;
    modalImage.classList.toggle("zoomed", modalZoomed);
    modalImage.style.transformOrigin = `${Math.max(0, Math.min(100, originX))}% ${Math.max(0, Math.min(100, originY))}%`;

    if (!modalZoomed) {
      modalImage.style.transformOrigin = "center center";
    }
  });

  modalImageWrap.addEventListener("touchstart", (event) => {
    if (!event.touches.length) return;
    modalTouchActive = true;
    modalTouchStartX = event.touches[0].clientX;
    modalTouchStartY = event.touches[0].clientY;
  }, { passive: true });

  modalImageWrap.addEventListener("touchmove", (event) => {
    if (!modalTouchActive || !event.touches.length) return;
    const deltaX = event.touches[0].clientX - modalTouchStartX;
    const deltaY = event.touches[0].clientY - modalTouchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 12) {
      event.preventDefault();
    }
  }, { passive: false });

  modalImageWrap.addEventListener("touchend", (event) => {
    if (!modalTouchActive) return;
    modalTouchActive = false;

    const touch = event.changedTouches && event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - modalTouchStartX;
    const deltaY = touch.clientY - modalTouchStartY;
    const isSwipe = Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY);
    const isTap = Math.abs(deltaX) < 12 && Math.abs(deltaY) < 12;

    if (isSwipe && modalGalleryImages.length > 1) {
      if (deltaX < 0) {
        modalGalleryIndex = (modalGalleryIndex + 1) % modalGalleryImages.length;
      } else {
        modalGalleryIndex = (modalGalleryIndex - 1 + modalGalleryImages.length) % modalGalleryImages.length;
      }
      updateModalGallery();
      return;
    }

    if (isTap) {
      const rect = modalImage.getBoundingClientRect();
      const originX = ((touch.clientX - rect.left) / rect.width) * 100;
      const originY = ((touch.clientY - rect.top) / rect.height) * 100;
      modalZoomed = !modalZoomed;
      modalImage.classList.toggle("zoomed", modalZoomed);
      modalImage.style.transformOrigin = `${Math.max(0, Math.min(100, originX))}% ${Math.max(0, Math.min(100, originY))}%`;
      if (!modalZoomed) {
        modalImage.style.transformOrigin = "center center";
      }
    }
  }, { passive: true });
}


// SUPPORT PAGE FAQ
const faqButtons = document.querySelectorAll('.faq-item');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isOpen = button.classList.contains('active');
    faqButtons.forEach((item) => {
      item.classList.remove('active');
      const next = item.nextElementSibling;
      if (next && next.classList.contains('faq-answer')) {
        next.classList.remove('open');
      }
    });
    if (!isOpen && answer && answer.classList.contains('faq-answer')) {
      button.classList.add('active');
      answer.classList.add('open');
    }
  });
});

// SUPPORT FORM
const supportForm = document.getElementById('supportForm');
const supportFormMessage = document.getElementById('supportFormMessage');

if (supportForm && supportFormMessage) {
  supportForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('supportName')?.value.trim() || '';
    const email = document.getElementById('supportEmail')?.value.trim() || '';
    const order = document.getElementById('supportOrder')?.value.trim() || 'Not provided';
    const issue = document.getElementById('supportIssue')?.value.trim() || 'Support request';
    const message = document.getElementById('supportMessage')?.value.trim() || '';

    const subject = encodeURIComponent(`Customer Support: ${issue}`);
    const body = encodeURIComponent(
      `Hello Caviar Curls,%0D%0A%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0AOrder Number: ${order}%0D%0AIssue Type: ${issue}%0D%0A%0D%0AMessage:%0D%0A${message}%0D%0A%0D%0AThank you.`
    );

    supportFormMessage.innerHTML = `Please <a href="mailto:caviarcurls@gmail.com?subject=${subject}&body=${body}">tap here to send your support email</a>.`;
  });
}


// CART/CHECKOUT PAGE HANDOFF
document.addEventListener('click', (event) => {
  const link = event.target.closest('.checkout-link');
  if (!link) return;

  const storedCart = JSON.parse(localStorage.getItem('caviarCart') || '[]');
  if (!Array.isArray(storedCart) || storedCart.length === 0) return;

  const subtotal = storedCart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  localStorage.setItem('checkoutProduct', JSON.stringify({
    title: storedCart.length === 1 ? (storedCart[0].title || storedCart[0].name) : `${storedCart.length} Caviar Curls items`,
    type: storedCart.length === 1 ? storedCart[0].type : 'Mixed order',
    length: storedCart.length === 1 ? storedCart[0].length : '',
    image: storedCart[0].image || '',
    price: subtotal,
    quantity: storedCart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0),
    items: storedCart
  }));
});
// END CART/CHECKOUT PAGE HANDOFF

// CART PAGE RENDER
function renderCartPageFromStorage() {
  const itemsWrap = document.querySelector('.drawer-items');
  const cartHeading = document.querySelector('.cart-heading');
  const subtotalEls = document.querySelectorAll('.subtotal-price');
  const totalEls = document.querySelectorAll('.total-price');

  if (!itemsWrap || !cartHeading) return;

  const storedCart = JSON.parse(localStorage.getItem('caviarCart') || '[]');
  if (!Array.isArray(storedCart) || storedCart.length === 0) {
    itemsWrap.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
    cartHeading.innerHTML = 'CART <span>(0 ITEMS)</span>';
    subtotalEls.forEach((el) => { el.innerText = '£0.00'; });
    totalEls.forEach((el) => { el.innerText = '£0.00'; });

    const subtotalLabel = document.querySelector('.summary-line small');
    if (subtotalLabel) {
      subtotalLabel.innerText = '(0 items)';
    }
    return;
  }

  let subtotal = 0;
  let totalItems = 0;

  itemsWrap.innerHTML = '';

  storedCart.forEach((item, index) => {
    const quantity = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    subtotal += price * quantity;
    totalItems += quantity;

    const title = item.title || item.name || 'Caviar Curls Item';
    const type = item.type || 'Luxury Hair';
    const length = String(item.length || '').replace(/"/g, '');
    const image = item.image || '';

    itemsWrap.innerHTML += `
      <div class="drawer-item">
        <div class="drawer-image">
          <img src="${image}" alt="${title}" onerror="this.style.display='none'">
          <span class="item-confirm">✓</span>
        </div>

        <div class="drawer-info">
          <h3>${title}</h3>
          <p>Type - ${type}</p>
          <p>Length - ${length}"</p>
          <div class="drawer-price">£${(price * quantity).toFixed(2)}</div>

          <div class="qty-wrap">
            <button type="button" data-cart-action="decrease" data-index="${index}" aria-label="Decrease quantity">−</button>
            <span>${quantity}</span>
            <button type="button" data-cart-action="increase" data-index="${index}" aria-label="Increase quantity">+</button>
          </div>

          <button class="remove-item" type="button" data-cart-action="remove" data-index="${index}" aria-label="Remove item">×</button>
        </div>
      </div>
    `;
  });

  cartHeading.innerHTML = `CART <span>(${totalItems} ${totalItems === 1 ? 'ITEM' : 'ITEMS'})</span>`;
  subtotalEls.forEach((el) => { el.innerText = `£${subtotal.toFixed(2)}`; });
  totalEls.forEach((el) => { el.innerText = `£${subtotal.toFixed(2)}`; });

  const subtotalLabel = document.querySelector('.summary-line small');
  if (subtotalLabel) {
    subtotalLabel.innerText = `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;
  }
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-cart-action]');
  if (!button) return;

  const action = button.dataset.cartAction;
  const index = Number(button.dataset.index);
  const storedCart = JSON.parse(localStorage.getItem('caviarCart') || '[]');
  if (!Array.isArray(storedCart) || !storedCart[index]) return;

  if (action === 'increase') {
    storedCart[index].quantity = (Number(storedCart[index].quantity) || 1) + 1;
  }

  if (action === 'decrease') {
    const nextQuantity = (Number(storedCart[index].quantity) || 1) - 1;
    if (nextQuantity <= 0) {
      storedCart.splice(index, 1);
    } else {
      storedCart[index].quantity = nextQuantity;
    }
  }

  if (action === 'remove') {
    storedCart.splice(index, 1);
  }

  localStorage.setItem('caviarCart', JSON.stringify(storedCart));
  renderCartPageFromStorage();
});

renderCartPageFromStorage();
// END CART PAGE RENDER
