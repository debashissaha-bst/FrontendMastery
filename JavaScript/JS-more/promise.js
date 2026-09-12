function orderFood() {

    return new Promise(function (resolve, reject) {

        console.log("Ordering food...");

        setTimeout(function () {

            let randomNumber = Math.random();

            if (randomNumber < 0.5) {
                resolve("Food is ready!");
            } else {
                reject("Sorry, food is not available. ❌");
            }

        }, 2000);

    });
}


orderFood()
    .then(function (message) {
        console.log(message);
    })
    .catch(function (error) {
        console.log(error);
    });