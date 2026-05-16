const products = {

/* CAMBODIAN WIGS */

straightwig: {
title: "Straight Cambodian Wig",
type: "13x4 HD Lace Frontal Wig",
density: "250% Density",
lace: ["13x4 Frontal"],
image: "images/Straight Cambodian Virgin hair.jpg",
description: "Luxury Cambodian straight wig.",
prices: {
"13x4 Frontal": {
"16": 100,
"18": 115,
"20": 130,
"22": 145,
"24": 160,
"26": 175,
"28": 190,
"30": 205
}
}
},

bodywavewig: {
title: "Body Wave Cambodian Wig",
type: "13x4 HD Lace Frontal Wig",
density: "250% Density",
lace: ["13x4 Frontal"],
image: "images/Body wave Cambodian virgin hair.jpg",
description: "Luxury Cambodian body wave wig.",
prices: {
"13x4 Frontal": {
"16": 120,
"18": 135,
"20": 150,
"22": 165,
"24": 180,
"26": 195,
"28": 210,
"30": 225
}
}
},

deepwavewig: {
title: "Deep Wave Cambodian Wig",
type: "13x4 HD Lace Frontal Wig",
density: "250% Density",
lace: ["13x4 Frontal"],
image: "images/wig1.jpg",
description: "Luxury Cambodian deep wave wig.",
prices: {
"13x4 Frontal": {
"16": 130,
"18": 145,
"20": 160,
"22": 175,
"24": 190,
"26": 205,
"28": 220,
"30": 235
}
}
},

loosewavewig: {
title: "Loose Wave Cambodian Wig",
type: "13x4 HD Lace Frontal Wig",
density: "250% Density",
lace: ["13x4 Frontal"],
image: "images/home.jpg",
description: "Luxury Cambodian loose wave wig.",
prices: {
"13x4 Frontal": {
"16": 135,
"18": 150,
"20": 165,
"22": 180,
"24": 195,
"26": 210,
"28": 225,
"30": 240
}
}
},

waterwavewig: {
title: "Water Wave Cambodian Wig",
type: "13x4 HD Lace Frontal Wig",
density: "250% Density",
lace: ["13x4 Frontal"],
image: "images/wig2.jpg",
description: "Luxury Cambodian water wave wig.",
prices: {
"13x4 Frontal": {
"16": 145,
"18": 160,
"20": 175,
"22": 190,
"24": 205,
"26": 220,
"28": 235,
"30": 250
}
}
},

/* RAW VIETNAMESE */

rawvietnamese: {
title: "RAW Vietnamese Wig",
type: "RAW Vietnamese Hair",
lace: [
"13x4 HD",
"5x5 HD",
"2x6 HD"
],
image: "images/wig1.jpg",
description: "Luxury RAW Vietnamese wig.",
prices: {

"13x4 HD": {
"20": 230,
"22": 245,
"24": 260,
"26": 275,
"28": 290,
"30": 305,
"32": 320,
"34": 335
},

"5x5 HD": {
"20": 210,
"22": 225,
"24": 240,
"26": 255,
"28": 270,
"30": 285,
"32": 300,
"34": 315
},

"2x6 HD": {
"20": 220,
"22": 235,
"24": 250,
"26": 265,
"28": 280,
"30": 295,
"32": 310,
"34": 325
}

}
},

/* BOBS */

bobburgundy: {
title: "Vietnamese Bobs Burgundy",
type: "Luxury Bob Wig",
lace: [
"13x6 HD",
"5x5 HD"
],
image: "images/wig1.jpg",
description: "Luxury burgundy bob wig.",
prices: {

"13x6 HD": {
"8": 190,
"10": 200,
"12": 210
},

"5x5 HD": {
"8": 170,
"10": 180,
"12": 190
}

}
}

};

const params = new URLSearchParams(window.location.search);

const productKey = params.get("product");

const product = products[productKey];

if(product){

document.getElementById("product-title").innerText =
product.title;

if(product.density){

document.getElementById("product-type").innerText =
`${product.type} • ${product.density}`;

}else{

document.getElementById("product-type").innerText =
product.type;

}

document.getElementById("product-description").innerText =
product.description;

document.getElementById("product-image").src =
product.image;

const laceSelect =
document.getElementById("lace-select");

const lengthSelect =
document.getElementById("length-select");

laceSelect.innerHTML = "";
lengthSelect.innerHTML = "";

if(product.lace){

product.lace.forEach(lace => {

const option =
document.createElement("option");

option.value = lace;

option.textContent = lace;

laceSelect.appendChild(option);

});

}

function populateLengths(){

lengthSelect.innerHTML = "";

const selectedLace =
laceSelect.value;

if(product.prices[selectedLace]){

Object.keys(
product.prices[selectedLace]
).forEach(length => {

const option =
document.createElement("option");

option.value = length;

option.textContent = `${length}"`;

lengthSelect.appendChild(option);

});

}else{

Object.keys(product.prices).forEach(length => {

const option =
document.createElement("option");

option.value = length;

option.textContent = `${length}"`;

lengthSelect.appendChild(option);

});

}

updatePrice();

}

function updatePrice(){

const selectedLace =
laceSelect.value;

const selectedLength =
lengthSelect.value;

let finalPrice;

if(product.prices[selectedLace]){

finalPrice =
product.prices[selectedLace][selectedLength];

}else{

finalPrice =
product.prices[selectedLength];

}

document.getElementById("product-price").innerText =
`£${finalPrice}`;

}

laceSelect.addEventListener(
"change",
populateLengths
);

lengthSelect.addEventListener(
"change",
updatePrice
);

populateLengths();

}
