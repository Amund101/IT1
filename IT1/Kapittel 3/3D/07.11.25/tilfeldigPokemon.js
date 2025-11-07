let numberOfWaterPokemon = 0
let numberOfFirePokemon = 0
let numberOfGrassPokemon = 0

function getPokemonType(id) {
    let chance = Math.floor(Math.Random()*3)

    for (let id = 0; id < 10; id++) {
        let type = getPokemonType(id)  
        if(chance == 0) {
        numberOfWaterPokemon += 1
        console.log("Pokemon ID ["+id+"] er av typen Water. Den elsker å svømme!")
            return "water"
        }
        else if(chance ==1) {
            numberOfFirePokemon += 1
            console.log("Pokemon ID ["+id+"] er av typen Fire. Vær forsiktig, den er varm!")
                return "fire"
        }
        else {
            numberOfGrassPokemon += 1
        console.log("Pokemon ID ["+id+"] er av typen Grass. Den nyter solen!")
            return "grass"
        }
    }

    console.log(`Vi har ${numberOfWaterPokemon} water pokemon`)
    console.log(`Vi har ${numberOfFirePokemon} fire pokemon`)
    console.log(`Vi har ${numberOfGrassPokemon} grass pokemon`)
}
