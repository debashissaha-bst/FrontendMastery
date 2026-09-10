console.log("Connected!");

let a = 5;
let b = 10;

console.log("Sum is:", a + b);


// -------------------------------------------

let temperature = 35;

if (temperature >= 40) {
    console.log("It's extremely hot!");
} else if (temperature >= 30) {
    console.log("It's hot outside.");
} else if (temperature >= 20) {
    console.log("The weather is comfortable.");
} else {
    console.log("It's cold outside.");
}

// ----------------------------------------


let isRaining = false;

if (!isRaining) {
    console.log("You don't need an umbrella.");
} else {
    console.log("Take an umbrella.");
}


// ----------------------------------------

let isMember = true;
let cartTotal = 1500;
let hasCoupon = false;

if ((isMember && cartTotal >= 1000) || hasCoupon) {
    console.log("You get free delivery!");
} else {
    console.log("Delivery charge applies.");
}



// --------------------------------------

let color = "red";

switch (color) {
    case "red":
        console.log("Stop");
        break;

    case "yellow":
        console.log("Slow down");
        break;

    case "green":
        console.log("Go");
        break;

    default:
        console.log("Broken Light");
}


// --------------------------------------

console.error("This is an error message.");

console.warn("This is a warning message.");