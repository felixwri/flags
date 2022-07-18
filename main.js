let keys;
let americanKeys;
let current;
let difficulty = "normal";
let flagSet = "world";
let timeline = { correct: false, active: false };
let score = { current: 0, best: 0, deductions: 2 };
let history = [];

document.addEventListener("keypress", (e) => {
    const inputElement = document.getElementById("guess");
    if (e.key === "Enter") {
        if (guessAccuracy(inputElement.value, current.country) > 0.8) {
            transition(true);
        } else {
            transition(false);
        }
    }
    return;
});

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
    guess = guess.toLowerCase();
    let guessArray = [];
    let count = 0;
    let substring = "";

    for (let letterIndex = 0; letterIndex < guess.length; letterIndex++) {
        if (count < 2) {
            substring += `${guess[letterIndex]}`;
            count++;
        } else {
            guessArray.push(substring);
            substring = "";
            count = 0;
            letterIndex -= 2;
        }
    }

    answer = answer.toLowerCase();

    answerArray = [];
    count = 0;
    substring = "";

    for (let letterIndex = 0; letterIndex < answer.length; letterIndex++) {
        if (count < 2) {
            substring += `${answer[letterIndex]}`;
            count++;
        } else {
            answerArray.push(substring);
            substring = "";
            count = 0;
            letterIndex -= 2;
        }
    }

    let total = 0;
    for (let i = 0; i < answerArray.length; i++) {
        if (guessArray[i] === answerArray[i]) {
            total++;
        }
    }
    return total / answerArray.length;
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
    } else if (flagSet === "american") {
        randomKey = americanKeys[Math.round(Math.random() * americanKeys.length)];
        const formattedRandomKey = randomKey.replace("us-", "");
        address = `https://raw.githubusercontent.com/felixwri/flags/main/images/${formattedRandomKey}.png`;
        current = { code: randomKey, country: countries.us.states[randomKey] };
    }

    document.getElementById("image").src = address;
    col = await get_average_rgb(address);
    document.getElementsByTagName("body")[0].style.background = `linear-gradient(rgb(${col[0]}, ${col[1]}, ${col[2]} ), var(--main-bg), var(--main-bg))`;

    if (contrastFunction(col[0], col[1], col[2])) {
        document.querySelector("#settings-icon").style.fill = "black";
    } else {
        document.querySelector("#settings-icon").style.fill = "white";
    }
    document.getElementsByClassName("colored-panel")[0].style.backgroundColor = `rgba(44, 44, 44, 0)`;

    timeline.active = false;
};

const randomCountry = () => {
    let res;
    let limiter;

    let index = Math.round(Math.random() * keys.length);

    res = keys[index];

    if (difficulty === "easy") {
        limiter = 5;
    } else {
        limiter = 10;
    }

    if (countries[res].difficulty > limiter) {
        res = randomCountry();
        console.log("Too hard: skipped");
    }

    if (history.indexOf(res) !== -1) {
        res = randomCountry();
        console.log("In history: skipped");
    }

    history.push(res);
    if (history.length > 25) history.pop();
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

(() => {
    keys = Object.keys(countries);
    americanKeys = Object.keys(countries.us.states);
    newFlag();
})();

const contrastFunction = (r, g, b) => {
    let x = r * 299 + g * 587 + b * 114;
    x = x / 1000;
    return x >= 128;
};

const sleep = (t) => new Promise((s) => setTimeout(s, t));
