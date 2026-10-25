const scenes = document.querySelectorAll(".scene");
const switchButtons = document.querySelectorAll(".pg-switch button");
const dog = document.querySelector(".dog");

const CALM_DELAY_MS = 700;

// Rotate every visible eye so its pupil points at (x, y).
function lookAt(x, y) {
    document.querySelectorAll(".scene:not([hidden]) .eye").forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const degrees = Math.atan2(x - cx, y - cy) * (180 / Math.PI) * -1 + 270;
        eye.style.transform = `rotate(${degrees}deg)`;
    });
}

window.addEventListener("pointermove", (event) => lookAt(event.clientX, event.clientY));
window.addEventListener("pointerdown", (event) => lookAt(event.clientX, event.clientY));

// Mouse: growl while hovering. Touch: growl on tap, calm down shortly after lifting.
let calmTimer;
dog.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") dog.classList.add("is-angry");
});
dog.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") dog.classList.remove("is-angry");
});
dog.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    clearTimeout(calmTimer);
    dog.classList.add("is-angry");
});
dog.addEventListener("pointerup", (event) => {
    if (event.pointerType === "mouse") return;
    calmTimer = setTimeout(() => dog.classList.remove("is-angry"), CALM_DELAY_MS);
});

function showScene(name) {
    scenes.forEach((scene) => { scene.hidden = scene.id !== name; });
    switchButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.scene === name));
    });
    history.replaceState(null, "", name === "monk" ? location.pathname : `#${name}`);
}

switchButtons.forEach((button) => {
    button.addEventListener("click", () => showScene(button.dataset.scene));
});

showScene(location.hash === "#doge" ? "doge" : "monk");
