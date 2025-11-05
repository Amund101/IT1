

// Oppgave 5 - Dobbel-for-løkke

for(let a=1; a<=10; a++) {
    for(let b=1; b<=10; b++) {
console.log(a + ' * ' + b + ' = ' + a*b)
    }
}

// Oppgave Oppgave 5 - Fibonacci

let c=1
let d=1

while(c<=1000) {
    console.log(c)
    let e=c+d;
    c=d;
    d=e;
}


// Oppgave 16

let tag =''
for(let e=1; e<=4; e++) {
    tag+='#';
    console.log(tag);
}