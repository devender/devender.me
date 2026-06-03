import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: "Devender's Musings",
    description:
      'Engineering, finance infrastructure, and AI — writing since 2003.',
    site: context.site,
    items: posts.map((p) => {
      const d = p.data.date;
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(d.getUTCDate()).padStart(2, '0');
      return {
        title: p.data.title,
        pubDate: p.data.date,
        link: `/${d.getUTCFullYear()}/${mm}/${dd}/${p.data.slug}/`,
      };
    }),
  });
}
