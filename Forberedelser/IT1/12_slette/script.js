let personer = [
    { navn: "Kari", alder: 25 },
    { navn: "Ola", alder: 19 },
    { navn: "Amund", alder: 17 }
];

function visListe() {
    let liste = document.querySelector("#liste");
    liste.innerHTML = "";
    for (let i = 0; i < personer.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${personer[i].navn} – ${personer[i].alder} år`;
        liste.appendChild(li);
    }
}

document.querySelector("#slettKnapp").addEventListener("click", function () {
    let navn = document.querySelector("#navnFelt").value;

    // filter lager ny array UTEN det som matcher
    personer = personer.filter(function (p) {
        return p.navn !== navn;
    });

    visListe();
});

visListe();
