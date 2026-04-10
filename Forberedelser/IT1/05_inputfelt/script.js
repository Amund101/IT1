let knapp = document.querySelector("#minKnapp");
let resultat = document.querySelector("#resultat");

knapp.addEventListener("click", function () {
    let input = document.querySelector("#mittFelt").value;
    let tall = Number(input);
    resultat.textContent = `Du er ${tall} år gammel`;
});
