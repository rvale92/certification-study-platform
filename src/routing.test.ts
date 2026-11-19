import { readFileSync } from 'fs';
import { join } from 'path';
import { runInNewContext } from 'vm';

const html = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
const restore = html.match(/<script id="github-pages-restore">([\s\S]*?)<\/script>/)?.[1] || '';

function restored(pathname: string, search: string, hash = '') {
  const replaceState = jest.fn();
  runInNewContext(restore, { window: { location: { pathname, search, hash }, history: { replaceState } } });
  return replaceState;
}

test('restores GitHub Pages project deep links with original query parameters and hash', () => {
  expect(restored('/certification-study-platform/', '?/cheatsheets/aws-saa&q=private%20access~and~section=numbers', '#limits'))
    .toHaveBeenCalledWith(null, '', '/certification-study-platform/cheatsheets/aws-saa?q=private%20access&section=numbers#limits');
});

test('restores a deep link without inventing an empty query', () => {
  expect(restored('/certification-study-platform/', '?/cheatsheets/aws-saa'))
    .toHaveBeenCalledWith(null, '', '/certification-study-platform/cheatsheets/aws-saa');
});

test('does not modify ordinary query parameters', () => {
  expect(restored('/certification-study-platform/', '?q=aws')).not.toHaveBeenCalled();
});

export {};
