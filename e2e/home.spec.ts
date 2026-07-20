import { test, expect } from '@playwright/test';
import { mockBottlesApi } from './mock-bottles-api';
import { Bottle } from '../src/app/shared/models/bottle.model';

const seedBottle: Bottle = {
  id: '1',
  name: 'Château Margaux',
  appellation: 'Margaux',
  vintage: 2015,
  type: 'RED',
  quantity: 3,
  price: 450,
};

test.describe('Home screen (wine list)', () => {
  test.beforeEach(async ({ page }) => {
    await mockBottlesApi(page, [seedBottle]);
    await page.goto('/bottles');
  });

  test('renders the header, hero and stats', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /ma collection/i })).toBeVisible();
    await expect(page.getByText('Bottle me').first()).toBeVisible();

    await expect(page.getByText('Bouteilles')).toBeVisible();
    await expect(page.getByText('Appellations')).toBeVisible();
    await expect(page.getByText('Millésimes')).toBeVisible();
  });

  test('lists the seeded bottle as a card', async ({ page }) => {
    const card = page.getByText('Château Margaux');
    await expect(card).toBeVisible();
    await expect(page.getByText('Margaux', { exact: true })).toBeVisible();
    await expect(page.getByText('2015')).toBeVisible();
  });

  test('always shows the "add a wine" card', async ({ page }) => {
    await expect(page.getByText('Ajouter un vin')).toBeVisible();
  });

  test('filtering by a non-matching type hides the card', async ({ page }) => {
    await page.getByRole('button', { name: 'Blanc' }).click();
    await expect(page.getByText('Château Margaux')).not.toBeVisible();
    await expect(page.getByText('Ajouter un vin')).toBeVisible();
  });

  test('filtering by the matching type keeps the card visible', async ({ page }) => {
    await page.getByRole('button', { name: 'Rouge' }).click();
    await expect(page.getByText('Château Margaux')).toBeVisible();
  });

  test('search filters the list by name', async ({ page }) => {
    const search = page.getByPlaceholder('Rechercher un vin…');
    await search.fill('margaux');
    await expect(page.getByText('Château Margaux')).toBeVisible();

    await search.fill('does-not-exist');
    await expect(page.getByText('Château Margaux')).not.toBeVisible();
  });

  test('clicking a bottle card navigates to its detail page', async ({ page }) => {
    await page.getByText('Château Margaux').click();
    await expect(page).toHaveURL(/\/bottles\/1$/);
  });
});
