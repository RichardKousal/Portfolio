import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";
import { sitePage } from "../page-objects/site-page";
import { articlesPage } from "../page-objects/articles-page";

type PageObjects = {
  site: ReturnType<typeof sitePage>;
  articles: ReturnType<typeof articlesPage>;
};

export type BrowserContext = {
  page: Page;
} & PageObjects;

export const test = base.extend<{ browserContext: BrowserContext }>({
  browserContext: async ({ page }, use) => {
    await use({
      page,
      site: sitePage(page),
      articles: articlesPage(page),
    });
  },
});

export { expect } from "@playwright/test";

/** Draft articles are rendered only by `next dev` (the default webServer). */
export const DRAFTS_VISIBLE = !process.env.BASE_URL;
