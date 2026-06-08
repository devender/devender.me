// Fetch the Goodreads "read" shelf at build time, vendor the covers locally, and
// write src/data/reading.json for the /reading page to render.
//
// Why a build step (not a runtime fetch or a hotlink):
//   - The site is static on GitHub Pages — Astro renders this JSON at build time, no client JS.
//   - Covers are downloaded into public/media/books/ so the live site has NO dependency on the
//     Goodreads CDN (same principle as the WordPress image migration).
//   - Goodreads' API is deprecated, but per-shelf RSS still works with no key.
//
// Runs as part of `npm run build` (see package.json). If Goodreads is unreachable, it keeps
// the previously committed reading.json rather than failing the build.

import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const USER_ID = '30218868'; // goodreads.com/user/show/30218868-devender-gollapally
const SHELF = 'read';
const MAX_PAGES = 25; // safety cap; the loop stops as soon as a page is empty

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COVERS_DIR = join(ROOT, 'public', 'media', 'books');
const DATA_FILE = join(ROOT, 'src', 'data', 'reading.json');

const feedUrl = (page) =>
  `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${SHELF}&page=${page}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Pull a single tag's text, tolerating optional CDATA wrapping. */
function tag(item, name) {
  const m = item.match(
    new RegExp(`<${name}>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*</${name}>`),
  );
  return m ? m[1].trim() : '';
}

function parseItems(xml) {
  return xml
    .split('<item>')
    .slice(1)
    .map((chunk) => chunk.split('</item>')[0])
    .map((item) => {
      const coverUrl = tag(item, 'book_large_image_url');
      const readAtRaw = tag(item, 'user_read_at') || tag(item, 'user_date_added');
      const readAt = readAtRaw ? new Date(readAtRaw) : null;
      return {
        id: tag(item, 'book_id'),
        title: tag(item, 'title'),
        author: tag(item, 'author_name'),
        link: tag(item, 'link').replace(/\?.*$/, ''), // drop the utm tracking query
        rating: parseInt(tag(item, 'user_rating'), 10) || 0,
        readAt: readAt && !isNaN(readAt) ? readAt.toISOString() : null,
        year: readAt && !isNaN(readAt) ? readAt.getUTCFullYear() : null,
        // Goodreads serves a "nophoto" placeholder for cover-less books — treat as none.
        coverUrl: coverUrl && !coverUrl.includes('nophoto') ? coverUrl : null,
        review: tag(item, 'user_review'),
      };
    })
    .filter((b) => b.id && b.title);
}

async function fetchAllPages() {
  const all = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetch(feedUrl(page), {
      headers: { 'User-Agent': 'devender.me reading-page builder' },
    });
    if (!res.ok) throw new Error(`Goodreads RSS page ${page} → HTTP ${res.status}`);
    const items = parseItems(await res.text());
    if (items.length === 0) break;
    all.push(...items);
    await sleep(300); // be polite to Goodreads between pages
  }
  return all;
}

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

/** Download a cover into public/media/books/<id>.jpg (skip if already present). */
async function vendorCover(book) {
  if (!book.coverUrl) return null;
  const local = `/media/books/${book.id}.jpg`;
  const file = join(COVERS_DIR, `${book.id}.jpg`);
  if (await exists(file)) return local;
  try {
    const res = await fetch(book.coverUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    return local;
  } catch (err) {
    console.warn(`  ! cover for "${book.title}" failed: ${err.message}`);
    return null;
  }
}

async function main() {
  let books;
  try {
    books = await fetchAllPages();
  } catch (err) {
    console.warn(`reading: Goodreads fetch failed (${err.message}).`);
    if (await exists(DATA_FILE)) {
      console.warn('reading: keeping the existing reading.json.');
      return;
    }
    throw err; // no fallback data — fail the build
  }

  await mkdir(COVERS_DIR, { recursive: true });
  await mkdir(dirname(DATA_FILE), { recursive: true });

  for (const book of books) {
    book.cover = await vendorCover(book);
    delete book.coverUrl;
  }

  // Most-recently-read first; books without a read date sort to the end.
  books.sort((a, b) => (b.readAt ?? '').localeCompare(a.readAt ?? ''));

  const next = JSON.stringify(books, null, 2) + '\n';
  const prev = (await exists(DATA_FILE)) ? await readFile(DATA_FILE, 'utf8') : '';
  if (next !== prev) await writeFile(DATA_FILE, next);

  const withCovers = books.filter((b) => b.cover).length;
  console.log(`reading: ${books.length} books (${withCovers} covers) → src/data/reading.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
