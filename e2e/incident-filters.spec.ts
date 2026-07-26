import { test, expect } from './fixtures'

test('shows all seed incidents by default', async ({ page }) => {
  await expect(page.getByTestId('incident-list').getByTestId(/incident-item-/)).toHaveCount(4)
})

test('filters incidents by status', async ({ page }) => {
  const list = page.getByTestId('incident-list')

  await page.getByTestId('status-filter').selectOption('OPEN')

  await expect(list).toContainText('Power outage near city center')
  await expect(list).toContainText('Unsafe cable reported by resident')
  await expect(list).not.toContainText('Blocked road following construction work')
  await expect(list).not.toContainText('Damaged electrical cabinet')
})

test('filters incidents by type', async ({ page }) => {
  const list = page.getByTestId('incident-list')

  await page.getByTestId('type-filter').selectOption('INFRASTRUCTURE_DAMAGE')

  await expect(list.getByTestId(/incident-item-/)).toHaveCount(1)
  await expect(list).toContainText('Damaged electrical cabinet')
})

test('combines status and type filters', async ({ page }) => {
  const list = page.getByTestId('incident-list')

  await page.getByTestId('status-filter').selectOption('OPEN')
  await page.getByTestId('type-filter').selectOption('ROAD_BLOCKAGE')

  await expect(list).toContainText('No incidents match the current filters.')
})

test('resetting filters back to "All" restores the full list', async ({ page }) => {
  const list = page.getByTestId('incident-list')

  await page.getByTestId('status-filter').selectOption('RESOLVED')
  await expect(list.getByTestId(/incident-item-/)).toHaveCount(1)

  await page.getByTestId('status-filter').selectOption('ALL')
  await expect(list.getByTestId(/incident-item-/)).toHaveCount(4)
})
