import { test, expect, DRAFTS_VISIBLE } from "../fixtures/base.fixture";

// Articles exist only while drafts are visible (next dev); production hides the section.
const PAGES = ["/cs", "/cs/projects", "/cs/about", "/en", "/en/projects", "/en/about"].concat(
  DRAFTS_VISIBLE ? ["/cs/articles", "/en/articles"] : []
);

test.describe("Portfolio - Projects & About", () => {
  test("should list all six projects", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_030" });

    // Arrange & Act
    await browserContext.site.goto("/cs/projects");

    // Assert
    const cards = browserContext.page.getByTestId("project-card");
    await expect(cards).toHaveCount(6);
    for (const name of [
      "QA Control Center",
      "QA Brain",
      "k6 performance framework",
      "QA Manual Copilot",
      "MTP generátor",
      "Apartmány Iwona + AI",
    ]) {
      await expect(browserContext.page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
  });

  test("should link featured projects from the homepage to /projects", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_031" });

    // Arrange
    await browserContext.site.goto("/cs");
    const cards = browserContext.page.getByTestId("home-projects").getByTestId("project-card");
    await expect(cards).toHaveCount(3);

    // Act
    await cards.first().locator("h3 a").click();

    // Assert
    await expect(browserContext.page).toHaveURL(/\/cs\/projects#qa-control-center$/);
  });

  test("should download the CV as PDF from the about page", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_032" });
    test.setTimeout(90_000);

    // Arrange
    await browserContext.site.goto("/cs/about");
    const cvButton = browserContext.page.getByTestId("btn-download-cv");

    // Assert
    await expect(cvButton).toHaveAttribute("href", "/api/generate-cv?locale=cs");
    const response = await browserContext.page.request.get("/api/generate-cv?locale=en");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/pdf");
    expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
  });

  test("should expose LinkedIn and e-mail contacts on the about page", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_033" });

    // Arrange & Act
    await browserContext.site.goto("/cs/about");

    // Assert
    await expect(browserContext.page.getByTestId("btn-linkedin")).toHaveAttribute("href", /linkedin\.com\/in\/richard-kousal/);
    await expect(browserContext.page.getByTestId("btn-email")).toHaveAttribute("href", "mailto:kousal.richard@gmail.com");
    await expect(browserContext.page.getByTestId("about-experience")).toBeVisible();
    await expect(browserContext.page.getByTestId("about-skills")).toBeVisible();
    await expect(browserContext.page.getByTestId("about-personal")).toBeVisible();
  });
});

test.describe("Portfolio - Content & SEO", () => {
  test("should never present job-seeking wording", { tag: "@content" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_040" });

    for (const path of PAGES) {
      // Act
      await browserContext.site.goto(path);
      const text = await browserContext.site.mainText();

      // Assert
      expect(text, path).not.toMatch(/otevřen příležitostem|open to (new )?opportunities|open to work|hledám (novou )?práci|looking for a (new )?job/);
    }
  });

  test("should provide canonical and cs/en hreflang links", { tag: "@seo" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_041" });

    // Arrange & Act
    await browserContext.site.goto("/en/projects");

    // Assert
    // Next.js may stream metadata into <body> for non-bot user agents, so don't scope to <head>
    const doc = browserContext.page;
    await expect(doc.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://richardkousal.com/en/projects");
    await expect(doc.locator('link[rel="alternate"][hreflang="cs"]')).toHaveAttribute("href", "https://richardkousal.com/cs/projects");
    await expect(doc.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://richardkousal.com/en/projects");
    await expect(doc.locator('link[rel="alternate"][hreflang="de"]')).toHaveCount(0);
  });
});

test.describe("Portfolio - Responsive (375 px)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should not scroll horizontally on any page", { tag: "@responsive" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_042" });

    for (const path of PAGES) {
      // Act
      await browserContext.site.goto(path);
      await browserContext.site.waitForPageLoad();

      // Assert
      await browserContext.site.expectNoHorizontalScroll();
    }
  });
});
