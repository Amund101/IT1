let knapp = document.querySelector("#leggTilKnapp");
let container = document.querySelector("#container");

knapp.addEventListener("click", function () {
    let nyP = document.createElement("p");
    nyP.textContent = "Nytt element lagt til!";
    container.appendChild(nyP);
});
