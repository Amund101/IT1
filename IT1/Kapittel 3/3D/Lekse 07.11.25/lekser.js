// 2
function tilfeldigHilsen() {
    let tall = Math.floor(Math.random()*3);
    if(tall==0) {
        console.log("Hei");
    }
    else if(tall==1) {
        console.log("Hallo");
    }
    else {
        console.log("God dag");
    }
}

// 3
function magic8ball() {
    let tall = Math.floor(Math.random() * 3);
    if (tall == 0) {
        console.log("Ja, garantert!");
    } 
    else if (tall == 1) {
        console.log("Tviler på det...");
    } 
    else {
        console.log("Spør senere.");
    }
}

// 4
function siHeiTil(navn) {
    console.log(`Hei ${navn}!`);
}

// 5
function kvadrat(a) {
    console.log(a*a)
}

// 6{}
function sum(a, b) {
    console.log(a+b)
}

// 7
function sirkelAreal(radius) {
    let areal = 3.14 * radius * radius;
    console.log(`Arealet av en sirkel med radius ${radius} er ${areal}`);
}

// 8
function katt() {
    console.log("=^.^=");
}

// 9 - skriver ut katter så lenge antallet er større enn i
function flereKatter(katter) {
    for(let i=0; i<katter; i++) {
        console.log("=^.^=");
    }
}

// 10
function navneskilt(navnet) {
    let lengde = navnet.length + 8;

    let oppeNede = "";
    for (let i = 0; i < lengde; i++) {
        oppeNede += "*";
    }
    console.log(oppeNede);

    console.log("*   " + navnet + "   *");

    console.log(oppeNede);
}
