let fruits = ["Apple", "Banana", "Mango"];

fruits.push("Orange");
console.log(fruits);

fruits.pop();
console.log(fruits);

fruits.unshift("Grapes");
console.log(fruits);

fruits.shift();
console.log(fruits);

console.log(fruits.includes("Mango"));
console.log(fruits.indexOf("Banana"));


// -----------------------------------------


let numbers = [10, 20, 30, 40, 50];

console.log(numbers.slice(1, 4));

numbers.splice(2, 1);
console.log(numbers);

console.log(numbers.join(", "));

numbers.reverse();
console.log(numbers);