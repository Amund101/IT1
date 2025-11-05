const kastButtonEl = document.getElementById("buttonTerning");
const terningOutputEl = document.getElementById("outputTerning");

kastButtonEl.addEventListener("click", KastTerning);

function KastTerning() {
    let tall = Math.floor(Math.random() * 6) + 1;
    terningOutputEl.textContent = tall;
}