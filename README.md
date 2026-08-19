# CodeHemu — Learn to Code for Free

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibfEaHK5i5QdZPS_FtKof53gEPPCHCdcM-CGskO4h36fB4IaJVNdZ3-WMs5XGRDYpxIu29CSkBQDZH0l1WTrh_Y5mSIjE2zEtHUkjWFdGKOzsDzwRlCO11UBTC2ymApogt6ZA9c7sclYnnbiuUVvHtMiBL20mJgfzzlb00NlUk3rdTKXMej9VDH0qoBlQ/s1600/codehemu-banner.png" alt="CodeHemu Banner" width="600"/>
</p>

> **Our mission is simple:** help people learn to code for free.

CodeHemu is a free developer resource hub publishing tutorials, code snippets, CSS art, small JavaScript tools, and step-by-step build guides. Whether you are a total beginner or an intermediate developer exploring animation, CSS art, or programming languages, there is something here for you.

[![Website](https://img.shields.io/badge/Website-codehemu.in-00c2ff?style=flat-square)](https://www.codehemu.in)
[![YouTube](https://img.shields.io/badge/YouTube-CodeHemu-ff0000?style=flat-square)](https://www.youtube.com/@CodeHemu)
[![GitHub](https://img.shields.io/badge/GitHub-code--hemu-181717?style=flat-square&logo=github)](https://github.com/code-hemu)
[![Facebook](https://img.shields.io/badge/Facebook-CodeHemu-1877F2?style=flat-square)](https://www.facebook.com/codehemu)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## About Us

**CodeHemu** is a growing community-driven learning platform focused on web design and development. We publish content that is practical, visual, and fun — teaching you how to build things you can see and use, not just theory.

### What we cover

| Topic | What you will learn |
| ----- | ------------------- |
| **HTML** | Structure, lists, project layout, semantic markup |
| **CSS** | Positioning, animations, flexbox, layout systems |
| **JavaScript** | Logic, math engines, browser APIs, tool building |
| **CSS Art** | Drawing animals and objects with pure CSS |
| **Build Projects** | Complete, usable tools built step by step |
| **Python & Tooling** | Scripts, automation, ADB, and developer workflows |

### Why CodeHemu?

- **100% free** — no paywalls, no premium tiers, ever.
- **Hands-on** — every tutorial ends with working code you can copy.
- **Visual-first** — CSS art and animations to keep learning fun.
- **Step-by-step** — clear, beginner-friendly instructions.
- **Practical** — build real tools like calculators, QR code generators, and image compressors.

---

## Featured Articles

Pick a topic and start building today:

### JavaScript & Build Projects
- [How to Build a Scientific Calculator in JavaScript with Exprify.js](https://www.codehemu.in/2026/06/how-to-build-scientific-calculator-in.html)
- [Build a Math Evaluation Engine in JavaScript from Scratch](https://www.codehemu.in/2026/04/build-math-evaluation-engine-in.html)
- [How to Build a QR Code Generator and Reader Using JavaScript](https://www.codehemu.in/2026/05/how-to-build-qr-code-generator-and.html)
- [How to Build a Broken Link Checker Tool Using HTML, CSS and JavaScript](https://www.codehemu.in/2025/11/broken-link-checker-Tool.html)
- [How to Build a Browser-Based Image Compressor Using JavaScript](https://www.codehemu.in/2026/06/how-to-build-browser-based-image.html)
- [Volume Booster Extension Project With HTML, CSS, and JavaScript](https://www.codehemu.in/2026/02/volume-booster-project.html)
- [Build a Placeholder Image Path Generator using JavaScript](https://www.codehemu.in/2025/10/build-placeholder-image-path-generator.html)
- [How to Build an Android Screen Mirroring Tool for PC Using Python and ADB](https://www.codehemu.in/2026/03/how-to-build-android-screen-mirroring.html)

### CSS Art Gallery
- [HTML and CSS Fish Animation Tutorial](https://www.codehemu.in/2025/10/css-fish.html)
- [How to Draw a Fox with HTML and CSS](https://www.codehemu.in/2025/12/how-to-draw-fox-with-html-and-css.html)
- [How to Draw a Pig with HTML and CSS](https://www.codehemu.in/2025/10/css-pig.html)
- [How to Draw a Rat with HTML and CSS](https://www.codehemu.in/2025/11/css-rat.html)
- [How to Build a 3D Ball Effect with Pure CSS](https://www.codehemu.in/2025/11/css-ball.html)
- [CSS Water Wave Clock Animation](https://www.codehemu.in/2025/10/wave-clock.html)

### HTML & CSS Fundamentals
- [What are Absolute and Relative positioning in CSS?](https://www.codehemu.in/2026/02/what-are-absolute-and-relative.html)
- [How to Use HTML Lists — Ordered, Unordered & Definition Lists](https://www.codehemu.in/2025/12/html-list.html)
- [How to structure an HTML project](https://www.codehemu.in/2025/10/how-to-structure-html-project.html)

### Python & Developer Tooling
- [Why YAML Beats JSON for Configuration — A Guide for Python Developers](https://www.codehemu.in/2025/12/why-yaml-beats-json-for-configuration.html)
- [How to Work with Chocolatey in PowerShell](https://www.codehemu.in/2026/01/how-to-work-with-chocolatey.html)

### Security
- [College Website Security Guide: Risks and How to Fix](https://www.codehemu.in/2026/04/how-to-secure-college-website-risks-and.html)

> Browse the full library: [All Posts](https://www.codehemu.in/) · [CSS Art Gallery](https://www.codehemu.in/search/label/css%20art) · [Build Projects](https://www.codehemu.in/search/label/build)

---

## Repository Overview

This repository hosts the **CodeHemu Blogger theme** — a custom, SEO-optimized, responsive template.

```
codehemu/
├── template/
│   ├── theme.xml      # Blogger XML theme (layout, widgets, CSS, markup)
│   └── main.js        # Un-minified source of the theme's JavaScript
├── README.md
└── LICENSE
```

### Theme features

- **SEO built-in** — Open Graph, Twitter Cards, canonical URLs, and `noindex` rules
- **Rich Schema (JSON-LD)** — `WebSite`, `Organization`, `WebPage`, `Article`, `BreadcrumbList`, `FAQPage`, `ContactPage`
- **Responsive layout** — desktop, tablet, and mobile breakpoints
- **Featured & hot post sections** — auto-fetch posts from Blogger feeds
- **Mega menu + mobile slide menu** — with submenu toggles
- **Live search** overlay in the navigation bar
- **Related posts** under every article
- **Sticky sidebar** via [StickyGum](https://www.npmjs.com/package/stickygum)
- **Cookie consent banner** with `localStorage` persistence
- **Load-more pagination** and numbered page navigation
- **Social sharing** — Facebook, Pinterest, WhatsApp, Email
- **Back-to-top button** and smooth scrolling
- **Ad-ready** — header, in-post, and inline ad units (AdSense)

---

## Installation

1. Go to **Blogger Dashboard → Theme**.
2. Click the arrow next to **Customize** and choose **Edit HTML**.
3. Select **all** existing content, delete it, and paste the contents of `template/theme.xml`.
4. Click **Save**.
5. Open the **Layout** tab to add/remove widgets (Featured Posts, Hot Posts, Social, etc.).

> **Tip:** Always keep a backup of your current theme before switching.

### Making JS edits

`main.js` is the readable source. The theme also embeds a minified copy of it inside `theme.xml` (in the `<script>` block near the end of the file). After editing `main.js`:

1. Minify it (e.g. with [terser](https://terser.org) or any minifier).
2. Replace the inlined script in `theme.xml`.
3. Re-upload the theme to Blogger.

---

## Usage & Configuration

Most sections are configured from the Blogger **Layout** editor using simple text widgets:

| Widget | Content value | Purpose |
| ------ | ------------- | ------- |
| Hot Posts | `random/hot-posts` | Trending slider on the homepage |
| Featured Posts | `5/python/col-left` | Category blocks (count / label / layout) |
| Featured Big | `python/feat-big` | Hero-style featured posts |
| Recent Posts | `3/recent/post-list` | Footer recent list |
| Footer Columns | `3/css%20art/post-list` | Footer list by label |

The theme auto-detects the layout keyword (`mega-menu`, `hot-posts`, `col-left`, `feat-big`, `post-list`, `related`) and renders the matching markup.

---

## Contributing

Contributions are welcome! Found a bug, want a new feature, or have a tutorial to share?

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-idea`
3. Commit your changes and open a Pull Request.

You can also reach us via:

- Website: <https://www.codehemu.in/p/contact.html>
- YouTube: <https://www.youtube.com/@CodeHemu>
- Facebook: <https://www.facebook.com/codehemu>

---

## License

This project is released under the [MIT License](LICENSE). Feel free to use, modify, and distribute it — a credit link back to [codehemu.in](https://www.codehemu.in) is appreciated.

---

<p align="center">Made with ❤️ in India — <a href="https://www.codehemu.in">CodeHemu</a></p>
