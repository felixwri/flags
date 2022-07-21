let keys;
let americanKeys;
let current = {
    active: null,
    next: null,
    mode: "text",
};
let difficulty = "normal";
let flagSet = "world";
let timeline = { correct: false, active: false };
let score = { current: 0, best: 0, deductions: 2 };
let history = [];

document.addEventListener("keypress", (e) => {
    const inputElement = document.getElementById("guess");
    if (e.key === "Enter") {
        if (guessAccuracy(inputElement.value, current.active.country) > 0.8) {
            transition(true);
        } else {
            showIncorrect();
        }
    }
    return;
});

const transition = async (correct) => {
    timeline.active = true;
    if (correct) {
        showCorrect();
    } else {
        showIncorrect();
    }
    await reScale(1);

    let allFlags = document.getElementsByClassName("flag");
    allFlags[0].style.opacity = 0;
    allFlags[1].style.opacity = 1;
    allFlags[1].style.left = 0;

    setBackgroundGradient(allFlags[1].src);
    multiTransitionDestroy();
    await sleep(200);

    document.getElementById("image-container").removeChild(allFlags[0]);

    if (current.mode === "multi") multiTransitionCreate();

    newFlag();
};

async function showCorrect() {
    document.getElementById("check").classList.add("scale");
    await sleep(500);
    document.getElementById("check").classList.remove("scale");
    document.getElementById("guess").value = "";
}

async function showIncorrect() {
    document.getElementById("cross").classList.add("scale");
    await sleep(500);
    document.getElementById("cross").classList.remove("scale");
    document.getElementById("guess").value = "";
}

async function multiTransitionCreate() {
    let container = document.getElementsByClassName("multi-choice-container")[0];

    if (container.childElementCount > 0) {
        await sleep(500);
    }

    let elements = await createMultiOption();

    for (let i = elements.length - 1; i >= 0; i--) {
        await sleep(30);
        container.appendChild(elements[i]);
        createOption(elements[i]);
    }
}

async function createOption(element) {
    await sleep(200);
    element.style.opacity = 1;
}

function hintTransitionDestroy() {
    let hint = document.getElementsByClassName("hint-letter");
    if (hint.length) hint[0].remove();
}

async function multiTransitionDestroy() {
    hintTransitionDestroy();
    let multi = document.getElementsByClassName("hint-option");
    if (multi.length > 0) {
        for (let j = multi.length - 1; j >= 0; j--) {
            await sleep(70);
            destroyOption(multi[j]);
        }
    }
}

async function destroyOption(element) {
    element.style.opacity = 0;
    await sleep(300);
    element.remove();
}

async function reScale(target) {
    let totalWidth = window.innerWidth;

    let imageContainer = document.getElementById("image-container");
    let image = document.getElementsByClassName("flag")[target];
    let imageWidth = image.offsetWidth;
    let imageHeight = image.offsetHeight;
    let imageAspect = imageWidth / imageHeight;

    if (imageAspect > 4) {
        await sleep(500);
        imageContainer = document.getElementById("image-container");
        image = document.getElementsByClassName("flag")[target];
        imageWidth = image.offsetWidth;
        imageHeight = image.offsetHeight;
        imageAspect = imageWidth / imageHeight;
    }

    let difference = elementIntersection(
        document.getElementsByClassName("flag")[target],
        document.getElementsByClassName("text-input")[0]
    );

    let calculation = imageContainer.offsetWidth - difference * imageAspect;
    if (calculation > totalWidth - 50) {
        calculation = totalWidth - 50;
        console.log("too big");
    }

    if (imageAspect < 4) {
        imageContainer.style.width = `${calculation}px`;
    }
    return;
}

async function setBackgroundGradient(source) {
    document.getElementById("colored-panel").style.backgroundColor = "rgba(44, 44, 44, 1)";
    await sleep(500);
    let col = await get_average_rgb(source);
    document.getElementsByTagName(
        "body"
    )[0].style.background = `linear-gradient(rgb(${col[0]}, ${col[1]}, ${col[2]} ), var(--main-bg), var(--main-bg))`;

    document.getElementById("colored-panel").style.backgroundColor = "rgba(44, 44, 44, 0)";

    if (contrastFunction(col[0], col[1], col[2])) {
        document.querySelector("#settings-icon").style.fill = "black";
    } else {
        document.querySelector("#settings-icon").style.fill = "white";
    }
}

document.getElementById("skip").onclick = async (e) => {
    if (timeline.active) return;
    skip();
};

const skip = async () => {
    if (timeline.active) return;
    timeline.active = true;
    revealCountry();
    transition(false);
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

const randomCountry = (skipHistory) => {
    let res;
    let limiter;

    let index = Math.round(Math.random() * (keys.length - 1));

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

    if (skipHistory) return res;

    if (history.indexOf(res) !== -1) {
        res = randomCountry();
        console.log("In history: skipped");
    }

    history.push(res);
    if (history.length > 25) {
        history.shift();
    }
    return res;
};

const randomState = () => {
    let key = americanKeys[Math.round(Math.random() * (americanKeys.length - 1))];
    let formattedKey = key.replace("us-", "");

    if (history.indexOf(formattedKey) !== -1) {
        formattedKey = randomState();
        console.log("In history: skipped");
    }

    history.push(formattedKey);
    if (history.length > 25) {
        history.shift();
    }
    return formattedKey;
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

const contrastFunction = (r, g, b) => {
    let x = r * 299 + g * 587 + b * 114;
    x = x / 1000;
    return x >= 128;
};

const sleep = (t) => new Promise((s) => setTimeout(s, t));

(() => {
    keys = Object.keys(countries);
    americanKeys = Object.keys(countries.us.states);
    newFlag();
    setBackgroundGradient(document.getElementsByClassName("flag")[0].src);
    reScale(0);
})();
