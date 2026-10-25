const die = document.querySelector(".die");
const rollButton = document.querySelector(".roll");
const resetButton = document.querySelector(".reset");
const summary = document.querySelector(".summary");
const oddBar = document.querySelector(".split-odd");
const evenBar = document.querySelector(".split-even");
const oddPct = document.querySelector(".odd-pct");
const evenPct = document.querySelector(".even-pct");
const faceList = document.querySelector(".faces");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Pick a number in 7–54. Evens map straight to a face; odds are halved first.
// That makes 2, 4 and 6 three times as likely as 1, 3 and 5 (75% even overall).
// The same engine is in biased-dice.cpp.
function biasedRoll() {
    const n = Math.floor(Math.random() * 48) + 7;
    const face = n % 2 === 0 ? n % 6 : Math.floor(n / 2) % 6;
    return face === 0 ? 6 : face;
}

let counts = [0, 0, 0, 0, 0, 0];

const faceRows = counts.map((_, i) => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="face-label">${i + 1}</span><span class="face-track"><span class="face-fill"></span></span><span class="face-count">0</span>`;
    faceList.appendChild(item);
    return item;
});

function percent(part, total) {
    return total ? Math.round((part / total) * 100) : 0;
}

function render(lastFace) {
    const total = counts.reduce((a, b) => a + b, 0);
    const odd = counts[0] + counts[2] + counts[4];
    const even = total - odd;
    const most = Math.max(...counts, 1);

    summary.textContent = total
        ? `Rolled ${lastFace} · ${total} ${total === 1 ? "roll" : "rolls"}`
        : "No rolls yet";
    oddPct.textContent = total ? `${percent(odd, total)}%` : "–";
    evenPct.textContent = total ? `${percent(even, total)}%` : "–";
    oddBar.style.flexGrow = odd;
    evenBar.style.flexGrow = even;

    faceRows.forEach((row, i) => {
        row.querySelector(".face-fill").style.width = `${(counts[i] / most) * 100}%`;
        row.querySelector(".face-count").textContent = counts[i];
    });
    resetButton.disabled = total === 0;
}

function roll() {
    const face = biasedRoll();
    counts[face - 1] += 1;
    die.src = `img/face-${face}.webp`;
    die.alt = `Dice showing ${face}`;
    if (!reduceMotion.matches) {
        die.classList.remove("is-rolling");
        void die.offsetWidth; // restart the animation on rapid rolls
        die.classList.add("is-rolling");
    }
    render(face);
}

rollButton.addEventListener("click", roll);
resetButton.addEventListener("click", () => {
    counts = [0, 0, 0, 0, 0, 0];
    die.src = "img/face-1.webp";
    die.alt = "Dice showing 1";
    render();
});

render();
