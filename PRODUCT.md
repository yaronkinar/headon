# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience: the reviewer(s) evaluating this as a home assignment / take-home job application project (e.g. a hiring team or technical interviewer), assessing code quality, UX judgment, and craft rather than real-world usage volume.

Simulated end user (the persona the app itself is designed for): municipal staff viewing and managing local incidents (power outages, road blockages, infrastructure damage, safety issues) on a map and in a list — desk-based, not real-time field/dispatch operations.

## Product Purpose

A small Vue 3 + TypeScript demo app for viewing and managing municipal incidents: create, edit, delete, filter, and locate incidents on a map, with list/map selection kept in sync. Built to demonstrate frontend engineering and product/UX craft as a take-home assignment; success is a coherent, well-crafted, functionally complete demonstration rather than production adoption.

## Positioning

Not yet decided. No competitive positioning (e.g. vs. generic 311/ticketing tools) has been established — treat this as an open/undecided product fact rather than inventing a differentiator.

## Operating Context

- No backend: all CRUD operates synchronously on a Pinia store's in-memory state, persisted to `localStorage` (hydrated on load, written on every change). A "Reset Sample Data" action restores the original 4 seed incidents.
- Selection, filters, form state, and language are intentionally not persisted — a fresh load always starts unselected, with filters cleared and the default locale.
- Desktop-only layout; no responsive/mobile support.
- Bilingual: English and Hebrew via vue-i18n, including RTL layout support (`<html lang/dir>` set on language switch).
- Map interactions (Leaflet + OpenStreetMap tiles): one marker per filtered incident colored by status, plus a map-click-to-pick-location flow shared between the create/edit form and the map.

## Capabilities and Constraints

- Incident fields: `title`, `type` (`POWER_OUTAGE`, `ROAD_BLOCKAGE`, `INFRASTRUCTURE_DAMAGE`, `SAFETY_ISSUE`), `status` (`OPEN`, `IN_PROGRESS`, `RESOLVED`), `latitude`/`longitude`, `createdAt`.
- CRUD (create/update/delete) plus status/type filtering; list and map selection are kept in sync via a single store source of truth (`selectedIncidentId`).
- No marker clustering, geocoding, or draggable-marker editing (documented as a known limitation, not yet decided whether to add).
- These are durable/intentional constraints per the project's own documentation (README "Known limitations / possible next steps") and should be preserved unless the user explicitly changes them: no backend, EN/HE + RTL, desktop-only.

## Brand Commitments

Existing name: "Incident Register." Existing visual identity is documented in the codebase (civic/editorial look — see README "Design system" section, `src/assets/base.css` design tokens) but not yet captured in DESIGN.md.

## Evidence on Hand

- 4 seed incidents in `src/data/seedIncidents.ts` used as sample/demo data; no real customer, testimonial, or production usage evidence exists. Future work must not fabricate real-world adoption, metrics, or testimonials — this is a demo project.

## Product Principles

1. Craft and coherence over feature breadth — this is a demonstration of judgment, not a production system chasing scale.
2. Map and list are two views of one source of truth; keep selection/state synchronization simple and one-directional to avoid feedback loops.
3. Preserve the app's existing constraints (no backend, bilingual/RTL, desktop-only) as deliberate scope, not gaps to silently "fix."
4. Bilingual support (EN/HE, RTL) is a first-class constraint, not an afterthought — new UI must work in both directions.

## Accessibility & Inclusion

RTL layout support is a confirmed requirement (Hebrew locale). No further accessibility standard (e.g. WCAG level) has been established — treat as undecided beyond RTL support.
