# KCSE Prep Web App – Design Spec (2024‑04‑30)

## Overview
The application is a modular front‑end + lightweight JSON backend that delivers KCSE curriculum content, interactive quizzes, a study timetable, progress tracking, and personal notes. The design follows approach 2 (modular front‑end with a simple Node/Express API) while keeping the codebase ready for future migration to a full PWA.

## Architecture
- **Frontend** (static SPA) – bundled under `public/`.
  - Modules: `dashboard.js`, `subjects.js`, `lesson.js`, `quiz.js`, `schedule.js`, `progress.js`, `notes.js`.
  - Shared state object `S` (current view, selected topic, user data).
  - UI updates via direct DOM manipulation; no heavy framework.
- **Backend** – minimal Express server (`server.js`).
  - Serves static assets and JSON data (`data/` folder).
  - POST `/api/save` writes user data (`data/user/<userId>/...json`).
  - Future‑ready endpoints can be wrapped by serverless functions.
- **Data files**
  - `data/subjects.json` – list of subjects, forms, and topic metadata.
  - `data/lessons/<id>.json` – lesson content (HTML strings, formulas, video URLs, quick‑check items).
  - `data/quizzes/<id>.json` – MCQ arrays with correct answer indexes.
  - `data/user/<userId>/progress.json`, `notes.json`, `schedule.json` – persisted per‑user state.
- **Future PWA layer** – Service Worker placeholder (`public/sw.js`) that caches static assets. When migrating, replace `localStorage` writes with IndexedDB and enable offline sync.

## Components
1. **Dashboard** – renders progress bars per subject/form, badge display, and quick‑link cards.
2. **Subject & Form Navigator** – grid of cards generated from `subjects.json`.
3. **Lesson Viewer** – inserts lesson HTML, renders formula boxes, embeds YouTube/Vimeo videos, and shows quick‑check practice items.
4. **Quiz Engine** – loads quiz JSON, shows MCQs, provides immediate feedback, records score, updates `progress.json`.
5. **Timetable** – simple table view; drag‑drop topics into slots; stores in `schedule.json`.
6. **Progress Tracker** – aggregates completed lessons/quizzes, renders heat‑map, awards badges.
7. **Notes & Bookmarks** – inline highlight actions; notes saved per topic in `notes.json`.

## Data Flow
- On app start: fetch `subjects.json` → populate navigator.
- Selecting a topic: fetch `lessons/<id>.json` → render lesson.
- Completed lesson/quiz: POST `{type:'progress', payload:{topicId, completed}}` → server writes `progress.json`.
- Saving notes/bookmarks: POST `{type:'notes', payload:{topicId, notes}}`.
- Schedule edits: POST `{type:'schedule', payload:{...}}`.
- UI reads back updated user JSON to refresh state.

## Error Handling
- Fetch failures display `.alert-bar` with retry button.
- POST retries up to 3× with exponential back‑off.
- Service Worker fallback serves cached static files for offline read‑only mode.

## Testing (TDD)
- **Unit tests** – Jest + jsdom for each front‑end module (DOM updates, state changes).
- **API tests** – Supertest for Express endpoints (GET subjects, POST save).
- **E2E smoke test** – Playwright script that navigates through dashboard → lesson → quiz → saves a note and verifies persisted data.

## Migration Path to PWA
1. Add `public/sw.js` that precaches static assets.
2. Replace `localStorage` writes in UI with a thin IndexedDB wrapper (can be toggled via a flag).
3. Enable background sync to queue POST requests when offline.
4. Optionally package with Workbox for easier service‑worker generation.

## Success Criteria
- Student can browse subjects/forms, read lessons, complete quizzes, and see progress update instantly.
- All user data persists across browser reloads (via server JSON files).
- Mobile view retains usability (responsive grid, touch‑friendly controls).
- Codebase passes all unit, API, and E2E tests.
- Documentation includes the migration checklist above.

---
*Spec written per the brainstorming workflow. Ready for review.*