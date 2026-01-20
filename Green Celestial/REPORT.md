# Green Celestial — Weeks 5–8 Report

## Summary
You implemented Weeks 5–8 full-stack features inside the Green Celestial project: API-driven querying (filtering, sorting, pagination), file uploads and media handling, an analytics dashboard with backend aggregations and frontend charts, and a production-ready app deliverable with documentation.

## What I added
 - Replaced many hardcoded `http://localhost:8000` usages in source files with env-driven values:
	 - `src/config/api.js` now reads `import.meta.env.VITE_BACKEND_URL` (fallback to localhost).
	 - Admin components (blog update, traffic) now use `API_BASE_URL` import.
	 - `vite.config.js` proxy target uses `process.env.BACKEND_URL` fallback.
	 - `backend/index.js` uses `BACKEND_URL` env for content security policy.

 - To fully remove localhost from built bundles, rebuild the frontend so the `/dist` output is regenerated using env values (I left the `dist/` files untouched; they will update on a new build).
- Add a `.env.example` to any other subproject that uses env vars (e.g., `taskManager`, `WeekOne`, etc.).
- Consider adding a short `deploy.md` describing steps for Render/Railway and how to set env vars in the hosting dashboard.

If you want, I can:
- Insert this summary into the existing `Green Celestial/README.md` instead of `REPORT.md`.
- Add `.env.example` files for other workspaces (e.g., `taskManager`, `WeekOne`).
- Create a small `deploy.md` with Render/Railway instructions.
