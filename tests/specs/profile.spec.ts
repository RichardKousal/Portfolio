import { test, expect } from "../fixtures/base.fixture";

// Profile data must match the LinkedIn export (source of truth).
test.describe("Portfolio - Profile data (LinkedIn 1:1)", () => {
  test("should show the LinkedIn headline and all seven positions", { tag: "@content" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_050" });

    // Arrange & Act
    await browserContext.site.goto("/en/about");

    // Assert
    await expect(browserContext.page.getByTestId("about-headline")).toHaveText(
      "QA Lead | AI-Driven QA Strategy | Test Automation & Performance Testing | Playwright | k6"
    );
    const positions = browserContext.page.getByTestId("experience-item");
    await expect(positions).toHaveCount(7);
    await expect(positions.first()).toContainText("QA & Test Automation Lead");
    await expect(positions.first()).toContainText("2025-04");
    await expect(positions.last()).toContainText("Managing Director");
    await expect(positions.last()).toContainText("ForHandicap s.r.o.");
    await expect(positions.last()).toContainText("2015-05");
    await expect(positions.last()).toContainText("2017-12");
  });

  test("should list languages exactly as on LinkedIn", { tag: "@content" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_051" });

    // Arrange & Act
    await browserContext.site.goto("/cs/about");

    // Assert
    const languages = browserContext.page.getByTestId("language-item");
    await expect(languages).toHaveCount(3);
    await expect(languages.nth(0)).toContainText("Čeština");
    await expect(languages.nth(0)).toContainText("rodilá úroveň");
    await expect(languages.nth(1)).toContainText("Polština");
    await expect(languages.nth(1)).toContainText("rodilá úroveň");
    await expect(languages.nth(2)).toContainText("Angličtina");
    await expect(languages.nth(2)).toContainText("omezená pracovní znalost");
    await expect(browserContext.page.getByTestId("about-languages")).not.toContainText("pokročil");

    // Act
    await browserContext.site.goto("/en/about");

    // Assert
    await expect(browserContext.page.getByTestId("language-item").nth(2)).toContainText(
      "Limited working proficiency"
    );
  });

  test("should list all seven certifications with issuer and date", { tag: "@content" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_052" });

    // Arrange & Act
    await browserContext.site.goto("/cs/about");

    // Assert
    const certs = browserContext.page.getByTestId("certification-item");
    await expect(certs).toHaveCount(7);
    const mentoring = certs.filter({ hasText: "Mentoring for Professionals" });
    await expect(mentoring).toContainText("Femme Palette");
    await expect(mentoring).toContainText("2023-05");
    await expect(mentoring.locator("a")).toHaveAttribute("href", /femmepalette\.com/);
    await expect(certs.filter({ hasText: "Cypress.io bootcamp" })).toContainText("2021-11");
    await expect(browserContext.page.getByTestId("about-education")).toContainText("Lomnice nad Popelkou");
    await expect(browserContext.page.getByTestId("about-education")).toContainText("2008 → 2012");
  });
});

test.describe("Portfolio - Theme", () => {
  test("should stay light even when the OS prefers dark", { tag: "@a11y" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_054" });

    // Arrange
    await browserContext.page.emulateMedia({ colorScheme: "dark" });

    // Act
    await browserContext.site.goto("/cs");

    // Assert
    await expect(browserContext.page.getByTestId("theme-toggle")).toHaveCount(0);
    const bg = await browserContext.page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(250, 250, 248)");
  });
});
