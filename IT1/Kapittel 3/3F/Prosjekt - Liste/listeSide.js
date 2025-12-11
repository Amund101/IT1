// Listen
let list = [
    { navn: "Månelandingen", pris: "1", kategori: "Vitenskap", dato: "20.07.1969", innhold: "Apollo 11 lander på månen, Neil Armstrong blir det første mennesket på månen." },
    { navn: "Fall av Berlinmuren", pris: "1", kategori: "Politikk", dato: "09.11.1989", innhold: "Berlinmuren faller, som symboliserer slutten på den kalde krigen." },
    { navn: "Oppfinnelsen av Internett", pris: "1", kategori: "Teknologi", dato: "29.10.1969", innhold: "ARPANET, forgjengeren til internett, sender sin første melding." }
];

// Inputs
const inputNameEl = document.querySelector("#name");
const inputPriceEl = document.querySelector("#price");
const inputCategoryEl = document.querySelector("#category");
const inputContentEl = document.querySelector("#content"); // nytt input-felt

// Containeren som holder listepunktene
const containerEl = document.querySelector("#container");

// Knapper
const addToListEl = document.querySelector("#leggTil");
const navnBtn = document.querySelector("#sortNavn");

// Aktiv sortering
let activeSort = null;

// Flip for sortering
let sortNameFlip = true;
let sortCategoryFlip = true;

// Viser listen
function showList() {
    containerEl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        const o = list[i];

        const divEl = document.createElement("div");
        divEl.className = "listItem";

        const titleEl = document.createElement("p");
        titleEl.id = "listTitle";
        titleEl.textContent = o.navn;

        const dateEl = document.createElement("p");
        dateEl.id = "listDateTime";
        dateEl.textContent = `Lagt til ${o.dato}`;

        const categoryEl = document.createElement("p");
        categoryEl.id = "listCategory";
        categoryEl.textContent = o.kategori;

        const contentEl = document.createElement("p");
        contentEl.id = "listContent";
        contentEl.textContent = o.innhold;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.id = i;
        deleteBtn.addEventListener("click", removeFromList);

        divEl.appendChild(titleEl);
        divEl.appendChild(categoryEl);
        divEl.appendChild(contentEl);
        divEl.appendChild(dateEl);
        divEl.appendChild(deleteBtn);

        containerEl.appendChild(divEl);
    }
}

// Legger til et element
function addToList() {
    const nameValue = inputNameEl.value;
    const priceValue = Number(inputPriceEl.value);
    const categoryValue = inputCategoryEl.value;
    const contentValue = inputContentEl.value;
    const dateValue = new Date().toLocaleDateString();

    const newItem = {
        navn: nameValue,
        pris: priceValue,
        kategori: categoryValue,
        dato: dateValue,
        innhold: contentValue
    };

    list.push(newItem);

    if (activeSort === "navn") sortByName(false);
    else if (activeSort === "kategori") sortByCategory();
    else if (activeSort === "pris") sortByPrice();
    else showList();
}

addToListEl.addEventListener("click", addToList);

// Fjerner et element
function removeFromList(e) {
    const index = e.target.id;
    list.splice(index, 1);
    showList();
}

// Sortering på pris
function sortByPrice() {
    activeSort = "pris";
    list.sort(comparePrice);
    showList();
}

function comparePrice(a, b) {
    return a.pris - b.pris;
}

// Sortering på navn
function sortByName(flip = true) {
    activeSort = "navn";
    list.sort(compareName);

    if (flip) sortNameFlip = !sortNameFlip;
    if (sortNameFlip) list.reverse();

    navnBtn.textContent = sortNameFlip ? "↑ navn" : "↓ navn";
    showList();
}

function compareName(a, b) {
    return a.navn.localeCompare(b.navn);
}

// Sortering på kategori
function sortByCategory() {
    activeSort = "kategori";
    list.sort(compareCategory);

    if (sortCategoryFlip) list.reverse();
    sortCategoryFlip = !sortCategoryFlip;

    showList();
}

function compareCategory(a, b) {
    return a.kategori.localeCompare(b.kategori);
}

// Navn-knapp
navnBtn.textContent = "navn";
navnBtn.addEventListener("click", sortByName);

// Viser listen ved start
showList();