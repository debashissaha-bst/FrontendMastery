function orderFood() {

    return new Promise(function (resolve, reject) {

        console.log("Ordering food...");

        setTimeout(function () {

            if (Math.random() < 0.8) {
                resolve("Food order confirmed!");
            } else {
                reject("Food is not available.");
            }

        }, 1000);

    });
}


orderFood()

    .then(function (message) {

        console.log(message);

        return "Food is being prepared...";

    })

    .then(function (message) {

        console.log(message);

        return "Food is ready!";

    })

    .then(function (message) {

        console.log(message);

    })

    .catch(function (error) {

        console.log(error);

    });