

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
let list;

if (localStorage.info) {
    list = JSON.parse(localStorage.info);
} else {
    // Standard data hvis ingen localStorage finnes
    list = [
        { navn: "Månelandingen", kategori: "Vitenskap", dato: "1969-07-20", innhold: "Apollo 11 lander på månen, Neil Armstrong blir det første mennesket på månen." },
        { navn: "Fall av Berlinmuren", kategori: "Politikk", dato: "1989-11-09", innhold: "Berlinmuren faller, som symboliserer slutten på den kalde krigen." },
        { navn: "Oppfinnelsen av Internett", kategori: "Teknologi", dato: "1969-10-29", innhold: "ARPANET, forgjengeren til internett, sender sin første melding." },
        { navn: "iPhone lansering", kategori: "Teknologi", dato: "2007-01-09", innhold: "Apple lanserer den første iPhone, som revolusjonerer smarttelefonmarkedet." },
        { navn: "Oppdagelsen av DNA", kategori: "Vitenskap", dato: "1953-04-25", innhold: "Watson og Crick publiserer strukturen til DNA, en milepæl i biologien." },
        { navn: "Norges grunnlov", kategori: "Politikk", dato: "1814-05-17", innhold: "Grunnloven vedtas på Eidsvoll, Norge får sin egen grunnlov." },
        { navn: "Første PC", kategori: "Teknologi", dato: "1981-08-12", innhold: "IBM lanserer sin første personlige datamaskin, IBM PC 5150." }
    ];
    // Lagre standardlisten
    localStorage.info = JSON.stringify(list);
}



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
        deleteBtn.id = i;
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


    list.push(newItem);
    localStorage.info = JSON.stringify(list);


    // Oppdater sortering hvis aktiv
    if (activeSort === "navn") sortByName(false);
    else if (activeSort === "dato") sortByDate(false); // Behold sortering hvis aktiv
    else if (activeSort === "kategori") sortByCategory(false);
    else showList();

    inputNameEl.value = "";
    // inputCategoryEl.value = ""; // Beholder kategori for enklere input av flere i samme kategori
    inputContentEl.value = "";
}


const formEl = document.querySelector("#inputs");
formEl.addEventListener("submit", function (e) {
    e.preventDefault(); // Hindrer skjemaet i å refreshe siden
    addToList();
});


//Fjerner innlegg fra listen

function removeFromList(e) {
    const index = e.target.id;
    list.splice(index, 1);
    localStorage.info = JSON.stringify(list);
    showList();
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