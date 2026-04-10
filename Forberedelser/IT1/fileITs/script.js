// ═══════════════════════════════════════════
// HENT DOM-ELEMENTER
// ═══════════════════════════════════════════
const kortGrid      = document.querySelector("#kortGrid");
const sokFelt       = document.querySelector("#sokFelt");
const typeFelt      = document.querySelector("#typeFelt");
const sendKnapp     = document.querySelector("#sendKnapp");
const skjemaMelding = document.querySelector("#skjemaMelding");
const navnFelt      = document.querySelector("#navnFelt");
const epostFelt     = document.querySelector("#epostFelt");
const meldingFelt   = document.querySelector("#meldingFelt");


// ═══════════════════════════════════════════
// DATA (array av Pokémon-objekter)
// Fyll inn eller hent fra API
// ═══════════════════════════════════════════
let pokemon = [
  // { navn: "Pikachu", type: "Electric", nummer: 25, bilde: "url" },
];


// ═══════════════════════════════════════════
// VIS POKÉMON-KORT
// Tar en array og bygger kort i kortGrid
// ═══════════════════════════════════════════
function visKort(arr) {
  kortGrid.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let kort = document.createElement("div");
    kort.classList.add("kort");
    kort.innerHTML = `
      <img class="kort__bilde" src="${arr[i].bilde}" alt="${arr[i].navn}">
      <div class="kort__info">
        <h3 class="kort__navn">${arr[i].navn}</h3>
        <span class="kort__type">${arr[i].type}</span>
        <p class="kort__nummer">#${String(arr[i].nummer).padStart(3, "0")}</p>
      </div>
    `;
    kortGrid.appendChild(kort);
  }
}


// ═══════════════════════════════════════════
// SØK
// Filtrer pokemon-arrayen etter navn
// ═══════════════════════════════════════════
sokFelt.addEventListener("input", function () {
  let sokeord = sokFelt.value.toLowerCase();
  let filtrert = pokemon.filter(function (p) {
    return p.navn.toLowerCase().includes(sokeord);
  });
  visKort(filtrert);
});


// ═══════════════════════════════════════════
// TYPEFILTER
// Filtrer pokemon-arrayen etter type
// ═══════════════════════════════════════════
typeFelt.addEventListener("change", function () {
  let valgtType = typeFelt.value;
  let filtrert = valgtType === ""
    ? pokemon
    : pokemon.filter(function (p) { return p.type === valgtType; });
  visKort(filtrert);
});


// ═══════════════════════════════════════════
// KONTAKTSKJEMA
// Valider og vis tilbakemelding
// ═══════════════════════════════════════════
sendKnapp.addEventListener("click", function () {
  let navn   = navnFelt.value;
  let epost  = epostFelt.value;
  let melding = meldingFelt.value;

  if (navn === "" || epost === "" || melding === "") {
    skjemaMelding.textContent = "Fyll inn alle feltene.";
    skjemaMelding.style.color = "red";
    return;
  }

  skjemaMelding.textContent = "Takk for meldingen, " + navn + "!";
  skjemaMelding.style.color = "green";
  navnFelt.value    = "";
  epostFelt.value   = "";
  meldingFelt.value = "";
});


// ═══════════════════════════════════════════
// START
// ═══════════════════════════════════════════
visKort(pokemon);
