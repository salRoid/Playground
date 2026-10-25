const canvas = document.querySelector(".stars");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Roughly one star per 25,000 px², the density of the original 50 stars on 1500×800.
const STAR_DENSITY = 1 / 25000;
// Pixels per frame at 60fps; each star adds its own parallax offset.
const BASE_SPEED = 2;

// Same mix as before: mostly white, a few red, yellow and blue; near stars are bigger and faster.
function starStyle(index) {
    if (index % 8 === 0) return "#ff4444";
    if (index % 10 === 0) return "#bfbb40";
    if (index % 17 === 0) return "#444fff";
    return "#ffffff";
}

function starDepth(index) {
    if (index % 6 === 0) return { size: 2, speed: 1 };
    if (index % 9 === 0) return { size: 4, speed: 2 };
    if (index % 2 === 0) return { size: 1, speed: -1 };
    return { size: 2, speed: 0 };
}

let stars = [];
let width = 0;
let height = 0;

function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.max(30, Math.round(width * height * STAR_DENSITY));
    stars = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        color: starStyle(index + 1),
        ...starDepth(index + 1)
    }));
    draw();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

let last = performance.now();
function tick(now) {
    const frames = Math.min((now - last) / (1000 / 60), 4);
    last = now;
    if (!reduceMotion.matches && !document.hidden) {
        for (const star of stars) {
            star.x -= (BASE_SPEED + star.speed) * frames;
            if (star.x < 0) star.x += width;
        }
        draw();
    }
    requestAnimationFrame(tick);
}

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(tick);
