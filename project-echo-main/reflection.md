# Project Echo – Knowledge Reflection

This app pulls together a bunch of things I practiced in CIS 376: JSON-driven UIs, Bootstrap layouts, JavaScript events, GitHub workflows, and thinking about accessibility and architecture like real developers instead of just copying tutorials.

---

## Key Terms & Concepts

> **IS Architecture**  
> A high-level blueprint of how information systems, applications, data stores, and services fit together to support an organization’s goals.

> **IT Infrastructure**  
> The hardware, operating systems, networks, and cloud services that everything runs on. In this project it mainly means GitHub, GitHub Pages, the browser, and the CDNs that serve Bootstrap, jQuery, and zero-md.

> **RESTful API**  
> An API that exposes resources over HTTP using verbs like GET and POST, usually returning JSON. Even though this app only loads local JSON files, the same Fetch API pattern would work with a REST backend.

> **Fetch API**  
> A modern JavaScript interface for making HTTP requests that returns Promises. In this app I use `fetch()` to request `projects.json` and `achievements.json`, then `.json()` to turn the response into usable data.

> **Agile / Scrum**  
> An iterative way of working where you break work into small chunks (sprints), use user stories to describe value, and track progress with things like issues, boards, and milestones instead of giant one-time plans.

These definitions are summarized from documentation and tutorials (for example MDN Web Docs and general Agile resources).

---

## Infrastructure (Tech Stack)

For Project Echo, **infrastructure** = the tools and services I used to actually build and run the app:

- HTML5, CSS3, JavaScript (ES6)
- Bootstrap 5 and Bootstrap Icons
- Google Fonts (Inter)
- jQuery 3.x
- Fetch API + JSON data files
- zero-md web component for rendering Markdown as HTML
- GitHub and GitHub Pages for hosting
- Chrome DevTools for debugging
- Nu HTML Validator, WAVE, and (optionally) Lighthouse for accessibility checks
- AI tools (like ChatGPT) used as a “pair programmer” for brainstorming structure and catching mistakes, not for copy-pasting entire solutions blindly

---

## Architecture (How it Fits Together)

In this app, **architecture** is about how the files and pieces line up:

- `index.html` defines the layout: navbar, Projects section, Achievements section, and a Reflection section that contains `<zero-md src="reflection.md"></zero-md>`.
- `scripts/app.js` runs on `$(document).ready(...)`, uses the Fetch API to load:
  - `data/projects.json` → renders Bootstrap cards into `#projectsRow`
  - `data/achievements.json` → renders cards into `#achievementsRow`
- Both JSON files act as the “data layer” instead of hard-coding cards in the HTML.
- `styles/main.css` adds custom styling for typography, cards, and the zero-md content on top of Bootstrap’s defaults.
- `reflection.md` is stored as Markdown but rendered on the page as HTML by zero-md.

A simple flow looks like this:

```text
Local files → GitHub repo → GitHub Pages → Browser
      |           |              |           |
   HTML/CSS/JS    |         Deployed static  |
   JSON + .md     |------------------------> |
