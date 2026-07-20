import { Page } from '@playwright/test';
import { Bottle } from '../src/app/shared/models/bottle.model';

let idCounter = 1;

export async function mockBottlesApi(page: Page, initialBottles: Bottle[] = []) {
  const bottles = [...initialBottles];

  await page.route('**/api/bottle/**', async route => {
    const request = route.request();
    const id = request.url().split('/bottle/')[1];

    if (request.method() === 'GET') {
      const bottle = bottles.find(b => b.id === id);
      return bottle
        ? route.fulfill({ json: bottle })
        : route.fulfill({ status: 404 });
    }

    if (request.method() === 'DELETE') {
      const index = bottles.findIndex(b => b.id === id);
      if (index !== -1) bottles.splice(index, 1);
      return route.fulfill({ status: 204 });
    }

    return route.continue();
  });

  await page.route('**/api/bottle', async route => {
    const request = route.request();

    if (request.method() === 'GET') {
      return route.fulfill({ json: bottles });
    }

    if (request.method() === 'POST') {
      const payload = request.postDataJSON();
      const created: Bottle = { ...payload, id: String(idCounter++) };
      bottles.push(created);
      return route.fulfill({ json: created });
    }

    return route.continue();
  });
}
