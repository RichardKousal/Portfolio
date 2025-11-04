import { expect, Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected pageUrl: string = '';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.pageUrl, { waitUntil: 'domcontentloaded' });
  }

  public async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  public async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}



