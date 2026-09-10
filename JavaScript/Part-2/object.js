// Creating Object Literals

let student = {
    name: "Smith",
    age: 23,
    department: "BBA"
};


// Creating a Post

let post = {
    title: "First Post",
    author: "Smith",
    likes: 25
};


// Get Values

console.log(student.name);
console.log(student.department);

console.log(post.title);
console.log(post.likes);


// Add / Update Values

student.email = "smith@mail.com";
student.age = 23;

console.log(student);


// Nested Objects

let laptop = {
    brand: "Tech",
    price: 800,
    specifications: {
        ram: "16GB",
        storage: "512GB"
    }
};

console.log(laptop.specifications.ram);
console.log(laptop.specifications.storage);


// Array of Objects

let products = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 45 }
];

console.log(products[0].name);
console.log(products[1].price);
console.log(products[2].name);