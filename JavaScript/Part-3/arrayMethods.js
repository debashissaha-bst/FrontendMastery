// forEach
let numbers = [1, 2, 3, 4, 5];

numbers.forEach(function (number) {
    console.log(number);
});


// map
let doubled = numbers.map(function (number) {
    return number * 2;
});

console.log(doubled);


// Filter
let evenNumbers = numbers.filter(function (number) {
    return number % 2 === 0;
});

console.log(evenNumbers);


// Every
let allPositive = numbers.every(function (number) {
    return number > 0;
});

console.log(allPositive);


// Some
let hasEvenNumber = numbers.some(function (number) {
    return number % 2 === 0;
});

console.log(hasEvenNumber);


// Reduce
let total = numbers.reduce(function (sum, number) {
    return sum + number;
}, 0);

console.log(total);


//------------------------------------------------------------------


let numbers1 = [1, 2, 3, 4, 5];

// forEach
numbers1.forEach(number => console.log(number));

// map
let doubled1 = numbers1.map(number => number * 2);

// filter
let evenNumbers1 = numbers1.filter(number => number % 2 === 0);

// every
let allPositive1 = numbers1.every(number => number > 0);

// some
let hasEvenNumber1 = numbers1.some(number => number % 2 === 0);

// reduce
let total1 = numbers1.reduce((sum, number) => sum + number, 0);

console.log(doubled1);
console.log(evenNumbers1);
console.log(allPositive1);
console.log(hasEvenNumber1);
console.log(total1);