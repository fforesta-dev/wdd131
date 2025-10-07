// app.js
import { getFavorites, toggleFavorite, getTheme, setTheme } from "./storage.js";
import { NAMES } from "./names.js";

function byId(id) { return document.getElementById(id); }

function renderFeatured() {
    const mount = byId("featured");
    if (!mount) return;

    // Pick up to 3 feature items deterministically for now
    const picks = NAMES.slice(0, 3);
    const favs = new Set(getFavorites());
    const html = picks.map(n => /*html*/`
    <article class="card">
      <img src="${n.img}" alt="Illustration for ${n.name}" loading="lazy">
      <div class="pad">
        <h3>${n.name}</h3>
        <p>${n.desc}</p>
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

    // Favorite buttons
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
            setTheme(tgl.checked ? "dark" : "light");
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    themeInit();
    renderFeatured();
});
