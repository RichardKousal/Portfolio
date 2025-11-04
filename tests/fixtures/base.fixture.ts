import { test as base } from '@playwright/test';
import { homePage } from '../page-objects/home-page';
import type { Page } from '@playwright/test';

type PageObjects = {
  homePage: ReturnType<typeof homePage>;
};

export type BrowserContext = {
  page: Page;
} & PageObjects;

export const test = base.extend<{ browserContext: BrowserContext }>({
  browserContext: async ({ page }, use) => {
    const context: BrowserContext = {
      page,
      homePage: homePage(page),
    };

    await use(context);
  },
});

export { expect } from '@playwright/test';



