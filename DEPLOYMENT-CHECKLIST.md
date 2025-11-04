# 🚀 Deployment Checklist

Před spuštěním webu do produkce zkontroluj následující:

## ⚙️ Environment Variables

- [ ] Nastavit `NEXT_PUBLIC_SITE_URL=https://tvoje-domena.cz`
- [ ] (Optional) Google Analytics ID
- [ ] (Optional) Site verification kódy

## 🖼️ Assets & Media

- [ ] Vytvořit **Open Graph image** (`public/og-image.jpg`, 1200x630px)
- [ ] Vytvořit **ikony PWA**:
  - [ ] `public/icon-192.png` (192x192px)
  - [ ] `public/icon-512.png` (512x512px)
  - [ ] `public/apple-touch-icon.png` (180x180px) - optional
- [ ] Zkontrolovat **favicon.ico** ✅ (už máš)

## 🔍 SEO Setup

- [ ] Zaregistrovat v **Google Search Console**
- [ ] Odeslat **sitemap**: `https://tvoje-domena.cz/sitemap.xml`
- [ ] Ověřit **robots.txt**: `https://tvoje-domena.cz/robots.txt`
- [ ] Ověřit **strukturovaná data**: [schema.org validator](https://validator.schema.org/)

## 🧪 Testing

- [ ] **Lighthouse test** - score >90 pro Performance, SEO, A11y
- [ ] **Mobile responsiveness** - otestovat na mobilu
- [ ] **Open Graph preview**:
  - [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
  - [ ] [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] **Multilingual routing** - zkontrolovat všechny jazyky (cs, en, de, pl)
- [ ] **View toggle** - profesní/osobní přepínání
- [ ] **Language switcher** - zachování view při změně jazyka

## 📱 PWA & Mobile

- [ ] Test instalace jako PWA na mobilu
- [ ] Zkontrolovat manifest: `https://tvoje-domena.cz/manifest.json`
- [ ] Theme color správně nastavena

## 🔗 Links & Contact

- [ ] Email: richard.kousal@gmail.com ✅
- [ ] Telefon: +420 604 674 931 ✅
- [ ] LinkedIn: https://www.linkedin.com/in/richard-kousal ✅
- [ ] GitHub: https://github.com/richardkousal ✅
- [ ] IČO: 09121251 ✅
- [ ] Apartmány Iwona: www.apartmany-iwona.cz ✅

## 🌐 Domain & Hosting

- [ ] Doména nakonfigurována
- [ ] SSL certifikát aktivní (HTTPS)
- [ ] DNS propagováno
- [ ] Redirect www → non-www (nebo naopak)
- [ ] Redirect HTTP → HTTPS

## 📊 Analytics (Optional)

- [ ] Google Analytics tracking code
- [ ] Vercel Analytics
- [ ] Cookie consent banner (pokud chceš trackovat EU visitors)

## ✅ Final Checks

- [ ] Build funguje bez errorů: `npm run build`
- [ ] Production preview: `npm run start`
- [ ] Všechny linter errors vyřešeny
- [ ] TypeScript bez chyb
- [ ] Test na staging prostředí

---

## 🎉 Po Deploynmentu

1. **Google Search Console:**
   - Request indexing pro hlavní stránky
   - Sleduj Coverage report
   - Zkontroluj Mobile Usability

2. **LinkedIn:**
   - Sdílej portfolio link
   - Zkontroluj náhledový obrázek

3. **Monitoring:**
   - Sleduj Core Web Vitals
   - Watch for crawl errors
   - Monitor search impressions

---

**Ready to go? 🚀**

Pokud máš všechny checkboxy zaškrtnuté, můžeš deployovat!

