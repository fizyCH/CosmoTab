<p align="center">
  <img src="assets/logo.png" width="150" alt="CosmoTab logo">
</p>

<h1 align="center">CosmoTab</h1>

<p align="center">
  <strong>A window to the universe in every new tab.</strong><br>
  A live 3D Earth, weather, now-playing controls, bookmarks and search — in one calm, glassy interface.
</p>

<p align="center">
  <a href="README.md"><img src="assets/English.png" height="40" alt="English"></a>
  &nbsp;
  <a href="README_RU.md"><img src="assets/Русский.png" height="40" alt="Русский"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Firefox-supported-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white" alt="Firefox">
  <img src="https://img.shields.io/badge/Firefox%20Android-supported-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white" alt="Firefox for Android">
  <img src="https://img.shields.io/badge/Chrome-supported-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome">
  <img src="https://img.shields.io/badge/version-2.6.5-8A7BFF?style=for-the-badge" alt="Version 2.6.5">
  <img src="https://img.shields.io/badge/license-MIT-3FB950?style=for-the-badge" alt="MIT License">
</p>

<p align="center">
  <img src="assets/preview.png" width="100%" alt="CosmoTab — 3D Earth, clock, bookmarks, weather and search">
</p>

---

## About

**CosmoTab** turns every new tab into a quiet window to space.

Instead of another blank page or a wall of widgets, it gives you a slowly turning Earth, a handful of useful tools, and nothing that gets in the way. Everything is local, fast, and designed to feel like a small piece of the cosmos.

## Features

- **A living 3D solar system.** Earth with an independent cloud layer, the Moon, a ringed planet and distant worlds. Drag to rotate with inertia, then let go — Earth and the Moon glide back to their orbit.
- **Seasonal lighting with manual control.** Auto day/night based on the season and local time, plus four modes: auto, day, 50/50 and night.
- **Weather without the noise.** Current conditions and daily range for 30 cities, Celsius or Fahrenheit, powered by `wttr.in` with an Open-Meteo fallback and one-click retry.
- **Now playing, everywhere.** CosmoTab picks up audio from other tabs and shows artwork, title, artist, source and a seekable timeline in a compact glass panel.
- **Search the way you like.** Google, Yandex, Bing or DuckDuckGo, plus an optional Google AI Mode toggle.
- **Image search, two ways.** Attach, paste, or drop an image, then ask Google AI about it or run a visual search in Google Lens.
- **Bookmarks that stay out of the way.** Nine tiles per page, folders that open as a 3×3 panel, rename support, drag and drop, restore defaults, and JSON export or import.
- **A player with real controls.** Previous, play/pause and next buttons in a liquid-glass panel. Pause keeps the panel visible so you can resume from the new tab.
- **Bilingual and configurable.** English and Russian, two layouts, weather on/off, city and temperature units.
- **Private by design.** No accounts, no telemetry, no remote code. Your settings and bookmarks stay in local storage.

## Layouts

Prefer search at the bottom, or everything out of the way at the top? CosmoTab supports both — the choice is saved instantly.

<p align="center">
  <img src="assets/layout-bottom.png" width="76%" alt="Search on top, player and weather at the bottom">
  &nbsp;
  <img src="assets/mobile.png" width="20%" alt="CosmoTab on mobile">
</p>

On narrow screens the player and weather move below the bookmarks instead of covering them.

## Image search

<p align="center">
  <img src="assets/attachment.png" width="76%" alt="CosmoTab image attachment preview">
</p>

Add an image with the picture button, paste it with `Ctrl+V`, or drop it onto the search bar. The image is not sent immediately: a preview appears with a ready indicator, a send button and a remove button. You can type a question about the image in the search bar, then press `Enter` or the arrow button.

The AI toggle decides the destination: with AI Mode on, the image and your text open in Google AI Mode; with AI Mode off, the image opens in Google Lens. If no question is typed, the image is sent without extra text.

## Bookmark folders

<p align="center">
  <img src="assets/folders.png" width="76%" alt="CosmoTab bookmark folder">
</p>

Choose **Folder** in the add dialog to create a folder. It opens as a transparent 3×3 panel exactly over the nine bookmark tiles, with its name centered above the folder. Click the name to rename it. Add bookmarks inside, drag bookmarks into folders, or drag a bookmark outside the panel to move it back to the main grid. Dropping one bookmark onto another creates a new folder with both. Click outside the tiles or press `Esc` to close.

## Player

<p align="center">
  <img src="assets/player-controls.png" width="76%" alt="CosmoTab media player controls">
</p>

The liquid-glass player has previous, play/pause and next controls. Pausing no longer hides it: the panel stays on the new tab and the same button resumes playback. Track switching works on sites that support media keys or expose next/previous buttons.

## Settings

<p align="center">
  <img src="assets/settings.png" width="72%" alt="CosmoTab settings">
</p>

- **Interface language** — English or Russian. English is used until you change it explicitly.
- **Layout** — search at the bottom (classic) or search at the top with player and weather at the bottom.
- **Earth lighting** — auto by season and time, day, 50/50 or night.
- **Search provider** — Google, Yandex, Bing, DuckDuckGo, with a separate Google AI Mode switch.
- **Weather** — enable or disable, choose a city, switch between °C and °F.
- **Bookmarks** — folders, export to JSON, import from JSON, restore the default set.

## Install

| Browser | Steps |
| --- | --- |
| **Firefox** | Open `about:debugging` → **This Firefox** → **Load Temporary Add-on** → select `manifest.json`. To use CosmoTab as your home page, set Firefox to open your home page on startup. |
| **Firefox for Android** | Install a signed XPI (AMO or self-distributed), then open CosmoTab from the extensions menu. Android does not support replacing the new-tab page. |
| **Chrome / Chromium** | Open `chrome://extensions` → enable **Developer mode** → **Load unpacked** → select the `chrome` folder. |

The `chrome` folder is already generated in this repository. After changing the shared source files, rebuild it:

```bash
node build-chrome.js
```

More details and troubleshooting: [INSTALL.md](INSTALL.md).

## Firefox for Android

Firefox for Android does not let extensions replace the new-tab page. CosmoTab still installs and runs there: tap the CosmoTab icon in the extensions menu to open it in a regular tab. On first install it opens automatically.

Minimum versions: Firefox 140 and Firefox for Android 142 — the Android requirement comes from `data_collection_permissions` in the manifest. The GitHub zip is meant for temporary desktop loading; Android needs a signed XPI.

## Tech

- Manifest V3, vanilla HTML, CSS and JavaScript — no framework, no build step for the main page.
- Three.js bundled locally in `lib/three.min.js`; textures are shipped with the extension, so nothing is fetched from a CDN.
- A small WebExtension adapter keeps `browser.*` (Firefox) and `chrome.*` (Chromium) working from the same code.
- Weather comes from `wttr.in` first and Open-Meteo second.
- A background script powers the Android toolbar button and the image-search AI Mode handoff.
- Minimum Firefox: 140 desktop, 142 Android (`data_collection_permissions`).
- The Chromium package is generated by `build-chrome.js`.

## Project structure

```text
.
├── index.html          # New-tab page
├── style.css           # Layout, glass UI, responsive rules
├── script.js           # Scene, weather, media, bookmarks, settings
├── background.js       # Toolbar action and image-search handoff
├── manifest.json       # Firefox / Manifest V3 entry point
├── build-chrome.js     # Generates the Chromium build
├── chrome/             # Ready-to-load Chromium extension
├── icons/              # Bookmark icons
├── textures/           # Earth, Moon and history textures
├── lib/three.min.js    # Bundled Three.js
├── README.md
├── README_RU.md
└── INSTALL.md
```

## Privacy

CosmoTab does not collect analytics or personal data. Settings and bookmarks are stored locally in your browser. The only network requests are for weather data and the search page you choose to open. Images added for AI or Lens search are sent to Google only when you confirm the attachment.

## License

Released under the [MIT License](LICENSE).

---

<p align="center">
  <strong>CosmoTab — a piece of the universe in every tab.</strong><br>
  Made with love.
</p>
