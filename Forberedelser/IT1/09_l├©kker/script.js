let spillere = ["Haaland", "Ødegaard", "Sorloth", "Pedersen", "Nusa"];
let liste = document.querySelector("#liste");

for (let i = 0; i < spillere.length; i++) {
    let li = document.createElement("li");
    li.textContent = spillere[i];
    liste.appendChild(li);
}
