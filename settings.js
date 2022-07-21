document.body.addEventListener("click", (e) => {
    const settingsEl = document.getElementById("settings");
    const settingsCon = document.getElementById("settings-container");

    if (resolveParentID("settings-hit-target", e.target) && !settingsEl.classList.contains("settings-focused")) {
        settingsEl.classList.add("settings-focused");
        settingsCon.classList.add("settings-container-focused");
        return;
    }

    if (!resolveParentClass("settings-element", e.target)) {
        settingsEl.classList.remove("settings-focused");
        settingsCon.classList.remove("settings-container-focused");
        return;
    }

    resolveSetting(e.target);
});

const resolveParentClass = (target, startingElement) => {
    let element = startingElement;
    while (element.tagName !== "BODY") {
        if (element.classList.contains(target)) {
            console.log("Resolving parent class");
            return true;
        } else {
            element = element.parentElement;
        }
    }
};
const resolveParentID = (target, startingElement) => {
    let element = startingElement;
    while (element.tagName !== "BODY") {
        if (element.id === target) {
            console.log("Resolving parent id");
            return true;
        } else {
            element = element.parentElement;
        }
    }
};

const switchSet = async () => {
    current.active = null;
    current.next = null;

    document.getElementById("image-container").removeChild(document.getElementsByClassName("flag")[1]);

    newFlag();
    transition(false);
};

document.getElementById("use-world").onclick = (e) => {
    flagSet = "world";
    document.getElementById("use-world").dataset.activeFlag = true;
    document.getElementById("use-american").dataset.activeFlag = false;
    switchSet();
};

document.getElementById("use-american").onclick = (e) => {
    flagSet = "american";
    document.getElementById("use-world").dataset.activeFlag = false;
    document.getElementById("use-american").dataset.activeFlag = true;
    switchSet();
};

const settingsSync = () => {
    if (flagSet === "world") {
        document.getElementById("use-world").dataset.activeFlag = true;
    } else {
        document.getElementById("use-american").dataset.activeFlag = true;
    }

    let normalDiff = document.getElementById("normal-diff");
    let easyDiff = document.getElementById("easy-diff");
    let hardDiff = document.getElementById("hard-diff");

    document.querySelectorAll(`[data-active="true"]`).forEach((e) => {
        e.dataset.active = false;
    });

    if (difficulty === "normal") {
        normalDiff.dataset.active = true;
    } else if (difficulty === "easy") {
        easyDiff.dataset.active = true;
    } else {
        hardDiff.dataset.active = true;
    }
};

function resolveSetting(e) {
    if (e === undefined || !e.hasAttribute("id")) return;

    switch (e.id) {
        case "easy-diff":
            difficulty = "easy";
            break;
        case "normal-diff":
            difficulty = "normal";
            break;
        case "hard-diff":
            difficulty = "hard";
            break;

        default:
            resolveSetting(e.parentElement);
            break;
    }

    settingsSync();
}

settingsSync();
