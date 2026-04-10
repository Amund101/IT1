let elementer = document.querySelectorAll(".stylish");

document.querySelector("#leggTil").addEventListener("click", function () {
    elementer.forEach(function (el) {
        el.classList.add("highlight");
    });
});

document.querySelector("#fjern").addEventListener("click", function () {
    elementer.forEach(function (el) {
        el.classList.remove("highlight");
    });
});
