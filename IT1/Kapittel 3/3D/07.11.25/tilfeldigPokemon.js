let numberOfWaterPokemon = 0;
let numberOfFirePokemon = 0;
let numberOfGrassPokemon = 0;

function getPokemonType(id) {
    let chance = Math.floor(Math.random() * 3);

    if (chance === 0) {
        numberOfWaterPokemon++;
        console.log(`Pokemon ID [${id}] er av typen Water. Den elsker å svømme!`);
    } 
    else if (chance === 1) {
        numberOfFirePokemon++;
        console.log(`Pokemon ID [${id}] er av typen Fire. Vær forsiktig, den er varm!`);
    } 
    else {
        numberOfGrassPokemon++;
        console.log(`Pokemon ID [${id}] er av typen Grass. Den nyter solen!`);
    }
}

for (let id = 0; id < 10; id++) {
    getPokemonType(id);
}

console.log(`Vi har ${numberOfWaterPokemon} water Pokémon`);
console.log(`Vi har ${numberOfFirePokemon} fire Pokémon`);
console.log(`Vi har ${numberOfGrassPokemon} grass Pokémon`);
