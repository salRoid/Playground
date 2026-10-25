# Playground

Small web experiments: CSS tricks, cursor toys and little animations. Plain HTML, CSS and JavaScript, no build step.

**Live:** https://salroid.github.io/playground/

| Toy | What it is |
|---|---|
| [City Clip](city-clip/) | City names cut out of their own photos with `background-clip: text`. Indian cities or Marvel locations. |
| [Watching Eyes](watching-eyes/) | A monk and a pure-CSS dog whose eyes follow your cursor or finger. The dog growls on hover or tap. |
| [Interstellar](interstellar/) | An astronaut by a satellite above Earth, with a canvas parallax star field. |
| [Dice Moves](dice-moves/) | A loaded dice (75% even) with live odd/even stats. Same engine in C++ in `biased-dice.cpp`. |
| [Travel Banner](travel-banner/) | The place name writes itself in, then two prints drop onto the photo. Change `PLACE` in `app.js`. |
| [Birthday Countdown](birthday-countdown/) | Countdown to the next birthday. Use `?name=Aanya&date=03-22`, or the "Make your own" form. |
| [Profile Card](profile-card/) | An animated profile card with social links. |
| [Caveman 404](caveman-404/) | A not-found page with an animated caveman. |

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Conventions

- One folder per toy: `index.html`, `styles.css`, `app.js`, `img/`.
- Every toy links back to the gallery with the shared pill in `shared/back.css`.
- Each toy should work on a phone (touch input, small screens) and respect `prefers-reduced-motion`.
- Images are WebP, sized for the screen. Only commit images the toy actually uses.
- Gallery thumbnails live in `shared/thumbs/` (800×500 WebP).

## License

[MIT](LICENSE)
