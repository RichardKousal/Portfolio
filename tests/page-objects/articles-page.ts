import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

export type ArticleFilter = "all" | "qa-ai" | "personal";

class ArticlesPage extends BasePage {
  public override pageUrl = "/cs/articles";

  constructor(page: Page) {
    super(page);
  }

  locators = {
    filter: (f: ArticleFilter) => `[data-testid="filter-${f}"]`,
    card: '[data-testid="article-card"]',
    ownCard: '[data-testid="article-card"][data-type="own"]',
    externalCard: '[data-testid="article-card"][data-type="external"]',
    sourceLabel: '[data-testid="article-source-label"]',
    badge: '[data-testid="article-badge"]',
    detail: '[data-testid="article-detail"]',
    backToArticles: '[data-testid="back-to-articles"]',
  };

  public cards() {
    return this.page.locator(this.locators.card);
  }

  public async applyFilter(f: ArticleFilter): Promise<void> {
    const button = this.page.locator(this.locators.filter(f));
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
  }

  public async expectCardCount(count: number): Promise<void> {
    await expect(this.cards()).toHaveCount(count);
  }

  public async expectAllCardsInCategory(category: Exclude<ArticleFilter, "all">): Promise<void> {
    const categories = await this.cards().evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-category"))
    );
    expect(categories.length).toBeGreaterThan(0);
    expect(new Set(categories)).toEqual(new Set([category]));
  }

  public async openFirstOwnArticle(): Promise<void> {
    await this.page.locator(this.locators.ownCard).first().locator("h3 a").click();
    await this.page.waitForURL(/\/articles\/[a-z0-9-]+$/);
    await expect(this.page.locator(this.locators.detail)).toBeVisible();
  }
}

export const articlesPage = (page: Page) => new ArticlesPage(page);
