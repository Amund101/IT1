/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
    // ... din config her
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
*/

// DUMMY DATA FOR SKETCH
const posts = [
    {
        id: "1",
        title: "Hvordan lære JavaScript raskt?",
        content: "Jeg sliter litt med å forstå funksjoner og loops. Noen tips?",
        replies: [
            "Start med små prosjekter!",
            "Se videoer på YouTube, f.eks. Net Ninja."
        ]
    },
    {
        id: "2",
        title: "Beste VS Code extensions?",
        content: "Hva bruker dere til webutvikling? Jeg har Prettier og Live Server.",
        replies: [
            "ES7 React snippets er bra hvis du bruker React.",
            "Color Highlight er nyttig for CSS."    
        ]
    },
    {
        id: "3",
        title: "Er HTML et programmeringsspråk?",
        content: "Diskuter!",
        replies: [
            "Nei, det er et markupspråk.",
            "Teknisk sett nei, men det er koding."
        ]
    }
];

const collectionContainerEl = document.querySelector("#collection");

function renderList() {
    collectionContainerEl.innerHTML = "";

    posts.forEach((post) => {
        // Create Post Container
        const postEl = document.createElement("div");
        postEl.classList.add("post");

        // Create Header (Title + Toggle Icon)
        const headerEl = document.createElement("div");
        headerEl.classList.add("post-header");
        headerEl.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <span class="toggle-icon">▼</span>
        `;

        // Click event to expand/collapse
        headerEl.addEventListener("click", () => {
            postEl.classList.toggle("expanded");
        });

        // Create Body (Content + Replies)
        const bodyEl = document.createElement("div");
        bodyEl.classList.add("post-body");

        // Replies HTML generation
        const repliesHtml = post.replies.map(reply => `<li class="reply">${reply}</li>`).join("");

        bodyEl.innerHTML = `
            <div class="content-text">
                <p>${post.content}</p>
                
                <div class="replies-container">
                    <button class="show-replies-btn">Se replies (${post.replies.length})</button>
                    <ul class="replies-list">
                        ${repliesHtml}
                    </ul>
                </div>
            </div>
        `;

        // Handle "Se replies" button click
        const showRepliesBtn = bodyEl.querySelector(".show-replies-btn");
        const repliesList = bodyEl.querySelector(".replies-list");

        showRepliesBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent ensuring parent post collapse
            repliesList.classList.toggle("visible");
            showRepliesBtn.textContent = repliesList.classList.contains("visible")
                ? "Skjul replies"
                : `Se replies (${post.replies.length})`;
        });

        // Assemble
        postEl.appendChild(headerEl);
        postEl.appendChild(bodyEl);
        collectionContainerEl.appendChild(postEl);
    });
}

// Start the render
renderList();
