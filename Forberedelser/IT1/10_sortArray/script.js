let tall = [40, 3, 100, 7, 25];
let tekst = ["Banan", "Eple", "Appelsin", "Drue"];

document.querySelector("#sorterTall").addEventListener("click", function () {
    tall.sort(function (a, b) { return a - b; }); // lavest til høyest
    document.querySelector("#resultat").textContent = tall.join(", ");
});

document.querySelector("#sorterTekst").addEventListener("click", function () {
    tekst.sort(); // alfabetisk
    document.querySelector("#resultat").textContent = tekst.join(", ");
});
