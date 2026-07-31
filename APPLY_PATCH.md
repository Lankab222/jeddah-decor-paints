# تطبيق تحديث لوحة السيو 1.1.0

انسخ محتويات هذا المجلد إلى جذر مشروع `jeddah-decor-paints` مع السماح باستبدال الملفات المطابقة.

هذا التحديث **لا يتضمن** `public/admin/config.yml` حتى لا يستبدل رابط Cloudflare Worker OAuth الموجود لديك.

بعد النسخ نفّذ:

```bash
npm install
npm run build
```

ثم:

```bash
git add .
git commit -m "Add SEO admin dashboard"
git push origin main
```

بعد اكتمال نشر Cloudflare افتح:

```text
https://jeddahdecore.site/seo-admin/
```

ثم احمِ المسار عبر Cloudflare Access قبل الاعتماد عليه كلوحة إدارية.
