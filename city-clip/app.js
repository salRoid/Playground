const heading = document.querySelector(".city");
const switchButtons = document.querySelectorAll(".pg-switch button");

const INTERVAL_MS = 3000;
const SWAP_MS = 400;
const SIDE_GUTTER = 32;

let cities = [];
let current = -1;
let timer;

// Start downloading every photo in the set so each swap is instant.
function preload(set) {
    set.forEach(({ img }) => { new Image().src = img; });
}

function pickNext() {
    if (cities.length < 2) return 0;
    let next = Math.floor(Math.random() * (cities.length - 1));
    if (next >= current) next += 1;
    return next;
}

// Use the entry's own size, shrunk until the word fits the viewport width.
function fit(size) {
    heading.style.fontSize = size;
    const available = window.innerWidth - SIDE_GUTTER;
    const width = heading.scrollWidth;
    if (width > available) {
        const px = parseFloat(getComputedStyle(heading).fontSize);
        heading.style.fontSize = `${Math.floor(px * available / width)}px`;
    }
}

const DEVANAGARI = /[\u0900-\u097F]/;

function show(index) {
    current = index;
    const { city, img, focus, size } = cities[index];
    heading.textContent = city;
    heading.classList.toggle("is-devanagari", DEVANAGARI.test(city));
    heading.style.backgroundImage = `url(${img})`;
    heading.style.backgroundPosition = `50% ${focus}%`;
    fit(size);
}

function swap() {
    heading.classList.add("is-swapping");
    setTimeout(() => {
        show(pickNext());
        heading.classList.remove("is-swapping");
    }, SWAP_MS);
}

function useSet(name) {
    cities = CITY_SETS[name];
    preload(cities);
    switchButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.set === name));
    });
    clearInterval(timer);
    current = -1;
    show(pickNext());
    timer = setInterval(swap, INTERVAL_MS);
}

switchButtons.forEach((button) => {
    button.addEventListener("click", () => useSet(button.dataset.set));
});

function refit() {
    if (current >= 0) fit(cities[current].size);
}

window.addEventListener("resize", refit);
// A font that finishes loading later changes the word's width, so measure again.
document.fonts.addEventListener("loadingdone", refit);

// Load both scripts' fonts up front; the Devanagari one would otherwise only load on first use.
Promise.all([
    document.fonts.load('800 1em "Poppins"', "A"),
    document.fonts.load('800 1em "Noto Sans Devanagari"', "क")
]).catch(() => {}).then(() => useSet("india"));
