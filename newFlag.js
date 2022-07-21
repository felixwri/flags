const newFlag = async () => {
    let address = `https://flagcdn.com/h240/us.png`;
    let randomKey = "us";

    if (flagSet === "world") {
        let nextCountry = current.next;

        if (nextCountry === null) {
            randomKey = randomCountry(false);
            address = `https://flagcdn.com/h240/${randomKey}.png`;

            document.querySelector(`.flag`).src = address;

            current.next = {
                code: randomKey,
                country: countries[randomKey].country,
                aliases: countries[randomKey].aliases,
            };

            nextCountry = current.next;
        }

        randomKey = randomCountry(false);
        address = `https://flagcdn.com/h240/${randomKey}.png`;

        current.active = {
            code: nextCountry.code,
            country: nextCountry.country,
            aliases: nextCountry.aliases,
        };
        current.next = {
            code: randomKey,
            country: countries[randomKey].country,
            aliases: countries[randomKey].aliases,
        };
    } else if (flagSet === "american") {
        let randomKey;
        let nextCounty = current.next;

        if (nextCounty === null) {
            randomKey = randomState();
            address = `https://raw.githubusercontent.com/felixwri/flags/main/images/${randomKey}.png`;

            document.querySelector(`.flag`).src = address;

            current.next = {
                code: `us-${randomKey}`,
                country: countries.us.states[`us-${randomKey}`],
            };

            nextCounty = current.next;
        }

        randomKey = randomState();
        address = `https://raw.githubusercontent.com/felixwri/flags/main/images/${randomKey}.png`;

        current.active = {
            code: nextCounty.code,
            country: nextCounty.country,
        };
        current.next = {
            code: `us-${randomKey}`,
            country: countries.us.states[`us-${randomKey}`],
        };
    }

    timeline.active = false;

    let img = document.createElement("img");
    img.src = address;
    img.alt = "Flag to be guessed";

    img.classList.add("flag");

    document.getElementById("image-container").appendChild(img);
};

function elementIntersection(e1, e2) {
    let bound1 = e1.getBoundingClientRect();
    let bound2 = e2.getBoundingClientRect();

    let difference = bound1.bottom - bound2.top;

    return difference;
}
