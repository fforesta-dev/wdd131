const cy = document.getElementById("currentyear");
if (cy) cy.textContent = new Date().getFullYear();

const lm = document.getElementById("lastModified");
if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;

(function () {
    const temperatureF = 64;
    const windMph = 1;

    const calculateWindChill = (tF, vMph) =>
        35.74 + 0.6215 * tF - 35.75 * Math.pow(vMph, 0.16) + 0.4275 * tF * Math.pow(vMph, 0.16);

    const chillEl = document.getElementById('wind-chill');
    const valid = temperatureF <= 50 && windMph > 3;

    chillEl.textContent = valid
        ? `${calculateWindChill(temperatureF, windMph).toFixed(1)} °F`
        : 'N/A';
})();