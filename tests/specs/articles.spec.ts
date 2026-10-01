import { test, expect, DRAFTS_VISIBLE } from "../fixtures/base.fixture";

// Seed articles are drafts: they are visible only when running against `next dev`.
test.describe("Portfolio - Articles", () => {
  test.skip(!DRAFTS_VISIBLE, "Seed articles are drafts (visible only in next dev)");

  test("should filter articles by category", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_020" });

    // Arrange
    await browserContext.articles.goto();
    await browserContext.articles.waitForPageLoad();
    const total = await browserContext.articles.cards().count();
    expect(total).toBeGreaterThanOrEqual(3);

    // Act & Assert
    await browserContext.articles.applyFilter("qa-ai");
    await browserContext.articles.expectAllCardsInCategory("qa-ai");
    await expect(browserContext.page).toHaveURL(/category=qa-ai/);

    await browserContext.articles.applyFilter("personal");
    await browserContext.articles.expectAllCardsInCategory("personal");

    await browserContext.articles.applyFilter("all");
    await browserContext.articles.expectCardCount(total);
  });

  test("should link Etnetera articles out with a source label", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_021" });

    // Arrange
    await browserContext.articles.goto();
    const external = browserContext.page.locator(browserContext.articles.locators.externalCard);

    // Assert
    await expect(external.first()).toBeVisible();
    await expect(external.first().locator(browserContext.articles.locators.sourceLabel)).toContainText(
      "Vyšlo na blogu Etnetery"
    );
    // No internal detail page for Etnetera articles
    const internalLinks = await external.locator('a[href*="/articles/"]').count();
    expect(internalLinks).toBe(0);
  });

  test("should open an own article detail with BlogPosting JSON-LD", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_022" });

    // Arrange
    await browserContext.articles.goto();

    // Act
    await browserContext.articles.openFirstOwnArticle();

    // Assert
    await expect(browserContext.page.locator("h1")).toBeVisible();
    const jsonLd = await browserContext.page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(jsonLd.some((s) => s.includes('"BlogPosting"'))).toBe(true);
    await expect(browserContext.page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/cs\/articles\/[a-z0-9-]+$/
    );

    // Act
    await browserContext.page.locator(browserContext.articles.locators.backToArticles).click();

    // Assert
    await expect(browserContext.page).toHaveURL(/\/cs\/articles$/);
  });

  test("should mark untranslated articles as Czech on the English site", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_023" });

    // Arrange & Act
    await browserContext.articles.goto("/en/articles");

    // Assert
    await expect(browserContext.page.locator("h1")).toHaveText("Articles");
    await expect(browserContext.page.locator(browserContext.articles.locators.badge).filter({ hasText: "in Czech" }).first()).toBeVisible();
    await expect(browserContext.page.locator(browserContext.articles.locators.sourceLabel).first()).toContainText(
      "Published on the Etnetera blog"
    );
  });

  test("should show at most three latest articles on the homepage", { tag: "@regression" }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_024" });

    // Arrange & Act
    await browserContext.site.goto("/cs");
    const section = browserContext.page.getByTestId("home-latest-articles");

    // Assert
    await expect(section).toBeVisible();
    const count = await section.getByTestId("article-card").count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(3);
  });
});

test.describe("Portfolio - Feeds", () => {
  test("should serve RSS feed and sitemap with cs/en only", { tag: "@regression" }, async ({ request }, testInfo) => {
    testInfo.annotations.push({ type: "TestCaseID", description: "TC_025" });

    // Act
    const feed = await request.get("/feed.xml");
    const sitemap = await request.get("/sitemap.xml");

    // Assert
    expect(feed.ok()).toBe(true);
    expect(feed.headers()["content-type"]).toContain("application/rss+xml");
    expect(await feed.text()).toContain("<rss");

    expect(sitemap.ok()).toBe(true);
    const xml = await sitemap.text();
    for (const path of ["/cs/articles", "/en/projects", "/cs/about"]) {
      expect(xml).toContain(`https://richardkousal.com${path}`);
    }
    expect(xml).not.toMatch(/richardkousal\.com\/(de|pl)\b/);
  });
});
