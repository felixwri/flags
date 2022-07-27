let keys;
let americanKeys;
let current = {
    active: null,
    next: null,
    mode: "text",
};
let difficulty = "normal";
let flagSet = "world";
let timeline = { active: false, transition: false };
let score = { current: 0, best: 0, deductions: 2 };
let history = [];

document.addEventListener("keypress", (e) => {
    const inputElement = document.getElementById("guess");
    if (e.key === "Enter") {
        if (current.active.aliases !== undefined) {
            for (let i = 0; i < current.active.aliases.length; i++) {
                if (guessAccuracy(inputElement.value, current.active.aliases[i]) > 0.8) {
                    transition(true);
                    return;
                }
            }
        }

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
        await sleep(200);
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

function descriptionTransitionDestroy() {
    let desc = document.getElementsByClassName("description-container");
    desc[0].innerText = "";
}

async function multiTransitionDestroy() {
    hintTransitionDestroy();
    descriptionTransitionDestroy();
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
    const res = reSizeImage(target);
    if (!res) {
        await sleep(500);
        reSizeImage(target);
    }
    return;
}

function reSizeImage(target) {
    let totalWidth = window.innerWidth;

    let imageContainer = document.getElementById("image-container");
    let image = document.getElementsByClassName("flag")[target];
    let imageWidth = image.offsetWidth;
    let imageHeight = image.offsetHeight;
    let imageAspect = imageWidth / imageHeight;

    if (imageAspect > 4) {
        return false;
    }

    let difference = elementIntersection(
        document.getElementsByClassName("flag")[target],
        document.getElementsByClassName("text-input")[0]
    );

    let calculation = imageContainer.offsetWidth - difference * imageAspect;
    if (calculation > totalWidth - 50) {
        calculation = totalWidth - 50;
    }

    if (imageAspect < 4) {
        imageContainer.style.width = `${calculation}px`;
    }
    return true;
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

// Levenshtein distance

function guessAccuracy(s1, s2) {
    if (s1.length === 0 || s2.length === 0) return;
    if (s2.length > s1.length) {
        [s1, s2] = [s2, s1];
    }

    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    let costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }

    console.log((s1.length - costs[s2.length]) / s1.length);
    return (s1.length - costs[s2.length]) / s1.length;
}

const randomCountry = (skipHistory) => {
    let res;

    let index = Math.round(Math.random() * (keys.length - 1));

    res = keys[index];

    if (difficulty === "easy" && countries[res].difficulty > 5) {
        res = randomCountry();
        console.log("Too Hard: skipped");
    } else if (difficulty === "hard" && countries[res].difficulty < 6) {
        res = randomCountry();
        console.log("Too Easy: skipped");
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

const debounce = (func) => {
    let time = 100;
    let timer;
    return (event) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
};

window.addEventListener(
    "resize",
    debounce(() => {
        reSizeImage(0);
    })
);

(() => {
    keys = Object.keys(countries);
    americanKeys = Object.keys(countries.us.states);
    newFlag();
    setBackgroundGradient(document.getElementsByClassName("flag")[0].src);
    reScale(0);
})();
