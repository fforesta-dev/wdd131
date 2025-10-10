const LS_KEYS = {
    favorites: "bom:favorites",
    theme: "bom:theme",
    feedback: "bom:feedback"
};

export function getFavorites() {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.favorites)) ?? []; }
    catch { return []; }
}
export function setFavorites(ids) {
    localStorage.setItem(LS_KEYS.favorites, JSON.stringify(ids));
}
export function toggleFavorite(id) {
    const favs = new Set(getFavorites());
    favs.has(id) ? favs.delete(id) : favs.add(id);
    setFavorites([...favs]);
    return favs.has(id);
}

export function getTheme() {
    const saved = localStorage.getItem(LS_KEYS.theme);
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
}

export function setTheme(v) {
    localStorage.setItem(LS_KEYS.theme, v);
    document.documentElement.dataset.theme = v;
}

export function saveFeedback(obj) {
    const list = JSON.parse(localStorage.getItem(LS_KEYS.feedback) ?? "[]");
    list.push(obj);
    localStorage.setItem(LS_KEYS.feedback, JSON.stringify(list));
}
