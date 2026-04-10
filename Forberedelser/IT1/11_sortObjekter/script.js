let personer = [
    { navn: "Kari", alder: 25 },
    { navn: "Ola", alder: 19 },
    { navn: "Amund", alder: 17 },
    { navn: "Sofie", alder: 22 }
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

document.querySelector("#sorterNavn").addEventListener("click", function () {
    personer.sort(function (a, b) {
        if (a.navn < b.navn) return -1;
        if (a.navn > b.navn) return 1;
        return 0;
    });
    visListe();
});

document.querySelector("#sorterAlder").addEventListener("click", function () {
    personer.sort(function (a, b) { return a.alder - b.alder; });
    visListe();
});

visListe();
