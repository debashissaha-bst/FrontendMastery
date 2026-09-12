function checkNumber() {
    return new Promise(function (resolve, reject) {

        let number = Math.floor(Math.random() * 10);

        console.log("Number:", number);

        if (number >= 5) {
            resolve(number);
        } else {
            reject("Number is too small!");
        }

    });
}


checkNumber()

    .then(function (result) {
        console.log("Result:", result);

        return result * 2;
    })

    .then(function (result) {
        console.log("Doubled:", result);

        return result + 10;
    })

    .then(function (result) {
        console.log("Final result:", result);
    })

    .catch(function (error) {
        console.log("Error:", error);
    });