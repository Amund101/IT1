//#region imports and connection to firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyApXFO2sVagrm4LYwA9dcui6DMUdRKH4Vk",
    authDomain: "prosjekt-1-4f037.firebaseapp.com",
    projectId: "prosjekt-1-4f037",
    storageBucket: "prosjekt-1-4f037.firebasestorage.app",
    messagingSenderId: "619968747857",
    appId: "1:619968747857:web:814a97191fe8204f789b70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//#endregion

//#region QuerySelectors
// Buttons
let addBtnEl = document.querySelector("#add");
// Containers
let itemsContainerEl = document.querySelector("#items");

//#endregion

async function renderList() {
    itemsContainerEl.innerHTML = "";

    let listQuery = query(collection(db, "jegGidderIkkeLageEnCollectionNavn"));
    let listDocs = await getDocs(listQuery);

    listDocs.forEach((docInfo) => {
        let d = docInfo.data();

        console.log(d);
        let liEl = document.createElement("li");
        liEl.innerText = d.text + " (Viktighet: " + d.importance + ")";

        itemsContainerEl.appendChild(liEl);
    });
}

renderList();

addBtnEl.addEventListener("click", addToDatabase);

async function addToDatabase() {
    let newDoc = {
        text: husketekstInputEl.value,
        importance: viktighetInputEl.value,
        category: kategoriInputEl.value,
        createdAt: serverTimestamp()
    }

    await addDoc(collection(db, "jegGidderIkkeLageEnCollectionNavn"), newDoc);

    renderList();
}
