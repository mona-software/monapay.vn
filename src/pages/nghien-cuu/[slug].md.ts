import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function getStaticPaths() {
  return Promise.all((await getCollection('nghien-cuu')).filter((r) => !r.data.draft).map(async (report) => ({
    params: { slug: report.id },
    props: { raw: await readFile(resolve('src/content/nghien-cuu', `${report.id}.md`), 'utf8') },
  })));
}
export const GET: APIRoute = ({ props }) => new Response(props.raw, {
  headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Content-Language': 'vi' },
});
