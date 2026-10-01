import { expect, Page } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;
  protected pageUrl: string = "";

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = this.pageUrl) {
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
  }

  public async verifyPageTitle(expectedTitle: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  public async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  protected isMobileViewport(): boolean {
    const viewportSize = this.page.viewportSize();
    return viewportSize !== null && viewportSize.width < 768;
  }
}
