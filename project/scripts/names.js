import { NAMES_BATCH_1 } from './names-batch-1.js';
import { NAMES_BATCH_2 } from './names-batch-2.js';

const FALLBACKS = {
  person: [
    'images/cards/people/people-1.webp',
    'images/cards/people/people-2.webp',
    'images/cards/people/people-3.webp'
  ],
  place: [
    'images/cards/places/place-1.webp',
    'images/cards/places/place-2.webp',
    'images/cards/places/place-3.webp'
  ],
  term: [
    'images/cards/terms/term-1.webp',
    'images/cards/terms/term-2.webp',
    'images/cards/terms/term-3.webp'
  ]
};

const DEFAULT_IMG = 'images/cards/default.webp';

function chooseFallback(type = 'term') {
  const pool = FALLBACKS[type] || [DEFAULT_IMG];
  return pool[Math.floor(Math.random() * pool.length)];
}

const NAMES_RAW = [...NAMES_BATCH_1, ...NAMES_BATCH_2];

const byId = new Map();
for (const n of NAMES_RAW) {
  if (!byId.has(n.id)) {
    byId.set(n.id, {
      ...n,
      img: (n.img && n.img.trim()) ? n.img : chooseFallback(n.type)
    });
  }
}

export const NAMES = [...byId.values()].sort((a, b) =>
  a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
);

export const TYPES = ['all', 'person', 'place', 'term'];

export const countsByType = NAMES.reduce((acc, n) => {
  acc[n.type] = (acc[n.type] || 0) + 1;
  return acc;
}, {});
