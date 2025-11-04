import { test, expect } from '../fixtures/base.fixture';

test.describe('Portfolio - Professional View', () => {
  test.beforeEach(async ({ browserContext }) => {
    await browserContext.homePage.goto();
    await browserContext.homePage.switchToProfessionalView();
  });

  test('should display all CTA buttons in Professional view', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_004' });

    // Arrange
    // (Already in Professional view via beforeEach)

    // Act
    // (No action needed - just checking visibility)

    // Assert
    await browserContext.homePage.expectCTAButtonsVisible();
  });

  test('should open LinkedIn profile when LinkedIn button is clicked', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_005' });

    // Arrange
    const linkedInButton = browserContext.page.locator('[data-testid="btn-linkedin-professional"]');
    
    // Act
    const [newPage] = await Promise.all([
      browserContext.page.context().waitForEvent('page'),
      linkedInButton.click()
    ]);

    // Assert
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('linkedin.com');
    await newPage.close();
  });

  test('should have correct mailto link for Email button', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_006' });

    // Arrange
    const emailButton = browserContext.page.locator('[data-testid="btn-email-professional"]');
    
    // Act
    const href = await emailButton.getAttribute('href');

    // Assert
    expect(href).toBe('mailto:richard.kousal@gmail.com');
  });

  test('should initiate CV download when Download CV button is clicked', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_007' });

    // Arrange
    const downloadButton = browserContext.page.locator('[data-testid="btn-download-cv"]');
    
    // Act
    const href = await downloadButton.getAttribute('href');

    // Assert
    expect(href).toContain('/api/generate-cv');
    expect(href).toContain('locale=');
  });
});



