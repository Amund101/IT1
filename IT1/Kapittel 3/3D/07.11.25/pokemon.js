let pikachuHealth = 100;
let charmanderHealth = 100;

function charmander() {
    if(oneIsDead)return;

    let angrep = Math.floor(Math.random() * 4);

    if (angrep == 0) {
        pikachuHealth -= Math.floor(Math.random() * 10 + 5);
        console.log(`Charmander bruker Flammer. Pikachu: ${pikachuHealth}/100`);
    }
    else if (angrep == 1) {
        pikachuHealth -= Math.floor(Math.random() * 25 + 10);
        console.log(`Charmander bruker Blaze. Pikachu: ${pikachuHealth}/100`);
    }
    else if (angrep == 2) {
        pikachuHealth -= Math.floor(Math.random() * 30 + 15);
        console.log(`Charmander bruker Varm iskrem. Pikachu: ${pikachuHealth}/100`);
    }
    else {
        pikachuHealth -= Math.floor(Math.random() * 80 + 15);
        console.log(`Charmander bruker Djevelens ånde. Pikachu: ${pikachuHealth}/100`);
}
}
function pikachu() {
    if(oneIsDead)return;
        let angrep = Math.floor(Math.random() * 4);

        if (angrep == 0) {
            charmanderHealth -= Math.floor(Math.random() * 10 + 5);
            console.log(`Pikachu bruker Lyn. Charmander: ${charmanderHealth}/100`);
        }
        else if (angrep == 1) {
            charmanderHealth -= Math.floor(Math.random() * 25 + 10);
            console.log(`Pikachu bruker Torden. Charmander: ${charmanderHealth}/100`);
        }
        else if (angrep == 2) {
            charmanderHealth -= Math.floor(Math.random() * 30 + 15);
            console.log(`Pikachu bruker Lynstorm. Charmander: ${charmanderHealth}/100`);
        }
        else {
            charmanderHealth -= Math.floor(Math.random() * 80 + 15);
            console.log(`Pikachu bruker Zeus sin vrede. Charmander: ${charmanderHealth}/100`);
        }
}
let oneIsDead = false;
function bothAttack() {
    pikachu();
    charmander();

    if (pikachuHealth <= 0 || charmanderHealth <= 0) {
        console.log("Kampen er omme!");
        oneIsDead = true;
    }
}

while(oneIsDead == false){
    bothAttack();
}