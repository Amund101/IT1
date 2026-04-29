const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("Epost: " + email);
    console.log("Passord: " + password)
});

