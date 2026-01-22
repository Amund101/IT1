console.log("listeSide.js loaded");

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApXFO2sVagrm4LYwA9dcui6DMUdRKH4Vk",
    authDomain: "prosjekt-1-4f037.firebaseapp.com",
    projectId: "prosjekt-1-4f037",
    storageBucket: "prosjekt-1-4f037.firebasestorage.app",
    messagingSenderId: "619968747857",
    appId: "1:619968747857:web:814a97191fe8204f789b70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Bytte mellom "sider"
function visListe() {
    document.getElementById("leggTilSide").style.display = "none";
    document.getElementById("listeSide").style.display = "block";
}

function visLeggTil() {
    document.getElementById("leggTilSide").style.display = "block";
    document.getElementById("listeSide").style.display = "none";
}


// Sjekk om data finnes i localStorage
let list = [];

// Koble til Firestore og lytt etter endringer i sanntid
onSnapshot(collection(db, "innlegg"), (snapshot) => {
    // Tøm listen og fyll den med data fra databasen
    list = snapshot.docs.map(doc => {
        return {
            id: doc.id,   // Vi trenger ID-en for å kunne slette senere
            ...doc.data() // Resten av dataene (navn, kategori, osv.)
        };
    });

    // Oppdater visningen på nettsiden
    if (activeSort === "navn") sortByName(false);
    else if (activeSort === "dato") sortByDate(false);
    else if (activeSort === "kategori") sortByCategory(false);
    else showList();
});



// Input-felt
const inputNameEl = document.querySelector("#name");
const inputCategoryEl = document.querySelector("#category");
const inputContentEl = document.querySelector("#content");

// Container for listen
const containerEl = document.querySelector("#container");

// Knapper
const addToListEl = document.querySelector("#leggTil");
const navnBtn = document.querySelector("#sortNavn");
const datoBtn = document.querySelector("#sortDato");
const kategoriBtn = document.querySelector("#sortKategori");


// Variabler for sortering
let activeSort = null;
let sortNameFlip = true;
let sortDateFlip = true;
let sortCategoryFlip = true;


// Viser listen på skjermen

function showList() {
    containerEl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        const o = list[i];

        const divEl = document.createElement("div");
        divEl.className = "listItem";

        // Tittel
        const titleEl = document.createElement("p");
        titleEl.id = "listTitle";
        titleEl.textContent = o.navn;

        // Dato
        const dateEl = document.createElement("p");
        dateEl.id = "listDateTime";
        // Konverter fra "1969-07-20" til "20. juli 1969" 
        const datoParts = o.dato.split('-');  // ["1969", "07", "20"]
        const maaned = datoParts[1];
        let maanedNavn = "";

        if (maaned == 1) {
            maanedNavn = "januar";
        } else if (maaned == 2) {
            maanedNavn = "februar";
        } else if (maaned == 3) {
            maanedNavn = "mars";
        } else if (maaned == 4) {
            maanedNavn = "april";
        } else if (maaned == 5) {
            maanedNavn = "mai";
        } else if (maaned == 6) {
            maanedNavn = "juni";
        } else if (maaned == 7) {
            maanedNavn = "juli";
        } else if (maaned == 8) {
            maanedNavn = "august";
        } else if (maaned == 9) {
            maanedNavn = "september";
        } else if (maaned == 10) {
            maanedNavn = "oktober";
        } else if (maaned == 11) {
            maanedNavn = "november";
        } else if (maaned == 12) {
            maanedNavn = "desember";
        }

        const norskDato = datoParts[2] + '. ' + maanedNavn + ' ' + datoParts[0];
        dateEl.textContent = "Lagt til " + norskDato;

        // Kategori
        const categoryEl = document.createElement("p");
        categoryEl.id = "listCategory";
        categoryEl.textContent = o.kategori;

        // Innhold
        const contentEl = document.createElement("p");
        contentEl.id = "listContent";
        contentEl.textContent = o.innhold;

        // Sletteknapp
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.id = o.id; // Bruker database-ID i stedet for indeks
        deleteBtn.addEventListener("click", removeFromList);

        // Legg til elementene i RIKTIG rekkefølge (Tittel, Dato, Kategori, Innhold)
        divEl.appendChild(titleEl);
        divEl.appendChild(dateEl); // Dato først
        divEl.appendChild(categoryEl); // Så kategori
        divEl.appendChild(contentEl); // Så innhold
        divEl.appendChild(deleteBtn);

        containerEl.appendChild(divEl);
    }
}


// Legger til nye innlegg
function addToList() {
    const nameValue = inputNameEl.value;
    const categoryValue = inputCategoryEl.value;
    const contentValue = inputContentEl.value;

    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    const dateValue = year + "-" + month + "-" + day;

    const newItem = {
        navn: nameValue,
        kategori: categoryValue,
        dato: dateValue,
        innhold: contentValue
    };


    // Last opp til Firebase (vi trenger ikke pushe til arrayet manuelt)
    addDoc(collection(db, "innlegg"), newItem);

    // Nullstill input
    inputNameEl.value = "";
    // inputCategoryEl.value = ""; 
    inputContentEl.value = "";
}


const formEl = document.querySelector("#inputs");
formEl.addEventListener("submit", function (e) {
    e.preventDefault(); // Hindrer skjemaet i å refreshe siden
    addToList();
});


// Fjerner innlegg fra databasen
function removeFromList(e) {
    const id = e.target.id;
    deleteDoc(doc(db, "innlegg", id));
}


//Sorterer listen på navn eller dato og kategori

//Sortering på navn
function sortByName(flip = true) {
    activeSort = "navn";
    list.sort(compareName);

    if (flip) {
        sortNameFlip = !sortNameFlip;
    }

    if (sortNameFlip) {
        list.reverse();
    }

    // Oppdater tekst
    if (sortNameFlip) {
        navnBtn.textContent = "Å-A";
    } else {
        navnBtn.textContent = "A-Å";
    }

    showList();
}

function compareName(a, b) {
    return a.navn.localeCompare(b.navn);
}

// Sortering på dato (enkelt fordi datoene er lagret som ÅÅÅÅ-MM-DD)
function sortByDate() {
    activeSort = "dato";
    list.sort(function (a, b) {
        return a.dato.localeCompare(b.dato);
    });

    if (sortDateFlip) {
        list.reverse();
    }
    sortDateFlip = !sortDateFlip;

    // Oppdater knapp-tekst for å vise sorteringsretning
    if (sortDateFlip) {
        datoBtn.textContent = "Eldst-Nyest";
    } else {
        datoBtn.textContent = "Nyest-Eldst";
    }

    showList();
}

// Sortering på Kategori
function sortByCategory(flip = true) {
    activeSort = "kategori";
    list.sort(function (a, b) {
        return a.kategori.localeCompare(b.kategori);
    });

    if (flip) {
        sortCategoryFlip = !sortCategoryFlip;
    }

    if (sortCategoryFlip) {
        list.reverse();
    }

    // Oppdater knapp-tekst
    if (sortCategoryFlip) {
        kategoriBtn.textContent = "Kategori (Å-A)";
    } else {
        kategoriBtn.textContent = "Kategori (A-Å)";
    }

    showList();
}


//Setter opp knapper og viser listen

// Knapp tekst ved start
navnBtn.textContent = "Navn";
datoBtn.textContent = "Dato";
kategoriBtn.textContent = "Kategori";

// Event listeners for sorteringsknapper
navnBtn.addEventListener("click", () => sortByName(true)); // Bruk arrow function for å garantere at flip argumentet er true ved klikk
datoBtn.addEventListener("click", sortByDate);
kategoriBtn.addEventListener("click", () => sortByCategory(true));

// Event listeners for navigasjonsknapper
document.getElementById("visListeBtn").addEventListener("click", visListe);
document.getElementById("visLeggTilBtn").addEventListener("click", visLeggTil);

// Viser listen ved start
showList();