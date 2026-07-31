import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().default(false),
    ogImage: z.string().optional(),
    indexingPriority: z.enum(["عالية", "عادية", "منخفضة"]).default("عادية"),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.string().default("نصائح الدهانات والديكور"),
    tags: z.array(z.string()).default([]),
    author: z.string().default("ديكورات ودهانات جدة"),
    relatedServices: z.array(z.string()).default([]),
    faq: z.array(faqItem).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/services",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    icon: z.string().optional(),
    order: z.coerce.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    features: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    serviceArea: z.array(z.string()).default(["جدة"]),
    faq: z.array(faqItem).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().default(false),
    ogImage: z.string().optional(),
    indexingPriority: z.enum(["عالية", "عادية", "منخفضة"]).default("عادية"),
    updatedDate: z.coerce.date().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default("مشاريع الدهانات والديكور"),
    location: z.string().optional(),
    completionDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    gallery: z
      .array(
        z.object({
          image: z.string(),
          alt: z.string(),
        }),
      )
      .default([]),
    services: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.coerce.number().default(0),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().default(false),
    ogImage: z.string().optional(),
    indexingPriority: z.enum(["عالية", "عادية", "منخفضة"]).default("عادية"),
  }),
});

const settings = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/settings",
  }),
  schema: z.object({
    siteName: z.string(),
    siteTitle: z.string(),
    description: z.string(),
    siteUrl: z.string().url(),
    city: z.string().default("جدة"),
    region: z.string().default("مكة المكرمة"),
    country: z.string().default("SA"),
    serviceAreas: z.array(z.string()).default(["جدة"]),
    services: z.array(z.string()).default([]),
    openingHours: z.string().optional(),
    priceRange: z.string().optional(),
    logo: z.string().optional(),
    defaultImage: z.string().default("/uploads/og-default.jpg"),
    heroBadge: z.string().optional(),
    heroTitle: z.string(),
    heroDescription: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    heroPrimaryButtonText: z.string().default("تواصل عبر واتساب"),
    heroPrimaryButtonUrl: z.string().default("/contact/"),
    heroSecondaryButtonText: z.string().optional(),
    heroSecondaryButtonUrl: z.string().optional(),
    aboutBadge: z.string().optional(),
    aboutTitle: z.string(),
    aboutDescription: z.string(),
    aboutImage: z.string().optional(),
    aboutImageAlt: z.string().optional(),
    aboutButtonText: z.string().default("تعرف علينا"),
    aboutButtonUrl: z.string().default("/about/"),
    aboutFeatures: z.array(z.string()).default([]),
    ctaTitle: z.string(),
    ctaDescription: z.string(),
    ctaButtonText: z.string().default("تواصل معنا"),
    ctaButtonUrl: z.string().default("/contact/"),
    phone: z.string().optional(),
    phoneDisplay: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    x: z.string().optional(),
    youtube: z.string().optional(),
    primaryColor: z.string().default("#8a6a32"),
    footerText: z.string().default("جميع الحقوق محفوظة"),
  }),
});


const seoSettings = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/seo-settings",
  }),
  schema: z.object({
    titleTemplate: z.string().default("%s | ديكورات ودهانات جدة"),
    defaultDescription: z.string(),
    defaultImage: z.string().default("/uploads/og-default.jpg"),
    searchConsoleProperty: z.string().default("sc-domain:jeddahdecore.site"),
    googleSiteVerification: z.string().optional(),
    bingSiteVerification: z.string().optional(),
    googleBusinessProfileUrl: z.string().optional(),
    noindexTagPages: z.boolean().default(false),
    noindexCategoryPages: z.boolean().default(false),
    robots: z.object({
      allowAll: z.boolean().default(true),
      disallow: z.array(z.string()).default(["/admin/", "/seo-admin/", "/seo-api/"]),
    }),
    audit: z.object({
      minimumTitleLength: z.coerce.number().default(30),
      maximumTitleLength: z.coerce.number().default(65),
      minimumDescriptionLength: z.coerce.number().default(80),
      maximumDescriptionLength: z.coerce.number().default(165),
      minimumContentCharacters: z.coerce.number().default(700),
      reviewScore: z.coerce.number().default(80),
      targetPerformanceScore: z.coerce.number().default(90),
    }),
  }),
});

const redirects = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/redirects",
  }),
  schema: z.object({
    redirects: z.array(z.object({
      from: z.string(),
      to: z.string(),
      status: z.enum(["301", "302"]).default("301"),
      enabled: z.boolean().default(true),
      note: z.string().optional(),
    })).default([]),
  }),
});

const faq = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/faq",
  }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().default("عام"),
    order: z.coerce.number().default(0),
    published: z.boolean().default(true),
  }),
});

const testimonials = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/testimonials",
  }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    rating: z.coerce.number().min(1).max(5).default(5),
    image: z.string().optional(),
    quote: z.string(),
    order: z.coerce.number().default(0),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  blog,
  services,
  projects,
  settings,
  faq,
  testimonials,
  seoSettings,
  redirects,
};
