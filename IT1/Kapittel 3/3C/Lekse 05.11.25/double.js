

// Oppgave 5 - Dobbel-for-løkke

for(let a=1; a<=10; a++) {
    for(let b=1; b<=10; b++) {
    console.log(a + ' * ' + b + ' = ' + a*b)
    }
}

// Oppgave Oppgave 5 - Fibonacci

let c=0
let d=1

for(let f=1; f<=10; f++) {
    console.log(c)
    let e=c+d;
    c=d;
    d=e;
}


// Oppgave 16

let tag =''
for(let g=1; e<=4; g++) {
    tag+='#';
    console.log(tag);
}


// Nested loop
let primes = []; // Array

for (let m = 2; m<10000000; m++) {
    let isPrime = True
    
    for (let n = 2; n<m; n++) {
        if(m%n == 0){
            // Den er ikke primtall
            isPrime = false
        }
    }

    if(isPrime){
        primes.push(m); // Dytter m inn i arrayet
    }
}

console.log(primes[499])