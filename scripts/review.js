// Current year
const cy = document.getElementById("currentyear");
if (cy) cy.textContent = new Date().getFullYear();

// Last modified
const lm = document.getElementById("lastModified");
if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;

const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function getParams() {
    const params = new URLSearchParams(window.location.search);
    const features = params.getAll("features");
    return {
        product: params.get("product"),
        rating: params.get("rating"),
        installed: params.get("installed"),
        review: params.get("review"),
        user: params.get("user"),
        features
    };
}

function productNameFromId(id) {
    const found = products.find(p => p.id === id);
    return found ? found.name : id ?? "(not provided)";
}

function formatDate(iso) {
    if (!iso) return "(not provided)";
    try {
        const d = new Date(iso + "T00:00:00");
        return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    } catch {
        return iso;
    }
}

function incrementCounter() {
    const key = "reviewCount";
    const current = Number(localStorage.getItem(key) || 0);
    const next = current + 1;
    localStorage.setItem(key, String(next));
    return next;
}

document.addEventListener("DOMContentLoaded", () => {
    const count = incrementCounter();
    document.querySelector("#counter").textContent =
        `You have submitted ${count} review${count === 1 ? "" : "s"} on this device.`;

    const data = getParams();
    const summary = document.querySelector("#summary");
    const kv = [
        ["Product", productNameFromId(data.product)],
        ["Rating", data.rating ? `${data.rating} / 5` : "(not provided)"],
        ["Installed on", formatDate(data.installed)],
        ["Features", data.features.length ? data.features.join(", ") : "(none selected)"],
        ["Written review", data.review?.trim() || "(not provided)"],
        ["Your name", data.user?.trim() || "(not provided)"]
    ];
    kv.forEach(([k, v]) => {
        const div = document.createElement("div");
        div.innerHTML = `<b>${k}</b>${v}`;
        summary.appendChild(div);
    });
});
