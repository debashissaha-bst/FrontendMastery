// Get elements from HTML

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const taskCount = document.getElementById("taskCount");

const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

const filterButtons = document.querySelectorAll(".filter");


// Load todos from localStorage

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";


// Save todos to localStorage

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


// Display todos

function displayTodos() {

    todoList.innerHTML = "";

    let filteredTodos = todos;

    // Apply filter

    if (currentFilter === "active") {

        filteredTodos = todos.filter(function (todo) {
            return !todo.completed;
        });

    } else if (currentFilter === "completed") {

        filteredTodos = todos.filter(function (todo) {
            return todo.completed;
        });
    }


    // Show message if there are no todos

    if (filteredTodos.length === 0) {

        const message = document.createElement("li");

        message.classList.add("empty-message");

        if (currentFilter === "all") {
            message.textContent = "No todos yet. Add your first task!";
        } else if (currentFilter === "active") {
            message.textContent = "No active tasks.";
        } else {
            message.textContent = "No completed tasks.";
        }

        todoList.appendChild(message);

    }


    // Create todo items

    filteredTodos.forEach(function (todo) {

        const li = document.createElement("li");

        li.classList.add("todo-item");


        if (todo.completed) {
            li.classList.add("completed");
        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("todo-checkbox");

        checkbox.checked = todo.completed;


        checkbox.addEventListener("change", function () {

            toggleTodo(todo.id);

        });


        // Todo text

        const span = document.createElement("span");

        span.classList.add("todo-text");

        span.textContent = todo.text;


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-btn");

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function () {

            deleteTodo(todo.id);

        });


        // Add elements to todo

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        todoList.appendChild(li);

    });


    updateTaskCount();
}


// Add todo

function addTodo() {

    const text = todoInput.value.trim();


    // Don't add empty todo

    if (text === "") {

        alert("Please enter a todo.");

        return;
    }


    const newTodo = {

        id: Date.now(),

        text: text,

        completed: false

    };


    todos.push(newTodo);

    saveTodos();

    displayTodos();


    // Clear input

    todoInput.value = "";

    todoInput.focus();
}


// Toggle completed status

function toggleTodo(id) {

    todos = todos.map(function (todo) {

        if (todo.id === id) {

            todo.completed = !todo.completed;

        }

        return todo;

    });


    saveTodos();

    displayTodos();
}


// Delete todo

function deleteTodo(id) {

    todos = todos.filter(function (todo) {

        return todo.id !== id;

    });


    saveTodos();

    displayTodos();
}


// Update task counter

function updateTaskCount() {

    const activeTodos = todos.filter(function (todo) {

        return !todo.completed;

    });


    const count = activeTodos.length;


    if (count === 1) {

        taskCount.textContent = "1 task left";

    } else {

        taskCount.textContent = count + " tasks left";

    }
}


// Clear completed todos

function clearCompleted() {

    todos = todos.filter(function (todo) {

        return !todo.completed;

    });


    saveTodos();

    displayTodos();
}


// Clear all todos

function clearAll() {

    if (todos.length === 0) {
        return;
    }


    const confirmed = confirm(
        "Are you sure you want to delete all todos?"
    );


    if (confirmed) {

        todos = [];

        saveTodos();

        displayTodos();
    }
}


// Filter buttons

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;


        // Remove active class from all buttons

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active class to selected button

        button.classList.add("active");


        displayTodos();

    });

});


// Add button

addBtn.addEventListener("click", addTodo);


// Press Enter to add todo

todoInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTodo();

    }

});


// Clear buttons

clearCompletedBtn.addEventListener(
    "click",
    clearCompleted
);

clearAllBtn.addEventListener(
    "click",
    clearAll
);


// Display existing todos when page loads

displayTodos();