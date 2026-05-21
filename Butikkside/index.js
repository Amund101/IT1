import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";


//#region Firebase oppsett

const firebaseConfig = {
    apiKey: "AIzaSyB6tDcN1PxB1xlHsf1eUpEJvdqT0r6Hq1s",
    authDomain: "prosjekt5it1.firebaseapp.com",
    projectId: "prosjekt5it1",
    storageBucket: "prosjekt5it1.firebasestorage.app",
    messagingSenderId: "404294597483",
    appId: "1:404294597483:web:4c6694ca00e3e2f12baa2e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

//#endregion


//#region HTML-elementer

let innloggingsBoks = document.querySelector("#innlogging");
let butikkBoks = document.querySelector("#butikk");
let epostFelt = document.querySelector("#epost");
let passordFelt = document.querySelector("#passord");
let feilmelding = document.querySelector("#feilmelding");

//#endregion


//#region Innlogging og registrering

document.querySelector("#logg-inn-knapp").addEventListener("click", function () {
    let epost = epostFelt.value + "@gmail.com";
    let passord = passordFelt.value;

    signInWithEmailAndPassword(auth, epost, passord)
        .catch(function (error) {
            console.error(error);
            feilmelding.innerText = "Feil e-post eller passord!";
        });
});

document.querySelector("#registrer-knapp").addEventListener("click", function () {
    let epost = epostFelt.value + "@gmail.com";
    let passord = passordFelt.value;

    createUserWithEmailAndPassword(auth, epost, passord)
        .then(function () {
            alert("Bruker opprettet!");
        })
        .catch(function (error) {
            console.error(error);
            feilmelding.innerText = "Klarte ikke opprette bruker.";
        });
});

document.querySelector("#logg-ut-knapp").addEventListener("click", function () {
    signOut(auth);
});

//#endregion


//#region Auth-status

onAuthStateChanged(auth, function (bruker) {
    if (bruker) {
        innloggingsBoks.classList.add("skjult");
        butikkBoks.classList.remove("skjult");
        epostFelt.value = "";
        passordFelt.value = "";
        feilmelding.innerText = "";
        hentProdukter();
    } else {
        innloggingsBoks.classList.remove("skjult");
        butikkBoks.classList.add("skjult");
    }
});

//#endregion


//#region Produkter

async function hentProdukter() {
    let produktContainer = document.querySelector(".produkter");
    produktContainer.innerHTML = "";

    let querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach(function (doc) {
        let produkt = doc.data();

        let bildeTag = (produkt.imageURL && produkt.imageURL !== "Blank")
            ? `<img src="${produkt.imageURL}" alt="${produkt.name}">`
            : `<img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Placeholder">`;

        let produktHTML = `
            <div class="produkt">
                ${bildeTag}
                <h2>${produkt.name}</h2>
                <p>${produkt.description}</p>
                <div class="price">${produkt.price} kr</div>
                <button class="btn-secondary" onclick="kjop()">Legg i handlekurv</button>
            </div>
        `;

        produktContainer.innerHTML += produktHTML;
    });
}

window.kjop = function () {
    alert("Varen er lagt i handlekurven!");
}

//#endregion