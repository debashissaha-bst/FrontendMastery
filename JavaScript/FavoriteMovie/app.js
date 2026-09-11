const favMovie = "avatar";

let guess = prompt("Guess my favourite movie (type 'exit' to quit)");

while (
    guess.toLowerCase() !== favMovie &&
    guess.toLowerCase() !== "exit"
) {
    console.log("Wrong guess, try again!");
    guess = prompt("Guess my favourite movie (type 'exit' to quit)");
}

if (guess.toLowerCase() === favMovie) {
    console.log("🎉 Correct! You guessed my favourite movie!");
} else {
    console.log("You exited the game.");
}