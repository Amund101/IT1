//#region imports and connection to firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

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



//#region QuerySelectors
const collectionContainer = document.querySelector("#collection");
const form = document.querySelector("#addPostForm");

// Inputs
const headerInput = document.querySelector("#headerInput");
// User input fjernet, lager random string i stedet
const contentInput = document.querySelector("#contentInput");
//#endregion

function visSignIn() {
    document.getElementById("signInContainer").style.display = "block";
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("postFormSide").style.display = "none";
}

function visRegister() {
    document.getElementById("registerContainer").style.display = "block";
    document.getElementById("signInContainer").style.display = "none";
    document.getElementById("postFormSide").style.display = "none";
}

function visLeggTil() {
    document.getElementById("postFormSide").style.display = "block";
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("signInContainer").style.display = "none";
}

if (btShowRegister) btShowRegister.addEventListener("click", visRegister);
if (btShowLogin) btShowLogin.addEventListener("click", visSignIn);
if (btShowLeggTil) btShowLeggTil.addEventListener("click", visLeggTil);
//#region AUTH  
// Sign in
const signInEmailInputEl = document.querySelector("#signInEmailInput");
const signInPasswordInputEl = document.querySelector("#signInPasswordInput");
const signInButtonEl = document.querySelector("#signInButton");
if (signInButtonEl) signInButtonEl.addEventListener("click", signInUser);

// Register
const registerEmailInputEl = document.querySelector("#registerEmailInput");
const registerPasswordInputEl = document.querySelector("#registerPasswordInput");
const registerButtonEl = document.querySelector("#registerButton");
if (registerButtonEl) registerButtonEl.addEventListener("click", registerNewUser);


// SignInUser
function signInUser() {
    let email = signInEmailInputEl.value;
    let password = signInPasswordInputEl.value;

    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            visLeggTil();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage);
            alert("Feil ved innlogging: " + errorMessage);
        })
}

// RegisterNewUser
function registerNewUser() {
    let email = registerEmailInputEl.value;
    let password = registerPasswordInputEl.value;

    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User registered:", userCredential.user);
            alert("User registered!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage);
            alert(errorMessage);
        });
}
//#endregion

async function renderList() {
    collectionContainer.innerHTML = "";

    // Henter dokumenter
    let querySnapshot = await getDocs(collection(db, "Posts"));

    querySnapshot.forEach((docInfo) => {
        let post = docInfo.data();
        let id = docInfo.id;

        let container = document.createElement("div");
        container.className = "post-container";

        // Overskrift
        let headerDiv = document.createElement("div");
        headerDiv.className = "post-header";
        headerDiv.innerHTML = "► <b>" + (post.header || "Ingen tittel") + "</b>";

        // Innhold (skjult start)
        let contentDiv = document.createElement("div");
        contentDiv.className = "post-content-area";
        contentDiv.style.display = "none";

        // Dato håndtering
        let datoTekst = "Ukjent";
        if (post.createdAt && post.createdAt.toDate) {
            datoTekst = post.createdAt.toDate().toLocaleString();
        }

        contentDiv.innerHTML = `
            <p>Av: ${post.user}</p>
            <p>Tid: ${datoTekst}</p>
            <hr>
            <p>${post.content}</p>
            <div style="margin: 10px 0;">
                <button class="like-btn">👍 ${post.likes || 0}</button>
                <button class="dislike-btn">👎 ${post.dislikes || 0}</button>
            </div>
            <br>
            <button class="slett-btn" style="background:red; color:white;">SLETT</button>
        `;

        // Klikk for å åpne
        headerDiv.addEventListener("click", () => {
            if (contentDiv.style.display === "none") {
                contentDiv.style.display = "block";
                headerDiv.innerHTML = "▼ <b>" + (post.header || "Ingen tittel") + "</b>";
            } else {
                contentDiv.style.display = "none";
                headerDiv.innerHTML = "► <b>" + (post.header || "Ingen tittel") + "</b>";
            }
        });

        // Like-knapp
        let likeBtn = contentDiv.querySelector(".like-btn");
        likeBtn.addEventListener("click", async () => {
            await updateDoc(doc(db, "Posts", id), {
                likes: (post.likes || 0) + 1
            });
            renderList();
        });

        // Dislike-knapp
        let dislikeBtn = contentDiv.querySelector(".dislike-btn");
        dislikeBtn.addEventListener("click", async () => {
            await updateDoc(doc(db, "Posts", id), {
                dislikes: (post.dislikes || 0) + 1
            });
            renderList();
        });

        // Slett-knapp
        let slettBtn = contentDiv.querySelector(".slett-btn");
        slettBtn.addEventListener("click", async () => {
            await deleteDoc(doc(db, "Posts", id));
            renderList();
        });

        container.appendChild(headerDiv);
        container.appendChild(contentDiv);
        collectionContainer.appendChild(container);
    });
}

renderList();
visSignIn();

// Legger til dataen jeg putter i input
form.addEventListener("submit", addToDatabase);

async function addToDatabase(e) {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("Du må være logget inn for å legge ut innlegg!");
        return;
    }

    let newDoc = {
        header: headerInput.value,
        user: user.email,
        content: contentInput.value,
        createdAt: serverTimestamp(),
        likes: 0,
        dislikes: 0
    };

    await addDoc(collection(db, "Posts"), newDoc);

    // Tøm input
    headerInput.value = "";
    contentInput.value = "";

    renderList();
}