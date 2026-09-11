let todos = [];

let command = prompt("Enter a command: list, add, delete, or quit");

while (command.toLowerCase() !== "quit") {

    if (command.toLowerCase() === "list") {

        console.log("---------");
        
        if (todos.length === 0) {
            console.log("No todos found.");
        } else {
            for (let i = 0; i < todos.length; i++) {
                console.log(i + ": " + todos[i]);
            }
        }

        console.log("---------");

    } else if (command.toLowerCase() === "add") {

        let todo = prompt("Enter a new todo:");
        todos.push(todo);
        console.log("Todo added!");

    } else if (command.toLowerCase() === "delete") {

        let index = prompt("Enter the index of the todo to delete:");

        if (index >= 0 && index < todos.length) {
            let deleted = todos.splice(index, 1);
            console.log("Deleted: " + deleted[0]);
        } else {
            console.log("Invalid index.");
        }

    } else {
        console.log("Unknown command.");
    }

    command = prompt("Enter a command: list, add, delete, or quit");
}

console.log("You quit the To-Do App.");