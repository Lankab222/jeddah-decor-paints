# ديكورات ودهانات جدة

موقع عربي ثابت مبني باستخدام Astro وContent Collections وDecap CMS، ومهيأ للنشر على Cloudflare Pages.

## بيانات الموقع الحالية

- الاسم: **ديكورات ودهانات جدة**
- المدينة: **جدة**
- الهاتف وواتساب: **0506069197**
- الدومين: قيمة تجريبية `https://example.com` إلى أن يتم ربط الدومين الحقيقي

## الخدمات المضافة

- دهانات داخلية
- دهانات خارجية
- ديكورات داخلية وخارجية
- ورق جدران
- ترميمات وتشطيبات
- جبسات وجبس بورد
- إيبوكسيات «بكسيات»
- عوازل الأسطح
- مظلات وسواتر وبرجولات

## التشغيل محليًا

يتطلب المشروع Node.js **22.12 أو أحدث**.

```bash
npm install
npm run dev
```

ثم افتح:

```text
http://localhost:4321/
```

## تشغيل Decap CMS محليًا

في طرفية أولى:

```bash
npm run dev
```

وفي طرفية ثانية:

```bash
npm run cms
```

ثم افتح:

```text
http://localhost:4321/admin/
```

## إعداد الدومين

المشروع يستخدم متغير البيئة `PUBLIC_SITE_URL` في إعداد Astro، وهو المصدر الأساسي للروابط القانونية وSitemap وCanonical وrobots.txt.

أنشئ ملف `.env` محليًا اعتمادًا على `.env.example`:

```env
PUBLIC_SITE_URL=https://your-domain.com
```

وفي Cloudflare Pages أضف نفس المتغير لقسمي Production وPreview حسب الحاجة.

حدّث أيضًا الحقل `siteUrl` في:

```text
src/content/settings/site.json
```

حتى تبقى بيانات لوحة الإدارة متوافقة مع الدومين.

## إعداد Decap CMS للإنتاج

افتح:

```text
public/admin/config.yml
```

واستبدل:

```yaml
repo: USERNAME/REPOSITORY
base_url: https://YOUR-OAUTH-WORKER.workers.dev
```

باسم مستودع GitHub ورابط Cloudflare Worker الخاص بمصادقة GitHub OAuth. صفحة الإدارة تعمل محليًا مباشرة، أما تسجيل الدخول في الإنتاج فيحتاج إعداد OAuth.

## البناء والمعاينة

```bash
npm run build
npm run preview
```

المجلد الناتج للنشر:

```text
dist
```

## إعداد Cloudflare Pages

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Node version: 22
Production branch: main
```

أضف متغير البيئة:

```text
PUBLIC_SITE_URL=https://your-domain.com
```

## الصور

الصور الحالية صور مكانية من القالب. استبدلها بصور حقيقية ومرخصة مع المحافظة على الأسماء، أو حدّث مساراتها من Decap CMS.

الملفات الأساسية:

```text
public/uploads/hero.webp
public/uploads/about.webp
public/uploads/interior-paints.jpg
public/uploads/exterior-paints.webp
public/uploads/decorations.webp
public/uploads/wallpaper.jpg
public/uploads/renovations.jpg
public/uploads/gypsum.jpg
public/uploads/epoxy.jpg
public/uploads/insulation.jpg
public/uploads/shades-pergolas.webp
public/uploads/og-default.jpg
```

لا تنشر المشروع التجريبي أو التقييم التجريبي قبل استبدالهما؛ كلاهما مضبوط حاليًا كمسودة/غير منشور.

## أماكن التخصيص الرئيسية

```text
src/content/settings/site.json
src/content/services/
src/content/blog/
src/content/projects/
src/content/faq/
public/uploads/
public/admin/config.yml
```

## مميزات SEO والأداء

- Canonical ديناميكي
- Sitemap تلقائي
- robots.txt ديناميكي
- Open Graph وTwitter Cards
- Organization وWebSite وWebPage Schema
- Service وArticle وFAQ وBreadcrumb Schema
- روابط منتهية بشرطة `/`
- صور بأبعاد ثابتة وLazy Loading
- تحميل صورة Hero بأولوية مرتفعة
- Security وCache headers لـ Cloudflare Pages
- واجهة RTL ومتجاوبة مع الجوال
