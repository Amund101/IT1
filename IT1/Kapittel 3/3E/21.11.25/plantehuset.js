function nickName() {
    // Legg til masse adjektiver og substantiver her.
    let firstPart = ["Testy", "Speedy", "Sneaky", "Mighty", "Crazy", "Silent", "Funky", "Wicked", "Turbo", "Mega", "Hyper", "Spicy", "Frosty", "Shadow", "Electric", "Cassius"];
    let randomIndex1 = Math.floor(Math.random() * firstPart.length);

    let lastPart = ["McTesterson", "Thunderblade", "Stormwalker", "Firebreather", "Nightstalker", "Blastmaster", "Boneshaker", "Steelbreaker", "Lightningfist", "Skullcrusher", "Ironwhisper", "Frostmender", "Quickstride", "Shadowrunner", "Stormborn", "Thundercock"];
    let randomIndex2 = Math.floor(Math.random() * lastPart.length);

    return firstPart[randomIndex1] + " " + lastPart[randomIndex2];
}


let persons = [
    {
        fornavn: "Harrald",
        etternavn: "Rex",
        kallenavn: nickName()
    },
    {
        fornavn: "Pikachu",
        etternavn: "Eevee",
        kallenavn: nickName()
    },
    {
        fornavn: "Fredrik",
        etternavn: "Frosk",
        kallenavn: nickName()
    },
    {
        fornavn: "Kari",
        etternavn: "Nordmann",
        kallenavn: nickName()
    },
    {
        fornavn: "Ela",
        etternavn: "Nordmann",
        kallenavn: nickName()
    }
];


for (let i = 0; i < persons.length; i++) {
    let name = persons[i].fornavn + " " + persons[i].etternavn + " aka: " + persons[i].kallenavn;
    console.log(name);
}
