// The place shown in the title and on the left print. Photos live in img/.
const PLACE = "Bali";

const banner = document.querySelector(".banner");
const title = document.querySelector(".title");
const caption = document.querySelector(".place");

title.setAttribute("aria-label", PLACE);
caption.textContent = PLACE;

// One span per letter so each can fade in on its own delay.
[..."~. " + PLACE + " .~"].forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.setAttribute("aria-hidden", "true");
    span.style.setProperty("--i", i);
    span.textContent = char;
    title.appendChild(span);
});

// Restart every CSS animation by re-inserting the banner.
document.querySelector(".replay").addEventListener("click", () => {
    const fresh = banner.cloneNode(true);
    banner.replaceWith(fresh);
});
