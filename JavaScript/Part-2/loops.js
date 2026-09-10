// For Loop

for (let i = 1; i <= 5; i++) {
    console.log(i);
}



// Print Odd Numbers

for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}


// Nested For Loop

for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(i, j);
    }
}


// While Loop

let count = 1;

while (count <= 5) {
    console.log(count);
    count++;
}


// Loops with Arrays

let fruitsList = ["Apple", "Banana", "Mango", "Orange"];

for (let i = 0; i < fruitsList.length; i++) {
    console.log(fruitsList[i]);
}


// Loops with Nested Arrays

let numberGroups = [
    [10, 20],
    [30, 40],
    [50, 60]
];

for (let i = 0; i < numberGroups.length; i++) {
    for (let j = 0; j < numberGroups[i].length; j++) {
        console.log(numberGroups[i][j]);
    }
}


// for of Loop

let colorsList = ["Red", "Green", "Blue", "Yellow"];

for (let color of colorsList) {
    console.log(color);
}