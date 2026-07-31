import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "public/admin/config.yml");
if (!fs.existsSync(file)) throw new Error("لم يتم العثور على public/admin/config.yml");
let source = fs.readFileSync(file, "utf8");

const seoFields = `      - { label: "الكلمة المفتاحية الأساسية", name: "focusKeyword", widget: "string", required: false }\n      - { label: "Canonical مخصص", name: "canonical", widget: "string", required: false, hint: "اتركه فارغًا لاستخدام رابط الصفحة تلقائيًا." }\n      - { label: "منع الفهرسة noindex", name: "noindex", widget: "boolean", default: false }\n      - { label: "صورة المشاركة الاجتماعية", name: "ogImage", widget: "image", required: false }\n      - { label: "أولوية المتابعة", name: "indexingPriority", widget: "select", options: ["عالية", "عادية", "منخفضة"], default: "عادية" }\n`;

function injectAfter(collectionStart, anchor) {
  const start = source.indexOf(collectionStart);
  if (start === -1) return;
  const nextCollection = source.indexOf('\n  - name:', start + collectionStart.length);
  const end = nextCollection === -1 ? source.length : nextCollection;
  const block = source.slice(start, end);
  if (block.includes('name: "focusKeyword"')) return;
  const anchorPosition = source.indexOf(anchor, start);
  if (anchorPosition === -1 || anchorPosition > end) return;
  const insertAt = anchorPosition + anchor.length;
  source = source.slice(0, insertAt) + '\n' + seoFields.trimEnd() + source.slice(insertAt);
}

injectAfter('  - name: "blog"', '      - { label: "وصف SEO", name: "seoDescription", widget: "text", required: false }');
injectAfter('  - name: "services"', '      - { label: "وصف SEO", name: "seoDescription", widget: "text", required: false }');
injectAfter('  - name: "projects"', '      - { label: "وصف SEO", name: "seoDescription", widget: "text", required: false }');

if (!source.includes('name: "seo_settings"')) {
  source += `\n\n  - name: "seo_settings"\n    label: "إعدادات السيو"\n    files:\n      - label: "إعدادات السيو والفهرسة"\n        name: "settings"\n        file: "src/content/seo-settings/settings.json"\n        fields:\n          - { label: "قالب العنوان", name: "titleTemplate", widget: "string", hint: "استخدم %s مكان عنوان الصفحة." }\n          - { label: "الوصف الافتراضي", name: "defaultDescription", widget: "text" }\n          - { label: "الصورة الافتراضية", name: "defaultImage", widget: "image" }\n          - { label: "خاصية Search Console", name: "searchConsoleProperty", widget: "string" }\n          - { label: "رمز تحقق Google", name: "googleSiteVerification", widget: "string", required: false }\n          - { label: "رمز تحقق Bing", name: "bingSiteVerification", widget: "string", required: false }\n          - { label: "رابط ملف Google Business", name: "googleBusinessProfileUrl", widget: "string", required: false }\n          - { label: "noindex لصفحات الوسوم", name: "noindexTagPages", widget: "boolean", default: false }\n          - { label: "noindex لصفحات التصنيفات", name: "noindexCategoryPages", widget: "boolean", default: false }\n          - label: "إعدادات robots.txt"\n            name: "robots"\n            widget: "object"\n            fields:\n              - { label: "السماح العام بالزحف", name: "allowAll", widget: "boolean", default: true }\n              - { label: "المسارات المحظورة", name: "disallow", widget: "list", default: ["/admin/", "/seo-admin/", "/seo-api/"] }\n          - label: "حدود فحص المحتوى"\n            name: "audit"\n            widget: "object"\n            fields:\n              - { label: "أقل طول للعنوان", name: "minimumTitleLength", widget: "number", default: 30 }\n              - { label: "أقصى طول للعنوان", name: "maximumTitleLength", widget: "number", default: 65 }\n              - { label: "أقل طول للوصف", name: "minimumDescriptionLength", widget: "number", default: 80 }\n              - { label: "أقصى طول للوصف", name: "maximumDescriptionLength", widget: "number", default: 165 }\n              - { label: "أقل عدد أحرف للمحتوى", name: "minimumContentCharacters", widget: "number", default: 700 }\n              - { label: "درجة الحاجة للمراجعة", name: "reviewScore", widget: "number", default: 80 }\n              - { label: "هدف الأداء", name: "targetPerformanceScore", widget: "number", default: 90 }\n\n  - name: "redirect_settings"\n    label: "التحويلات 301 و302"\n    files:\n      - label: "قواعد التحويل"\n        name: "settings"\n        file: "src/content/redirects/settings.json"\n        fields:\n          - label: "التحويلات"\n            name: "redirects"\n            widget: "list"\n            required: false\n            default: []\n            fields:\n              - { label: "الرابط القديم", name: "from", widget: "string" }\n              - { label: "الرابط الجديد", name: "to", widget: "string" }\n              - { label: "نوع التحويل", name: "status", widget: "select", options: ["301", "302"], default: "301" }\n              - { label: "مفعل", name: "enabled", widget: "boolean", default: true }\n              - { label: "ملاحظة", name: "note", widget: "string", required: false }\n`;
}

fs.writeFileSync(file, source.replace(/\n{3,}/g, "\n\n"), "utf8");
console.log("تم تحديث Decap CMS مع الحفاظ على إعدادات backend وOAuth الحالية.");
