document.getElementById("hint").onclick = (e) => {
    if (document.getElementsByClassName("hint-letter").length) return;
    if (document.getElementsByClassName("hint-option").length) return;

    let node = document.createElement("div");

    let hintText = current.country[0];

    for (let i = 1; i < current.country.length; i++) {
        if (current.country[i] === " ") {
            hintText += " . ";
        } else {
            hintText += " _ ";
        }
    }
    node.innerText = hintText;

    let element = document.getElementsByClassName("multi-choice-container")[0].appendChild(node);
    element.classList.add("hint-letter");

    score.deductions += 1;
};

document.getElementById("multi").onclick = (e) => {
    if (document.getElementsByClassName("hint-letter").length) return;
    if (document.getElementsByClassName("hint-option").length) return;

    let debug = 0;

    let hints = [];

    if (flagSet === "world") {
        for (let i = 0; i < 5; i++) {
            let key = randomCountry();
            hints.push({ code: key, country: countries[key].country });
        }
    } else if (flagSet === "american") {
        for (let i = 0; i < 5; i++) {
            let key = americanKeys[Math.round(Math.random() * americanKeys.length)];
            hints.push({ code: key, country: countries.us.states[key] });
        }
    }
    hints.push(current);

    let offset = Math.round(Math.random() * (hints.length - 1));

    for (let i = offset; i < hints.length; i++) {
        debug++;
        if (debug > 10) {
            return;
        }

        let elementId = i;

        let node = document.createElement("DIV");
        let element = document.getElementsByClassName("multi-choice-container")[0].appendChild(node);
        element.textContent = hints[i].country;

        element.className += "hint-option";

        if (hints[i].country.length > 10) {
            element.className += " hint-shrink";
        }

        element.onclick = (e) => {
            let correct = false;

            let guess = hints[elementId].country;
            let answer = current.country;

            if (guessAccuracy(guess, answer) > 0.75) correct = true;

            transition(correct);
        };

        if (offset === 0 && i == hints.length - 1) {
            break;
        } else if (i + 1 === offset) {
            break;
        } else if (i === hints.length - 1) {
            i = -1;
        }
    }
};
