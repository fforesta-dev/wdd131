// explorer.js
import { NAMES } from "./names.js";
import { getFavorites, toggleFavorite } from "./storage.js";

const state = {
    q: "",
    type: "all",   // all | person | place | term
    onlyFavs: false
};

const els = {
    q: document.getElementById("q"),
    type: document.getElementById("type"),
    favs: document.getElementById("only-favs"),
    list: document.getElementById("results"),
    count: document.getElementById("count")
};

function normalize(s) { return s.toLowerCase().normalize("NFKD"); }

function applyFilters() {
    let items = NAMES;
    if (state.type !== "all") { items = items.filter(it => it.type === state.type); }
    if (state.q) {
        const qn = normalize(state.q);
        items = items.filter(it =>
            normalize(it.name).includes(qn) ||
            normalize(it.desc).includes(qn) ||
            it.refs.some(r => normalize(r).includes(qn))
        );
    }
    if (state.onlyFavs) {
        const favs = new Set(getFavorites());
        items = items.filter(it => favs.has(it.id));
    }
    return items;
}

function renderList(list) {
    els.count.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
    if (list.length === 0) {
        els.list.innerHTML = /*html*/`<li class="result"><p>No matches. Try a different search or filter.</p></li>`;
        return;
    }
    const favs = new Set(getFavorites());
    els.list.innerHTML = list.map(it => /*html*/`
    <li class="result" data-id="${it.id}">
      <div class="row">
        <strong>${it.name}</strong>
        <button class="btn" data-fav="${it.id}" aria-pressed="${favs.has(it.id)}">
          ${favs.has(it.id) ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
      <div><span class="badge">${it.type}</span></div>
      <p>${it.desc}</p>
      <p><strong>Refs:</strong> ${it.refs.map(r => `<code>${r}</code>`).join(", ")}</p>
      <p><strong>Pronunciation:</strong> ${it.pron}</p>
    </li>
  `).join("");

    // wire up buttons
    els.list.querySelectorAll("[data-fav]").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-fav");
            const nowFav = toggleFavorite(id);
            btn.setAttribute("aria-pressed", String(nowFav));
            btn.textContent = nowFav ? "★ Favorited" : "☆ Favorite";
        });
    });
}

// lightweight debounce
function debounce(fn, ms = 200) {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const update = debounce(() => {
    const list = applyFilters();
    renderList(list);
}, 150);

function initExplorer() {
    if (!els.q) return; // not on this page
    els.q.addEventListener("input", (e) => { state.q = e.target.value.trim(); update(); });
    els.type.addEventListener("change", (e) => { state.type = e.target.value; update(); });
    els.favs.addEventListener("change", (e) => { state.onlyFavs = e.target.checked; update(); });

    // initial render
    renderList(applyFilters());
}

document.addEventListener("DOMContentLoaded", initExplorer);
