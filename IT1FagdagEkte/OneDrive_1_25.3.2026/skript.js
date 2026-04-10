// ==========================================
// POKÉDEX – JavaScript
// ==========================================


// --- Data ---

let pokemon = [
    { navn: "Pikachu", type: "Electric", level: 35 },
    { navn: "Charizard", type: "Fire", level: 50 },
    { navn: "Bulbasaur", type: "Grass", level: 12 },
    { navn: "Gengar", type: "Ghost", level: 44 },
    { navn: "Eevee", type: "Normal", level: 20 },
    { navn: "Snorlax", type: "Normal", level: 38 },
];

// --- Tilstand ---

let sisteKnapp = null;
let retning = "stigende";


// ==========================================
// #region Oppgave 4 – Legg til ett pokémon
// Kan gjerne gjøres ved hardkoding, bruk array-funksjoner for å legge det til her:
// ==========================================

pokemon.push({ navn: "Trubbish", type: "Poison", level: 99 }); // nekter å evolve

// #endregion


// ==========================================
// #region Oppgave 5 – Vis statistikk
// Husk at det skal funke med alle array som pokemon-arrayet over, uavhengig av innholdet 
// (gitt at det følger samme stilen)
// ==========================================

function oppdaterStatistikk() {
    document.querySelector("#antall-pokemon").innerHTML = pokemon.length;

    let alleLevels = [];
    for (let teller = 0; teller < pokemon.length; teller++) {
        alleLevels.push(pokemon[teller].level);
    }

    if (alleLevels.length > 0) {
        document.querySelector("#spenn").innerHTML = finnSpenn(alleLevels);
    } else {
        document.querySelector("#spenn").innerHTML = "0";
    }
}


// #endregion


// ==========================================
// #region Oppgave 6 – Skriv funksjonen finnSpenn(tall)
// Husk at denne skal returnere spennet i et array med tall, dvs høyeste verdi - minste verdi
// ==========================================

function finnSpenn(tall) {
    let hoyeste = tall[0];
    let laveste = tall[0];

    for (let i = 0; i < tall.length; i++) {
        if (tall[i] > hoyeste) {
            hoyeste = tall[i];
        }
        if (laveste > tall[i]) {
            laveste = tall[i];
        }
    }

    return (hoyeste - laveste);

}

// #endregion


// ==========================================
// #region Oppgave 7 – Vis pokémon på siden
// ==========================================

function visPokemon() {
    let liste = document.querySelector("#pokemon-liste");
    liste.innerHTML = "";

    for (let index = 0; index < pokemon.length; index++) {
        let mon = pokemon[index];

        let kort = document.createElement("div");
        kort.className = "pokemon-kort";

        if (fargenTilTyper[mon.type]) {
            kort.style.backgroundColor = fargenTilTyper[mon.type];
        }

        let bilde = document.createElement("img");
        bilde.src = "pokemonImages/pokeball.png";
        bilde.alt = mon.navn;

        let navnElement = document.createElement("h3");
        navnElement.innerHTML = mon.navn;

        let typeElement = document.createElement("span");
        typeElement.innerHTML = mon.type;

        let levelElement = document.createElement("span");
        levelElement.className = "level";
        levelElement.innerHTML = "Lv. " + mon.level;

        // Oppgave 11 – Slett-knapp (funksjon definert lenger ned)
        let slettKnapp = lagSlettKnapp(index);

        kort.appendChild(bilde);
        kort.appendChild(navnElement);
        kort.appendChild(typeElement);
        kort.appendChild(levelElement);
        kort.appendChild(slettKnapp);

        liste.appendChild(kort);
    }

    oppdaterStatistikk();
}


// #endregion


// ==========================================
// #region Oppgave 8 – Sortering
// ==========================================

document.querySelector("#sorter-navn").addEventListener("click", function () {
    if (sisteKnapp == "navn" && retning == "stigende") {
        retning = "synkende";
    } else {
        sisteKnapp = "navn";
        retning = "stigende";
    }
    pokemon.sort(function (a, b) {
        if (retning == "stigende") {
            return a.navn.localeCompare(b.navn);
        } else {
            return b.navn.localeCompare(a.navn);
        }
    });
    visPokemon();
});

document.querySelector("#sorter-type").addEventListener("click", function () {
    if (sisteKnapp == "type" && retning == "stigende") {
        retning = "synkende";
    } else {
        sisteKnapp = "type";
        retning = "stigende";
    }
    pokemon.sort(function (a, b) {
        if (retning == "stigende") {
            return a.type.localeCompare(b.type);
        } else {
            return b.type.localeCompare(a.type);
        }
    });
    visPokemon();

});

document.querySelector("#sorter-level").addEventListener("click", function () {
    if (sisteKnapp == "level" && retning == "stigende") {
        retning = "synkende";
    } else {
        sisteKnapp = "level";
        retning = "stigende";
    }
    pokemon.sort(function (a, b) {
        if (retning == "stigende") {
            return a.level - b.level;
        } else {
            return b.level - a.level;
        }
    });
    visPokemon();
});

// #endregion


// ==========================================
// #region Oppgave 9 – Legg til pokémon via skjema
// ==========================================

document.querySelector("#pokemon-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let navn = document.querySelector("#input-navn").value;
    let type = document.querySelector("#input-type").value;
    let level = Number(document.querySelector("#input-level").value);

    if (level < 1 || level > 100) {
        alert("Levelet må være mellom 1 og 100");
        return;
    }

    let nyPokemon = { navn: navn, type: type, level: level };
    pokemon.push(nyPokemon);

    lagrePokemon();
    visPokemon();

    document.querySelector("#pokemon-form").reset();
});
// måtte endre hver eneste getElementById til den favoriserte querySelector :) 

// #endregion


// ==========================================
// #region Oppgave 10 – Bakgrunnsfarge basert på type
// Her må du nok endre på koden i oppgave 7.
// ==========================================

let fargenTilTyper = {
    "Fire": "#e46019ff",
    "Grass": "#0e6112ff",
    "Electric": "#e1a443ff",
    "Ghost": "#57456dff",
    "Normal": "#a6a6a6ff",
    "Poison": "#9427a5ff"
}
// #endregion


// ==========================================
// #region Oppgave 11 – Slett pokémon
// Her må du også muligens endre koden i oppgave 7

function lagSlettKnapp(index) {
    let slett = document.createElement("button");
    slett.className = "slett-knapp";
    slett.innerHTML = "Slett";

    slett.addEventListener("click", function () {
        pokemon.splice(index, 1);
        lagrePokemon();
        visPokemon();
    });

    return slett;
}

// #endregion
// ==========================================
// #region Oppgave 12 – Lagre i localStorage
// ==========================================

function lagrePokemon() {
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
}

// #endregion


// ==========================================
// Start – vis pokémon når siden lastes
// ==========================================
if (localStorage.getItem("pokemon")) {
    pokemon = JSON.parse(localStorage.getItem("pokemon"));
}

visPokemon();
