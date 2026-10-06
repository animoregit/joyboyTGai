# Joyboy AI — Landing Page

Premium monochrome landing page for **Joyboy AI**, a multi-model AI assistant on Telegram.

- **Bot:** [@joyboy_AI_BOT](https://t.me/joyboy_AI_BOT)
- **Founder:** Joyboy — [@esczi](https://t.me/esczi)

## Run it

No build step, no dependencies. Either:

```bash
python -m http.server 8000
```

then open <http://localhost:8000>

…or just open `index.html` directly in a browser.

## Structure

```
joyboy-ai/
├── index.html              # all sections, semantic markup
└── assets/
    ├── css/styles.css      # design tokens + all styling
    ├── js/main.js          # scroll reveal, nav, menu, effects
    └── img/favicon.svg
```

## Editing

**Colours** — every value is a CSS variable at the top of `styles.css`:

| Variable | Use |
|---|---|
| `--bg` / `--bg-alt` | page and alternating-section background |
| `--ink` … `--ink-4` | text, light → dark |
| `--line` / `--line-soft` | borders and dividers |

**Bot / Telegram links** — search `index.html` for `t.me` and update all six.

**Copy** — headings live in `index.html`. Section order is `hero`, `features`,
`models`, `how`, `founder`, `cta`.

## Notes

- Scroll animations use `IntersectionObserver` and run once per element.
- Fully respects `prefers-reduced-motion`.
- Reveal delays come from `data-delay="1|2|3…"` on any `.reveal` element.
- Pointer spotlight on cards and magnetic buttons only activate on hover-capable
  devices, so mobile stays smooth.