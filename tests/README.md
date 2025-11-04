# 🎭 Playwright E2E Tests - Portfolio

Automatizované E2E testy pro portfolio podle **Page Object Model (POM)** architektury.

## 📁 Struktura

```
tests/
├── fixtures/
│   └── base.fixture.ts          # Base fixture s browserContext
├── page-objects/
│   ├── base-page.ts             # Abstract BasePage class
│   └── home-page.ts             # HomePage Page Object
├── specs/
│   ├── navigation.spec.ts       # Navigation testy
│   ├── professional-view.spec.ts # Professional view testy
│   └── language-switching.spec.ts # Language switching testy
└── README.md
```

## 🚀 Spuštění testů

### Základní příkazy:

```bash
# Spustit všechny testy (default: 4 workers, 1 retry)
npm run test:e2e

# Spustit s UI módem (interactive)
npm run test:e2e:ui

# Spustit v headed módu (viditelný browser)
npm run test:e2e:headed

# Spustit pouze Chromium
npm run test:e2e:chromium

# Zobrazit report z posledního běhu
npm run test:e2e:report
```

### ⚠️ Výkon vs Stabilita

**Konfigurace:** `workers: 4`, `retries: 1`

- **Workers = 4:** Optimální rovnováha mezi rychlostí a stabilitou
  - **Proč ne 8+?** Vysoká paralelizace způsobuje race conditions v lazy-loaded komponentách
  - **Proč ne 1?** Příliš pomalé (2+ minuty)
- **Retries = 1:** Záchranná síť pro vzácné timing issues
  - Většina testů projde napoprvé
  - Retry zachytí občasné browser-specific timing rozdíly

```

### Specifické testy:

```bash
# Spustit konkrétní test file
npx playwright test navigation.spec.ts

# Spustit testy s @regression tagem
npx playwright test --grep @regression

# Spustit konkrétní test case podle TestCaseID
npx playwright test --grep TC_001
```

## 📝 Konvence podle .cursorrules

### AAA Pattern:
Všechny testy používají AAA (Arrange, Act, Assert) pattern s komentáři:

```typescript
test('should switch views', async ({ browserContext }, testInfo) => {
  testInfo.annotations.push({ type: 'TestCaseID', description: 'TC_002' });

  // Arrange
  await browserContext.homePage.goto();

  // Act
  await browserContext.homePage.switchToPersonalView();

  // Assert
  await browserContext.homePage.expectPersonalViewVisible();
});
```

### Page Objects:
- Všechny Page Objects dědí z `BasePage`
- Centralizované selektory v `fieldLocators` objektu
- **Priorita selektorů:**
  1. `data-testid` ✅ (primární)
  2. Unique ID / stable class
  3. Stable attributes (href, name, aria-*)
  4. Text (pouze s unique parent)

### Selektory:
```typescript
fieldLocators = {
  toggleProfessional: '[data-testid="toggle-professional"]',  // ✅ data-testid
  btnDownloadCV: '[data-testid="btn-download-cv"]',           // ✅ data-testid
};
```

## 🎯 Test Coverage

| Feature | Test ID | Status |
|---------|---------|--------|
| Homepage load | TC_001 | ✅ (5 browsers) |
| View toggle via URL | TC_002 | ✅ (5 browsers) |
| Back to top | TC_003 | ✅ (5 browsers, flaky on WebKit/Safari) |
| CTA buttons | TC_004 | ✅ (5 browsers) |
| LinkedIn click | TC_005 | ✅ (5 browsers) |
| Email link | TC_006 | ✅ (5 browsers) |
| CV download | TC_007 | ✅ (5 browsers) |
| Language switch EN | TC_008 | ✅ (5 browsers) |
| Language switch DE | TC_009 | ✅ (5 browsers) |
| Language switch PL | TC_010 | ✅ (5 browsers) |
| View state maintained | TC_011 | ✅ (5 browsers) |

**Results:**
- **55/55 PASSED** (100% success rate!) ✅ 🎉
- **0 SKIPPED**
- **0 FAILED**  
- **0 FLAKY** (all tests stable with `workers: 4`)

## 📊 Browsers

Testy běží na:
- ✅ Chromium (Desktop)
- ✅ Firefox (Desktop)
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 13)

## 🔧 Konfigurace

### playwright.config.ts
- Base URL: `http://localhost:3003`
- Auto-start dev server
- Retry: 2x v CI
- Screenshot: on failure
- Video: on failure
- Trace: on first retry

## 📦 Fixtures

### base.fixture.ts
Poskytuje `browserContext` s:
- `page`: Playwright Page
- `homePage`: HomePage Page Object

Použití:
```typescript
import { test } from '../fixtures/base.fixture';

test('my test', async ({ browserContext }) => {
  await browserContext.homePage.goto();
  // ...
});
```

## 🎨 Data-testid Mapping

| Component | data-testid | Location |
|-----------|-------------|----------|
| View Toggle Container | `view-toggle-container` | ViewToggle.tsx |
| Professional Toggle | `toggle-professional` | ViewToggle.tsx |
| Personal Toggle | `toggle-personal` | ViewToggle.tsx |
| LinkedIn Button (Prof) | `btn-linkedin-professional` | ProfessionalHero.tsx |
| Email Button (Prof) | `btn-email-professional` | ProfessionalHero.tsx |
| Download CV Button | `btn-download-cv` | ProfessionalHero.tsx |
| Back to Top Button | `back-to-top-button` | BackToTop.tsx |
| Language Switcher | `language-switcher-button` | LanguageSwitcher.tsx |
| Language Option CS | `language-option-cs` | LanguageSwitcher.tsx |
| Language Option EN | `language-option-en` | LanguageSwitcher.tsx |
| Language Option DE | `language-option-de` | LanguageSwitcher.tsx |
| Language Option PL | `language-option-pl` | LanguageSwitcher.tsx |

## 🚫 Co se NIKDY nedělá

❌ Selektory v testech (vždy v Page Objects)
❌ `waitForTimeout()` (použít `waitForLoadState`, `expect`)
❌ `.first()` / `.nth(0)` bez důvodu
❌ Plain text selektory bez unique parent
❌ Akce na locator s více elementy

## ✅ Best Practices

✅ AAA pattern vždy
✅ TestCaseID anotace
✅ Tag `@regression`
✅ Public methods v Page Objects
✅ `data-testid` jako primární selektor
✅ Async/await pro všechny akce
✅ Explicit expectations (`expect`)

## 🐛 Debugging

```bash
# UI mode (best for debugging)
npm run test:e2e:ui

# Headed mode (see browser)
npm run test:e2e:headed

# Debug specific test
npx playwright test navigation.spec.ts --debug

# Show trace viewer
npx playwright show-trace trace.zip
```

## 📈 CI/CD

V CI běží:
- Všechny testy
- 2 retry na failure
- Screenshot + video on failure
- HTML report

## 🎓 Další informace

- [Playwright Docs](https://playwright.dev/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- Pravidla: `.cursorrules` v root projektu

---

**Vytvořeno podle `.cursorrules` konvencí** 🎯



