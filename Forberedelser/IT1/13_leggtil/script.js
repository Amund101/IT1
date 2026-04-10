let personer = [
    { navn: "Kari", alder: 25 },
    { navn: "Ola", alder: 19 }
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

document.querySelector("#leggTilKnapp").addEventListener("click", function () {
    let navn = document.querySelector("#navnFelt").value;
    let alder = Number(document.querySelector("#alderFelt").value);

    // nytt objekt må ha samme struktur som de andre
    let nyPerson = { navn: navn, alder: alder };
    personer.push(nyPerson);

    visListe();
});

visListe();
