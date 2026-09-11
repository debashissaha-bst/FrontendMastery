const add = (a, b) => {
    return a + b;
};

console.log(add(10, 20));


//--------------------------------------

const add1 = (a, b) => a + b;

console.log(add1(10, 20));



//----------------------------------------

const person = {
    name: "Smith",

    greet: function () {
        console.log("Hello, " + this.name);
    }
};

person.greet();