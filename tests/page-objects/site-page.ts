import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

export type NavKey = "home" | "articles" | "projects" | "about";
export type Locale = "cs" | "en";

const NAV_PATHS: Record<NavKey, string> = {
  home: "",
  articles: "/articles",
  projects: "/projects",
  about: "/about",
};

/** Shared site shell: header navigation, mobile menu, language switch, footer. */
class SitePage extends BasePage {
  public override pageUrl = "/cs";

  constructor(page: Page) {
    super(page);
  }

  locators = {
    desktopNav: '[data-testid="nav-desktop"]',
    navLink: (key: NavKey) => `[data-testid="nav-${key}"]`,
    mobileNavLink: (key: NavKey) => `[data-testid="mobile-nav-${key}"]`,
    mobileMenuToggle: '[data-testid="mobile-menu-toggle"]',
    mobileMenuContent: '[data-testid="mobile-menu-content"]',
    langLink: (prefix: "desktop" | "mobile", locale: Locale) =>
      `[data-testid="${prefix}-lang-${locale}"]`,
    skipLink: '[data-testid="skip-link"]',
    main: "#main-content",
    backToTop: '[data-testid="back-to-top-button"]',
    footer: "footer",
  };

  public async navigateTo(key: NavKey, locale: Locale = "cs"): Promise<void> {
    if (this.isMobileViewport()) {
      await this.openMobileMenu();
      await this.page.locator(this.locators.mobileNavLink(key)).click();
    } else {
      await this.page.locator(this.locators.navLink(key)).click();
    }
    const expectedPath = `/${locale}${NAV_PATHS[key]}`;
    await this.page.waitForURL((url) => url.pathname.replace(/\/$/, "") === expectedPath);
  }

  public async expectActiveNav(key: NavKey): Promise<void> {
    const selector = this.isMobileViewport()
      ? this.locators.mobileNavLink(key)
      : this.locators.navLink(key);
    if (this.isMobileViewport()) await this.openMobileMenu();
    await expect(this.page.locator(selector)).toHaveAttribute("aria-current", "page");
    if (this.isMobileViewport()) await this.closeMobileMenu();
  }

  public async openMobileMenu(): Promise<void> {
    const menu = this.page.locator(this.locators.mobileMenuContent);
    if (await menu.isVisible()) return;
    const toggle = this.page.locator(this.locators.mobileMenuToggle);
    await expect(toggle).toBeVisible();
    // Retry until the client component is hydrated and reacts to the click
    await expect(async () => {
      if ((await toggle.getAttribute("aria-expanded")) !== "true") await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true", { timeout: 1000 });
    }).toPass({ timeout: 15000 });
    await expect(menu).toBeVisible();
  }

  public async closeMobileMenu(): Promise<void> {
    const menu = this.page.locator(this.locators.mobileMenuContent);
    if (!(await menu.isVisible())) return;
    await this.page.locator(this.locators.mobileMenuToggle).click();
    await expect(menu).toBeHidden();
  }

  public async switchLanguage(locale: Locale): Promise<void> {
    const prefix = this.isMobileViewport() ? "mobile" : "desktop";
    if (prefix === "mobile") await this.openMobileMenu();
    await this.page.locator(this.locators.langLink(prefix, locale)).click();
    await this.page.waitForURL(
      (url) => url.pathname === `/${locale}` || url.pathname.startsWith(`/${locale}/`)
    );
  }

  public async expectHtmlLang(locale: Locale): Promise<void> {
    await expect(this.page.locator("html")).toHaveAttribute("lang", locale);
  }

  public async scrollToBottom(): Promise<void> {
    await this.page.locator(this.locators.footer).scrollIntoViewIfNeeded();
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  public async clickBackToTop(): Promise<void> {
    const button = this.page.locator(this.locators.backToTop);
    await expect(button).toBeVisible();
    await button.click();
  }

  public async expectNoHorizontalScroll(): Promise<void> {
    const overflow = await this.page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, "page must not scroll horizontally").toBeLessThanOrEqual(0);
  }

  public async mainText(): Promise<string> {
    return (await this.page.locator("body").innerText()).toLowerCase();
  }
}

export const sitePage = (page: Page) => new SitePage(page);
