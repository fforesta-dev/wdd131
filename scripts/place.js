const cy = document.getElementById("currentyear");
if (cy) cy.textContent = new Date().getFullYear();

const lm = document.getElementById("lastModified");
if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;

(function () {
    const temperatureC = 19;
    const windSpeedKmH = 5;

    function calculateWindChill(tC, vKmH) {
        return 13.12 + 0.6215 * tC - 11.37 * Math.pow(vKmH, 0.16) + 0.3965 * tC * Math.pow(vKmH, 0.16);
    }

    let result = 'N/A';
    if (temperatureC <= 10 && windSpeedKmH > 4.8) {
        result = `${calculateWindChill(temperatureC, windSpeedKmH).toFixed(1)} °C`;
    }

    const windChillDD = Array.from(document.querySelectorAll('.weather dd'))
        .find(dd => dd.textContent.trim().includes('°C') || dd.textContent.trim() === '18°C');
    const allDT = document.querySelectorAll('.weather dt');
    allDT.forEach(dt => {
        if (dt.textContent.toLowerCase().includes('wind chill')) {
            const dd = dt.nextElementSibling;
            if (dd) dd.textContent = result;
        }
    });
})();