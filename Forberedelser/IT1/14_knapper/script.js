function sigHei() {
    document.querySelector("#melding").textContent = "Hei, verden!";
}

function byttFarge() {
    document.body.style.backgroundColor = "#f0c040";
}

// Funksjonsnavnet sendes UTEN parenteser — parenteser ville kalt den med en gang
document.querySelector("#hilsKnapp").addEventListener("click", sigHei);
document.querySelector("#byttFarge").addEventListener("click", byttFarge);
