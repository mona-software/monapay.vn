import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// howto/faq: optional, dùng để phát JSON-LD HowTo/FAQPage cho trang docs (Docs.astro đọc và render script schema,
// không lặp lại nội dung trong bài — xem cụm dung-ngay/*.md để có ví dụ).
const howtoFaqSchema = {
  howto: z.array(z.object({ name: z.string(), text: z.string() })).optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
};

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string().optional(),
    ...howtoFaqSchema,
  }),
});

// Blog content money — bài SEO/GEO viết theo góc nhìn MONA (TIEU-CHUAN-CONTENT-MONEY). slug = tên file.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),                 // dd/mm/yyyy
    updated: z.string().optional(),
    keyword: z.string(),              // keyword chính (đã research)
    category: z.enum(['huong-dan', 'so-sanh', 'chuyen-mona', 'kien-thuc']),
    h1: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

// English docs — cùng slug với docs tiếng Việt, đặt tại src/content/docs-en/**
const docs_en = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs-en' }),
  schema: z.object({ title: z.string(), description: z.string(), updated: z.string().optional(), ...howtoFaqSchema }),
});

const researchDate = z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).refine((value) => {
  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, 'Ngày phải hợp lệ, theo dd/mm/yyyy');
const research = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/nghien-cuu' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(160),
    draft: z.boolean().default(false),
    published: researchDate,
    updated: researchDate.optional(),
    version: z.union([z.string().min(1), z.number()]).transform((v) => typeof v === 'number' && Number.isInteger(v) ? `${v}.0` : String(v)),
    authors: z.array(z.string().min(1)).min(1),
    dataset: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\.csv$/),
    sources: z.array(z.object({ name: z.string().min(1), url: z.union([z.string().url().refine((url) => /^https?:\/\//.test(url)), z.literal('[CẦN NGUỒN]'), z.literal('Nội bộ')]), checked: researchDate })).min(1),
    key_numbers: z.array(z.object({ label: z.string().min(1), value: z.union([z.string(), z.number()]).transform(String) })).min(3).max(5),
  }),
});

export const collections = { docs, posts, docs_en, 'nghien-cuu': research };
