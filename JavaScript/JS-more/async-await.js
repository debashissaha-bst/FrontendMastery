function placeOrder() {

    return new Promise(function (resolve) {

        setTimeout(function () {
            resolve("Order placed!");
        }, 1000);

    });

}


function prepareFood() {

    return new Promise(function (resolve) {

        setTimeout(function () {
            resolve("Food prepared!");
        }, 2000);

    });

}


function deliverFood() {

    return new Promise(function (resolve) {

        setTimeout(function () {
            resolve("Food delivered");
        }, 1500);

    });

}


async function orderFood() {

    try {

        console.log("Starting order...");

        let order = await placeOrder();
        console.log(order);

        let food = await prepareFood();
        console.log(food);

        let delivery = await deliverFood();
        console.log(delivery);

        console.log("Enjoy your meal!");

    } catch (error) {

        console.log("Something went wrong:", error);

    }

}


orderFood();