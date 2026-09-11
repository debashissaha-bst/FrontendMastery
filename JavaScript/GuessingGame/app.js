let max = prompt("Enter the maximum number:");

let randomNumber = Math.floor(Math.random() * max) + 1;

let guess = prompt("Guess the number between 1 and " + max + " (type 'exit' to quit)");

while (guess.toLowerCase() !== "exit") {

    if (parseInt(guess) === randomNumber) {
        console.log("🎉 Correct! You guessed the number!");
        break;
    } else if (parseInt(guess) < randomNumber) {
        console.log("Too low! Try again.");
    } else {
        console.log("Too high! Try again.");
    }

    guess = prompt("Guess again (type 'exit' to quit)");
}

if (guess.toLowerCase() === "exit") {
    console.log("You exited the game.");
}