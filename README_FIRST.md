# تحديث لوحة السيو الكاملة 1.2.0

هذه الحزمة مخصصة للتركيب فوق الإصدار 1.1.0 الموجود في موقعك الحالي.

## مهم

لا تحتوي الحزمة على `public/admin/config.yml` حتى لا تفقد إعدادات GitHub OAuth الحالية.
بعد النسخ شغّل:

```powershell
npm run seo:admin:upgrade
npm run seo:redirects
npm run seo:check
npm run build
```

ثم ارفع التعديلات إلى GitHub.
