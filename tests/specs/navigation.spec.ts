import { test, expect, DRAFTS_VISIBLE } from "../fixtures/base.fixture";

test.describe("Portfolio - Navigation", () => {
  test("should load the homepage with hero and availability", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_001" });

    // Arrange & Act
    await browserContext.site.goto("/cs");

    // Assert
    await browserContext.site.verifyPageTitle(/Richard Kousal | QA & Test Automation Lead/);
    await expect(browserContext.page.getByTestId("home-hero")).toBeVisible();
    await expect(browserContext.page.getByTestId("availability")).toHaveText(
      "Otevřen spolupráci a sdílení know-how"
    );
    await expect(browserContext.page.getByTestId("home-projects")).toBeVisible();
    await expect(browserContext.page.getByTestId("home-talks")).toContainText("Etnology #6");
    await expect(browserContext.page.getByTestId("home-contact")).toBeVisible();
    await expect(browserContext.page.locator("h1")).toHaveText("AI navrhuje, já rozhoduju.");
    await expect(browserContext.page.getByTestId("status-line")).toContainText("stavím QA Control Center");
    if (new Date().toISOString().slice(0, 10) <= "2026-10-14") {
      await expect(browserContext.page.getByTestId("status-line")).toContainText("Etnology #6, 14. 10.");
    }
    await expect(browserContext.page.getByTestId("series-linkedin")).toHaveAttribute("href", "https://www.linkedin.com/in/richard-kousal");
  });

  test("should navigate through all pages via the header", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_002" });

    // Arrange
    await browserContext.site.goto("/cs");

    // Act & Assert
    const pages = [
      ...(DRAFTS_VISIBLE ? [["articles", "Články"] as const] : []),
      ["projects", "Projekty"] as const,
      ["about", "O mně"] as const,
    ];
    for (const [key, heading] of pages) {
      await browserContext.site.navigateTo(key);
      await expect(browserContext.page.locator("h1")).toHaveText(heading);
      await browserContext.site.expectActiveNav(key);
    }
    await browserContext.site.navigateTo("home");
    await expect(browserContext.page.getByTestId("home-hero")).toBeVisible();
  });

  test("should display and use Back to Top button after scrolling", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_003" });

    // Arrange
    await browserContext.site.goto("/cs/about");
    await browserContext.site.waitForPageLoad();

    // Act
    await browserContext.site.scrollToBottom();
    await browserContext.site.clickBackToTop();

    // Assert
    await expect.poll(() => browserContext.page.evaluate(() => window.scrollY)).toBeLessThan(50);
  });

  test("should move focus to main content via the skip link", { tag: "@a11y" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_004" });

    // Arrange
    await browserContext.site.goto("/cs");
    await browserContext.site.waitForPageLoad();

    // Act
    await browserContext.page.keyboard.press("Tab");
    const skip = browserContext.page.getByTestId("skip-link");
    await expect(skip).toBeFocused();
    await expect(skip).toHaveText("Přeskočit na obsah");
    await browserContext.page.keyboard.press("Enter");

    // Assert
    await expect(browserContext.page).toHaveURL(/#main-content$/);
  });

  test("should redirect root by browser language and show 404 for unknown pages", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_005" });

    // Act
    const czech = await browserContext.page.request.get("/", {
      headers: { "accept-language": "cs-CZ,cs;q=0.9" },
      maxRedirects: 0,
    });
    const other = await browserContext.page.request.get("/", {
      headers: { "accept-language": "fr-FR,fr;q=0.9" },
      maxRedirects: 0,
    });

    // Assert - Czech browsers and unknown languages land on the default (cs)
    expect(czech.headers()["location"]).toMatch(/\/cs$/);
    expect(other.headers()["location"]).toMatch(/\/cs$/);

    // Act
    const response = await browserContext.page.goto("/cs/neexistuje");

    // Assert
    expect(response?.status()).toBe(404);
    await expect(browserContext.page.getByTestId("not-found")).toBeVisible();
  });
});

test.describe("Portfolio - Mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should navigate via the mobile menu", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_006" });

    // Arrange
    await browserContext.site.goto("/cs");
    await expect(browserContext.page.getByTestId("nav-desktop")).toBeHidden();

    // Act
    await browserContext.site.navigateTo("projects");

    // Assert
    await expect(browserContext.page.locator("h1")).toHaveText("Projekty");
    await expect(browserContext.page.getByTestId("mobile-menu-content")).toBeHidden();
  });

  test("should close the mobile menu with Escape", { tag: "@a11y" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_007" });

    // Arrange
    await browserContext.site.goto("/cs");
    await browserContext.site.waitForPageLoad();
    await browserContext.site.openMobileMenu();

    // Act
    await browserContext.page.keyboard.press("Escape");

    // Assert
    await expect(browserContext.page.getByTestId("mobile-menu-content")).toBeHidden();
    await expect(browserContext.page.getByTestId("mobile-menu-toggle")).toHaveAttribute("aria-expanded", "false");
  });
});
