let url = "https://catfact.ninja/fact";


async function getCatFact() {

    try {

        let response = await fetch(url);

        let data = await response.json();

        console.log("Cat Fact:", data.fact);

    } catch (error) {

        console.log("Error:", error);

    }

}


getCatFact();