import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";


//#region Firebase oppsett

const firebaseConfig = {
    apiKey: "AIzaSyBWfmhPhiJ2WFy8mFUtahPy2TuHHgrLhqg",
    authDomain: "prosjekt4it1.firebaseapp.com",
    projectId: "prosjekt4it1",
    storageBucket: "prosjekt4it1.firebasestorage.app",
    messagingSenderId: "7856184393",
    appId: "1:7856184393:web:3030e5efb0f76abfbb3398"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

//#endregion


//#region Åpne og lukke vinduer

// Åpner innloggings-popupen
document.getElementById("btShowLogin").addEventListener("click", function () {
    document.getElementById("loginPopup").style.display = "flex";
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("registerSection").style.display = "none";
});

// X-knappen i hjørnet lukker vinduet
document.querySelector(".lukk-knapp").addEventListener("click", function () {
    document.getElementById("loginPopup").style.display = "none";
});

// Lukker vinduet hvis man klikker på utsiden av det
window.addEventListener("click", function (e) {
    if (e.target == document.getElementById("loginPopup")) {
        document.getElementById("loginPopup").style.display = "none";
    }
    if (e.target == document.getElementById("redigerPopup")) {
        document.getElementById("redigerPopup").style.display = "none";
    }
});

// Bytter fra logg inn til registrering
document.getElementById("linkToRegister").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
});

// Bytter fra registrering til logg inn
document.getElementById("linkToLogin").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
});

//#endregion


//#region Logg inn

// Logger brukeren inn
document.getElementById("signInButton").addEventListener("click", function () {
    let epost = document.getElementById("signInEmailInput").value;
    let passord = document.getElementById("signInPasswordInput").value;

    // Fikser epost hvis man glemmer @
    if (!epost.includes("@")) {
        epost = epost + "@gmail.com";
    }

    signInWithEmailAndPassword(auth, epost, passord)
        .then(function () {
            document.getElementById("loginPopup").style.display = "none";
            document.getElementById("signInEmailInput").value = "";
            document.getElementById("signInPasswordInput").value = "";
        })
        .catch(function () {
            alert("Feil brukernavn eller passord!");
        });
});

//#endregion


//#region Registrering

// Lager ny bruker
document.getElementById("registerButton").addEventListener("click", function () {
    let epost = document.getElementById("registerEmailInput").value;
    let passord = document.getElementById("registerPasswordInput").value;

    if (!epost.includes("@")) {
        epost = epost + "@gmail.com";
    }

    createUserWithEmailAndPassword(auth, epost, passord)
        .then(function () {
            document.getElementById("loginPopup").style.display = "none";
            document.getElementById("registerEmailInput").value = "";
            document.getElementById("registerPasswordInput").value = "";
            alert("Bruker laget! Nå kan du logge inn.");
        })
        .catch(function () {
            alert("Noe gikk galt med registreringen.");
        });
});

// Lager et tilfeldig passord
document.getElementById("generatePasswordBtn").addEventListener("click", function () {
    let tegn = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÆæØøÅå1234567890!@#$%^&*()";
    let nyttPassord = "";

    for (let i = 0; i < 16; i++) {
        let tilfeldig = Math.floor(Math.random() * tegn.length);
        nyttPassord = nyttPassord + tegn[tilfeldig];
    }

    document.getElementById("registerPasswordInput").value = nyttPassord;
    document.getElementById("registerPasswordInput").type = "text";
});

//#endregion


//#region Logg ut og status

// Sjekker om noen er logget inn eller ikke
onAuthStateChanged(auth, function (bruker) {
    if (bruker) {
        document.getElementById("btShowLogin").style.display = "none";
        document.getElementById("btLogout").style.display = "block";
        document.getElementById("postFormSection").style.display = "block";
    } else {
        document.getElementById("btShowLogin").style.display = "block";
        document.getElementById("btLogout").style.display = "none";
        document.getElementById("postFormSection").style.display = "none";
    }

    visInnlegg();
});

// Knapp for å logge ut
document.getElementById("btLogout").addEventListener("click", function () {
    signOut(auth);
});

//#endregion


//#region Liste med innlegg

// Henter og viser alle innlegg på siden
function visInnlegg() {
    onSnapshot(collection(db, "Posts"), function (snapshot) {

        // Sletter alt som er der fra før
        document.getElementById("collection").innerHTML = "";

        snapshot.forEach(function (dokument) {
            let data = dokument.data();
            let id = dokument.id;

            let boks = document.createElement("div");
            boks.className = "post-container";

            // Tilt boksen litt tilfeldig
            let tilt = Math.random() * 5 - 2.5;
            boks.style.transform = "rotate(" + tilt + "deg)";

            // Fikser datoen
            let datoPrefix = "Ukjent dato";
            if (data.createdAt) {
                datoPrefix = data.createdAt.toDate().toLocaleString();
            }

            // Fikser brukernavn
            let navn = data.user.split("@")[0];

            boks.innerHTML = `
                <div class="post-header">${data.header}</div>
                <div class="post-info">Av: ${navn} | ${datoPrefix}</div>
                <div class="post-innhold">${data.content}</div>
            `;

            // Legger til knapper hvis man er logget inn
            if (auth.currentUser) {
                let redigerKnapp = document.createElement("button");
                redigerKnapp.innerText = "Rediger";
                redigerKnapp.style.backgroundColor = "#74b9ff";
                redigerKnapp.addEventListener("click", function () {
                    aapneRedigerPopup(id, data.header, data.content);
                });

                let slettKnapp = document.createElement("button");
                slettKnapp.innerText = "Slett";
                slettKnapp.style.backgroundColor = "#ff4444";
                slettKnapp.style.color = "white";
                slettKnapp.addEventListener("click", function () {
                    fjernInnlegg(id);
                });

                boks.appendChild(redigerKnapp);
                boks.appendChild(slettKnapp);
            }

            document.getElementById("collection").appendChild(boks);
        });
    });
}

//#endregion


//#region Slett og rediger funksjoner

// Sletter et innlegg
async function fjernInnlegg(id) {
    let sjekk = confirm("Vil du virkelig slette dette?");
    if (sjekk) {
        await deleteDoc(doc(db, "Posts", id));
    }
}

// Åpner popupen for å redigere
function aapneRedigerPopup(id, gammelTittel, gammelTekst) {
    document.getElementById("editHeaderInput").value = gammelTittel;
    document.getElementById("editContentInput").value = gammelTekst;
    document.getElementById("redigerPopup").style.display = "flex";

    // Lagrer når man klikker på knappen
    document.getElementById("editSaveBtn").onclick = async function () {
        let nyTittel = document.getElementById("editHeaderInput").value;
        let nyTekst = document.getElementById("editContentInput").value;

        await updateDoc(doc(db, "Posts", id), {
            header: nyTittel,
            content: nyTekst
        });

        document.getElementById("redigerPopup").style.display = "none";
        alert("Innlegget ble lagret!");
    };

    // Avbryt knappen
    document.getElementById("editCancelBtn").onclick = function () {
        document.getElementById("redigerPopup").style.display = "none";
    };
}

//#endregion


//#region Nytt innlegg

// Poster til Firebase
document.getElementById("addPostForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let tittel = document.getElementById("headerInput").value;
    let tekst = document.getElementById("contentInput").value;
    let bruker = auth.currentUser;

    await addDoc(collection(db, "Posts"), {
        header: tittel,
        content: tekst,
        user: bruker.email,
        createdAt: serverTimestamp()
    });

    // Tømmer feltene
    document.getElementById("headerInput").value = "";
    document.getElementById("contentInput").value = "";
});

//#endregion