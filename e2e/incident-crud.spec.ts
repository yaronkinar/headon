import { test, expect } from './fixtures'

test('creates a new incident by clicking the map and filling the form', async ({ page }) => {
  await page.getByRole('button', { name: 'New Incident' }).click()

  await page.getByLabel('Title', { exact: true }).fill('Fallen tree on Main St')
  await page.getByLabel('Type', { exact: true }).selectOption('ROAD_BLOCKAGE')
  await page.getByLabel('Status', { exact: true }).selectOption('OPEN')
  await page.getByTestId('map-view').click({ position: { x: 200, y: 200 } })

  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByTestId('incident-list')).toContainText('Fallen tree on Main St')
  await expect(page.getByTestId('incident-details')).toContainText('Fallen tree on Main St')
})

test('does not allow saving without a location', async ({ page }) => {
  await page.getByRole('button', { name: 'New Incident' }).click()
  await page.getByLabel('Title', { exact: true }).fill('Incident with no location')

  await expect(page.getByRole('button', { name: 'Save' })).toBeDisabled()
})

test('edits an existing incident', async ({ page }) => {
  await page.getByTestId('incident-list').getByText('Power outage near city center').click()
  await page.getByRole('button', { name: 'Edit' }).click()

  await page.getByLabel('Title', { exact: true }).fill('Power outage near downtown')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByTestId('incident-details')).toContainText('Power outage near downtown')
  await expect(page.getByTestId('incident-list')).toContainText('Power outage near downtown')
  await expect(page.getByTestId('incident-list')).not.toContainText('Power outage near city center')
})

test('deletes an incident after confirming', async ({ page }) => {
  await page
    .getByTestId('incident-list')
    .getByText('Unsafe cable reported by resident')
    .click()
  await page.getByRole('button', { name: 'Delete' }).click()

  const dialog = page.getByRole('alertdialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Delete' }).click()

  await expect(dialog).not.toBeVisible()
  await expect(page.getByTestId('incident-list')).not.toContainText(
    'Unsafe cable reported by resident',
  )
})

test('cancels a delete confirmation without removing the incident', async ({ page }) => {
  await page
    .getByTestId('incident-list')
    .getByText('Unsafe cable reported by resident')
    .click()
  await page.getByRole('button', { name: 'Delete' }).click()

  const dialog = page.getByRole('alertdialog')
  await dialog.getByRole('button', { name: 'Cancel' }).click()

  await expect(dialog).not.toBeVisible()
  await expect(page.getByTestId('incident-list')).toContainText('Unsafe cable reported by resident')
})
