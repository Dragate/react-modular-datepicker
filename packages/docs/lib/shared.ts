import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'react-modular-datepicker';

export const gitConfig = {
  user: 'Dragate',
  repo: 'react-modular-datepicker',
  branch: 'main',
};

const getContentUrl = createGetUrl('/llms.mdx/docs');

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl('/og/docs');

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
