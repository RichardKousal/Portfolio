import { test, expect } from "../fixtures/base.fixture";

test.describe("Portfolio - Language Switching", () => {
  test("should switch to English and keep the current page", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_008" });

    // Arrange
    await browserContext.site.goto("/cs/projects");
    await browserContext.site.waitForPageLoad();

    // Act
    await browserContext.site.switchLanguage("en");

    // Assert
    await expect(browserContext.page).toHaveURL(/\/en\/projects$/);
    await browserContext.site.expectHtmlLang("en");
    await expect(browserContext.page.locator("h1")).toHaveText("Projects");
  });

  test("should switch back to Czech", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_009" });

    // Arrange
    await browserContext.site.goto("/en/about");
    await browserContext.site.waitForPageLoad();

    // Act
    await browserContext.site.switchLanguage("cs");

    // Assert
    await expect(browserContext.page).toHaveURL(/\/cs\/about$/);
    await browserContext.site.expectHtmlLang("cs");
    await expect(browserContext.page.locator("h1")).toHaveText("O mně");
  });

  test("should offer only Czech and English", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_010" });

    // Arrange
    await browserContext.site.goto("/cs");

    // Assert
    const links = browserContext.page.locator('[data-testid^="desktop-lang-"]');
    await expect(links).toHaveText(["cs", "en"], { ignoreCase: true });
  });

  test("should redirect removed German and Polish URLs to English", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_011" });

    // Act & Assert
    await browserContext.page.goto("/de");
    await expect(browserContext.page).toHaveURL(/\/en\/?$/);
    await browserContext.page.goto("/pl/projects");
    await expect(browserContext.page).toHaveURL(/\/en\/projects$/);
  });
});
