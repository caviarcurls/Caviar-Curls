let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

/* =========================
SAVE CART
========================= */

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

/* =========================
UPDATE CART COUNT
========================= */

function updateCartCount(){

const countEls =
document.querySelectorAll(
".cart-count"
);

const total =
cart.reduce(
(sum,item)=>
sum + item.quantity,
0
);

countEls.forEach(el=>{

el.innerText = total;

});

}

/* =========================
OPEN CART
========================= */

function openCartDrawer(){

const drawer =
document.querySelector(
".cart-overlay"
);

if(drawer){

drawer.style.display = "flex";

document.body.style.overflow =
"hidden";

}

}

/* =========================
CLOSE CART
========================= */

function closeCartDrawer(){

const drawer =
document.querySelector(
".cart-overlay"
);

if(drawer){

drawer.style.display = "none";

document.body.style.overflow =
"auto";

}

}

/* =========================
ADD TO CART
========================= */

function addToCart(product){

const existing =
cart.find(item =>

item.id === product.id &&
item.type === product.type &&
item.length === product.length

);

if(existing){

existing.quantity += 1;

}else{

cart.push({
...product,
quantity:1
});

}

saveCart();

renderCartDrawer();

updateCartCount();

openCartDrawer();

}

/* =========================
RENDER CART
========================= */

function renderCartDrawer(){

const itemsWrap =
document.querySelector(
".drawer-items"
);

if(!itemsWrap) return;

itemsWrap.innerHTML = "";

let subtotal = 0;
let totalItems = 0;

cart.forEach((item,index)=>{

subtotal +=
item.price * item.quantity;

totalItems +=
item.quantity;

itemsWrap.innerHTML += `

<div class="drawer-item">

<img src="${item.image}">

<div class="drawer-info">

<h3>
${item.title}
</h3>

<p>
${item.type}
</p>

<p>
${item.length}"
</p>

<div class="drawer-price">
£${(
item.price * item.quantity
).toFixed(2)}
</div>

<div class="qty-wrap">

<button onclick="decreaseQty(${index})">
−
</button>

<span>
${item.quantity}
</span>

<button onclick="increaseQty(${index})">
+
</button>

</div>

<button
class="remove-item"
onclick="removeItem(${index})"
>

Remove

</button>

</div>

</div>

`;

});

const cartHeading =
document.querySelector(
".cart-heading"
);

if(cartHeading){

cartHeading.innerHTML =
`CART <span>(${totalItems} ITEMS)</span>`;

}

const subtotalEls =
document.querySelectorAll(
".subtotal-price"
);

subtotalEls.forEach(el=>{

el.innerText =
"£" + subtotal.toFixed(2);

});

const totalEls =
document.querySelectorAll(
".total-price"
);

totalEls.forEach(el=>{

el.innerText =
"£" + subtotal.toFixed(2);

});

const summaryTotal =
document.querySelector(
".summary-total span:last-child"
);

if(summaryTotal){

summaryTotal.innerText =
"£" + subtotal.toFixed(2);

}

}

/* =========================
INCREASE QTY
========================= */

function increaseQty(index){

cart[index].quantity += 1;

saveCart();

renderCartDrawer();

updateCartCount();

}

/* =========================
DECREASE QTY
========================= */

function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity -= 1;

}else{

cart.splice(index,1);

}

saveCart();

renderCartDrawer();

updateCartCount();

}

/* =========================
REMOVE ITEM
========================= */

function removeItem(index){

cart.splice(index,1);

saveCart();

renderCartDrawer();

updateCartCount();

}

/* =========================
PRODUCT PAGE
========================= */

const addToCartButtons =
document.querySelectorAll(
".luxury-cart-btn"
);

addToCartButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

const title =
document.querySelector(
".product-details h1"
)?.innerText || "";

const image =
document.querySelector(
".main-product-image"
)?.src || "";

const type =
document.querySelector(
"#type-select"
)?.value || "";

const length =
document.querySelector(
"#length-select"
)?.value || "";

const priceText =
document.querySelector(
".main-price"
)?.innerText
.replace("£","")
.replace(",","") || "0";

const price =
Number(priceText);

const product = {

id:
title + type + length,

title,
image,
type,
length,
price

};

addToCart(product);

}
);

});

/* =========================
CLOSE EVENTS
========================= */

document.addEventListener(
"click",
(e)=>{

if(
e.target.classList.contains(
"close-cart"
)
){

closeCartDrawer();

}

if(
e.target.classList.contains(
"cart-overlay"
)
){

closeCartDrawer();

}

}
);

/* =========================
INIT
========================= */

renderCartDrawer();

updateCartCount();
