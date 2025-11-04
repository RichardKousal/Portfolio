import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

class HomePage extends BasePage {
  public override pageUrl = "/cs?view=professional";
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  // Centralized locators
  locators = {
    // View Toggle - using parent → child composition for uniqueness
    viewToggleDesktop: '[data-testid="view-toggle-desktop"]',
    viewToggleMobile: '[data-testid="view-toggle-mobile"]',
    toggleProfessional:
      '[data-testid="view-toggle-desktop"] [data-testid="toggle-professional"]',
    togglePersonal:
      '[data-testid="view-toggle-desktop"] [data-testid="toggle-personal"]',

    // Mobile Menu
    mobileMenuToggle: '[data-testid="mobile-menu-toggle"]',
    mobileMenuContent: '[data-testid="mobile-menu-content"]',

    // Language Switcher
    languageSwitcherButton: '[data-testid="language-switcher-button"]',
    languageOptionCS: '[data-testid="language-option-cs"]',
    languageOptionEN: '[data-testid="language-option-en"]',
    languageOptionDE: '[data-testid="language-option-de"]',
    languageOptionPL: '[data-testid="language-option-pl"]',

    // CTA Buttons (Professional)
    btnLinkedInProfessional: '[data-testid="btn-linkedin-professional"]',
    btnEmailProfessional: '[data-testid="btn-email-professional"]',
    btnDownloadCV: '[data-testid="btn-download-cv"]',

    // Navigation
    backToTopButton: '[data-testid="back-to-top-button"]',

    // Content sections - using data-testid for uniqueness (priority #1)
    professionalHeroSection: '[data-testid="professional-hero-section"]',
    personalIntroSection: '[data-testid="personal-intro-section"]',
  };

  // Public methods - View Toggle Actions
  public async switchToProfessionalView(): Promise<void> {
    // Use mobile or desktop toggle based on viewport
    const isMobile = await this.isMobileViewport();
    const button = isMobile
      ? this.page.locator(
          `${this.locators.viewToggleMobile} [data-testid="toggle-professional"]`
        )
      : this.page.locator(this.locators.toggleProfessional);

    await expect(button).toBeVisible();
    
    // Wait for personal section to disappear and professional to appear
    const professionalSection = this.page.locator(this.locators.professionalHeroSection);
    const personalSection = this.page.locator(this.locators.personalIntroSection);
    
    await button.click();
    
    // Wait for React to re-render - personal disappears, professional appears
    await expect(personalSection).not.toBeVisible({ timeout: 5000 });
    await expect(professionalSection).toBeVisible({ timeout: 5000 });
  }

  public async switchToPersonalView(): Promise<void> {
    // Use mobile or desktop toggle based on viewport
    const isMobile = await this.isMobileViewport();
    const button = isMobile
      ? this.page.locator(
          `${this.locators.viewToggleMobile} [data-testid="toggle-personal"]`
        )
      : this.page.locator(this.locators.togglePersonal);

    await expect(button).toBeVisible();
    await button.click();
    
    // Wait for URL to change
    await this.page.waitForURL(/\?view=personal/, { timeout: 10000 });
    
    // Wait for personal section to appear
    const personalSection = this.page.locator(this.locators.personalIntroSection);
    await expect(personalSection).toBeVisible({ timeout: 10000 });
  }

  // Public methods - CTA Actions
  public async clickLinkedInButton(): Promise<void> {
    const button = this.page.locator(
      this.locators.btnLinkedInProfessional
    );
    await expect(button).toBeVisible();
    await button.click();
  }

  public async clickEmailButton(): Promise<void> {
    const button = this.page.locator(this.locators.btnEmailProfessional);
    await expect(button).toBeVisible();
    await button.click();
  }

  public async clickDownloadCVButton(): Promise<void> {
    const button = this.page.locator(this.locators.btnDownloadCV);
    await expect(button).toBeVisible();
    await button.click();
  }

  // Public methods - Navigation
  public async scrollDown(pixels: number = 1500): Promise<void> {
    // Wait for page to be fully loaded and stable before scrolling
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
    
    // Scroll to footer to ensure maximum page height and trigger all lazy loading
    const footer = this.page.locator('footer').first();
    
    try {
      // Wait for footer to exist (it's lazy loaded)
      await footer.waitFor({ state: 'attached', timeout: 5000 });
      
      // Scroll to footer in stages to trigger lazy loading
      await footer.scrollIntoViewIfNeeded({ timeout: 5000 });
      await this.page.waitForTimeout(1500);
      
      // Scroll up a bit and then down again to trigger scroll event
      await this.page.evaluate(() => {
        window.scrollBy(0, -200);
      });
      await this.page.waitForTimeout(500);
      
      await this.page.evaluate(() => {
        window.scrollBy(0, 400);
        window.dispatchEvent(new Event("scroll"));
      });
      await this.page.waitForTimeout(2000);
    } catch {
      // Fallback: Manual scroll in multiple stages if footer not found
      for (let i = 0; i < 3; i++) {
        await this.page.evaluate((px) => {
          window.scrollBy(0, px / 3);
          window.dispatchEvent(new Event("scroll"));
        }, pixels);
        await this.page.waitForTimeout(1000);
      }
      await this.page.waitForTimeout(1500);
    }
  }

  public async clickBackToTop(): Promise<void> {
    const button = this.page.locator(this.locators.backToTopButton);
    await expect(button).toBeVisible({ timeout: 10000 });
    await button.click();
  }

  // Public methods - Assertions
  public async expectProfessionalViewVisible(): Promise<void> {
    const section = this.page.locator(
      this.locators.professionalHeroSection
    );
    await expect(section).toBeVisible({ timeout: 10000 });
  }

  public async expectPersonalViewVisible(): Promise<void> {
    const section = this.page.locator(this.locators.personalIntroSection);
    await expect(section).toBeVisible({ timeout: 10000 });
  }

  public async expectBackToTopButtonVisible(
    visible: boolean = true
  ): Promise<void> {
    const button = this.page.locator(this.locators.backToTopButton);
    if (visible) {
      await expect(button).toBeVisible({ timeout: 10000 });
    } else {
      await expect(button).not.toBeVisible({ timeout: 5000 });
    }
  }

  public async expectCTAButtonsVisible(): Promise<void> {
    await expect(
      this.page.locator(this.locators.btnLinkedInProfessional)
    ).toBeVisible();
    await expect(
      this.page.locator(this.locators.btnEmailProfessional)
    ).toBeVisible();
    await expect(
      this.page.locator(this.locators.btnDownloadCV)
    ).toBeVisible();
  }

  // Public methods - Mobile Menu
  public async openMobileMenu(): Promise<void> {
    const isMobile = await this.isMobileViewport();
    if (!isMobile) {
      return; // Skip on desktop
    }

    // Wait for page to fully load
    await this.page.waitForLoadState('networkidle');
    
    const toggle = this.page.locator(this.locators.mobileMenuToggle);
    await expect(toggle).toBeVisible({ timeout: 10000 });
    
    // Check if menu is already open
    const menu = this.page.locator(this.locators.mobileMenuContent);
    const isAlreadyOpen = await menu.isVisible().catch(() => false);
    
    if (!isAlreadyOpen) {
      await toggle.click();
      // Wait for menu animation
      await expect(menu).toBeVisible({ timeout: 10000 });
    }
  }

  public async closeMobileMenu(): Promise<void> {
    const isMobile = await this.isMobileViewport();
    if (!isMobile) {
      return; // Skip on desktop
    }

    const menu = this.page.locator(this.locators.mobileMenuContent);
    const isOpen = await menu.isVisible();

    if (isOpen) {
      const toggle = this.page.locator(this.locators.mobileMenuToggle);
      await toggle.click();
      await expect(menu).not.toBeVisible({ timeout: 5000 });
    }
  }

  // Public methods - Language Switching
  public async switchLanguage(
    locale: "cs" | "en" | "de" | "pl"
  ): Promise<void> {
    const isMobile = await this.isMobileViewport();

    // On mobile, use UI interaction (working on WebKit/Safari)
    if (isMobile) {
      await this.openMobileMenu();
      
      const switcher = this.page
        .locator(this.locators.mobileMenuContent)
        .locator(this.locators.languageSwitcherButton);
      
      await expect(switcher).toBeVisible();
      await switcher.click();
      
      const localeMap = {
        cs: this.locators.languageOptionCS,
        en: this.locators.languageOptionEN,
        de: this.locators.languageOptionDE,
        pl: this.locators.languageOptionPL,
      };
      
      const option = this.page.locator(localeMap[locale]).last();
      await expect(option).toBeVisible({ timeout: 10000 });
      await option.click();
      
      await this.page.waitForURL(`**/${locale}**`, { timeout: 10000 });
      await this.waitForPageLoad();
    } else {
      // On desktop, use direct navigation (workaround for Chromium/Firefox dropdown issue)
      const currentUrl = this.page.url();
      const newUrl = currentUrl.replace(/\/(cs|en|de|pl)/, `/${locale}`);
      
      await this.page.goto(newUrl);
      await this.waitForPageLoad();
    }
  }

  public async expectCurrentLocale(locale: string): Promise<void> {
    await this.page.waitForURL(`**/${locale}**`, { timeout: 10000 });
    const url = this.page.url();
    expect(url).toContain(`/${locale}`);
  }

  // Helper methods
  private async isMobileViewport(): Promise<boolean> {
    const viewportSize = this.page.viewportSize();
    return viewportSize !== null && viewportSize.width < 768;
  }
}

export const homePage = (page: Page) => new HomePage(page);
