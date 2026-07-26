# Mobile-responsive header & touch targets

## Problem

The app already stacks list/map/details vertically below 900px (`App.vue`'s existing `@media (max-width: 900px)` block), but at phone widths (≤640px) the header (`AppHeader.vue`) doesn't wrap: masthead + language switch + "Reset Sample Data" + "New Incident" fight for one row, causing horizontal page overflow and a clipped "New Incident" button. Verified visually at 375px with Playwright.

## Scope

CSS-only. No component restructuring, no new Vue logic, no new breakpoint system beyond one additional media query.

1. **AppHeader.vue**: add `@media (max-width: 640px)` — stack masthead above `.header-actions`, let `.header-actions` wrap (`flex-wrap: wrap`), reduce gap, shrink `h1` font-size slightly so it doesn't dominate a phone-width row.
2. **Touch targets**: audit tap-target sizing at 375px for `AppButton`, `AppSelect` (filter dropdowns), `IncidentListItem`, and the language switch — bump any below ~40px effective height/width via padding, not layout changes.
3. **Verification**: re-screenshot at 375px and 320px (iPhone SE) confirming no horizontal scroll/overflow anywhere in the app (list, map, filters, details panel, form panel).

## Out of scope

Tabbed/sheet mobile navigation (user already chose stacked-scroll over this), marker clustering, geocoding, draggable markers, component-level tests — tracked as separate follow-ups per the README's "Known limitations" section.

## Testing

Manual Playwright viewport checks (375px, 320px) for visual regressions; no new automated test coverage planned for this CSS-only change (existing Playwright e2e suite already exercises these components' functional behavior at desktop width).
