let listen = [
    {navn: "", pris: "", kategori: ""},
];

// Inputs:
const inputNameEl = document.querySelector("#name");
const inputPriceEl = document.querySelector("#price");
const inputCategoryEl = document.querySelector("#category");
// Containers:
const containerEl = document.querySelector("#container");
// Buttons:
const addToListEl = document.querySelector("#leggTil")
const sortByNameEl = document.querySelector("#sortName");
const sortByPriceEl = document.querySelector("#sortPrice");
const sortByCategoryEl = document.querySelector("#sortCategory");

let liEl1
let liEl2
let liEl3

// Sortering
    // Sortere etter dato - dag/måned/år - alfabetisk


