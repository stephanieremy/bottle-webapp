import { test, expect } from '@playwright/test';
import { mockBottlesApi } from './mock-bottles-api';

test.describe('Add a bottle form', () => {
  test.beforeEach(async ({ page }) => {
    await mockBottlesApi(page, []);
    await page.goto('/bottles/new');
  });

  test('renders all the fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /ajouter un vin/i })).toBeVisible();
    await expect(page.locator('input[placeholder="Ex. Château Margaux"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Ex. Margaux"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Rouge' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ajouter le vin' })).toBeVisible();
  });

  test('quantity stepper increments and decrements, floored at 1', async ({ page }) => {
    const quantity = page.locator('span').filter({ hasText: /^\d+$/ }).first();
    const decrement = page.getByRole('button', { name: '−' });
    const increment = page.getByRole('button', { name: '+' });

    await expect(quantity).toHaveText('1');
    await increment.click();
    await increment.click();
    await expect(quantity).toHaveText('3');
    await decrement.click();
    await expect(quantity).toHaveText('2');

    await decrement.click();
    await decrement.click();
    await expect(quantity).toHaveText('1');
  });

  test('selecting a wine type highlights the matching pill', async ({ page }) => {
    const pill = page.getByRole('button', { name: 'Rosé' });
    await pill.click();
    await expect(pill).toHaveClass(/bg-wine-pink-bg/);
  });

  test('submitting creates the bottle and returns to the list', async ({ page }) => {
    await page.locator('input[placeholder="Ex. Château Margaux"]').fill('Château Test');
    await page.locator('input[placeholder="Ex. Margaux"]').fill('Test Appellation');
    await page.locator('select').first().selectOption({ index: 1 });
    await page.getByRole('button', { name: 'Rouge' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.locator('input[placeholder="45"]').fill('25');

    await page.getByRole('button', { name: 'Ajouter le vin' }).click();

    await expect(page).toHaveURL(/\/bottles$/);
    await expect(page.getByText('Château Test')).toBeVisible();
    await expect(page.getByText('Test Appellation')).toBeVisible();
  });

  test('the submit button is disabled from creating an incomplete bottle', async ({ page }) => {
    await page.getByRole('button', { name: 'Ajouter le vin' }).click();
    await expect(page).toHaveURL(/\/bottles\/new$/);
  });

  test('back link returns to the wine list', async ({ page }) => {
    await page.getByRole('link', { name: '← Ma cave' }).click();
    await expect(page).toHaveURL(/\/bottles$/);
  });
});
