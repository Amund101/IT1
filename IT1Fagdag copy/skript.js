// ==========================================
// POKÉDEX – JavaScript
// ==========================================


// --- Data ---

let pokemon = [
    { navn: "Pikachu",   type: "Electric", level: 35 },
    { navn: "Charizard", type: "Fire",     level: 50 },
    { navn: "Bulbasaur", type: "Grass",    level: 12 },
    { navn: "Gengar",    type: "Ghost",    level: 44 },
    { navn: "Eevee",     type: "Normal",   level: 20 },
    { navn: "Snorlax",   type: "Normal",   level: 38 },
];


// ==========================================
// #region Oppgave 12 – Last inn fra localStorage ved sideinnlasting
// ==========================================

let lagret = localStorage.getItem("pokemon");
if (lagret) {
    pokemon = JSON.parse(lagret);
}

// #endregion


// --- Tilstand ---

let aktivKolonne      = null;
let sorteringsRetning = "stigende";


// ==========================================
// #region Oppgave 4 – Legg til ett pokémon med push()
// ==========================================

pokemon.push({ navn: "Pidgey", type: "Flying", level: 8 });

// #endregion


// ==========================================
// #region Oppgave 5 – Vis statistikk
// ==========================================

document.getElementById("antall-pokemon").innerHTML = pokemon.length;

let levels = [];
for (let i = 0; i < pokemon.length; i++) {
    levels.push(pokemon[i].level);
}

document.getElementById("spenn").innerHTML = finnSpenn(levels);

// #endregion


// ==========================================
// #region Oppgave 6 – finnSpenn(tall)
// ==========================================

function finnSpenn(tall) {
    let hoeyeste = tall[0];
    let laveste  = tall[0];

    for (let i = 1; i < tall.length; i++) {
        if (tall[i] > hoeyeste) {
            hoeyeste = tall[i];
        }
        if (tall[i] < laveste) {
            laveste = tall[i];
        }
    }

    return hoeyeste - laveste;
}

// #endregion


// ==========================================
// #region Oppgave 10 – Farger per type
// ==========================================

let typefarger = {
    "Fire":     "#b84000",
    "Water":    "#0055b3",
    "Grass":    "#2d6e00",
    "Electric": "#8a7000",
    "Ghost":    "#3d006e",
    "Normal":   "#4a4a4a",
    "Flying":   "#005580",
    "Poison":   "#6e006e",
    "Psychic":  "#8a0044",
    "Ice":      "#006e6e",
    "Dragon":   "#00006e",
    "Dark":     "#2a2020",
    "Steel":    "#4a4a55",
    "Fairy":    "#8a004a",
};

// #endregion


// ==========================================
// #region Oppgave 7 – Vis pokémon på siden
// ==========================================

function visPokemon() {
    let liste = document.getElementById("pokemon-liste");
    liste.innerHTML = "";

    for (let i = 0; i < pokemon.length; i++) {
        let p = pokemon[i];

        // Oppgave 10: bakgrunnsfarge basert på type
        let farge = typefarger[p.type] || "#1a1a2e";

        let kort = document.createElement("div");
        kort.className = "pokemon-kort";
        kort.style.backgroundColor = farge;

        // Bilde (bruker pokeball som fallback)
        let bilde = document.createElement("img");
        bilde.src = "pokemonImages/pokeball.png";
        bilde.alt = p.navn;

        let navn = document.createElement("h3");
        navn.innerHTML = p.navn;

        let type = document.createElement("span");
        type.className = "type";
        type.innerHTML = p.type;

        let level = document.createElement("span");
        level.className = "level";
        level.innerHTML = "Lv. " + p.level;

        // Oppgave 11: slett-knapp
        let slettKnapp = document.createElement("button");
        slettKnapp.className = "slett-knapp";
        slettKnapp.innerHTML = "Slett";

        // Bruker let i = i for å fange riktig indeks i løkken
        let indeks = i;
        slettKnapp.addEventListener("click", function() {
            pokemon.splice(indeks, 1);
            lagrePokemon();
            oppdaterStatistikk();
            visPokemon();
        });

        kort.appendChild(bilde);
        kort.appendChild(navn);
        kort.appendChild(type);
        kort.appendChild(level);
        kort.appendChild(slettKnapp);

        liste.appendChild(kort);
    }
}

// #endregion


// ==========================================
// #region Oppgave 5 – hjelpefunksjon for å oppdatere statistikk
// ==========================================

function oppdaterStatistikk() {
    document.getElementById("antall-pokemon").innerHTML = pokemon.length;

    let levels = [];
    for (let i = 0; i < pokemon.length; i++) {
        levels.push(pokemon[i].level);
    }

    if (levels.length > 0) {
        document.getElementById("spenn").innerHTML = finnSpenn(levels);
    } else {
        document.getElementById("spenn").innerHTML = 0;
    }
}

// #endregion


// ==========================================
// #region Oppgave 8 – Sortering
// ==========================================

document.getElementById("sorter-navn").addEventListener("click", function() {
    if (aktivKolonne === "navn") {
        sorteringsRetning = sorteringsRetning === "stigende" ? "synkende" : "stigende";
    } else {
        aktivKolonne = "navn";
        sorteringsRetning = "stigende";
    }

    pokemon.sort(function(a, b) {
        if (sorteringsRetning === "stigende") {
            return a.navn.localeCompare(b.navn);
        } else {
            return b.navn.localeCompare(a.navn);
        }
    });

    oppdaterAktivKnapp("sorter-navn");
    visPokemon();
});

document.getElementById("sorter-type").addEventListener("click", function() {
    if (aktivKolonne === "type") {
        sorteringsRetning = sorteringsRetning === "stigende" ? "synkende" : "stigende";
    } else {
        aktivKolonne = "type";
        sorteringsRetning = "stigende";
    }

    pokemon.sort(function(a, b) {
        if (sorteringsRetning === "stigende") {
            return a.type.localeCompare(b.type);
        } else {
            return b.type.localeCompare(a.type);
        }
    });

    oppdaterAktivKnapp("sorter-type");
    visPokemon();
});

document.getElementById("sorter-level").addEventListener("click", function() {
    if (aktivKolonne === "level") {
        sorteringsRetning = sorteringsRetning === "stigende" ? "synkende" : "stigende";
    } else {
        aktivKolonne = "level";
        sorteringsRetning = "stigende";
    }

    pokemon.sort(function(a, b) {
        if (sorteringsRetning === "stigende") {
            return a.level - b.level;
        } else {
            return b.level - a.level;
        }
    });

    oppdaterAktivKnapp("sorter-level");
    visPokemon();
});

function oppdaterAktivKnapp(knappId) {
    let knapper = document.querySelectorAll(".sortering-seksjon button");
    for (let i = 0; i < knapper.length; i++) {
        knapper[i].classList.remove("aktiv");
    }
    document.getElementById(knappId).classList.add("aktiv");
}

// #endregion


// ==========================================
// #region Oppgave 9 – Legg til pokémon via skjema
// ==========================================

document.getElementById("legg-til").addEventListener("click", function() {
    let navn  = document.getElementById("input-navn").value;
    let type  = document.getElementById("input-type").value;
    let level = parseInt(document.getElementById("input-level").value);

    if (navn === "" || type === "" || isNaN(level)) {
        return;
    }

    let nytt = { navn: navn, type: type, level: level };
    pokemon.push(nytt);

    lagrePokemon();
    oppdaterStatistikk();
    visPokemon();

    // Nullstill skjemaet
    document.getElementById("input-navn").value  = "";
    document.getElementById("input-type").value  = "";
    document.getElementById("input-level").value = "";
});

// #endregion


// ==========================================
// #region Oppgave 12 – Lagre i localStorage
// ==========================================

function lagrePokemon() {
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
}

// #endregion


// ==========================================
// Start – vis pokémon og statistikk når siden lastes
// ==========================================
visPokemon();
oppdaterStatistikk();
