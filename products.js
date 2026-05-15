const products = {

/* BUNDLES */

straight14a: {
title: "Straight Bundles Grade 14A",
type: "Hair Bundles",
image: "images/Straight Cambodian Virgin hair.jpg",
description: "Luxury straight bundles with silky finish and premium quality.",
prices: {
"14": 38,
"16": 46,
"18": 56,
"20": 65,
"22": 75,
"24": 84,
"26": 90,
"28": 100,
"30": 110,
"32": 120
}
},

straightraw: {
title: "Straight Bundles Raw Hair",
type: "Raw Hair Bundles",
image: "images/wig1.jpg",
description: "Premium RAW straight bundles with luxury softness.",
prices: {
"14": 45,
"16": 50,
"18": 60,
"20": 70,
"22": 80,
"24": 90,
"26": 100,
"28": 110,
"30": 120,
"32": 130
}
},

bodywave14a: {
title: "Body Wave Bundles Grade 14A",
type: "Hair Bundles",
image: "images/Body wave Cambodian virgin hair.jpg",
description: "Soft luxury body wave bundles with premium bounce.",
prices: {
"14": 38,
"16": 46,
"18": 56,
"20": 65,
"22": 75,
"24": 84,
"26": 90,
"28": 100,
"30": 110,
"32": 120
}
},

bodywaveraw: {
title: "Body Wave Bundles Raw Hair",
type: "Raw Hair Bundles",
image: "images/home.jpg",
description: "Luxury RAW body wave bundles with flawless texture.",
prices: {
"14": 45,
"16": 50,
"18": 60,
"20": 70,
"22": 80,
"24": 90,
"26": 100,
"28": 110,
"30": 120,
"32": 130
}
},

/* WIGS */

straightwig: {
title: "Straight Cambodian Wig",
type: "13x4 HD Lace Frontal Wig",
density: "250% Density",
image: "images/Straight Cambodian Virgin hair.jpg",
description: "Cambodian Virgin Hair 13x4 HD Lace frontal wig.",
prices: {
"16": 100,
"18": 115,
"20": 130,
"22": 155,
"24": 170,
"26": 185,
"28": 200,
"30": 215
}
},

bodywavewig: {
title: "Body Wave Cambodian Wig",
type: "13x4 HD Lace Frontal Wig",
density: "250% Density",
image: "images/Body wave Cambodian virgin hair.jpg",
description: "Cambodian Virgin Hair 13x4 HD Lace frontal wig.",
prices: {
"16": 100,
"18": 115,
"20": 130,
"22": 155,
"24": 170,
"26": 185,
"28": 200,
"30": 215
}
},

deepwavewig: {
title: "Deep Wave Wig",
type: "13x4 HD Lace Frontal Wig",
image: "images/wig1.jpg",
description: "Luxury deep wave wig with soft premium curls.",
prices: {
"16": 110,
"18": 120,
"20": 135,
"22": 160,
"24": 175,
"26": 190,
"28": 205,
"30": 220
}
},

loosewavewig: {
title: "Loose Wave Wig",
type: "13x4 HD Lace Frontal Wig",
image: "images/home.jpg",
description: "Luxury loose wave wig with soft flowing texture.",
prices: {
"16": 110,
"18": 120,
"20": 135,
"22": 160,
"24": 175,
"26": 190,
"28": 205,
"30": 220
}
},

waterwavewig: {
title: "Water Wave Wig",
type: "13x4 HD Lace Frontal Wig",
image: "images/wig2.jpg",
description: "Luxury water wave wig with defined soft curls.",
prices: {
"16": 110,
"18": 120,
"20": 135,
"22": 160,
"24": 175,
"26": 190,
"28": 205,
"30": 220
}
},

rawvietnamese: {
title: "RAW Vietnamese Wig",
type: "RAW Vietnamese Hair",
image: "images/wig1.jpg",
description: "Luxury RAW Vietnamese hair with premium fullness.",
prices: {
"16": 180,
"18": 195,
"20": 210,
"22": 225,
"24": 240,
"26": 255,
"28": 270,
"30": 285
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
