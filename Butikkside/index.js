//#region 1. FIREBASE INITIALISERING (FIKSET FOR FIRESTORE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// Vi henter funksjonene spesifikt for Cloud Firestore i stedet for Realtime Database
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6tDcN1PxB1xlHsf1eUpEJvdqT0r6Hq1s",
  authDomain: "prosjekt5it1.firebaseapp.com",
  databaseURL: "https://prosjekt5it1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prosjekt5it1",
  storageBucket: "prosjekt5it1.firebasestorage.app",
  messagingSenderId: "404294597483",
  appId: "1:404294597483:web:4c6694ca00e3e2f12baa2e",
  measurementId: "G-S2DVCT8519"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialiserer Firestore
//#endregion

//#region 2. APP STATE
let alleLamper = [];
let handlekurv = [];
let aktivLampe = null;

// Godkjente brukere som ligger lagret lokalt i scriptet
const GODKJENTE_BRUKERE = [
  { epost: "admin123@gmail.com", brukernavn: "admin123", passord: "passord" },
  { epost: "demo@lumos.no", brukernavn: "demo", passord: "lumos123" }
];
//#endregion

//#region 3. DOM REFERANSER
const loginPopup = document.getElementById("loginPopup");
const cartPopup = document.getElementById("cartPopup");
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const collectionBoks = document.getElementById("collection");
const arkivView = document.getElementById("arkivView");
const detaljView = document.getElementById("detaljView");

const signInEmailInput = document.getElementById("signInEmailInput");
const signInPasswordInput = document.getElementById("signInPasswordInput");
const registerEmailInput = document.getElementById("registerEmailInput");
const registerPasswordInput = document.getElementById("registerPasswordInput");
const loginFeilMsg = document.getElementById("loginFeilMsg");

const btShowLogin = document.getElementById("btShowLogin");
const btLogout = document.getElementById("btLogout");
const btShowCart = document.getElementById("btShowCart");
const countKnapp = document.getElementById("count");
const userDisplay = document.getElementById("userDisplay");
//#endregion

//#region 4. DATABASEHENTING (FIKSET FOR FIRESTORE)
function hentDataFraFirebase() {
  collectionBoks.innerHTML = "<p>Henter lamper fra databasen...</p>";
  
  // Henter alle dokumenter fra samlingen (collection) som heter "lamper" i Firestore
  getDocs(collection(db, "lamper")).then(function(querySnapshot) {
    alleLamper = [];

    // Vi går igjennom hvert dokument som ble funnet i databasen
    querySnapshot.forEach(function(doc) {
      const vare = doc.data(); // Henter ut dataen inni dokumentet
      
      // Vi bruker de nøyaktige feltnavnene dine (navn, pris, bildeUrl, beskrivelse, lagerstatus)
      alleLamper.push({
        id: doc.id, // ID-en til dokumentet
        navn: vare.navn || "Uten navn",
        pris: Number(vare.pris) || 0,
        bilde: vare.bildeUrl || "https://picsum.photos/seed/lumos/600/800",
        beskrivelse: vare.beskrivelse || "Ingen beskrivelse skrevet.",
        lager: vare.lagerstatus || "Ukjent"
      });
    });

    // Sjekker om vi faktisk fant noen lamper
    if (alleLamper.length > 0) {
      tegnVarene();
    } else {
      collectionBoks.innerHTML = "<p>Samlingen 'lamper' eksisterer, men den er helt tom.</p>";
    }

  }).catch(function(feil) {
    console.error(feil);
    collectionBoks.innerHTML = "<p>Feil: Kunne ikke hente data. Sjekk 'Rules' i Firestore-konsollen din.</p>";
  });
}
//#endregion

//#region 5. RENDERING OG VISNINGER
function tegnVarene() {
  let htmlKode = "";
  for (let i = 0; i < alleLamper.length; i++) {
    let lampe = alleLamper[i];
    htmlKode += `
      <article class="card" onclick="visEnkelLampe('${lampe.id}')">
        <img class="card-img" src="${lampe.bilde}">
        <div class="card-info">
          <h2>${lampe.navn}</h2>
          <p>${lampe.pris} NOK</p>
        </div>
      </article>
    `;
  }
  collectionBoks.innerHTML = htmlKode;
}

window.visEnkelLampe = function(id) {
  for (let i = 0; i < alleLamper.length; i++) {
    if (alleLamper[i].id === id) {
      aktivLampe = alleLamper[i];
    }
  }

  if (aktivLampe) {
    document.getElementById("detail-img").src = aktivLampe.bilde;
    document.getElementById("detail-name").textContent = aktivLampe.navn;
    document.getElementById("detail-price").textContent = aktivLampe.pris + " NOK";
    document.getElementById("detail-desc").textContent = aktivLampe.beskrivelse;

    arkivView.hidden = true;
    detaljView.hidden = false;
  }
};

document.getElementById("backBtn").onclick = function() {
  arkivView.hidden = false;
  detaljView.hidden = true;
};
//#endregion

//#region 6. INNLOHGING OG REGISTRERING LOGIKK
document.getElementById("signInButton").onclick = function() {
  const tekstFraFelt = signInEmailInput.value.trim();
  const innskrevetPassord = signInPasswordInput.value;
  
  let innloggingSuksess = false;
  let visningsNavn = "BRUKER";

  for (let i = 0; i < GODKJENTE_BRUKERE.length; i++) {
    let bruker = GODKJENTE_BRUKERE[i];
    
    if ((tekstFraFelt === bruker.epost || tekstFraFelt === bruker.brukernavn) && innskrevetPassord === bruker.passord) {
      innloggingSuksess = true;
      visningsNavn = bruker.brukernavn.toUpperCase();
    }
  }

  if (innloggingSuksess === true) {
    userDisplay.textContent = visningsNavn;
    btShowLogin.style.display = "none";
    btLogout.style.display = "block";
    
    signInEmailInput.value = "";
    signInPasswordInput.value = "";
    loginPopup.style.display = "none";
    loginFeilMsg.textContent = "";
  } else {
    loginFeilMsg.textContent = "Feil brukernavn/epost eller passord.";
  }
};

document.getElementById("registerButton").onclick = function() {
  const nyEpost = registerEmailInput.value.trim();
  const nyPassord = registerPasswordInput.value;

  if (nyEpost === "" || nyPassord === "") {
    alert("Du må fylle inn både e-post og passord!");
    return;
  }

  const nyBrukernavn = nyEpost.split("@")[0];

  GODKJENTE_BRUKERE.push({
    epost: nyEpost,
    brukernavn: nyBrukernavn,
    passord: nyPassord
  });

  alert("Bruker registrert! Du kan nå logge inn med: " + nyBrukernavn);
  
  registerSection.style.display = "none";
  loginSection.style.display = "block";
};

btLogout.onclick = function() {
  userDisplay.textContent = "ANONYM";
  btShowLogin.style.display = "block";
  btLogout.style.display = "none";
};

document.getElementById("linkToRegister").onclick = function() {
  loginSection.style.display = "none";
  registerSection.style.display = "block";
};

document.getElementById("linkToLogin").onclick = function() {
  registerSection.style.display = "none";
  loginSection.style.display = "block";
};

document.getElementById("generatePasswordBtn").onclick = function() {
  registerPasswordInput.value = "Lumos" + Math.floor(1000 + Math.random() * 9000);
};
//#endregion

//#region 7. HANDLEKURV SYSTEM
document.getElementById("add-to-cart").onclick = function() {
  if (aktivLampe) {
    handlekurv.push(aktivLampe);
    countKnapp.textContent = handlekurv.length;
    
    let knapp = document.getElementById("add-to-cart");
    knapp.textContent = "LAGT TIL ✓";
    setTimeout(function() { 
      knapp.textContent = "LEGG I HANDLEKURV"; 
    }, 1500);
  }
};

btShowCart.onclick = function() {
  cartPopup.style.display = "grid";
  oppdaterKurvPopup();
};

document.getElementById("clearCartBtn").onclick = function() {
  handlekurv = [];
  countKnapp.textContent = "0";
  oppdaterKurvPopup();
};

function oppdaterKurvPopup() {
  const cartList = document.getElementById("cart-list");
  const totalDisplay = document.getElementById("total");
  
  if (handlekurv.length === 0) {
    cartList.innerHTML = "<li>Kurven er helt tom.</li>";
    totalDisplay.textContent = "0 NOK";
    return;
  }

  let html = "";
  let totalPris = 0;

  for (let i = 0; i < handlekurv.length; i++) {
    html += `<li><span>${handlekurv[i].navn}</span> <span>${handlekurv[i].pris} NOK</span></li>`;
    totalPris += handlekurv[i].pris;
  }

  cartList.innerHTML = html;
  totalDisplay.textContent = totalPris + " NOK";
}

document.getElementById("checkoutBtn").onclick = function() {
  if (handlekurv.length > 0) {
    alert("Takk for din bestilling!");
    handlekurv = [];
    countKnapp.textContent = "0";
    cartPopup.style.display = "none";
  }
};
//#endregion

//#region 8. MODAL KONTROLL
btShowLogin.onclick = function() {
  loginPopup.style.display = "grid";
};

const lukkKnappLogin = document.querySelector("#loginPopup .lukk-knapp");
lukkKnappLogin.onclick = function() {
  loginPopup.style.display = "none";
};

const lukkKnappCart = document.querySelector("#cartPopup .lukk-knapp");
lukkKnappCart.onclick = function() {
  cartPopup.style.display = "none";
};
//#endregion

//#region 9. OPPSTART
hentDataFraFirebase();
//#endregion