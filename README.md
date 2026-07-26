# Incident Register

A small Vue 3 + TypeScript app for viewing and managing municipal incidents (power outages, road blockages, infrastructure damage, safety issues) on a map and in a list.

## Running locally

```sh
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

Other scripts:

```sh
npm run build            # type-check + production build
npm run lint             # oxlint + eslint
npm run storybook        # component workbench at http://localhost:6006
npm run build-storybook  # static Storybook build
npm run test:unit        # Vitest unit tests (the Pinia stores)
npm run test:e2e         # Playwright end-to-end tests (headless)
npm run test:e2e:ui      # Playwright end-to-end tests, interactive UI mode
```

## Stack

- Vue 3 (Composition API, `<script setup>`) + TypeScript
- Vite
- Pinia for state management
- vue-i18n for translations (English + Hebrew, with RTL layout support)
- Leaflet + `@vue-leaflet/vue-leaflet`, tiles from OpenStreetMap
- PrimeVue — used only for the confirm dialog's accessible modal/focus-trap behavior, restyled to match the app's own design system
- Storybook for isolated component development
- Playwright for end-to-end tests

## Design system

The UI follows a "civic/editorial" look: a white/neutral-gray paper palette, `Fraunces` (serif) for headings paired with `Public Sans` for UI text, hairline borders instead of shadows, and status colors (rust/ochre/forest-green) for open/in-progress/resolved.

- `src/assets/base.css` — design tokens (`--paper`, `--ink`, `--brand`, `--status-*`, fonts, radius) as CSS custom properties
- `src/components/ui/` — small, reusable, prop-driven primitives: `AppButton`, `AppSelect`, `StatusTag`, `FormField`, `DetailRow`, `EmptyState`. These are the components with Storybook stories (`*.stories.ts` alongside each).

## Architecture

- `src/types/incident.ts` — `Incident` type, `IncidentType`/`IncidentStatus` unions and their value lists.
- `src/data/seedIncidents.ts` — the 4 sample incidents used to seed the store.
- `src/i18n/` — vue-i18n setup and `en`/`he` locale message files. `src/composables/useIncidentLabels.ts` maps incident type/status values to translated labels and select options.
- `src/stores/incidents.ts` — the data store, the one source of truth for:
  - the incidents list and CRUD actions (`createIncident`, `updateIncident`, `deleteIncident`, each taking the target location as an explicit argument)
  - the current selection (`selectedIncidentId`)
  - the active filters (`statusFilter`, `typeFilter`)
- `src/stores/incidentForm.ts` — a separate store for the create/edit side panel's own UI state (`isFormOpen`, `formMode`, `pendingLocation`), kept out of the data store so the data store doesn't need to know a form exists
- `src/components/`
  - `AppHeader.vue` / `LanguageSwitch.vue` — masthead, reset/new-incident actions, language switcher (also sets `<html lang/dir>` and the page title)
  - `FilterBar.vue` — status/type filter dropdowns
  - `IncidentList.vue` / `IncidentListItem.vue` — the list, driven by the store's `filteredIncidents`
  - `MapView.vue` / `MapClickHint.vue` / `IncidentMapPopup.vue` — Leaflet map, one marker per filtered incident (colored by status), a temporary marker for the location being picked in the form, and the click-to-set-location hint banner
  - `IncidentForm.vue` — create/edit side panel
  - `IncidentDetails.vue` — read-only detail view with Edit/Delete actions
  - `ui/` — see [Design system](#design-system) above
- `src/App.vue` — three-column layout (list, map, side panel) wiring everything together, with a slide transition between the details/edit panel

### Mock "server" and persistence

There is no backend. All CRUD operates directly and synchronously on the Pinia store's in-memory state. The store additionally persists `incidents` to `localStorage` (hydrating on load, writing on every change) so data survives a page refresh — a "Reset Sample Data" button in the header clears this and restores the original 4 seed incidents. Selection, filters, form state, and language are intentionally **not** persisted, so a fresh load always starts unselected with filters cleared and the default locale.

### List/map selection sync

`selectedIncidentId` in the store is the single source of truth. Both a list-item click and a marker click just call `store.selectIncident(id)`. `MapView` reacts to selection changes with a `watch` that pans/zooms the Leaflet map — it never writes selection back — so there's no feedback loop.

### Map-click-to-pick-location flow

`IncidentForm` and `MapView` both read/write the same `incidentForm` store fields (`isFormOpen`, `pendingLocation`), so no event-emitting between them is needed: opening the form clears (create) or seeds (edit) `pendingLocation`; clicking the map while the form is open updates it; the form's coordinate display and the map's temporary marker are both just reactive views of that same value; submitting passes it into `incidents.createIncident`/`updateIncident` and then closes the form.

## Testing

- **Vitest unit tests** (`npm run test:unit`) cover `stores/incidents.ts` and `stores/incidentForm.ts` directly — persistence/hydration from `localStorage`, filtering, selection, and every CRUD/form-flow branch (including the "no matching id" no-ops).
- **Storybook** (`npm run storybook`) documents the `ui/` primitives in isolation, including a story that pins down a real overflow bug that was hit and fixed in `AppSelect` (a narrow flex container clipping a long option label).
- **Playwright e2e** (`npm run test:e2e`) drives the real app against a dedicated dev server (port 5183) and covers the core flows end-to-end: creating an incident (including the map-click-to-set-location step), editing, deleting with confirm/cancel, and status/type filtering. Each test clears `localStorage` before navigating so it always starts from the deterministic seed data.

## Known limitations / possible next steps

- No responsive/mobile layout — assumes a desktop viewport.
- No marker clustering, geocoding, or draggable-marker editing.
- No component-level tests (e.g. Vue Testing Library) — coverage today is Vitest unit tests for the stores, Storybook (visual/isolated), and Playwright (end-to-end).
