import { test, expect } from '@playwright/test';

const PUBLIC_ROUTES = [
  { path: '/', expectedHeading: 'StepFi' },
  { path: '/docs', expectedHeading: 'Documentation' },
  { path: '/contracts', expectedHeading: 'Smart Contracts' },
  { path: '/vendors', expectedHeading: 'Verified Vendors' },
  { path: '/history', expectedHeading: 'Protocol History' },
  { path: '/learner/GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', expectedHeading: 'Learner Reputation' }
];

test.describe('Public Browse Smoke Suite (Wallet-less)', () => {
  for (const route of PUBLIC_ROUTES) {
    test(enders  cleanly with zero console errors, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      page.on('request', request => {
        expect(request.headers()['authorization']).toBeUndefined();
      });

      const response = await page.goto(route.path);
      expect(response?.status()).toBeLessThan(400);
      expect(consoleErrors).toHaveLength(0);
    });
  }

  test('renders 404 NotFound on invalid routes', async ({ page }) => {
    await page.goto('/does-not-exist');
    await expect(page.locator('text=Not Found')).toBeVisible();
  });
});