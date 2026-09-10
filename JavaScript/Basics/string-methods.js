// String Methods

let username = "   CodeMaster   ";
let game = "Adventure Quest";
let platform = "Mobile Gaming";
let playerStatus = "   Player is online   ";


// Removes whitespace from both ends of a string
console.log(username.trim());
console.log(playerStatus.trim());


// Converts a string to uppercase
console.log(username.toUpperCase());
console.log(game.toUpperCase());
console.log(platform.toUpperCase());


// Converts a string to lowercase
console.log(username.toLowerCase());
console.log(game.toLowerCase());
console.log(platform.toLowerCase());


// Chains multiple methods together
console.log(username.trim().toUpperCase());
console.log(playerStatus.trim().toLowerCase());


// Replaces part of a string
console.log(game.replace("Adventure", "Mystery"));
console.log(platform.replace("Mobile", "PC"));
console.log(playerStatus.replace("online", "offline"));


// Repeats a string a specified number of times
console.log("Level Up! ".repeat(3));
console.log("Game ".repeat(3));
console.log("* ".repeat(4));