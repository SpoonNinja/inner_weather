# Inner Weather

A one-minute pause: breathe, name what you're feeling, and choose what to do with it.

Live at https://spoonninja.github.io/inner_weather/

## The flow

1. **Breathe.** Three guided breaths (in 4, hold 2, out 6).
2. **Find the place.** The "places we go when..." wheel, 13 places and 89 feelings, inspired by *Atlas of the Heart*.
3. **Check the fit.** A short description of the feeling. Optionally explore it in your own words. "Yes, that's it" moves on; "Not quite" shows the feelings that sit closest to it.
4. **Set an intention.** What the feeling may be telling you, four ideas to respond, and a space to write your own.
5. **Share, if you want.** Sends what you landed on with a link that invites the other person to check in and send theirs back.

Everything stays in the browser (localStorage). No accounts, no tracking, no backend.

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Files

- `js/data/atlas.js`: every feeling's description, reflection question, and look-alike note.
- `js/data/insights.js`: the wheel layout and colors, plus each feeling's signal, four intention ideas, and nearby feelings.
- `js/wheel.js`, `js/breath.js`, `js/app.js`: the wheel, the breathing guide, and the screens.
- `fonts/`: self-hosted Fraunces and Inter (SIL Open Font License), so the app works offline.

## Updating

Upload changed files to the repo, then bump `CACHE` in `sw.js` (for example `iw-v3`) so installed copies refresh.

## Credits

Places and feelings inspired by *Atlas of the Heart* by Brené Brown (Random House, 2021). All descriptions are written in our own words. Not affiliated with or endorsed by Brené Brown or her publisher. Inner Weather is a reflection tool, not therapy or medical advice.
