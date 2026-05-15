const wigs = [

  {
    id: "straight-cambodian-black",
    name: "Straight Cambodian Virgin Wig",
    category: "straight",
    image: "images/Straight Cambodian Virgin hair.jpg",
    description: "Silky luxury straight wig with HD lace.",
    badge: "BESTSELLER",
    variants: {
      '16" - 13x4 HD': 100,
      '18" - 13x4 HD': 115,
      '20" - 13x4 HD': 130,
      '22" - 13x4 HD': 155,
      '24" - 13x4 HD': 170,
      '26" - 13x4 HD': 185,
      '28" - 13x4 HD': 200,
      '30" - 13x4 HD': 215
    }
  },

  {
    id: "bodywave-natural",
    name: "Body Wave Cambodian Wig",
    category: "wave",
    image: "images/Body wave Cambodian virgin hair.jpg",
    description: "Luxury body wave texture with HD lace.",
    badge: "LUXURY",
    variants: {
      '16" - 13x6 HD': 100,
      '18" - 13x6 HD': 115,
      '20" - 13x6 HD': 130,
      '22" - 13x6 HD': 155,
      '24" - 13x6 HD': 170,
      '26" - 13x6 HD': 185,
      '28" - 13x6 HD': 200,
      '30" - 13x6 HD': 215
    }
  },

  {
    id: "deepwave-natural",
    name: "Deep Wave Cambodian Wig",
    category: "wave",
    image: "images/Deep wave Cambodian virgin hair.jpg",
    description: "Defined luxury curls with premium volume.",
    badge: "TRENDING",
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
    id: "loosewave-natural",
    name: "Loose Wave Cambodian Wig",
    category: "wave",
    image: "images/Loose wave Cambodian virgin hair.jpg",
    description: "Soft luxury loose wave texture.",
    badge: "HOT",
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
    id: "ssd-bodywave-brown",
    name: "SSD Bodywave Brown 250% Density Wig",
    category: "wave",
    image: "images/bodywave-brown.jpg",
    description: "Luxury brown SSD bodywave wig.",
    badge: "250% DENSITY",
    variants: {
      '16" - 13x6 HD': 145,
      '18" - 13x6 HD': 150,
      '20" - 13x6 HD': 158,
      '22" - 13x6 HD': 163,
      '24" - 13x6 HD': 170,
      '26" - 13x6 HD': 185
    }
  },

  {
    id: "ssd-bodywave-highlight",
    name: "SSD Blonde Highlight 250% Density Wig",
    category: "highlight",
    image: "images/blonde-highlight.jpg",
    description: "Luxury blonde highlight SSD wig.",
    badge: "BLONDE",
    variants: {
      '16" - 13x6 HD': 145,
      '18" - 13x6 HD': 150,
      '20" - 13x6 HD': 158,
      '22" - 13x6 HD': 163,
      '24" - 13x6 HD': 170,
      '26" - 13x6 HD': 185
    }
  },

  {
    id: "jetblack-bob",
    name: "Jet Black Bob Wig",
    category: "bob",
    image: "images/bob.jpg",
    description: "Luxury jet black HD bob wig.",
    badge: "BOB",
    variants: {
      '8\" - 13x6 HD': 105,
      '10\" - 13x6 HD': 125,
      '12\" - 13x6 HD': 145
    }
  },

  {
    id: "burgundy-bob",
    name: "Burgundy Bob Wig",
    category: "bob",
    image: "images/waterwave-burgundy.jpg",
    description: "Luxury burgundy HD bob wig.",
    badge: "BURGUNDY",
    variants: {
      '8\" - 13x6 HD': 110,
      '10\" - 13x6 HD': 130,
      '12\" - 13x6 HD': 150
    }
  },

  {
    id: "blonde-bob",
    name: "Blonde Bob Wig",
    category: "bob",
    image: "images/blonde-highlight.jpg",
    description: "Luxury blonde HD bob wig.",
    badge: "BLONDE",
    variants: {
      '8\" - 13x6 HD': 115,
      '10\" - 13x6 HD': 135,
      '12\" - 13x6 HD': 155
    }
  }

];

const shopGrid = document.querySelector(".shop-grid");

function renderProducts() {
  shopGrid.innerHTML = "";

  wigs.forEach((wig) => {

    const firstPrice = Object.values(wig.variants)[0];
    const options = Object.entries(wig.variants)
      .map(([name, price]) =>
        `<option value="${price}">${name} - £${price}</option>`
      )
      .join("");

    const card = document.createElement("article");

    card.className = "luxury-product-card";

    card.innerHTML = `
      <div class="luxury-image-wrap">
        <img src="${wig.image}" alt="${wig.name}">
        <div class="luxury-badge">${wig.badge}</div>
      </div>

      <div class="luxury-product-content">
        <h3>${wig.name}</h3>

        <p class="luxury-description">
          ${wig.description}
        </p>

        <div class="luxury-price-row">
          <span class="luxury-price">
            From £${firstPrice}
          </span>
        </div>

        <select class="luxury-select">
          ${options}
        </select>

        <button class="luxury-cart-btn">
          Add To Bag
        </button>
      </div>
    `;

    shopGrid.appendChild(card);

  });

}

renderProducts();
