document.getElementById("hint").onclick = (e) => {
    if (document.getElementsByClassName("hint-letter").length) return;
    if (document.getElementsByClassName("hint-option").length) return;

    let node = document.createElement("div");

    let hintText = current.active.country[0];

    for (let i = 1; i < current.active.country.length; i++) {
        if (current.active.country[i] === " ") {
            hintText += " . ";
        } else {
            hintText += " _ ";
        }
    }
    node.innerText = hintText;

    let element = document.getElementsByClassName("hint-container")[0].appendChild(node);
    element.classList.add("hint-letter");
};

async function revealCountry() {
    let hintContainers = document.getElementsByClassName("hint-container");

    hintContainers[0].innerHTML = `<DIV class="hint-ans">${current.active.country}</DIV>`;

    await sleep(2000);
    hintContainers[0].innerHTML = ``;
}

document.getElementById("multi").onclick = async (e) => {
    if (timeline.transition === true) return;
    timeline.transition = true;

    if (current.mode !== "multi") current.mode = "multi";

    if (e.target.dataset.mode === "false") {
        let guess = document.getElementById("guess");
        guess.classList.add("hide");
        guess.style.height = "0px";

        let hint = document.getElementById("hint");
        hint.classList.add("hide");
        hint.style.height = "0px";

        let description = document.getElementById("description");
        description.classList.add("hide");
        description.style.height = "0px";

        let skip = document.getElementById("skip");
        skip.classList.add("hide");
        skip.style.height = "0px";

        let hintContainer = document.getElementsByClassName("hint-container")[0];
        hintContainer.dataset.choice = "false";

        let descriptionContainer = document.getElementsByClassName("description-container")[0];
        descriptionContainer.dataset.choice = "false";

        let multiContainer = document.getElementsByClassName("multi-choice-container")[0];
        multiContainer.dataset.choice = "true";

        document.getElementById("write").dataset.mode = "false";
        e.target.dataset.mode = "true";
    }

    hintTransitionDestroy();
    multiTransitionCreate();

    await sleep(200);
    reSizeImage(0);
    await sleep(200);
    timeline.transition = false;
};

function createMultiOption() {
    let elementArray = [];

    let debug = 0;

    let hints = [];

    if (flagSet === "world") {
        for (let i = 0; i < 5; i++) {
            let key = randomCountry(true);
            hints.push({ code: key, country: countries[key].country });
        }
    } else if (flagSet === "american") {
        for (let i = 0; i < 5; i++) {
            let key = americanKeys[Math.round(Math.random() * (americanKeys.length - 1))];

            hints.push({ code: key, country: countries.us.states[key] });
        }
    }
    hints.push(current.active);

    let offset = Math.round(Math.random() * (hints.length - 1));

    for (let i = offset; i < hints.length; i++) {
        debug++;
        if (debug > 10) {
            return;
        }

        let elementId = i;

        let element = document.createElement("DIV");

        element.textContent = hints[i].country;

        element.className += "hint-option";

        if (hints[i].country.length > 10) {
            element.className += " hint-shrink";
        }

        element.onclick = (e) => {
            let correct = false;

            let guess = hints[elementId].country;
            let answer = current.active.country;

            if (guessAccuracy(guess, answer) > 0.75) correct = true;

            transition(correct);
        };

        elementArray.push(element);

        if (offset === 0 && i == hints.length - 1) {
            break;
        } else if (i + 1 === offset) {
            break;
        } else if (i === hints.length - 1) {
            i = -1;
        }
    }
    return elementArray;
}

document.getElementById("description").addEventListener("click", async (e) => {
    const URL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${current.active.country}&redirects=true&origin=*`;
    let result = await fetch(URL, {
        method: "GET",
    });

    result = await result.json();

    let pages = result.query.pages;
    let pageID = Object.keys(pages);
    let extract = pages[pageID].extract;

    let text = stripHTML(extract);

    text = text.substring(0, 1024);

    text = stringToSentence(text);

    text = text.replaceAll(current.active.country, "[country]");
    text = text.split("\r");

    const container = document.getElementsByClassName("description-container")[0];
    // container.innerText = text[1];
    let description = text[1];
    let incomplete = "";
    for (let i = 0; i < description.length; i++) {
        incomplete += description[i];
        container.innerText = incomplete;
        await sleep(10);
    }
    container.dataset.choice = "true";
});

function stringToSentence(string) {
    let re = /\b(\w\.\w\.)|([.?!])\s+(?=[A-Za-z])/g;
    let result = string.replace(re, function (m, g1, g2) {
        return g1 ? g1 : g2 + "\r";
    });
    return result;
}

function stripHTML(html) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}

document.getElementById("write").onclick = async (e) => {
    if (timeline.transition === true) return;
    timeline.transition = true;

    if (current.mode !== "text") current.mode = "text";

    if (e.target.dataset.mode === "false") {
        let guess = document.getElementById("guess");
        guess.classList.remove("hide");
        guess.style.height = "50px";

        let hint = document.getElementById("hint");
        hint.classList.remove("hide");
        hint.style.height = "50px";

        let description = document.getElementById("description");
        description.classList.remove("hide");
        description.style.height = "50px";

        let skip = document.getElementById("skip");
        skip.classList.remove("hide");
        skip.style.height = "50px";

        let hintContainer = document.getElementsByClassName("hint-container")[0];
        hintContainer.dataset.choice = "true";

        let descriptionContainer = document.getElementsByClassName("description-container")[0];
        descriptionContainer.dataset.choice = "true";

        let multiContainer = document.getElementsByClassName("multi-choice-container")[0];
        multiContainer.dataset.choice = "false";

        document.getElementById("multi").dataset.mode = "false";
        e.target.dataset.mode = "true";
    }

    multiTransitionDestroy();
    await sleep(200);
    reSizeImage(0);
    await sleep(200);
    timeline.transition = false;
};
