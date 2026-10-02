# Known Issues & Notes

## Personal hub redesign (2026-10)

The professional/personal view toggle and the de/pl locales were removed, so the
issues previously documented here (view switching race condition, language
dropdown timing on Chromium/Firefox, mobile menu + language dropdown) no longer
apply. See git history for the original write-up.

### Current notes

- **Draft articles in tests:** seed articles are `status: draft`, which are
  rendered only by `next dev`. `tests/specs/articles.spec.ts` therefore skips
  itself when `BASE_URL` is set (i.e. when testing a production deployment).
- **Hydration in dev:** the first click on the mobile menu toggle can happen
  before hydration in `next dev`; `openMobileMenu()` retries the click with
  `expect().toPass()`.
- **Streamed metadata:** Next.js 15 may stream `<link rel="canonical">` /
  hreflang tags into `<body>` for regular browsers (bots get them in `<head>`),
  so SEO tests query the whole document, not just `<head>`.
- **Root redirect:** `/` redirects by `Accept-Language` (cs default, en for
  English browsers) – expected next-intl behaviour.
- **OG image:** `public/og-image.svg` is SVG; LinkedIn/Facebook previews need a
  1200×630 PNG/JPG (see DEPLOYMENT-CHECKLIST.md).
