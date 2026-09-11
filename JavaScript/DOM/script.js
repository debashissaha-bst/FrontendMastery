console.log("DOM JavaScript Loaded!");


// 1. getElementById()
let heading = document.getElementById("heading");

console.log(heading);


// 2. Change text with innerText
heading.innerText = "Learning DOM";


// 3. Select another element
let description = document.getElementById("description");

console.log(description);


// 4. Change text
description.innerText = "JavaScript can change HTML using the DOM.";


// 5. Click Event
let button = document.getElementById("btn");

button.addEventListener("click", function () {

    console.log("Button clicked!");

});


// 6. Change text when button is clicked
let changeTextBtn = document.getElementById("changeTextBtn");

changeTextBtn.addEventListener("click", function () {

    heading.innerText = "The Heading Has Changed!";

});


// 7. Change CSS using JavaScript
let changeColorBtn = document.getElementById("changeColorBtn");

changeColorBtn.addEventListener("click", function () {

    heading.style.color = "red";
    heading.style.backgroundColor = "white";

});


// 8. Input Value
let nameInput = document.getElementById("nameInput");

let nameBtn = document.getElementById("nameBtn");

let nameOutput = document.getElementById("nameOutput");


nameBtn.addEventListener("click", function () {

    let name = nameInput.value;

    nameOutput.innerText = "Hello, " + name + "!";

});


// 9. Selecting a list
let itemList = document.getElementById("itemList");

console.log(itemList);


// 10. Add an element
let addItemBtn = document.getElementById("addItemBtn");

addItemBtn.addEventListener("click", function () {

    let newItem = document.createElement("li");

    newItem.innerText = "DOM";

    itemList.appendChild(newItem);

});


// 11. Remove an element
let removeItemBtn = document.getElementById("removeItemBtn");

removeItemBtn.addEventListener("click", function () {

    if (itemList.lastElementChild) {

        itemList.lastElementChild.remove();

    }

});


// 12. Counter
let count = 0;

let countDisplay = document.getElementById("count");

let increaseBtn = document.getElementById("increaseBtn");

let decreaseBtn = document.getElementById("decreaseBtn");

let resetBtn = document.getElementById("resetBtn");


// Increase
increaseBtn.addEventListener("click", function () {

    count++;

    countDisplay.innerText = count;

});


// Decrease
decreaseBtn.addEventListener("click", function () {

    count--;

    countDisplay.innerText = count;

});


// Reset
resetBtn.addEventListener("click", function () {

    count = 0;

    countDisplay.innerText = count;

});


// 13. classList.add()
let classHeading = document.getElementById("classHeading");

let addClassBtn = document.getElementById("addClassBtn");

addClassBtn.addEventListener("click", function () {

    classHeading.classList.add("highlight");

});


// 14. classList.remove()
let removeClassBtn = document.getElementById("removeClassBtn");

removeClassBtn.addEventListener("click", function () {

    classHeading.classList.remove("highlight");

});


// 15. classList.toggle()
let toggleClassBtn = document.getElementById("toggleClassBtn");

toggleClassBtn.addEventListener("click", function () {

    classHeading.classList.toggle("highlight");

});


// 16. Changing an Attribute
let image = document.getElementById("myImage");

console.log(image.getAttribute("src"));


// 17. setAttribute()
let changeImageBtn = document.getElementById("changeImageBtn");

changeImageBtn.addEventListener("click", function () {

    image.setAttribute(
        "src",
        "cat1.png"
    );

});


// 18. Form Submit
let form = document.getElementById("myForm");

let username = document.getElementById("username");

let formOutput = document.getElementById("formOutput");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    formOutput.innerText =
        "Username: " + username.value;

});