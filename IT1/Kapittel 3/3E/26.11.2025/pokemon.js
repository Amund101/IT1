let team = [
    { id: 1, name: "Pikachu", type: "Electric", level: 25, attack: 40, health: 60 },
    { id: 2, name: "Charmander", type: "Fire", level: 20, attack: 35, health: 55 },
    { id: 3, name: "Squirtle", type: "Water", level: 22, attack: 38, health: 58 },
    { id: 4, name: "Bulbasaur", type: "Grass", level: 18, attack: 32, health: 52 }
];

function displayTeam(pokemonArray) {
    console.log("--- Display Team ---");
    pokemonArray.forEach(pokemon => {
        let logMessage = "ID: " + pokemon.id +
            " | Navn: " + pokemon.name +
            " | Type: " + pokemon.type +
            " | Nivå: " + pokemon.level +
            " | Angrep: " + pokemon.attack +
            " | Liv: " + pokemon.health;
        console.log(logMessage);
    });
}

function addNewTeamMember(newId, newName, newType, newLevel, newAttack, newHealth) {
    let newPokemon = {
        id: newId,
        name: newName,
        type: newType,
        level: newLevel,
        attack: newAttack,
        health: newHealth
    };
    team.push(newPokemon);
}

for (let t of team) {
    t.level = 1;
}

for (let t of team) {
    t.attack = Math.floor(Math.random() * 10) + 5;
    t.health = Math.floor(Math.random() * 20) + 20;
}



function sorterMedNavn(a, b) {
    return a.name.localeCompare(b.name);
}





addNewTeamMember(5, "Eevee", "Normal", 15, 30, 50);
team.sort(sorterMedNavn)
displayTeam(team);