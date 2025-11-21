// 1
let primtall = [7, 11, 13, 17, 19, 23, 43, 47, 53, 59, 61, 67];


// 2
function konsollPunktumLog() {
    console.log(primtall);
}


// 3
let setPrime;
primtall.length = 0;

for (let i = 0; i < 100; i++) {
    setPrime = true;

    if (i % 2 === 0 || i % 3 === 0) {
        setPrime = false;
    }

    if (setPrime === true) {
        primtall.push(i);
    }
}


// 4
for (let i = 0; i < 100; i++) {
    setPrime = true;

    if (i % 2 === 0 || i % 3 === 0) {
        setPrime = false;
    }

    if (setPrime === true) {
        console.log(i);
    }
}


// 5
function fylleMedTall() {
    arrayet = [];

    for(i=0; i<=100; i++) {
        mittTall = Math.floor(Math.random()*100)
        arrayet.push(mittTall);
    }

    console.log(arrayet);

}
