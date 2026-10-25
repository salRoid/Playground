// Shown when the link has no ?name= / ?date= (date is MM-DD; the year is ignored).
const DEFAULTS = { name: "Aanya", date: "03-22" };

const params = new URLSearchParams(location.search);
const name = (params.get("name") || DEFAULTS.name).trim().slice(0, 40);
const [month, day] = parseMonthDay(params.get("date")) || parseMonthDay(DEFAULTS.date);

const RING_LENGTH = 2 * Math.PI * 52;
const MS = { day: 86400000, hour: 3600000, minute: 60000, second: 1000 };

const rings = {};
document.querySelectorAll(".ring").forEach((ring) => {
    const progress = ring.querySelector(".progress");
    progress.style.strokeDasharray = RING_LENGTH;
    rings[ring.dataset.unit] = { value: ring.querySelector(".value"), progress };
});

// Accepts "MM-DD" or a full "YYYY-MM-DD" (from the date picker).
function parseMonthDay(value) {
    const match = /^(?:\d{4}-)?(\d{1,2})-(\d{1,2})$/.exec(value || "");
    if (!match) return null;
    const m = Number(match[1]);
    const d = Number(match[2]);
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;
    return [m, d];
}

function isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Midnight of the birthday in a given year. 29 Feb falls back to 28 Feb in non-leap years.
function birthdayIn(year) {
    const d = month === 2 && day === 29 && !isLeap(year) ? 28 : day;
    return new Date(year, month - 1, d);
}

function isToday(date, now) {
    return date.getFullYear() === now.getFullYear()
        && date.getMonth() === now.getMonth()
        && date.getDate() === now.getDate();
}

function setRing(unit, value, max) {
    rings[unit].value.textContent = String(value).padStart(2, "0");
    rings[unit].progress.style.strokeDashoffset = RING_LENGTH * (1 - value / max);
}

function tick() {
    const now = new Date();
    const thisYear = birthdayIn(now.getFullYear());
    const celebrating = isToday(thisYear, now);

    document.querySelector(".eyebrow").textContent = celebrating ? "Today is" : "Counting down to";
    document.querySelector(".rings").hidden = celebrating;
    document.querySelector(".celebrate").hidden = !celebrating;
    if (celebrating) return;

    const target = thisYear > now ? thisYear : birthdayIn(now.getFullYear() + 1);
    let left = target - now;
    const days = Math.floor(left / MS.day); left -= days * MS.day;
    const hours = Math.floor(left / MS.hour); left -= hours * MS.hour;
    const minutes = Math.floor(left / MS.minute); left -= minutes * MS.minute;
    const seconds = Math.floor(left / MS.second);

    setRing("days", days, 366);
    setRing("hours", hours, 24);
    setRing("minutes", minutes, 60);
    setRing("seconds", seconds, 60);
    document.querySelector(".rings").setAttribute(
        "aria-label", `${days} days, ${hours} hours, ${minutes} minutes left`
    );
}

document.querySelectorAll(".name").forEach((el) => { el.textContent = name; });
document.querySelector(".date").textContent = birthdayIn(2024)
    .toLocaleDateString(undefined, { day: "numeric", month: "long" });
document.title = `${name}’s Birthday Countdown`;

// "Make your own": prefill with the current values, then reload with them in the link.
const form = document.querySelector(".maker-form");
form.elements.name.value = name;
form.elements.date.value = `2000-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = new URLSearchParams({
        name: form.elements.name.value.trim(),
        date: form.elements.date.value.slice(5)
    });
    location.search = next.toString();
});

tick();
setInterval(tick, 1000);
