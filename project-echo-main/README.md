# Project Echo – Developer Profile App

Project Echo is a JSON-driven developer profile app for **David Timothy (GitHub: @dtimothy333)**.

It showcases selected projects and achievements using Bootstrap cards, loads data from JSON files via the Fetch API, and renders a knowledge reflection from Markdown using the `zero-md` web component.

---

## 🎯 Purpose

This app serves as a central place to:

- Browse my web development projects and coursework work
- Highlight achievements such as CodeAcademy completions and course milestones
- Reflect on the tools, processes, and lessons learned during CIS 376 and related work

---

## 🧱 Tech Stack (Infrastructure)

- **HTML5** – structure
- **CSS3 + Bootstrap 5** – layout, grid, responsive design
- **Bootstrap Icons** – lightweight icon set
- **Google Fonts (Inter)** – typography
- **JavaScript (ES6)** – behavior
- **jQuery 3.x** – DOM convenience & doc ready
- **Fetch API** – loading `projects.json` and `achievements.json`
- **JSON** – data for projects & achievements
- **zero-md** – render `reflection.md` as HTML
- **GitHub Pages** – hosting
- **Chrome DevTools** – debugging & a11y checks
- **Nu HTML Validator & WAVE** – accessibility and markup validation

---

## 🧩 Architecture Overview

**File layout:**

```text
project-echo/
│── index.html          # main app (nav, sections, zero-md)
│── README.md           # this file
│── reflection.md       # knowledge reflection rendered by zero-md
│
├── styles/
│   └── main.css        # custom styling on top of Bootstrap
│
├── scripts/
│   └── app.js          # fetches JSON, renders cards, handles filtering
│
├── data/
│   ├── projects.json   # list of project objects
│   └── achievements.json # list of achievement objects
│
└── assets/
    └── images/
        ├── favicon.ico
        ├── project-delta-thumb.png
        └── achievement-sample.png
