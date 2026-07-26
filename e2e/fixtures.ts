import { test as base, expect } from '@playwright/test'

// Ensures every test starts from the deterministic seed data (see src/data/seedIncidents.ts)
// instead of whatever a previous test run left in localStorage.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => localStorage.removeItem('incidents'))
    await page.goto('/')
    await use(page)
  },
})

export { expect }
