# تطبيق تحديث لوحة السيو 1.2.0

1. أغلق خادم Astro إن كان يعمل.
2. انسخ محتويات ملف التحديث إلى جذر المشروع ووافق على الاستبدال.
3. لا تستبدل `public/admin/config.yml` يدويًا؛ حزمة التحديث لا تحتويه.
4. نفّذ:

```powershell
npm run seo:admin:upgrade
npm run seo:redirects
npm run seo:check
npm run build
```

5. شغّل محليًا:

```powershell
npm run dev
```

ثم افتح:

```text
http://localhost:4321/seo-admin/
```

6. ارفع إلى GitHub:

```powershell
git add .
git commit -m "Upgrade SEO admin dashboard to v1.2.0"
git push origin main
```

7. بعد نشر Cloudflare افتح:

```text
https://jeddahdecore.site/seo-admin/
```
