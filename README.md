# Professional Product & Technology Portfolio

A modern, responsive portfolio website positioning the owner as a thoughtful problem solver, hands-on builder, and aspiring Product/Project Manager.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom typographic scales (Bebas Neue + Syne + Plus Jakarta Sans)
- **Icons**: Lucide React
- **Architecture**: Zero-backend, pure client-side SPA with hash-based routing compatible with free static hosting.

---

## 📂 Content Management & Data Structure

All editable content is strictly decoupled from UI components and stored in typed data files inside `/src/data/`:

| Data File | Description | Placeholders to Fill |
|---|---|---|
| `src/data/profileData.ts` | Name, Positioning, About Me, Education & Work history, 4 Principles, Socials | `[ADD NAME]`, `[COLLEGE 1 NAME]`, `[COMPANY 1 NAME]` |
| `src/data/courtBookingData.ts` | Flagship CourtBooking case study (Story, User flow, Annotated screens, Decisions, Architecture, Metrics) | `[MY ROLE]`, `[PROJECT DATES]`, `[APP URL]`, `[ADD METRIC]` |
| `src/data/smallerProjectsData.ts` | Case studies for Cohort Learning, Student Recruitment, and Automated Alarm Setter | `[WEBSITE LINK]`, `[ADD METRIC]` |
| `src/data/btcJourneyData.ts` | Leadership case study as President of the Business Technology Club | `[TENURE DATES]`, `[ADD METRIC]` |
| `src/data/projectsData.ts` | Master project catalog & category index | Add or remove project items |

### Adding a New Project
1. Open `src/data/projectsData.ts` or create a new entry in `src/data/smallerProjectsData.ts`.
2. Add the project object with title, one-liner, tags, and category.
3. It will automatically appear in the Projects directory with no component rewrites needed.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Free Static Deployment Guide

### Vercel
1. Push repository to GitHub.
2. Import repository on [vercel.com](https://vercel.com).
3. Framework Preset: **Vite**. Build Command: `npm run build`, Output Directory: `dist`.

### Netlify
1. Connect GitHub repo on [netlify.com](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages
1. Build static output: `npm run build`.
2. Deploy the `dist` directory via GitHub Actions or `gh-pages` branch.
