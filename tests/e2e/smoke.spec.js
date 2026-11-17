/* The one browser check: the site loads without errors, no page overflows its paper, a page
   turns, a tab and the URL hash land on the right page. */
import { test, expect } from '@playwright/test'

test('the book loads, fits, turns and navigates', async ({ page }) => {
  test.setTimeout(90_000) // CI machines render without a GPU
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  const count = page.locator('.nav__count')
  const settled = () => expect(page.locator('.book')).not.toHaveAttribute('data-turn', /.*/, { timeout: 20_000 })

  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() => [...document.querySelectorAll('.photo')].every((photo) => photo.style.getPropertyValue('--print-ratio')))

  // Every page is mounted, so all of them can be measured without turning.
  const overflowing = await page.evaluate(() => [...document.querySelectorAll('.page')]
    .filter((p) => p.scrollHeight > p.clientHeight + 1 || p.scrollWidth > p.clientWidth + 1)
    .map((p) => p.querySelector('.folio')?.textContent ?? p.className))
  expect(overflowing, 'pages that overflow').toEqual([])

  await page.getByRole('button', { name: 'Next page', exact: true }).click()
  await expect(page.locator('.book__sheet[data-turning]')).toHaveCount(1) // the sheet swings
  await settled()
  await expect(count).toHaveText(/^1 \//)

  // force: click the tab's centre without Playwright's frame-by-frame stability wait, which WebKit on CI
  // never satisfies for an element inside the 3D book. Anything covering the tab would take the click
  // and the chapter check below would fail.
  await page.locator('.book__tab:not([inert])', { hasText: 'Projects' }).click({ force: true })
  await settled()
  await expect(page.locator('.nav__strip button[aria-current]')).toHaveAccessibleName(/^Projects/)

  await page.evaluate(() => { location.hash = '9' })
  await expect(count).toHaveText(/^9 \//)

  expect(errors).toEqual([])
})
