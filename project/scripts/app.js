const cy = document.getElementById("currentyear");
if (cy) cy.textContent = new Date().getFullYear();

const lm = document.getElementById("lastModified");
if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;

import {
  getFavorites,
  toggleFavorite,
  getTheme,
  setTheme
} from "./storage.js";
import {
  NAMES
} from "./names.js";

function byId(id) {
  return document.getElementById(id);
}

function renderFeatured() {
  const mount = byId("featured");
  if (!mount) return;

  const picks = NAMES.slice(0, 3);
  const favs = new Set(getFavorites());

  const html = picks.map(n => `
  <article class="card">
    <img src="${n.img}" alt="" width="480" height="180" loading="lazy" decoding="async">
    <div class="pad">
      <h3>${n.name}</h3>
      <p class="result-desc">${n.desc}</p>
      <div class="row" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem">
        <span class="badge">${n.type}</span>
        <button class="btn" data-fav="${n.id}" aria-pressed="${favs.has(n.id)}">
          <span>${favs.has(n.id) ? "★ Favorited" : "☆ Favorite"}</span>
        </button>
      </div>
    </div>
  </article>
`).join("");

  mount.innerHTML = html;

  mount.querySelectorAll("[data-fav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-fav");
      const nowFav = toggleFavorite(id);
      btn.setAttribute("aria-pressed", String(nowFav));
      btn.firstElementChild.textContent = nowFav ? "★ Favorited" : "☆ Favorite";
    });
  });
}

function themeInit() {
  const current = getTheme();
  document.documentElement.dataset.theme = current;
  const tgl = byId("theme-toggle");
  if (tgl) {
    tgl.checked = current === "dark";
    tgl.addEventListener("change", () => {
      const newTheme = tgl.checked ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.dataset.theme = newTheme;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  themeInit();
  renderFeatured();
});