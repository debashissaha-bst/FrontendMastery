
//push, pop, unshift, shift, includes, indexOf

let vegetables = ["Carrot", "Potato", "Tomato"];

vegetables.push("Onion");

console.log(vegetables);

vegetables.pop();

console.log(vegetables);

vegetables.unshift("Cabbage");

console.log(vegetables);

vegetables.shift();

console.log(vegetables);

console.log(vegetables.includes("Potato"));

console.log(vegetables.indexOf("Tomato"));


// -----------------------------------------


// Concatenation

let firstName = "Alex";
let lastName = "Smith";

// Combines strings
console.log(firstName + " " + lastName);


// Reverse

let numbers = [10, 20, 30, 40];

// Reverses an array
numbers.reverse();
console.log(numbers);


// Slice in Arrays

let fruits = ["Apple", "Banana", "Mango", "Orange"];

// Copies part of an array
console.log(fruits.slice(1, 3));


// Splice in Arrays

let colors = ["Red", "Blue", "Green", "Yellow"];

// Removes elements
colors.splice(1, 2);
console.log(colors);


// Sort in Arrays

let names = ["Charlie", "Alex", "David", "Brian"];

// Sorts alphabetically
names.sort();
console.log(names);