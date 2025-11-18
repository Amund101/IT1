// 13
function toLike() {
    let toLike = false;    // settes til true når vi får to like
let antallForsok = 0;  // lar oss telle antall forsøk

// Så lenge vi ikke har fått to like
while(!toLike) {  
  // Øker antall forsøk med 1
  antallForsok++;

  // triller to terninger
  let terning1 = terning();
  let terning2 = terning();

  console.log("Fikk " + terning1 + ", " + terning2);

  // Undersøker om de to terningene er like
  if (terning1 === terning2) {
    toLike = true;
    console.log("Fikk to like på " + antallForsok + " forsøk");
  }
}
}


// 14
function toLike() {
    let toLike = false;    // settes til true når vi får to like
let antallForsok = 0;  // lar oss telle antall forsøk

// Så lenge vi ikke har fått to like
while(!toLike) {  
  // Øker antall forsøk med 1
  antallForsok++;

  // triller to terninger
  let terning1 = terning();
  let terning2 = terning();

  console.log("Fikk " + terning1 + ", " + terning2);

  // Undersøker om de to terningene er like
  if (terning1 === terning2) {
    toLike = true;
    console.log("Fikk to like på " + antallForsok + " forsøk");
  }
  if (terning1 + terning2 == 7) {
    console.log(`Summen av terningene er 7`)
  }
}
}


// 15
function treTerninger() {
  return Math.floor(Math.random() * 3) + 1;
}

function treLike() {
  let treLike = false;
  let antallForsok = 0;

  while (!treLike) {

    antallForsok++;

    let terning1 = terning3();
    let terning2 = terning3();
    let terning3verdi = terning3();

    let sum = terning1 + terning2 + terning3verdi;

    console.log("Fikk " + terning1 + ", " + terning2 + ", " + terning3verdi + " sum: " + sum);

    if (terning1 === terning2 && terning2 === terning3verdi) {
      treLike = true;
      console.log("Fikk tre like på " + antallForsok + " forsøk");
    }
  }
}


// 17
// Vi lager en lokal variabel ved å definere variablen inne i en funksjon eller spesifik del av koden.


// 18
// En lokal variabel er lagret inne i en del av koden eller en funksjon , og vil bare kunne endres der den er. En global variabel vil kunne bli endret og brukt gjennom hele koden.


// 1
let arrayNullTilTi = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10]


// 2
for (let i=0; i<11; i++) {
    if (arrayNullTilTi[i] % 2 == 0) {
        console.log(arrayNullTilTi[i]);
    }
}


// 3
// pop() = siste borte, push() = legger til i første,    shift() = fjern første, unshift() = legger til i første
// a
let tallTest = [2, 4, 6, 8]
tallTest.pop();
tallTest.shift();
console.log(tallTest)

// b
tallTest.splice(1, 0, 5);
console.log(tallTest)

// c
tallTest.unshift(3);
tallTest.push(7);
console.log(tallTest)

// d
tallTest.splice(0, 1, "tre");
tallTest.splice(2, 1, "fem");
tallTest.splice(4, 1, "syv");
console.log(tallTest);


// 4
// a
// Aner ikke

// b
console.log(tallTest.indexOf(10));
console.log(tallTest.lastIndexOf(10));
// Det betyr at tallet 10 ikke finnes i arrayen, derfor får vi -1

// c
// indexOf leter etter verdien i arrayen og gir oss indeksen hvis den finnes
// Siden 10 ikke er i arrayen, returnerer den -1
