import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// firebase greier
const app = initializeApp({
    apiKey: "AIzaSyBWfmhPhiJ2WFy8mFUtahPy2TuHHgrLhqg",
    authDomain: "prosjekt4it1.firebaseapp.com",
    projectId: "prosjekt4it1",
    storageBucket: "prosjekt4it1.firebasestorage.app",
    messagingSenderId: "7856184393",
    appId: "1:7856184393:web:3030e5efb0f76abfbb3398"
});

const db = getFirestore(app);
const auth = getAuth(app);

// variabel for hvilken id som redigeres
let redigerID = "";


// logg inn knapp viser popupen
document.getElementById("btShowLogin").addEventListener("click", function () {
    document.getElementById("loginPopup").style.display = "block";
});

document.getElementById("lukkLogin").addEventListener("click", function () {
    document.getElementById("loginPopup").style.display = "none";
});

document.getElementById("lukkRegister").addEventListener("click", function () {
    document.getElementById("registerPopup").style.display = "none";
});

// bytte mellom logg inn og registrer
document.getElementById("gaaRegister").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("loginPopup").style.display = "none";
    document.getElementById("registerPopup").style.display = "block";
});

document.getElementById("gaaLogin").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("registerPopup").style.display = "none";
    document.getElementById("loginPopup").style.display = "block";
});


// logg inn
document.getElementById("signInButton").addEventListener("click", function () {
    let epost = document.getElementById("brukernavn").value;
    let passord = document.getElementById("passordInput").value;

    // legger til gmail hvis de ikke har skrevet det
    if (epost.includes("@") == false) {
        epost = epost + "@gmail.com";
    }

    signInWithEmailAndPassword(auth, epost, passord)
        .then(function () {
            document.getElementById("loginPopup").style.display = "none";
            document.getElementById("brukernavn").value = "";
            document.getElementById("passordInput").value = "";
        })
        .catch(function () {
            alert("Feil brukernavn eller passord");
        });
});


// registrer
document.getElementById("registerButton").addEventListener("click", function () {
    let epost = document.getElementById("regBruker").value;
    let passord = document.getElementById("regPassord").value;

    if (epost.includes("@") == false) {
        epost = epost + "@gmail.com";
    }

    createUserWithEmailAndPassword(auth, epost, passord)
        .then(function () {
            alert("Bruker laget!");
            document.getElementById("registerPopup").style.display = "none";
        })
        .catch(function () {
            alert("Gikk ikke. Passordet er kanskje for kort?");
        });
});


// logg ut
document.getElementById("btLogout").addEventListener("click", function () {
    signOut(auth);
});


// dette kjorer naar noen logger inn eller ut
onAuthStateChanged(auth, function (bruker) {
    if (bruker) {
        // er logget inn
        document.getElementById("btShowLogin").style.display = "none";
        document.getElementById("btLogout").style.display = "inline";
        document.getElementById("skrivInnlegg").style.display = "block";
    } else {
        // ikke logget inn
        document.getElementById("btShowLogin").style.display = "inline";
        document.getElementById("btLogout").style.display = "none";
        document.getElementById("skrivInnlegg").style.display = "none";
    }
});


// henter innlegg og viser dem
onSnapshot(collection(db, "Posts"), function (snapshot) {
    document.getElementById("innleggListe").innerHTML = "";

    snapshot.forEach(function (d) {
        let data = d.data();
        let id = d.id;

        let div = document.createElement("div");
        div.className = "innlegg";

        // dato
        let dato = "ukjent";
        if (data.createdAt) {
            dato = data.createdAt.toDate().toLocaleString();
        }

        // navn
        let navn = data.user.split("@")[0];

        div.innerHTML = `
            <h3>${data.header}</h3>
            <p>${data.content}</p>
            <small>Av: ${navn} | ${dato}</small>
        `;

        // knapper for å redigere og slette, vises bare hvis innlogget
        if (auth.currentUser) {
            let redigerBtn = document.createElement("button");
            redigerBtn.innerText = "Rediger";
            redigerBtn.addEventListener("click", function () {
                redigerID = id;
                document.getElementById("nyTittel").value = data.header;
                document.getElementById("nyTekst").value = data.content;
                document.getElementById("redigerPopup").style.display = "block";
            });

            let slettBtn = document.createElement("button");
            slettBtn.innerText = "Slett";
            slettBtn.className = "slett-knapp";
            slettBtn.addEventListener("click", function () {
                let svar = confirm("Vil du slette?");
                if (svar == true) {
                    deleteDoc(doc(db, "Posts", id));
                }
            });

            div.appendChild(redigerBtn);
            div.appendChild(slettBtn);
        }

        document.getElementById("innleggListe").appendChild(div);
    });
});


// publiser innlegg
document.getElementById("postKnapp").addEventListener("click", async function () {
    let tittel = document.getElementById("tittelInput").value;
    let tekst = document.getElementById("tekstInput").value;

    if (tittel == "" || tekst == "") {
        alert("Du må fylle inn begge feltene!");
        return;
    }

    await addDoc(collection(db, "Posts"), {
        header: tittel,
        content: tekst,
        user: auth.currentUser.email,
        createdAt: serverTimestamp()
    });

    document.getElementById("tittelInput").value = "";
    document.getElementById("tekstInput").value = "";
});


// lagre redigert innlegg
document.getElementById("lagreEndringer").addEventListener("click", async function () {
    let tittel = document.getElementById("nyTittel").value;
    let tekst = document.getElementById("nyTekst").value;

    await updateDoc(doc(db, "Posts", redigerID), {
        header: tittel,
        content: tekst
    });

    document.getElementById("redigerPopup").style.display = "none";
});

document.getElementById("avbrytRediger").addEventListener("click", function () {
    document.getElementById("redigerPopup").style.display = "none";
});