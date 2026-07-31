# لوحة إدارة السيو والفهرسة 1.2.0

المسار:

```text
https://jeddahdecore.site/seo-admin/
```

## الوظائف

- ملخص المحتوى المنشور والمسودات وصفحات `noindex`.
- تدقيق حقول SEO للمقالات والخدمات والمشاريع.
- اكتشاف تكرار العناوين والأوصاف والكلمات الأساسية.
- إدارة الكلمة المفتاحية وCanonical وnoindex وصورة المشاركة والأولوية عبر Decap CMS.
- فحص مباشر لـ HTTPS وrobots.txt وSitemap وCanonical وSchema وMeta Robots.
- زاحف داخلي يقرأ جميع صفحات Sitemap ويفحص:
  - حالة HTTP.
  - قابلية الفهرسة.
  - Title وDescription.
  - H1.
  - Canonical.
  - JSON-LD.
  - الصور بلا alt.
  - الروابط الداخلية.
- تصدير نتيجة الزحف CSV.
- إدارة قواعد 301 و302 عبر Decap CMS وتوليد `public/_redirects` قبل البناء.
- إعدادات مركزية لحدود التدقيق وrobots وصفحات التصنيفات والوسوم.
- ربط اختياري ببيانات Search Console وURL Inspection وPageSpeed عبر Cloudflare Worker.

## تركيب التحديث فوق 1.1.0

بعد نسخ ملفات التحديث إلى جذر المشروع:

```powershell
npm run seo:admin:upgrade
npm run seo:redirects
npm run seo:check
npm run build
```

الأمر `seo:admin:upgrade` يعدّل `public/admin/config.yml` مع الحفاظ على قيم:

- `repo`
- `base_url`
- `auth_endpoint`

ثم:

```powershell
git add .
git commit -m "Upgrade SEO admin dashboard to v1.2.0"
git push origin main
```

## إعدادات Cloudflare Pages

أضف متغير البيئة الاختياري بعد نشر Worker:

```text
PUBLIC_SEO_API_URL=https://اسم-worker.workers.dev
```

بدون هذا المتغير تعمل أدوات التدقيق والزحف المحلية كاملة، بينما تبقى بيانات Search Console وPageSpeed الحية غير مفعلة.

## ربط Search Console

راجع:

```text
cloudflare/seo-api-worker/README.md
```

الـWorker يستخدم Service Account بصلاحية قراءة فقط. أضف بريد Service Account مستخدمًا إلى خاصية:

```text
sc-domain:jeddahdecore.site
```

لا تضع `GOOGLE_PRIVATE_KEY` أو مفتاح PageSpeed داخل ملفات الموقع أو GitHub.

## إدارة SEO من Decap CMS

تظهر مجموعتان جديدتان:

- **إعدادات السيو**
- **التحويلات 301 و302**

وتظهر لكل مقال وخدمة ومشروع الحقول:

- الكلمة المفتاحية الأساسية.
- Canonical مخصص.
- منع الفهرسة `noindex`.
- صورة المشاركة الاجتماعية.
- أولوية المتابعة.

## الحماية

بعد التأكد من عمل اللوحة احمِ المسارين عبر Cloudflare Access:

```text
/seo-admin/*
/seo-api/*
```

أو احمِ رابط Worker إذا بقي على `workers.dev`.

## حدود مهمة

- نتيجة التدقيق داخلية إرشادية وليست تقييمًا من Google.
- URL Inspection يعرض حالة Google عند ربط API، لكنه لا يضمن الفهرسة.
- لا تستخدم Google Indexing API لصفحات الخدمات والمقالات العادية؛ طلب الفهرسة اليدوي يتم من Search Console عند الحاجة.
