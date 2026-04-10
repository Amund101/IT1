let person = {
    navn: "Amund",
    alder: 17,
    by: "Oslo"
};

// Vis data direkte ved sidelast
document.querySelector("#tittel").textContent = `Hei, ${person.navn}!`;
document.querySelector("#info").textContent = `Alder: ${person.alder} | By: ${person.by}`;

// Oppdater ved klikk
document.querySelector("#oppdater").addEventListener("click", function () {
    person.alder += 1;
    document.querySelector("#info").textContent = `Alder: ${person.alder} | By: ${person.by}`;
});
