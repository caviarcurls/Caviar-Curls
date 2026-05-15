// MOBILE MENU
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('siteNav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('show');
  });
}

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

        if (siteNav && siteNav.classList.contains('show')) {
          siteNav.classList.remove('show');
        }
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
