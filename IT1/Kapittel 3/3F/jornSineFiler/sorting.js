// Array:
let list = [
    { name: "Cornflakes", price: 23.50, category: "mat" },
    { name: "Knekkebrød", price: 15.90, category: "mat" },
    { name: "Eplejuice", price: 30.00, category: "mat" },
    { name: "Yoghurt", price: 12.50, category: "mat" },
    { name: "Gulrot", price: 2.50, category: "mat" },
    { name: "Lego sett", price: 250.00, category: "leker" },
    { name: "Fotball", price: 120.00, category: "leker" },
    { name: "Brettspill", price: 299.00, category: "leker" },
    { name: "Dukke", price: 150.00, category: "leker" },
    { name: "Puslespill", price: 100.00, category: "leker" },
    { name: "Toalettpapir", price: 40.00, category: "huskeliste" },
    { name: "Tannkrem", price: 35.00, category: "huskeliste" },
    { name: "Vaskemiddel", price: 89.00, category: "huskeliste" },
    { name: "Batterier", price: 45.00, category: "huskeliste" },
    { name: "Glødepærer", price: 60.00, category: "huskeliste" }
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

// Oppgave 4
sortByPriceEl.addEventListener("click",sortByPrice);
sortByNameEl.addEventListener("click", sortByName);


// Oppgave 2
showList(); // Vi vil kalle funksjonen umiddelbart for at det vises på skjermen.
function showList(){
    // Fjerner alt inni containeren.
    containerEl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        // Henter objektet:
        let o = list[i];
        
        // For hvert objekt o i list: lag en div, og fyll den med info
        let divEl = document.createElement("div");
        // Her kan dere endre klassen til div'en

        let h2El = document.createElement("h2");
        h2El.innerHTML = (`${o.name} - ${o.category}`)
        h2El.className = "navn";


        let h3El = document.createElement("h3");
        h3El.innerHTML = o.price + " kr;-";
        h3El.className = "pris";
        // Lager et p-element, som vi kan legge info i, og etterpå legger vi p-elementet inn i div'en.
        let pEl = document.createElement("p");
        
        
        // Lager en knapp vi kan bruke til å slette elementet.
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "X";
        deleteBtn.id = i;   // Bruker id'en til å identifisere hvilken knapp det trykkes på!
        deleteBtn.addEventListener("click", removeFromList);   // Viktig å gjøre at knappen vi lagde faktisk kaller funksjonen.

        // Her legger vi p-elementet og knappen inn i div'en
        divEl.appendChild(h2El);
        divEl.appendChild(h3El);
        divEl.appendChild(pEl);
        divEl.appendChild(deleteBtn);

        // Til slutt skal vi legge div'en inn i container elementet vårt.
        containerEl.appendChild(divEl);
    }
}

// Oppgave 3
function addToList(){
    let addName = inputNameEl.value;
    let addPrice = Number(inputPriceEl.value);
    let addCategory = inputCategoryEl.value;

    // 1. Lag et objekt med variablene over.
    // 2. Legg til objektet i listen
    // 3. Vis Arrayet på nytt.
    let leggTilTing = {
        name: addName,
        price: addPrice,
        category: addCategory
    };

    list.push(leggTilTing);

    showList();
}
addToListEl.addEventListener("click", addToList);


// Oppgave 4
function sortByPrice(){
    list.sort(comparePrice);
    showList();
}
document.getElementById("sortPrice").addEventListener("click", sortByPrice);

function comparePrice(a,b){
    return a.price - b.price;
}

// Lag en sortByName funksjon
    function compareName(a, b){
    return a.name.localeCompare(b.name)
};

let sortNameFlip = true;
function sortByName(){
    list.sort(compareName)
    if(sortNameFlip){ 
        list.reverse();
    }
    sortNameFlip = !sortNameFlip;
    showList()
}
// Lag en sortByCategory funksjon
// Dere kan se på 3F-Objekter i arrayer for hint.


// Oppgave 5
function removeFromList(e){
    let index = e.target.id;
    console.log("Du prøver å fjerne " + list[index].name);

    // 1. fjern loggingen over.
    // 2. fjern det relevantet elementet fra list
    // 3. tegn lista på nytt.
}