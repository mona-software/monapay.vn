import type { CollectionEntry } from 'astro:content';
import { SITE } from './site';

export const RESEARCH_LICENSE = 'https://creativecommons.org/licenses/by/4.0/';
export const researchISO = (date: string) => date.split('/').reverse().join('-');
export const newestResearchFirst = (a: CollectionEntry<'nghien-cuu'>, b: CollectionEntry<'nghien-cuu'>) =>
  researchISO(b.data.published).localeCompare(researchISO(a.data.published)) || a.id.localeCompare(b.id);
export const researchURL = (slug: string) => `${SITE.url}/nghien-cuu/${slug}`;
// Escape BibTeX syntax while keeping Vietnamese text in UTF-8.
const bib = (value: string) => value.replace(/[\\{}%&#_$]/g, (char) => '\\' + char).replace(/[\r\n]+/g, ' ');
export function researchCitation(report: CollectionEntry<'nghien-cuu'>) {
  const { title, published, version, authors } = report.data;
  const year = published.slice(-4);
  const url = researchURL(report.id);
  return {
    apa: `${authors.join(', ')} (${year}). ${title} (Phiên bản ${version}). The MONA Group. ${url}`,
    bibtex: `@techreport{monapay-${report.id},\n  author = {${authors.map((author) => `{${bib(author)}}`).join(' and ')}},\n  title = {${bib(title)}},\n  institution = {The MONA Group},\n  year = {${year}},\n  type = {Báo cáo nghiên cứu},\n  number = {${bib(version)}},\n  url = {${url}},\n  note = {CC BY 4.0}\n}`,
  };
}
