// Listen
let list = [
    { navn: "filler", pris: "1", kategori: "ikke-viktig", dato: "dd.mm.yyyy"},
];

// Inputs
const inputNameEl = document.querySelector("#name");
const inputPriceEl = document.querySelector("#price");
const inputCategoryEl = document.querySelector("#category");

// Containeren som skal holde listepunktene
const containerEl = document.querySelector("#container");

// Knapper
const addToListEl = document.querySelector("#leggTil");

let liEl1;
let liEl2;
let liEl3;

const date = new Date();
// Viser hele lista
function showList() {
    // jeg tømmer containeren før jeg viser alt på nytt
    containerEl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        let o = list[i];

        // jeg lager nytt listItem basert på HTML-malen min
        let divEl = document.createElement("div");
        divEl.className = "listItem";

        let titleEl = document.createElement("p");
        titleEl.id = "listTitle";
        titleEl.textContent = o.navn;

        let dateEl = document.createElement("p");
        dateEl.id = "listDateTime";
        dateEl.textContent = (`Lagt til ${o.dato}`)

        let categoryEl = document.createElement("p");
        categoryEl.id = "listCategory";
        categoryEl.textContent = o.kategori;

        let contentEl = document.createElement("p");
        contentEl.id = "listContent";
        contentEl.textContent = (`${o.pris} kr;-`)

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.id = i;
        deleteBtn.addEventListener("click", removeFromList);

        let navnBtn = document.createElement("button");
        navnBtn.id = "sortNavn";
        navnBtn.textContent = "Navn";
        navnBtn.addEventListener("click", sortByName);

        divEl.appendChild(titleEl);
        divEl.appendChild(categoryEl);
        divEl.appendChild(contentEl);
        divEl.appendChild(dateEl);
        divEl.appendChild(deleteBtn);
        divEl.appendChild(navnBtn)

        containerEl.appendChild(divEl);
    }
}


// Legger til et element i lista
function addToList() {
    // jeg henter verdiene fra input
    let nameValue = inputNameEl.value;
    let priceValue = Number(inputPriceEl.value);
    let categoryValue = inputCategoryEl.value;
    let dateValue = new Date().toLocaleDateString();

    // jeg lager objektet slik som i lista
    let newItem = {
        navn: nameValue,
        pris: priceValue,
        kategori: categoryValue,
        dato: dateValue
    };

    // jeg legger det til
    list.push(newItem);

    // oppdaterer visningen
    showList();
}

// jeg gjør slik at knappen faktisk kjører funksjonen min
addToListEl.addEventListener("click", addToList);


// Fjerner et element
function removeFromList(e) {
    let index = e.target.id;
    list.splice(index, 1);
    showList();
}

// Sortering 
// ------------------------------------------
function sortByPrice(){
    list.sort(comparePrice);
    showList();
}

function comparePrice(a, b) {
    return a.pris - b.pris;
}

function compareName(a, b) {
    return a.navn.localeCompare(b.navn);
}

// jørn sin flip-metode
let sortNameFlip = true;
function sortByName() {
    list.sort(compareName)
    if(sortNameFlip) {
        list.reverse();
    }
    sortNameFlip = !sortNameFlip;
    showList();
}

function compareCategory(a, b) {
    return a.kategori.localeCompare(b.kategori);
}

// sortNameFlip omgjort
let sortCategoryFlip = true;
function sortByCategory(){
    list.sort(compareCategory);
    if (sortCategoryFlip){
        list.reverse();
    }
    sortCategoryFlip = !sortCategoryFlip;
    showList();
}
// ------------------------------------------

// viser lista når siden starter
showList();