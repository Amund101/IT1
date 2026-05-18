// 1. DATA (Aura Smart Home Produkter)
const varer = [
    {
        id: 0,
        navn: "Aura Speaker Gen 2",
        pris: 2490,
        bilde: "img/speaker.png",
        desc: "Krystallklar lyd i et minimalistisk design som passer inn i ethvert rom."
    },
    {
        id: 1,
        navn: "Aura Ambient Light",
        pris: 1290,
        bilde: "img/light.png",
        desc: "Justerbart lys med varmt treverk og frostet glass for den perfekte atmosfæren."
    },
    {
        id: 2,
        navn: "Aura Smart Hub",
        pris: 3990,
        bilde: "img/hub.png",
        desc: "Hjernen i ditt smarte hjem. Kontroller alt fra en ultra-tynn skjerm."
    },
    {
        id: 3,
        navn: "Aura Thermostat",
        pris: 1890,
        bilde: "img/thermostat.png",
        desc: "Intelligent temperaturstyring i elegant børstet stål og glass."
    },
    {
        id: 4,
        navn: "Aura Vision Cam",
        pris: 1590,
        bilde: "img/camera.png",
        desc: "Diskret sikkerhetskamera med AI-gjenkjenning og 4K-oppløsning."
    }
];

let handlekurv = JSON.parse(localStorage.getItem('auraCart')) || [];

// 2. FUNKSJONER

// Logg inn funksjon
function loggInn() {
    const bruker = document.getElementById('user-input').value;
    // Enkel sjekk for IT1 nivå, kan utvides
    sessionStorage.setItem('auraLoggedIn', 'true');
    document.getElementById('login-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-store').classList.remove('hidden');
        tegnProdukter();
        oppdaterKurvVisning();
    }, 500);
}

// Sjekk om allerede innlogget
window.onload = () => {
    if (sessionStorage.getItem('auraLoggedIn') === 'true' && document.getElementById('main-store')) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-store').classList.remove('hidden');
        tegnProdukter();
        oppdaterKurvVisning();
    }
};

// Tegn alle produkter til grid
function tegnProdukter() {
    const container = document.getElementById('product-list');
    container.innerHTML = varer.map(v => `
        <div class="product-card">
            <img src="${v.bilde}" alt="${v.navn}">
            <div class="product-details">
                <h3>${v.navn}</h3>
                <p class="price">${v.pris} kr</p>
                <button onclick="leggIKurv(${v.id})" class="main-btn">LEGG TIL I KURV</button>
            </div>
            <div class="hover-info">
                <p>${v.desc}</p>
                <button onclick="leggIKurv(${v.id})" class="main-btn">KJØP NÅ</button>
            </div>
        </div>
    `).join('');
}

// Legg vare i handlekurv
function leggIKurv(id) {
    const vare = varer.find(v => v.id === id);
    handlekurv.push(vare);
    lagreOgOppdater();

    // Visuell feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "LAGT TIL!";
    btn.style.background = "#34C759";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
    }, 1000);
}

// Fjern vare fra handlekurv
function fjernFraKurv(index) {
    handlekurv.splice(index, 1);
    lagreOgOppdater();
}

// Lagre til localStorage og oppdater visning
function lagreOgOppdater() {
    localStorage.setItem('auraCart', JSON.stringify(handlekurv));
    oppdaterKurvVisning();
}

// Oppdater handlekurv-visningen i sidebar
function oppdaterKurvVisning() {
    document.getElementById('cart-count').innerText = handlekurv.length;
    const content = document.getElementById('cart-content');
    let total = 0;

    if (handlekurv.length === 0) {
        content.innerHTML = "<p style='color:#86868b; text-align:center; margin-top:40px;'>Kurven din er tom.</p>";
    } else {
        content.innerHTML = handlekurv.map((v, i) => {
            total += v.pris;
            return `
                <div class="cart-item">
                    <img src="${v.bilde}" style="width:50px; height:50px; object-fit:contain; border-radius:8px;">
                    <div class="cart-item-info">
                        <div style="font-weight:600;">${v.navn}</div>
                        <div style="color:#86868b; font-size:0.9rem;">${v.pris} kr</div>
                    </div>
                    <button onclick="fjernFraKurv(${i})" style="background:none; border:none; color:#ff3b30; cursor:pointer; font-weight:600;">Fjern</button>
                </div>
            `;
        }).join('');
    }

    document.getElementById('total-price').innerText = total;
}

// Åpne/lukke handlekurv
function toggleCart() {
    const cart = document.getElementById('cart-sidebar');
    if (cart.classList.contains('hidden')) {
        cart.classList.remove('hidden');
    } else {
        cart.style.transform = 'translateX(100%)';
        setTimeout(() => {
            cart.classList.add('hidden');
            cart.style.transform = '';
        }, 400);
    }
}

// Fullfør kjøp
function checkOut() {
    if (handlekurv.length > 0) {
        alert("Takk for din bestilling hos AURA! Vi sender dine varer fortløpende.");
        handlekurv = [];
        lagreOgOppdater();
        toggleCart();
    } else {
        alert("Kurven er tom!");
    }
}