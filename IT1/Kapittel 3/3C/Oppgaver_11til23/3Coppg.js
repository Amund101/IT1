let i=0
while(i<=50){
    console.log(i);
    i++;
}

for(let i=0; i<=50; i++){
    console.log(i);
}

let i=0
while(i<=999){
    console.log(i)
    i+=3
}


for(let i=2; i<=100; i+=2){
    console.log(i)
}

let sum = 0;
for(let i=0; i<=100; i++){
    sum+=i
}
console.log(sum);


// 2 //


let i = 1
while (i<=100) {
    if(i%3==0 && i%5==0) {
        console.log('FizzBuzz')
    }
    else if (i%3 == 0){
        console.log('Fizz')
    }
    else if (i%5 == 0){
        console.log('Buzz')
    }
    else {
        console.log(i)
    } 
    i++
}