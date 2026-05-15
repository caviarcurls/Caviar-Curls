// MOBILE MENU

const menuBtn = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if(menuBtn){

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

}

// CART SYSTEM

let cart = JSON.parse(localStorage.getItem('caviarCart')) || [];

function saveCart(){
  localStorage.setItem('caviarCart', JSON.stringify(cart));
}

function addToCart(product){

  cart.push(product);

  saveCart();

  alert('Added to cart');

}

// PRODUCT PAGE BUTTON

const addBtn = document.querySelector('.luxury-cart-btn');

if(addBtn){

  addBtn.addEventListener('click', () => {

    const productName =
      document.querySelector('.product-details h1').innerText;

    const productPrice =
      document.querySelector('.main-price').innerText;

    const productImage =
      document.querySelector('.main-product-image').src;

    const productLength =
      document.querySelectorAll('select')[0].value;

    const productDensity =
      document.querySelectorAll('select')[1].value;

    const productLace =
      document.querySelectorAll('select')[2].value;

    addToCart({
      name: productName,
      price: productPrice,
      image: productImage,
      length: productLength,
      density: productDensity,
      lace: productLace
    });

  });

}

// CART PAGE

const cartContainer = document.querySelector('.cart-items');

if(cartContainer){

  cartContainer.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {

    total += Number(
      item.price
      .replace('£','')
      .replace('From ','')
    );

    cartContainer.innerHTML += `

    <div class="cart-item">

      <img src="${item.image}">

      <div class="cart-info">

        <h3>${item.name}</h3>

        <p>
          ${item.length} •
          ${item.lace} •
          ${item.density}
        </p>

        <div class="cart-price">
          ${item.price}
        </div>

        <button
          class="remove-btn"
          onclick="removeItem(${index})"
        >
          Remove
        </button>

      </div>

    </div>

    `;

  });

  const subtotal =
    document.querySelector('.subtotal-price');

  const totalPrice =
    document.querySelector('.total-price');

  if(subtotal){
    subtotal.innerText = `£${total}`;
  }

  if(totalPrice){
    totalPrice.innerText = `£${total}`;
  }

}

function removeItem(index){

  cart.splice(index,1);

  saveCart();

  location.reload();

}
