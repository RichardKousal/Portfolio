import { test } from '../fixtures/base.fixture';

test.describe('Portfolio - Language Switching', () => {
  test('should switch to English locale', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_008' });

    // Arrange
    await browserContext.homePage.goto();
    
    // Act - Use Page Object method with mobile menu support
    await browserContext.homePage.switchLanguage('en');
    
    // Assert
    await browserContext.homePage.expectCurrentLocale('en');
  });

  test('should switch to German locale', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_009' });

    // Arrange
    await browserContext.homePage.goto();
    
    // Act - Use Page Object method with mobile menu support
    await browserContext.homePage.switchLanguage('de');
    
    // Assert
    await browserContext.homePage.expectCurrentLocale('de');
  });

  test('should switch to Polish locale', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_010' });

    // Arrange
    await browserContext.homePage.goto();
    
    // Act - Use Page Object method with mobile menu support
    await browserContext.homePage.switchLanguage('pl');
    
    // Assert
    await browserContext.homePage.expectCurrentLocale('pl');
  });

  test('should maintain view state when switching language', { tag: '@regression' }, async ({ browserContext }, testInfo) => {
    testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_011' });

    // Arrange - Start on professional view, switch to personal
    await browserContext.homePage.goto();
    await browserContext.page.goto('/cs?view=personal');
    await browserContext.page.waitForLoadState('networkidle');
    await browserContext.homePage.expectPersonalViewVisible();
    
    // Act - Switch language while on personal view
    await browserContext.homePage.switchLanguage('en');
    
    // Assert - Personal view should be maintained
    await browserContext.homePage.expectCurrentLocale('en');
    // Give extra time for view parameter to be preserved
    await browserContext.page.waitForTimeout(1000);
    await browserContext.homePage.expectPersonalViewVisible();
  });
});



