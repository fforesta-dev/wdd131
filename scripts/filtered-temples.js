const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
    if (!nav.id) nav.id = 'primary-nav';
    hamburger.setAttribute('aria-controls', nav.id);
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        const expanded = nav.classList.contains('active');
        hamburger.textContent = expanded ? '✖' : '☰';
        hamburger.setAttribute('aria-expanded', String(expanded));
    });
}

function initFooter() {
    const cy = document.getElementById("currentyear");
    if (cy) cy.textContent = new Date().getFullYear();

    const lm = document.getElementById("lastModified");
    if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;
}

const temples = [
    { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
    { templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
    { templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
    { templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
    { templeName: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
    { templeName: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
    { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
    { templeName: "Bern Switzerland", location: "Bern, Switzerland", dedicated: "1955, September, 11", area: 35546, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/400x250/bern-switzerland-temple-lds-784288-wallpaper.jpg" },
    { templeName: "Laie Hawaii", location: "Laie, Hawaii", dedicated: "1919, November, 27", area: 42100, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-temple-775369-wallpaper.jpg" },
    { templeName: "San Diego California", location: "San Diego, California", dedicated: "1993, April, 25", area: 72000, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-temple-765109-wallpaper.jpg" }
];

const $ = (sel, ctx = document) => ctx.querySelector(sel);

const getYear = (dedicatedStr) => {
    const y = parseInt(dedicatedStr, 10);
    return Number.isFinite(y) ? y : NaN;
};

const formatArea = (n) => `${n.toLocaleString(undefined)} ft²`;

const gallery = $("#gallery");
if (gallery && !gallery.hasAttribute('tabindex')) {
    gallery.setAttribute('tabindex', '-1');
}

function render(cards) {
    if (!gallery) return;
    gallery.setAttribute("aria-busy", "true");
    gallery.innerHTML = "";

    const frag = document.createDocumentFragment();

    cards.forEach(t => {
        const card = document.createElement("article");
        card.className = "card";

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = t.imageUrl;
        img.loading = "lazy";
        img.width = 400;
        img.height = 250;
        img.alt = `${t.templeName} Temple exterior`;
        figure.appendChild(img);

        const content = document.createElement("div");
        content.className = "content";

        const h3 = document.createElement("h3");
        h3.textContent = t.templeName;

        const meta = document.createElement("div");
        meta.className = "meta";
        meta.innerHTML = `
      <div><small>Location</small><br><b>${t.location}</b></div>
      <div><small>Dedicated</small><br><b>${t.dedicated}</b></div>
      <div><small>Total Area</small><br><b>${formatArea(t.area)}</b></div>
    `;

        content.append(h3, meta);
        card.append(figure, content);
        frag.appendChild(card);
    });

    gallery.appendChild(frag);
    gallery.setAttribute("aria-busy", "false");
}

const FILTERS = {
    home: () => temples,
    old: () => temples.filter(t => getYear(t.dedicated) < 1900),
    new: () => temples.filter(t => getYear(t.dedicated) > 2000),
    large: () => temples.filter(t => t.area > 90000),
    small: () => temples.filter(t => t.area < 10000)
};

function setActive(el) {
    document.querySelectorAll("nav [data-filter]").forEach(b => {
        const active = b === el;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
    });
}

function initFilters() {
    document.querySelectorAll("nav [data-filter]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // don't jump to top
            const key = link.dataset.filter;
            const next = (FILTERS[key] ?? FILTERS.home)();
            setActive(link);
            render(next);
            gallery?.focus();
        });
    });

    const first = document.querySelector('nav [data-filter="home"]') || document.querySelector('nav [data-filter]');
    if (first) setActive(first);
}

document.addEventListener("DOMContentLoaded", () => {
    initFilters();
    initFooter();
    render(temples);
});
