// 1
// a
let inf1 = {
    spraak: ["HTML", "CSS"],
    likerFaget: false,
    timetall: 5,
    klasserom: "C14",
    antallElever: 24
};

// c
inf1.spraak.push("JS");
inf1.antallElever = 30;
inf1.likerFaget = true;

// d
delete inf1.timetall

// e
inf1.spraak.forEach(s => {
    console.log(s)
});

// f
for (let egenskapene in inf1) {
    console.log(egenskapene)
}

// g
for (let verdieneEgenskaper in inf1) {
    console.log(inf1[verdieneEgenskaper])
    
}

// 2
// a
let filmer = [
    // Har sett
    {tittel: "The Game", regissor: "David Fincher", harJegSett: true},
    {tittel: "The Da Vinci Code", regissor: "Ron Howard",harJegSett: true},
    {tittel: "The Emoji Movie", regissor: "Tony Leondis",harJegSett: true},
    {tittel: "Monsters vs Aliens", regissor: "Rob Letterman & Conrad Vernon",harJegSett: true},
    {tittel: "Paul Blart: Mall Cop", regissor: "Steve Carr", harJegSett: true},

    // Har ikke sett
    {tittel: "Jingle Bell Heist",regissor: "Michael Fimognari",harJegSett: false},
    {tittel: "Freaky Friday",regissor: "Mark Waters",harJegSett: false},
    {tittel: "The Threesome",regissor: "Nathalie Biancheri",harJegSett: false},
    {tittel: "Da xiang xi di er zuo",regissor: "Hu Bo",harJegSett: false},
    {tittel: "Meng long guo jiang",regissor: "Bruce Lee",harJegSett: false}
];

// b
for(let toForste in filmer) {
    console.log(`${filmer[toForste].tittel} av ${filmer[toForste].regissor}`)
}

// c
function sorterMedNavn(a, b) {
    return a.tittel.localeCompare(b.tittel);
}
filmer.sort(sorterMedNavn)

// d
for(let indikator in filmer) {
    let tekst;
    if (filmer[indikator].harJegSett) {
        tekst = "jeg har sett";
    }
    else {
        tekst = "Jeg har ikke sett";
    }

    console.log(`${tekst} ${filmer[indikator].tittel} av ${filmer[indikator].regissor}`)
}