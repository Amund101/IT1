//#region importer og tilkobling til firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

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


//#region ELEMENTER
// Modal elementer
const modal = document.getElementById("authModal");
const closeModalBtn = document.querySelector(".close-modal");
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const linkToRegister = document.getElementById("linkToRegister");
const linkToLogin = document.getElementById("linkToLogin");

// Knapper og inputs
const btShowLogin = document.getElementById("btShowLogin");
const btLogout = document.getElementById("btLogout");
const signInEmailInput = document.getElementById("signInEmailInput");
const signInPasswordInput = document.getElementById("signInPasswordInput");
const signInButton = document.getElementById("signInButton");
const registerEmailInput = document.getElementById("registerEmailInput");
const registerPasswordInput = document.getElementById("registerPasswordInput");
const registerButton = document.getElementById("registerButton");

// Innleggs-elementer
const collectionContainer = document.getElementById("collection");
const postFormSection = document.getElementById("postFormSection"); // Updated ID
const addPostForm = document.getElementById("addPostForm");
const headerInput = document.getElementById("headerInput");
const contentInput = document.getElementById("contentInput");
//#endregion


//#region MODAL LOGIKK
// Åpne modal
if (btShowLogin) {
    btShowLogin.addEventListener("click", () => {
        modal.style.display = "flex";
        loginSection.style.display = "block";
        registerSection.style.display = "none";
    });
}

// Lukke modal
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// Bytte mellom login og registrer
if (linkToRegister) {
    linkToRegister.addEventListener("click", (e) => {
        e.preventDefault(); // Unngå hopp i siden
        loginSection.style.display = "none";
        registerSection.style.display = "block";
    });
}

if (linkToLogin) {
    linkToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        registerSection.style.display = "none";
        loginSection.style.display = "block";
    });
}
//#endregion


//#region AUTH LOGIKK

// Logg inn
if (signInButton) {
    signInButton.addEventListener("click", () => {
        let tekst = signInEmailInput.value;
        const passord = signInPasswordInput.value;

        // Hvis teksten IKKE har en krøllalfa, så legger vi på @gmail.com
        if (tekst.includes("@") === false) {
            tekst = tekst + "@gmail.com";
        }

        signInWithEmailAndPassword(auth, tekst, passord)
            .then(() => {
                modal.style.display = "none";
                signInEmailInput.value = "";
                signInPasswordInput.value = "";
            })
            .catch((error) => {
                alert("Noe gikk galt: " + error.message);
                showToast("Du er logget inn!", "success");
            })
            .catch((error) => {
                showToast("Feil ved innlogging: " + error.message, "error");
            });
    });
}

// Generer tilfeldig passord
const generatePasswordBtn = document.getElementById("generatePasswordBtn");
if (generatePasswordBtn) {
    generatePasswordBtn.addEventListener("click", () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        registerPasswordInput.value = password;
        // Vi viser passordet i klartekst slik at brukeren kan kopiere det
        registerPasswordInput.type = "text";
    });
}

//#region CUSTOM UI (Toast & Confirm)

// TOAST FUNKSJON
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;

    container.appendChild(toast);

    // Fjern etter 3 sekunder
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// CUSTOM CONFIRM MODAL
const confirmModal = document.getElementById("confirmModal");
const confirmYesBtn = document.getElementById("confirmYesBtn");
const confirmCancelBtn = document.getElementById("confirmCancelBtn");
let confirmCallback = null; // Lagrer funksjonen som skal kjøres hvis JA

function showConfirm(title, message, callback) {
    document.getElementById("confirmTitle").innerText = title;
    document.getElementById("confirmMessage").innerText = message;
    confirmModal.style.display = "flex";
    confirmCallback = callback;
}

if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
        confirmModal.style.display = "none";
        confirmCallback = null;
    });
}

if (confirmYesBtn) {
    confirmYesBtn.addEventListener("click", () => {
        if (confirmCallback) confirmCallback();
        confirmModal.style.display = "none";
    });
}

// Lukk modal hvis man klikker utenfor
window.addEventListener("click", (e) => {
    if (e.target == confirmModal) {
        confirmModal.style.display = "none";
    }
});
//#endregion

//#region AUTH LOGIKK

// Registrer
if (registerButton) {
    registerButton.addEventListener("click", () => {
        let tekst = registerEmailInput.value;
        const passord = registerPasswordInput.value;

        // Lager e-post av brukernavnet hvis det mangler @
        if (tekst.includes("@") === false) {
            tekst = tekst + "@gmail.com";
        }

        createUserWithEmailAndPassword(auth, tekst, passord)
            .then(() => {
                modal.style.display = "none";
                registerEmailInput.value = "";
                registerPasswordInput.value = "";
                showToast("Bruker opprettet! Velkommen.", "success");
            })
            .catch((error) => {
                showToast("Kunne ikke lage bruker: " + error.message, "error");
            });
    });
}

// Logg ut
if (btLogout) {
    btLogout.addEventListener("click", () => {
        signOut(auth).then(() => {
            showToast("Du er nå logget ut.");
        });
    });
}

// Sjekke status
onAuthStateChanged(auth, (user) => {
    if (user) {
        // LOGGET INN
        // Vis bare navnet før @ hvis det er en "jukse-mail"
        let displayUser = user.email.split("@")[0];
        console.log("Bruker er innlogget:", displayUser);
        btShowLogin.style.display = "none";
        btLogout.style.display = "block";
        postFormSection.style.display = "block"; // Vis skjema for å poste
    } else {
        // LOGGET UT
        console.log("Bruker er utlogget");
        btShowLogin.style.display = "block";
        btLogout.style.display = "none";
        postFormSection.style.display = "none"; // Skjul skjema for å poste
    }
    // Uansett om man er logget inn eller ut, skal vi laste listen!
    renderList();
});
//#endregion


//#region LISTE LOGIKK
// Bruker onSnapshot for live oppdatering
function renderList() {
    onSnapshot(collection(db, "Posts"), (snapshot) => {
        collectionContainer.innerHTML = ""; // Tøm listen

        const user = auth.currentUser; // Sjekk hvem som er logget inn NÅ

        snapshot.forEach((docInfo) => {
            let post = docInfo.data();
            let id = docInfo.id;

            let container = document.createElement("div");
            container.className = "post-container";

            // KAOS: Tilfeldig rotasjon mellom -2 og 2 grader
            const randomRotation = (Math.random() * 4) - 2;
            container.style.transform = `rotate(${randomRotation}deg)`;

            // Dato
            let datoTekst = "Ukjent";
            if (post.createdAt && post.createdAt.toDate) {
                datoTekst = post.createdAt.toDate().toLocaleString();
            }

            // HTML innhold
            // Vi legger bare til knappene HVIS brukeren er eier av innlegget eller bare logget inn?
            // For enkelhetens skyld: Vis knapper hvis logget inn. 
            // Enda bedre: Vis knapper kun hvis post.user === user.email?
            // La oss gjøre det enkelt først: Vis knapper hvis logget inn.

            let buttonsHtml = "";
            if (user) {
                buttonsHtml = `
                    <div class="post-action-container">
                        <button class="edit-btn">Rediger</button>
                        <button class="slett-btn">Slett</button>
                    </div>
                 `;
            }

            container.innerHTML = `
                <div class="post-header">${post.header || "Uten tittel"}</div>
                <div class="post-info">Av: ${post.user ? post.user.split("@")[0] : "Ukjent"} | ${datoTekst}</div>
                <div class="post-content-area">${post.content}</div>
                ${buttonsHtml}
            `;

            // Legg til event listeners for knappene HVIS de finnes
            if (user) {
                const slettBtn = container.querySelector(".slett-btn");
                if (slettBtn) {
                    slettBtn.addEventListener("click", () => slettInnlegg(id));
                }

                const editBtn = container.querySelector(".edit-btn");
                if (editBtn) {
                    editBtn.addEventListener("click", () => redigerInnlegg(id, post.header, post.content));
                }
            }

            collectionContainer.appendChild(container); // Legg til i hovedlisten (øverst)
            // For å få nyest øverst kan vi bruke prepend, men sortering i query er bedre.
            // Siden vi ikke har query-sortering her, bruker vi prepend for å snu det hvis det kommer "eldst først"
            // Eller juster i visningen. Standard forEach går gjennom dokumentene.
        });
    });
}

async function slettInnlegg(id) {
    // BRUKER NÅ CUSTOM CONFIRM MODAL
    showConfirm("Slette innlegg?", "Er du sikker på at du vil slette dette?", async () => {
        await deleteDoc(doc(db, "Posts", id));
        showToast("Innlegg slettet.", "success");
    });
}

// CUSTOM EDIT MODAL
const editModal = document.getElementById("editModal");
const editHeaderInput = document.getElementById("editHeaderInput");
const editContentInput = document.getElementById("editContentInput");
const editSaveBtn = document.getElementById("editSaveBtn");
const editCancelBtn = document.getElementById("editCancelBtn");
let editCallback = null;

function showEditModal(currentHeader, currentContent, callback) {
    editHeaderInput.value = currentHeader;
    editContentInput.value = currentContent;
    editModal.style.display = "flex";
    editCallback = callback;
}

if (editCancelBtn) {
    editCancelBtn.addEventListener("click", () => {
        editModal.style.display = "none";
        editCallback = null;
    });
}

if (editSaveBtn) {
    editSaveBtn.addEventListener("click", () => {
        if (editCallback) {
            editCallback(editHeaderInput.value, editContentInput.value);
        }
        editModal.style.display = "none";
    });
}

// Lukk også edit modal ved klikk utenfor
window.addEventListener("click", (e) => {
    if (e.target == editModal) {
        editModal.style.display = "none";
    }
});


async function redigerInnlegg(id, oldHeader, oldContent) {
    showEditModal(oldHeader, oldContent, async (newHeader, newContent) => {
        if (newHeader && newContent) {
            await updateDoc(doc(db, "Posts", id), {
                header: newHeader,
                content: newContent
            });
            showToast("Innlegg oppdatert!", "success");
        }
    });
}


// Legge til nytt innlegg
if (addPostForm) {
    addPostForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            showToast("Du må være logget inn!", "error");
            return;
        }

        try {
            await addDoc(collection(db, "Posts"), {
                header: headerInput.value,
                content: contentInput.value,
                user: user.email,
                createdAt: serverTimestamp(),
                likes: 0,
                dislikes: 0
            });

            // Tøm felter
            headerInput.value = "";
            contentInput.value = "";
            showToast("Innlegg publisert!", "success");
        } catch (error) {
            console.error("Feil ved posting:", error);
            showToast("Kunne ikke poste innlegget.", "error");
        }
    });
}
//#endregion