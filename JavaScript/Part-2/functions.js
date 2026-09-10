// Functions

function welcomeMessage() {
    console.log("Welcome to JavaScript!");
    console.log("Let's start learning functions.");
}

welcomeMessage();


// Functions With Arguments

function introduce(name, age) {
    console.log("Name: " + name);
    console.log("Age: " + age);
}

introduce("Alex", 22);
introduce("Smith", 23);


// Function Expressions

let calculateArea = function (length, width) {
    return length * width;
};

console.log(calculateArea(10, 5));
console.log(calculateArea(8, 4));


// Higher Order Functions

function calculateNumber(a, b, operation) {
    operation(a, b);
}

function addNumbers(a, b) {
    console.log(a + b);
}

function subtractNumbers(a, b) {
    console.log(a - b);
}

calculateNumber(20, 10, addNumbers);
calculateNumber(20, 10, subtractNumbers);


// Higher Order Functions (Returns)

function createGreeting(message) {
    return function (name) {
        return message + ", " + name + "!";
    };
}

let sayHello = createGreeting("Hello");
let sayWelcome = createGreeting("Welcome");

console.log(sayHello("Alex"));
console.log(sayWelcome("Smith"));


// Methods

let calculator = {
    add: function (a, b) {
        return a + b;
    },

    multiply: function (a, b) {
        return a * b;
    }
};

console.log(calculator.add(10, 20));
console.log(calculator.multiply(5, 4));