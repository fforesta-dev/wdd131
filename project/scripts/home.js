import { saveFeedback } from './storage.js';
import { NAMES } from './names.js';

const form = document.getElementById('suggest-form');
const status = document.getElementById('form-status');

if (form && status) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const payload = Object.fromEntries(data.entries());

        if (!payload.name || !payload.email || !payload.entryName || !payload.entryType || !payload.message) {
            status.textContent = 'Please complete all required fields.';
            return;
        }
        saveFeedback({ ...payload, ts: new Date().toISOString() });
        form.reset();
        status.textContent = 'Thanks! Your suggestion was saved locally.';
    });
}

const q = document.getElementById('q-home');
const out = document.getElementById('home-results');

const tpl = (n) => `
  <article class="result card">
    <img src="${n.img}" alt="" width="480" height="280" loading="lazy" decoding="async">
    <div class="pad">
      <h3 class="result-title">${n.name}</h3>
      <p class="result-desc">${n.desc}</p>
    </div>
  </article>`;

function render(list) {
    const slice = list.slice(0, 8);
    out.innerHTML = slice.length
        ? slice.map(tpl).join('')
        : `<p class="meta">No matches. Try a different name.</p>`;
}

function search() {
    const term = (q?.value || '').trim().toLowerCase();
    const filtered = term
        ? NAMES.filter(n =>
            n.name.toLowerCase().includes(term) ||
            (n.desc || '').toLowerCase().includes(term)
        )
        : NAMES;
    render(filtered);
}

if (q && out) {
    q.addEventListener('input', search);
    search();
}
