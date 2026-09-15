import type { APIRoute } from 'astro';
import { CHANGELOG, IN_PROGRESS, LATEST_VERSION } from '../data/changelog';

const isoDate = (date: string) => date.split('/').reverse().join('-');

export const GET: APIRoute = () => {
  let currentVersion = LATEST_VERSION;
  const payload = {
    updated: new Date().toISOString(),
    latest_version: LATEST_VERSION,
    entries: CHANGELOG.map((entry) => {
      if (entry.version) currentVersion = entry.version;
      return {
        date: isoDate(entry.date),
        version: currentVersion,
        tag: entry.tag ?? 'san-pham',
        title: entry.title,
        items: entry.items,
      };
    }),
    in_progress: IN_PROGRESS,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
