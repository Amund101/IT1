const produkter = [
    {navn: "Vegard", pris: 4},
    {navn: "Jorn", pris: 6}
];

// const produkterContainerEl = document.createElement("div");
// document.body.appendChild(produkterContainerEl);

const produkterContainerEl = document.getElementById("produkterContainer");

for(let i = 0; i < produkter.length; i++) {
    const h1El = document.createElement("h1");
    h1El.innerText = produkter[i].navn;

    const pEl = document.createElement("p");
    pEl.innerText = produkter[i].pris;

    produkterContainerEl.appendChild(h1El);
    produkterContainerEl.appendChild(pEl);
};