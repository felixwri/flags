// let countries;
let keys;
let americanKeys;
let current;
let difficulty = 10;
let flagSet = "world";
let timeline = { correct: false, active: false };
let score = { current: 0, best: 0, deductions: 2 };

setInterval(() => {
    let guess = document.getElementById("guess").value.toLowerCase();
    let answer = current.country.toLowerCase();
    // console.log(guessAccuracy(guess, answer))

    if (current.aliases === undefined) {
        if (guessAccuracy(guess, answer) > 0.8 && !timeline.active) {
            transition(true);
        }
    } else {
        for (let i = 0; i < current.aliases.length; i++) {
            answer = current.aliases[i].toLowerCase();
            if (guessAccuracy(guess, answer) > 0.8 && !timeline.active) {
                transition(true);
            }
        }
    }
}, 600);

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
        for (let i = 0; i < 3; i++) {
            let key = randomCountry();
            hints.push({ code: key, country: countries[key].country });
        }
    } else if (flagSet === "american") {
        for (let i = 0; i < 3; i++) {
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

            console.log(guess, answer);

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
    score.deductions += 3;
};

// document.getElementById("guess").addEventListener("keypress", function (e) {
//     if (e.key === "Enter") {
//         let correct = false;

//         let guess = document.getElementById("guess").value.toLowerCase();
//         let answer = current.country.toLowerCase();

//         if (current.aliases === undefined) {
//             if (guessAccuracy(guess, answer) > 0.75 && !timeline.active) {
//                 correct = true;
//             } else {
//                 score.deductions += 1;
//             }
//         } else {
//             for (let i = 0; i < current.aliases.length; i++) {
//                 answer = current.aliases[i].toLowerCase();
//                 if (guessAccuracy(guess, answer) > 0.75 && !timeline.active) {
//                     correct = true;
//                 } else {
//                     score.deductions += 1;
//                 }
//             }
//         }

//         transition(correct);
//     }
// });

document.getElementById("difficulty").onchange = (e) => {
    console.log("difficulty changed");
    difficulty = document.getElementById("difficulty").value;
};

document.getElementById("use-world").onclick = (e) => {
    flagSet = "world";
    document.getElementById("use-world").style.color = "rgb(138, 218, 255)";
    document.getElementById("use-american").style.color = "rgb(255, 255, 255)";
    skip();
};

document.getElementById("use-american").onclick = (e) => {
    flagSet = "american";
    document.getElementById("use-world").style.color = "rgb(255, 255, 255)";
    document.getElementById("use-american").style.color = "rgb(138, 218, 255)";
    skip();
};

// document.getElementById("next").onclick = async (e) => {
//     let correct = false;

//     let guess = document.getElementById("guess").value.toLowerCase();
//     let answer = current.country.toLowerCase();

//     if (guessAccuracy(guess, answer) > 0.75) correct = true;

//     transition(correct);
// };

const transition = async (correct) => {
    timeline.active = true;
    if (!correct) {
        document.getElementById("cross").classList.add("scale");
        await sleep(500);
        document.getElementById("cross").classList.remove("scale");
        document.getElementById("guess").value = "";
    } else {
        document.getElementsByClassName("colored-panel")[0].style.backgroundColor = `rgba(44, 44, 44, 1)`;
        document.getElementById("image").style.opacity = `0`;
        document.getElementById("check").classList.add("scale");
        await sleep(500);
        document.getElementById("check").classList.remove("scale");
        document.getElementById("guess").value = "";
        newFlag();
        document.getElementById("image").style.opacity = `1`;
    }
};

document.getElementById("skip").onclick = async (e) => {
    if (timeline.active) return;
    score.deductions += 4;
    skip();
};

const skip = async () => {
    if (timeline.active) return;
    timeline.active = true;
    document.getElementById("image").style.opacity = `0`;
    document.getElementsByClassName("colored-panel")[0].style.backgroundColor = `rgba(44, 44, 44, 1)`;

    await sleep(500);

    newFlag();
    document.getElementById("image").style.opacity = `1`;
};

const guessAccuracy = (guess, answer) => {
    let total = 0;
    for (let i = 0; i < answer.length; i++) {
        if (guess[i] === answer[i]) {
            total++;
        }
    }
    return total / answer.length;
};

const newFlag = async () => {
    let multi = document.getElementsByClassName("hint-option");
    if (multi.length > 0) {
        for (let j = multi.length - 1; j >= 0; j--) {
            multi[j].remove();
        }
    }

    let hint = document.getElementsByClassName("hint-letter");
    if (hint.length) hint[0].remove();

    let address = `https://flagcdn.com/h240/us.png`;
    let randomKey = "us";

    if (flagSet === "world") {
        randomKey = randomCountry();
        address = `https://flagcdn.com/h240/${randomKey}.png`;
        current = { code: randomKey, country: countries[randomKey].country, aliases: countries[randomKey].aliases };

        document.getElementById("image").src = address;
        col = await get_average_rgb(address);
        document.getElementsByTagName("body")[0].style.background = `linear-gradient(rgb(${col[0]}, ${col[1]}, ${col[2]} ), var(--main-bg), var(--main-bg))`;
        document.getElementsByClassName("colored-panel")[0].style.backgroundColor = `rgba(44, 44, 44, 0)`;
    } else if (flagSet === "american") {
        randomKey = americanKeys[Math.round(Math.random() * americanKeys.length)];

        const formattedRandomKey = randomKey.replace("us-", "");
        address = `https://raw.githubusercontent.com/felixwri/flags/main/images/${formattedRandomKey}.png`;
        // address = `https://github.com/felixwri/flags/blob/main/images/${randomKey}.png?raw=true`;
        // address = `https://flagcdn.com/h240/${randomKey}.png`;
        current = { code: randomKey, country: countries.us.states[randomKey] };

        document.getElementById("image").src = address;
        col = await get_average_rgb(address);
        document.getElementsByTagName("body")[0].style.background = `linear-gradient(rgb(${col[0]}, ${col[1]}, ${col[2]} ), var(--main-bg), var(--main-bg))`;
        // await sleep(500);
        document.getElementsByClassName("colored-panel")[0].style.backgroundColor = `rgba(44, 44, 44, 0)`;
    }

    // document.getElementById("score").innerText = parseInt(document.getElementById("score").innerText) + 2 - score.deductions;

    timeline.active = false;
    score.deductions = 0;
};

const randomCountry = () => {
    let res;

    let index = Math.round(Math.random() * keys.length);

    res = keys[index];

    if (countries[res].difficulty > difficulty) {
        res = randomCountry();
        console.log("skipped");
    }

    return res;
};

async function get_average_rgb(src) {
    return new Promise((resolve) => {
        let context = document.createElement("canvas").getContext("2d");
        context.imageSmoothingEnabled = true;

        let img = new Image();
        img.src = src;
        img.crossOrigin = "";

        img.onload = () => {
            context.drawImage(img, 0, 0, 2, 2);
            resolve(context.getImageData(0, 0, 1, 1).data.slice(0, 3));
        };
    });
}

// (async () => {
//     const response = await fetch("https://flagcdn.com/en/codes.json")
//     countries = await response.json()
//     keys = Object.keys(countries)

//     newFlag()
// })();

(() => {
    keys = Object.keys(countries);
    americanKeys = Object.keys(countries.us.states);
    newFlag();
})();

const sleep = (t) => new Promise((s) => setTimeout(s, t));
