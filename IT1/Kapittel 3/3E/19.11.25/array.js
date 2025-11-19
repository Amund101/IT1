// Array Accessor Methods

// concat()
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
console.log('concat():', array3);

// join()
const elements = ['Fire', 'Air', 'Water'];
console.log('join():', elements.join(' - '));

// slice()
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log('slice():', animals.slice(2));



// Array Iterator Methods

// forEach()
const items = ['item1', 'item2', 'item3'];
items.forEach(item => {
    console.log('forEach():', item);
});

// map()
const numbersMap = [1, 4, 9];
const roots = numbersMap.map(Math.sqrt);
console.log('map():', roots);

// filter()
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log('filter():', result);

// reduce()
const numsReduce = [1, 2, 3, 4];
const sum = numsReduce.reduce((accumulator, currentValue) => accumulator + currentValue);
console.log('reduce():', sum);



// Array Mutator Methods

// push()
const fruits = ['banana', 'pear', 'apple'];
fruits.push('mango');
console.log('push():', fruits);

// pop()
const plants = ['fern', 'palm', 'cactus'];
plants.pop();
console.log('pop():', plants);

// shift()
const games = ['soccer', 'basketball', 'hockey'];
games.shift();
console.log('shift():', games);

// unshift()
const numbers = [1, 2, 3];
numbers.unshift(0);
console.log('unshift():', numbers);

// splice()
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log('splice() add:', months);
months.splice(4, 1, 'May');
console.log('splice() replace:', months);