// localStorage: lagres permanent (til bruker sletter det)
// sessionStorage: forsvinner når fanen lukkes

let personer = [];

document.querySelector("#lagreKnapp").addEventListener("click", function () {
    let navn = document.querySelector("#navnFelt").value;
    personer.push({ navn: navn });

    // Objekter må gjøres om til tekst før lagring
    localStorage.setItem("personer", JSON.stringify(personer));
    document.querySelector("#resultat").textContent = "Lagret!";
});

document.querySelector("#hentKnapp").addEventListener("click", function () {
    // Hent tekst og gjør om tilbake til objekt
    let lagret = localStorage.getItem("personer");

    if (lagret) {
        personer = JSON.parse(lagret);
        let navn = personer.map(function (p) { return p.navn; }).join(", ");
        document.querySelector("#resultat").textContent = `Lagrede navn: ${navn}`;
    } else {
        document.querySelector("#resultat").textContent = "Ingenting lagret ennå.";
    }
});

document.querySelector("#slettKnapp").addEventListener("click", function () {
    localStorage.removeItem("personer");
    personer = [];
    document.querySelector("#resultat").textContent = "Slettet!";
});
