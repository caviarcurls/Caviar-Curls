const products = {

straightbundles14a: {
title: "Straight Bundles Grade 14A",
type: "Hair Bundles",
image: "images/Straight Cambodian Virgin hair.jpg",
description: "Luxury straight bundles with silky finish and premium quality.",
prices: {
"14": 85,
"16": 95,
"18": 105,
"20": 115,
"22": 125,
"24": 135
}
},

straightbundlesraw: {
title: "Straight Bundles Raw Hair",
type: "Raw Hair Bundles",
image: "images/wig1.jpg",
description: "Premium RAW straight bundles with natural fullness and luxury texture.",
prices: {
"14": 150,
"16": 165,
"18": 180,
"20": 195,
"22": 210,
"24": 225
}
},

bodywave14a: {
title: "Body Wave Bundles Grade 14A",
type: "Hair Bundles",
image: "images/Body wave Cambodian virgin hair.jpg",
description: "Soft luxury body wave bundles with premium bounce.",
prices: {
"14": 90,
"16": 100,
"18": 110,
"20": 120,
"22": 130,
"24": 140
}
},

bodywaveraw: {
title: "Body Wave Bundles Raw Hair",
type: "Raw Hair Bundles",
image: "images/home.jpg",
description: "Luxury RAW body wave bundles with flawless texture.",
prices: {
"14": 160,
"16": 175,
"18": 190,
"20": 205,
"22": 220,
"24": 235
}
}

};

const params = new URLSearchParams(window.location.search);

const productKey = params.get("product");

const product = products[productKey];

if(product){

document.getElementById("product-title").innerText =
product.title;

document.getElementById("product-type").innerText =
product.type;

document.getElementById("product-description").innerText =
product.description;

document.getElementById("product-image").src =
product.image;

const lengthSelect =
document.getElementById("length-select");

Object.keys(product.prices).forEach(length => {

const option =
document.createElement("option");

option.value = length;

option.textContent = `${length}"`;

lengthSelect.appendChild(option);

});

function updatePrice(){

const selectedLength =
lengthSelect.value;

document.getElementById("product-price").innerText =
`£${product.prices[selectedLength]}`;

}

lengthSelect.addEventListener(
"change",
updatePrice
);

updatePrice();

}
