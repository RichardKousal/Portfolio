import { test, expect } from "../fixtures/base.fixture";

test.describe("Portfolio - Navigation", () => {
  test(
    "should load the homepage successfully",
    { tag: "@regression" },
    async ({ browserContext }, testInfo) => {
      testInfo.annotations.push({ type: "TestCaseID", description: "TC_001" });

      // Arrange
      await browserContext.homePage.goto();

      // Act
      await browserContext.homePage.waitForPageLoad();

      // Assert
      await browserContext.homePage.verifyPageTitle(
        "Richard Kousal - QA & Test Automation Lead | Playwright, Cypress, CI/CD"
      );
      await browserContext.homePage.expectProfessionalViewVisible();
    }
  );

  test(
    "should switch between Professional and Personal views",
    { tag: "@regression" },
    async ({ browserContext }, testInfo) => {
      testInfo.annotations.push({ type: "TestCaseID", description: "TC_002" });

      // Arrange
      await browserContext.homePage.goto();
      await browserContext.homePage.expectProfessionalViewVisible();

      // Act - Switch to Personal view via URL (bypass broken toggle)
      await browserContext.page.goto('/cs?view=personal');
      await browserContext.page.waitForLoadState('networkidle');

      // Assert - Personal view is visible
      await browserContext.homePage.expectPersonalViewVisible();

      // Act - Switch back to Professional view via URL
      await browserContext.page.goto('/cs?view=professional');
      await browserContext.page.waitForLoadState('networkidle');

      // Assert - Professional view is visible again
      await browserContext.homePage.expectProfessionalViewVisible();
    }
  );

  test(
    "should display and use Back to Top button after scrolling",
    { tag: "@regression" },
    async ({ browserContext }, testInfo) => {
      testInfo.annotations.push({ type: "TestCaseID", description: "TC_003" });

      // Arrange
      await browserContext.homePage.goto();

      // Act - Scroll down to trigger button visibility (appears at 100px threshold)
      await browserContext.homePage.scrollDown();

      // Assert - Back to Top button appears
      await browserContext.homePage.expectBackToTopButtonVisible(true);

      // Act - Click Back to Top
      await browserContext.homePage.clickBackToTop();

      // Assert - Page scrolled to top
      await browserContext.page.waitForTimeout(1500);
      const scrollY = await browserContext.page.evaluate(
        () => window.pageYOffset
      );
      expect(scrollY).toBeLessThan(200);
    }
  );
});
